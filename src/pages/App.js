import React, { useEffect, useState } from "react";
import { Card } from "../components/Card/Card";
import { Timer } from "../components/Timer.js/Timer";
import { shuffle } from "../utils/shuffle";
import { startCards } from "../utils/start-cards";
import { useSwitcher } from "../components/hooks/useSwitcher";
import classNames from "classnames";

function App() {
  const ONE_FOUND_CARD = 1;
  const ALL_CARDS = 16;
  const MAX_USER_POKE_COUNT = 2;
  const UNLOCK_TIME_TO_POKE = 4000;

  //общий стейт для всей доски (block or unblock board)
  const [boardStatus, boardEnable, boardDisable, boardStatusSwitcher] = useSwitcher(true)

  //статус игры
  const [gameWin, setGameWin] = useState(false)
  const [gameInProgress, setGameInProgress] = useState(false)

  //стартовый массив карточек на доске
  const [cardsData, setCardsData] = useState([]);

  //Перемешиваем массив карт
  useEffect(() => {
    setCardsData(shuffle(startCards));
  }, []);

  useEffect(() => {
    setCardsData(shuffle(startCards));
  }, [gameWin])

  //управление секундомером
  const [stopWatchIsActive, startStopWatch, pauseStopWatch, switchStopWatch] = useSwitcher(false);

  //через count считаем количество тыков на карты.
  const [count, setCount] = useState(0);

  //После двух тыков блокируем "тык" на другие карты посредством status
  const [status, statusTrue, statusfalse, switcher] = useSwitcher(false)

  //блокируем возможность тыка на другие карты
  useEffect(() => {
    if (count === MAX_USER_POKE_COUNT) {
      switcher();
    }
  }, [count]);

  useEffect(() => {
    if (status) {
      setTimeout(() => switcher(), UNLOCK_TIME_TO_POKE);
    }
  }, [status]);

  // добавляем в новый массив те карты, которые Выбрал пользователь
  const [userSelectedCard, setUserSelectedCard] = useState([]);

  function handleCardClick(card) {
    setUserSelectedCard(() => [...userSelectedCard, { name: card }]);
  }

  // блокируем найденные карты
  function blockFoundCard() {
    setCardsData((prev) => {
      const foundCard = prev.find((card) => card.alt === userSelectedCard[0].name
      );
      prev.forEach(card => {
        if(card.alt === foundCard.alt) {
          card.front = true;
        }
      })
      return prev;
    });
    setUserSelectedCard([]);
  }

  useEffect(() => {
    if (userSelectedCard.length === MAX_USER_POKE_COUNT) {
      userSelectedCard[0].name === userSelectedCard[1].name
        ? blockFoundCard()
        : setUserSelectedCard([]);
    }
  }, [userSelectedCard]);

  //победа, возвращаем все в исходное состояние
  useEffect(() => {
    let foundCards = 0
    cardsData.forEach(card => {
      if(card.front) {
        foundCards += ONE_FOUND_CARD
      }
    })
    if(foundCards === ALL_CARDS) {
      setGameWin(!gameWin)
    }
  }, [status])

  useEffect(() => {
    if(gameWin) {
      setCardsData((prev) => {
        prev.forEach(card => {
          card.front = false;
        })
        return prev;
      });
      switchStopWatch();
    }
  }, [gameWin])

  useEffect(() => {
    setGameInProgress(!gameInProgress)
  }, [stopWatchIsActive])

  return (
    <div className="main">
      <header>
        <Timer setGameStatus={setGameWin} stopWatch={stopWatchIsActive} start={startStopWatch} pause={pauseStopWatch} boardStatusSwitcher={boardStatusSwitcher} gameStatus={gameWin}/>
      </header>
      <section className={classNames("cards-container", { boardStatusInGame: status, boardStatusBeforeGame: boardStatus})}>
        {cardsData.map((card, index) => {
          return (
            <Card
              gameInProgress={gameInProgress}
              card={card}
              handleCardClick={handleCardClick}
              count={count}
              setCount={setCount}
              key={index}
            />
          );
        })}
      </section>

    </div>
  );
}

export default App;
