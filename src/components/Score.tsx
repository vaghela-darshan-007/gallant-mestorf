import styled, { css } from "styled-components";
import useNumberCountAnimation from "../hooks/UseNumberCountAnimation";

interface PlayerScoreProps {
  lastScore: number;
  currentScore: number;
}

function PlayerScore({ lastScore, currentScore }: PlayerScoreProps) {
  // Rendering the score container with scores
  return (
    <ScoreContainer>
      <Score lastScore={lastScore} currentScore={currentScore}></Score>
      <Point>Pt</Point>
    </ScoreContainer>
  );
}

const ScoreContainer = styled.div`
  width: 8vw;
  font-family: monospace;
  display: flex;
  justify-content: flex-end;
  color: #05386b;
  font-size: 1.15vw;
  margin-right: 1.5vw;

  @media (max-width: 1024px) and (min-width: 768px) {
    width: 10vw;
    font-size: 1.5vw;
    margin-right: 2vw;
  }

  @media (max-width: 768px) and (min-width: 426px) {
    width: 15vw;
    font-size: 2vw;
    margin-right: 4vw;
  }

  @media (max-width: 426px) {
    width: 20vw;
    font-size: 4vw;
    margin-right: 0;
  }
`;
// Styling for the score component
const Score = styled.span<{ lastScore: number; currentScore: number }>`
  /* hook implementation for number counter animation */
  ${({ lastScore, currentScore }) =>
    css`
      ${useNumberCountAnimation(lastScore, currentScore)}
  `}

  width: auto;
  text-align: end;

  /* Rendering the score value */
  &::after {
    content: counter(number);
  }

  @media (max-width: 426px) {
    font-size: 3.25vw;
  }
`;

const Point = styled.span`
  margin-left: 0.5vw;

  @media (max-width: 768px) and (min-width: 426px) {
    margin-left: 1vw;
  }

  @media (max-width: 426px) {
    font-size: 3.25vw;
    margin-left: 2vw;
  }
`;

export default PlayerScore;
