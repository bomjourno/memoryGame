import React, { useEffect, useState } from "react";
import {Card} from "../components/Card/Card";
import {Timer} from "../components/Timer.js/Timer";
import { shuffle } from "../utils/shuffle";
import { startCards } from "../utils/start-cards";
import {useSwitcher} from "../components/hooks/useSwitcher";
import classNames from "classnames";

function App() {
  const MAX_USER_POKE_COUNT = 2;
  const UNLOCK_TIME_TO_POKE = 4000;

  //стартовый массив карточек на доске
  const [cardsData, setCardsData] = useState([]);

  //Перемешиваем массив карт
  useEffect(() => {
    setCardsData(shuffle(startCards));
  }, []);

  //через count считаем количество тыков на карты.
  const [count, setCount] = React.useState(0);

  //После двух тыков блокируем "тык" на другие карты посредством status
  // const [status, setStatus] = React.useState(false);

  const [status, statusTrue, statusFalse, switcher] = useSwitcher(false)

  //блокируем возможность тыка на другие карты
  useEffect(() => {
    if (count === MAX_USER_POKE_COUNT) {
      switcher()
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
    console.log(userSelectedCard);
  }, [userSelectedCard]);

  return (
    <div className="main">
      <header>
        <Timer />
      </header>
      <section className={classNames("cards-container", { disable: status })}>
        {cardsData.map((card, index) => {
          return (
            <Card
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
// import React, { useEffect, useState } from "react";
// import {Card} from "../components/Card/Card";
// import {Timer} from "../components/Timer.js/Timer";
// import { shuffle } from "../utils/shuffle";
// import { startCards } from "../utils/start-cards";
// import {useSwitcher} from "../components/hooks/useSwitcher";
// import classNames from "classnames";

// function App() {
//   const MAX_USER_POKE_COUNT = 2;
//   const UNLOCK_TIME_TO_POKE = 4000;

//   //стартовый массив карточек на доске
//   const [cardsData, setCardsData] = useState([]);

//   //Перемешиваем массив карт
//   useEffect(() => {
//     setCardsData(shuffle(startCards));
//   }, []);

//   //через count считаем количество тыков на карты.
//   const [count, setCount] = React.useState(0);

//   //После двух тыков блокируем "тык" на другие карты посредством status
//   const [status, setStatus] = React.useState(false);

//   //блокируем возможность тыка на другие карты
//   useEffect(() => {
//     if (count === MAX_USER_POKE_COUNT) {
//       setStatus(!status);
//     }
//   }, [count]);

//   useEffect(() => {
//     if (status) {
//       setTimeout(() => setStatus(!status), UNLOCK_TIME_TO_POKE);
//     }
//   }, [status]);

//   // добавляем в новый массив те карты, которые Выбрал пользователь
//   const [userSelectedCard, setUserSelectedCard] = useState([]);

//   function handleCardClick(card) {
//     setUserSelectedCard(() => [...userSelectedCard, { name: card }]);
//   }

//   // блокируем найденные карты
//   function blockFoundCard() {
//     setCardsData((prev) => {
//       const foundCard = prev.find((card) => card.alt === userSelectedCard[0].name
//       );
//       prev.forEach(card => {
//         if(card.alt === foundCard.alt) {
//           card.front = true;
//         }
//       })
//       return prev;
//     });
//     setUserSelectedCard([]);
//   }

//   useEffect(() => {
//     if (userSelectedCard.length === MAX_USER_POKE_COUNT) {
//       userSelectedCard[0].name === userSelectedCard[1].name
//         ? blockFoundCard()
//         : setUserSelectedCard([]);
//     }
//     console.log(userSelectedCard);
//   }, [userSelectedCard]);

//   return (
//     <div className="main">
//       <header>
//         <Timer />
//       </header>
//       <section className={classNames("cards-container", { disable: status })}>
//         {cardsData.map((card, index) => {
//           return (
//             <Card
//               card={card}
//               handleCardClick={handleCardClick}
//               count={count}
//               setCount={setCount}
//               key={index}
//             />
//           );
//         })}
//       </section>
//     </div>
//   );
// }

// export default App;
