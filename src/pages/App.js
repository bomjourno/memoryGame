import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Timer from "../components/Timer.js/Timer";
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

function App() {
  //объект с классами кнопок
  const buttonsClass = {
    start: "start",
    pause: "pause",
    results: "results",
  };

  //стартовый массив карточек на доске
  const [cardsData, setCardsData] = useState([
    { id: 1, alt: "Spider-man", src: link1, front: false },
    { id: 2, alt: "Spider-man", src: link1, front: false },
    { id: 3, alt: "Batman", src: link2, front: false },
    { id: 4, alt: "Batman", src: link2, front: false },
    { id: 5, alt: "Deadpool", src: link3, front: false },
    { id: 6, alt: "Deadpool", src: link3, front: false },
    { id: 7, alt: "Albert-Einstein", src: link4, front: false },
    { id: 8, alt: "Albert-Einstein", src: link4, front: false },
    { id: 9, alt: "Jack Sparrow", src: link5, front: false },
    { id: 10, alt: "Jack Sparrow", src: link5, front: false },
    { id: 11, alt: "Neo", src: link6, front: false },
    { id: 12, alt: "Neo", src: link6, front: false },
    { id: 13, alt: "Steve Jobs", src: link7, front: false },
    { id: 14, alt: "Steve Jobs", src: link7, front: false },
    { id: 15, alt: "Ninja", src: link8, front: false },
    { id: 16, alt: "Ninja", src: link8, front: false },
  ]);


  //разворачиваем карту лицом вверх по id
  function handleFontBack(id) {
    setCardsData(
      cardsData.map((card) => {
        if (card.id === id) {
          card.front = !card.front;
        }
        return card;
      })
    );
  }

  //готовим функцию, которая рандомит позиции элементов входящего массива (чтобы каждый раз при новой игре менялось местоположение карт)
  function randArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  //один раз в самом начале игры рандомим позиции элементов массива
  //пока есть ошибка - функция сработает только при первом клике на карту
  useEffect(() => {
    setCardsData(randArray(cardsData));
  }, []);

  //через count считаем количество тыков на карты.
  const [count, setCount] = React.useState(0);

  //После двух тыков блокируем "тык" на другие карты посредством status
  let [status, setStatus] = React.useState(false);

  //добавляем в новый массив те карты, которые тыкнули (чтобы потом сравнивать тыкнутые карты между собой)
  let [a, setA] = useState([])

  //если больше 2 тыков на карты сделано, то заблокировать возможность тыка на другие карты
  useEffect(() => {
    setCount(count + 1)
    if(count === 2) {
      setStatus(status = !status)
    }

    if(cardsData.find(item => item.front === true)) {
      let b = cardsData.find(item => item.front === true);
      setA([b, ...a ]) //работает через пень колоду, переделать
      console.log(a)
    }

  }, [cardsData])

  let dis = [];
  if (status) {
    dis.push("dis");
  }

  const prom = new Promise((resolve, reject) => {
    if(status) {
      resolve(status)
    } else {
      reject('false')
    }
  })

  prom.then((res) => setTimeout(() => setStatus(res = !res), 4000)).catch((err) => err.status)

  //сравниваем тыкнутые карты между собой, и если они одинаковые, то оставляем карты открытыми
  //остановился пока на этом этапе
  useEffect(() => {
    if(a.length > 1) {
      // if(a[0].alt === a[1].alt) {
      //   let card = cardsData.find(item => item.alt === a[0].alt)
      //   let card1 = cardsData.find(item => item.alt === a[1].alt)
      //   console.log(card)
      //   setCardsData(cardsData.map(item => {
      //     if(item.alt === card.alt) {
      //       item.front = true
      //     }
      //     return item
      //   }))
      //   setCardsData(cardsData.map(item => {
      //     if(item.alt === card1.alt) {
      //       item.front = true
      //     }
      //     return item
      //   }))
      // }
    }
  }, [a])


  if(a.length > 2) {
    setA(a = [])
  }




  return (
    <div className="main">
      <header>
        <Timer buttonsClass={buttonsClass} />
      </header>
      <section className={`cards-container ${dis.join(" ")}`}>
        {cardsData.map((card, index) => {
          return (
            <Card
              count={count}
              setCount={setCount}
              front={card.front}
              src={card.src}
              alt={card.alt}
              id={card.id}
              handleFontBack={handleFontBack}
              key={index}
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;
