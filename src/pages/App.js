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
  const buttonsClass = {
    start: "start",
    pause: "pause",
    results: "results",
  };

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

  function handleFontBack(id) {
    setCardsData(
      cardsData.map((card) => {
        // console.log(card)
        if (card.id === id) {
          card.front = !card.front;
        }
        return card;
      })
    );
  }

  function randArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    setCardsData(randArray(cardsData));
  }, []);

  const [count, setCount] = React.useState(0);
  const [stateCard, setStateCard] = React.useState(false);
  let [status, setStatus] = React.useState(false);

  useEffect(() => {
    setCount(count + 1)
    if(count === 2) {
      setStatus(status = !status)
    }
    console.log(count)
    // cardsData.forEach(item => {
    //   if(item.id) {
    //     console.log(item)
    //   }
    // })
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



  // const prom = new Promise((resolve, reject) => {
  //   if (count === 2) {
  //     resolve(setStatus((status = !status)));
  //   }
  // });

  // prom.then(() => console.log(count));

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
