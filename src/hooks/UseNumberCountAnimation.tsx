import { keyframes, css } from "styled-components";

const useNumberCountAnimation = (
  lastScore: number,
  currentScore: number
): any => {
  const counter = keyframes`
    0% {
        --num: ${lastScore};
    }
    100% {
        --num: ${currentScore};
    }
  `;
  return css`
    ${`@property --num {
        syntax: "<integer>";
        initial-value: 0;
        inherits: false;
      }`}

    animation: 1s forwards normal ease-in-out ${counter};
    counter-reset: number var(--num);
  `;
};

export default useNumberCountAnimation;
