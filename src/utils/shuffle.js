// Тасование элементов методом "Тасование Фишера — Йетса" (или "Тасование Кнута")
// Реализацию скопировал с сайта: "https://qna.habr.com/q/163095"

function knuthShuffleAlgorithm(array) {
  for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       const temp = array[i];
       array[i] = array[j];
       array[j] = temp;
     }
     return array;
 }

 export const shuffle = knuthShuffleAlgorithm;
