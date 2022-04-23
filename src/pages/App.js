import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Timer from "../components/Timer.js/Timer";
import { shuffle } from "../utils/shuffle";
import { startCards } from "../utils/start-cards";
import classNames from "classnames";

function App() {
  //объект с классами кнопок
  const buttonsClass = {
    start: "start",
    pause: "pause",
    results: "results",
  };

  const MAX_USER_POKE_COUNT = 2;

  //стартовый массив карточек на доске
  const [cardsData, setCardsData] = useState([]);

  //Перемешиваем массив карт
  useEffect(() => {
    setCardsData(shuffle(startCards));
  }, []);

  //через count считаем количество тыков на карты.
  const [count, setCount] = React.useState(0);

  //После двух тыков блокируем "тык" на другие карты посредством status
  const [status, setStatus] = React.useState(false);

  //блокируем возможность тыка на другие карты
  useEffect(() => {
    if (count === MAX_USER_POKE_COUNT) {
      setStatus(!status);
    }
  }, [count]);

  useEffect(() => {
    if (status) {
      setTimeout(() => setStatus(!status), 4000);
    }
  }, [status]);

  // добавляем в новый массив те карты, которые Выбрал пользователь
  const [userSelectedCard, setUserSelectedCard] = useState([]);

  function handleCardClick(card) {
    setUserSelectedCard(() => [...userSelectedCard, { name: card }]);
  }



  function createNewCards() {
    setCardsData((prev) => {
      const foundCard = prev.find((card) => card.alt === userSelectedCard[0].name
      );
      console.log(foundCard);
      for(let i=0; i<prev.length; i++) {
        if(prev[i].alt === foundCard.alt) {
          prev[i].front = true;
        }
      }
      // debugger
      console.log(prev)
      return prev;
    });
    setUserSelectedCard([]);
  }

  useEffect(() => {
    if (userSelectedCard.length === 2) {
      userSelectedCard[0].name === userSelectedCard[1].name
        ? createNewCards()
        : setUserSelectedCard([]);
    }
    console.log(userSelectedCard);
  }, [userSelectedCard]);

  return (
    <div className="main">
      <header>
        <Timer buttonsClass={buttonsClass} />
      </header>
      <section className={classNames("cards-container", { disable: status })}>
        {cardsData.map((card, index) => {
          return (
            <Card
              // handleRotateCard={handleRotateCard}
              front={card.front}
              card={card.alt}
              handleCardClick={handleCardClick}
              count={count}
              setCount={setCount}
              src={card.src}
              id={card.id}
              alt={card.alt}
              key={index}
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;
