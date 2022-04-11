import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Timer from "../components/Timer.js/Timer";
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

    let arr = []
    while(arr.length < 4){
      let randomnumber = Math.floor(Math.random()*4) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }





  return (
    <div className="main">
      <header>
        <Timer buttonsClass={buttonsClass}/>
      </header>
      <section className="cards-container">
        {cardsData.map((card, index) => {
          return (
            <Card
              cardId = {arr[index]}

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
  // return (
  //   <div className="main">
  //     <header>
  //       <Timer buttonsClass={buttonsClass}/>
  //     </header>
  //     <section className="cards-container">
  //       {cardsData.map((card, index) => {
  //         return (
  //           <Card
  //             front={card.front}
  //             src={card.src}
  //             alt={card.alt}
  //             id={card.id}
  //             handleFontBack={handleFontBack}
  //             key={index}
  //           />
  //         );
  //       })}
  //     </section>
  //   </div>
  // );
}

export default App;
