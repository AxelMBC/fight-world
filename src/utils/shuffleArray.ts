
import type { mainEventType } from "../types/fightEventType";

// Knuth Shuffle/Fisher-Yates algorithm
const shuffleArray = (array: mainEventType[]) => {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
};

export default shuffleArray;