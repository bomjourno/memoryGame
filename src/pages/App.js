import React, { useState } from "react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import { link1, link2 } from "../utils/cards-images";

function App() {
  const buttonsClass = {
    start: "start",
    pause: "pause",
    results: "results",
  };

  const [cardsData, setCardsData] = useState([
    { id: 1, alt: "spider-man", src: link1, front: false },
    { id: 2, alt: "spider-man", src: link1, front: false },
    { id: 3, alt: "batman", src: link2, front: false },
    { id: 4, alt: "batman", src: link2, front: false },
  ]);

  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

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

  function startTime(bool) {
    setTime((prev) => {
      console.log(prev.s);
      if (prev.s < 59) {
        return {
          ...prev,
          s: prev.s + 1,
        };
      } else if (prev.m < 59) {
        return {
          ...prev,
          m: prev.m + 1,
          s: 0,
        };
      }
      return {
        ...prev,
        h: prev.h + 1,
        m: 0,
        s: 0,
      };
    });
  }

  function initialTime() {
    setInterval(startTime, 1000);
  }


  return (
    <div className="main">
      <header className="header">
        <Button func={initialTime} button={buttonsClass.start} />
        <Button button={buttonsClass.pause} />
        <Button button={buttonsClass.results} />
        <div className="time-container">{`${time.h}:${time.m}:${time.s}`}</div>
      </header>
      <section className="cards-container">
        {cardsData.map((card, index) => {
          return (
            <Card
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
