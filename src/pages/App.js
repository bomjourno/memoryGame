import React, { useEffect, useState } from "react";
import { Card } from "../components/Card/Card";
import { Timer } from "../components/Timer/Timer";
import { shuffle } from "../utils/shuffle";
import { startCards } from "../utils/start-cards";
import { useSwitcher } from "../components/hooks/useSwitcher";
import { ALL_CARDS, MAX_USER_POKE_COUNT, UNLOCK_TIME_TO_POKE } from "../utils/constants";
import classNames from "classnames";

function App() {
  //статус игры
  const [isGameWin, , , switchGameWin] = useSwitcher(false);

  //общий стейт для всей доски (block or unblock board)
  const [isEnableBoard, , , switchEnableBoard] = useSwitcher(true);

  //стартовый массив карточек на доске
  const [cardsData, setCardsData] = useState([]);

  //Перемешиваем массив карт
  useEffect(() => {
    setCardsData(shuffle(startCards));
  }, []);

  //Если пользователь выиграл, то перемешать карты снова
  useEffect(() => {
    setCardsData(shuffle(startCards));
  }, [isGameWin]);

  //управление секундомером
  const [stopWatchIsActive, startStopWatch, pauseStopWatch, switchStopWatch] =
    useSwitcher(false);

  //через count считаем количество тыков на карты.
  const [count, setCount] = useState(0);

  //После двух тыков блокируем "тык" на другие карты посредством canChooseCards
  const [canChooseCards, , , switchChooseCards] = useSwitcher(false);

  //блокируем возможность тыка на другие карты
  useEffect(() => {
    if (count === MAX_USER_POKE_COUNT) {
      switchChooseCards();
    }
  }, [count]);

  useEffect(() => {
    if (canChooseCards) {
      setTimeout(() => switchChooseCards(), UNLOCK_TIME_TO_POKE);
    }
  }, [canChooseCards]);

  // добавляем в новый массив те карты, которые Выбрал пользователь
  const [userSelectedCard, setUserSelectedCard] = useState([]);

  function handleCardClick(card) {
    setUserSelectedCard(() => [...userSelectedCard, { name: card }]);
  }

  // блокируем найденные карты
  function blockFoundCards() {
    setCardsData((prev) => {
      const foundCard = prev.find(
        (card) => card.alt === userSelectedCard[0].name
      );
      prev.forEach((card) => {
        if (card.alt === foundCard.alt) {
          card.front = true;
        }
      });
      return prev;
    });
    setUserSelectedCard([]);
  }

  useEffect(() => {
    if (userSelectedCard.length === MAX_USER_POKE_COUNT) {
      userSelectedCard[0].name === userSelectedCard[1].name
        ? blockFoundCards()
        : setUserSelectedCard([]);
    }
  }, [userSelectedCard]);

  //победа, возвращаем все в исходное состояние
  useEffect(() => {
    const foundCards = cardsData.filter(card => card.front)
    const gameWin = foundCards.length === ALL_CARDS;
    if (gameWin) {
      switchGameWin();
    }
  }, [canChooseCards]);


  useEffect(() => {
    if (isGameWin) {
      setCardsData((prev) => {
        prev.forEach((card) => {
          card.front = false;
        });
        return prev;
      });
      switchStopWatch();
    }
  }, [isGameWin]);

   //Следить в процессе ли игра
   const [gameInProgress, setGameInProgress] = useState(false);

   useEffect(() => {
     setGameInProgress(!gameInProgress);
   }, [stopWatchIsActive]);

  return (
    <div className="main">
      <header>
        <Timer
          stopWatch={stopWatchIsActive}
          start={startStopWatch}
          pause={pauseStopWatch}
          switchEnableBoard={switchEnableBoard}
          gameStatus={isGameWin}
          switchGameWin={switchGameWin}
        />
      </header>
      <section
        className={classNames("cards-container", {
          disableBoardInGame: canChooseCards, enableBoard: isEnableBoard
        })}
      >
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
