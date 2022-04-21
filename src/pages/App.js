import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Timer from "../components/Timer.js/Timer";
import {shuffle} from '../utils/shuffle'
import {
  link1,
  link2,
  link3,
  link4,
  link5,
  link6,
  link7,
  link8,
} from "../utils/cards-images";
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
  const [cardsData, setCardsData] = useState([
    { id: 1, alt: "Spider-man", src: link1},
    { id: 2, alt: "Spider-man", src: link1},
    { id: 3, alt: "Batman", src: link2},
    { id: 4, alt: "Batman", src: link2},
    { id: 5, alt: "Deadpool", src: link3},
    { id: 6, alt: "Deadpool", src: link3},
    { id: 7, alt: "Albert-Einstein", src: link4},
    { id: 8, alt: "Albert-Einstein", src: link4},
    { id: 9, alt: "Jack Sparrow", src: link5},
    { id: 10, alt: "Jack Sparrow", src: link5},
    { id: 11, alt: "Neo", src: link6},
    { id: 12, alt: "Neo", src: link6},
    { id: 13, alt: "Steve Jobs", src: link7},
    { id: 14, alt: "Steve Jobs", src: link7},
    { id: 15, alt: "Ninja", src: link8},
    { id: 16, alt: "Ninja", src: link8},
  ]);

  //Перемешиваем массив карт
  useEffect(() => {
    setCardsData(shuffle(cardsData));
  }, []);

  //через count считаем количество тыков на карты.
  const [count, setCount] = React.useState(0);

  //После двух тыков блокируем "тык" на другие карты посредством status
  let [status, setStatus] = React.useState(false);

  //добавляем в новый массив те карты, которые тыкнули
  let [a, setA] = useState([])

  //блокируем возможность тыка на другие карты
  useEffect(() => {
    if(count === MAX_USER_POKE_COUNT) {
      setStatus(!status)
    }
  }, [count])
  // useEffect(() => {
  //   setCount(count + USER_POKE_COUNT)
  //   if(count === MAX_USER_POKE_COUNT) {
  //     setStatus(!status)
  //   }

  //   if(cardsData.find(item => item.front === true)) {
  //     let b = cardsData.find(item => item.front === true);
  //     setA([b, ...a ]) //работает через пень колоду, переделать
  //     console.log(a)
  //   }

  // }, [cardsData])

  const prom = new Promise((resolve, reject) => {
    if(status) {
      resolve(status)
    } else {
      reject('false')
    }
  })

  prom.then((res) => setTimeout(() => setStatus(!res), 4000)).catch((err) => err.status)

  //сравниваем тыкнутые карты между собой, и если они одинаковые, то оставляем карты открытыми
  //остановился пока на этом этапе
  // useEffect(() => {
  //   if(a.length > 1) {
  //     if(a[0].alt === a[1].alt) {
  //       let card = cardsData.find(item => item.alt === a[0].alt)
  //       let card1 = cardsData.find(item => item.alt === a[1].alt)
  //       console.log(card)
  //       setCardsData(cardsData.map(item => {
  //         if(item.alt === card.alt) {
  //           item.front = true
  //         }
  //         return item
  //       }))
  //       setCardsData(cardsData.map(item => {
  //         if(item.alt === card1.alt) {
  //           item.front = true
  //         }
  //         return item
  //       }))
  //     }
  //   }
  // }, [a])


  // if(a.length > 2) {
  //   setA(a = [])
  // }

  return (
    <div className="main">
      <header>
        <Timer buttonsClass={buttonsClass} />
      </header>
      <section className={classNames('cards-container', {disable: status})}>
        {cardsData.map((card, index) => {
          return (
            <Card
              count={count}
              setCount={setCount}
              src={card.src}
              alt={card.alt}
              id={card.id}
              key={index}
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;
