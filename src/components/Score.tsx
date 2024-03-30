import styled, { keyframes } from "styled-components";

interface PlayerScoreProps {
    lastScore: number;
    currentScore: number;
}


function PlayerScore({ lastScore, currentScore }: PlayerScoreProps) {
    // Rendering the score container with scores
    return (
        <ScoreContainer>
            <Score lastScore={lastScore} currentScore={currentScore}></Score>
        </ScoreContainer>
    )
}

// Defining keyframes for score animation
const counter = (lastScore: number, currentScore: number) => keyframes`
0% {
  --num: ${lastScore};
}
100% {
  --num:  ${currentScore};
}
`;


const ScoreContainer = styled.div`
width: 100px;
overflow: hidden;
font-family: monospace;
`
// Styling for the score component
const Score = styled.div<{ lastScore: number, currentScore: number }>`
/* Defining custom property for the animation */
  ${`@property --num {
      syntax: "<integer>";
      initial-value: 0;
      inherits: false;
    }`
    }
  width: auto;
  text-align: end;
  font-size: 16px;
  color: blue;

  /* Applying animation with keyframes */
  animation: 1s forwards normal ease-in-out ${props => counter(props.lastScore, props.currentScore)};
  counter-reset: number var(--num);

  /* Rendering the score value */
  &::after {
    content: counter(number);
  }
`


export default PlayerScore;