import styled, { css } from "styled-components";
import PlayerScore from "./Score";
import useNumberCountAnimation from "../hooks/UseNumberCountAnimation";

// Interface for Player object
interface Player {
  userID: string;
  displayName: string;
  picture: string;
  lastScore: number;
  score: number;
  translateY: number;
  lastPosition: number;
  currentPosition: number;
}

interface PlayerItemHeightCalculation {
  PlayerItemHeight: number;
  marginBottom: number;
}

function PlayerList({
  originalPlayers,
  sortedPlayers,
  playerItemHeightCalculation,
}: {
  originalPlayers: Player[];
  sortedPlayers: Player[];
  playerItemHeightCalculation: PlayerItemHeightCalculation;
}) {
  // Rendering the list of players
  return (
    <PlayerListContainer>
      {originalPlayers.map((player, index) => {
        // Finding corresponding sorted player
        const sortedPlayer = sortedPlayers.find(
          (p) => p.userID === player.userID
        );
        const sortedPlayerPosition =
          sortedPlayers.findIndex((v) => v.userID === player.userID) + 1;
        return (
          <PlayerItem
            key={player.userID}
            position={sortedPlayerPosition}
            translateY={sortedPlayer!.translateY}
            playerItemHeightCalculation={playerItemHeightCalculation}
          >
            <Position
              indexPosition={sortedPlayerPosition}
              lastPosition={sortedPlayer!.lastPosition}
              currentPosition={sortedPlayer!.currentPosition}
            ></Position>
            <PlayerDetails>
              <Picture src={player.picture} alt={player.displayName} />
              <Name>{player.displayName}</Name>
            </PlayerDetails>
            <PlayerScore
              lastScore={Number(sortedPlayer?.lastScore)}
              currentScore={Number(sortedPlayer?.score)}
            />
            {/* Rendering PlayerScore component */}
          </PlayerItem>
        );
      })}
    </PlayerListContainer>
  );
}

const PlayerListContainer = styled.div`
  position: relative;
`;

// Styling for each player item
const PlayerItem = styled.div<{
  translateY: number;
  playerItemHeightCalculation: PlayerItemHeightCalculation;
  position: number;
}>`
  display: flex;
  width: auto;
  align-items: center;
  box-sizing: border-box;
  padding: 1vw;
  height: ${({ playerItemHeightCalculation }) =>
    playerItemHeightCalculation.PlayerItemHeight}px;
  border-radius: 5px;
  background-color: #5cdb95;
  box-shadow: 0px 4px 8px rgba(38, 70, 46, 0.25);
  margin-bottom: ${({ playerItemHeightCalculation }) =>
    playerItemHeightCalculation.marginBottom}px;
  margin-left: 2vw;
  margin-right: 2vw;
  color: #05386b;
  font-size: 1.5vw;
  transform: translateY(${(props) => props.translateY}px);

  transition: transform 1s ease;

  @media (max-width: 768px) and (min-width: 426px) {
    padding: 1.5vw;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    font-size: 2.25vw;
  }

  @media (max-width: 426px) {
    padding: 2vw;
    margin-left: 2vw;
    margin-right: 2vw;
    font-size: 3.5vw;
  }
`;

const Position = styled.div<{
  indexPosition: number;
  lastPosition: number;
  currentPosition: number;
}>`
  /* custom hook implementation for number counter animation */
  ${({ lastPosition, currentPosition }) =>
    css`
      ${useNumberCountAnimation(lastPosition, currentPosition)}
    `};

  /* Rendering the score value */
  &::after {
    content: counter(number);
  }

  flex: 0 0 2.5vw;
  text-align: center;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2.5vw;
  height: 2.5vw;
  font-size: 1.25vw;
  margin-right: 0.75vw;

  /* Top three player styling */
  ${({ indexPosition }) => {
    if (indexPosition === 1) {
      return css`
        color: #ffd700;
        background-color: #05386b;
      `;
    } else if (indexPosition === 2) {
      return css`
        color: #c0c0c0;
        background-color: #05386b;
      `;
    } else if (indexPosition === 3) {
      return css`
        color: #cd7f32;
        background-color: #05386b;
      `;
    }
  }}

  @media (max-width: 1024px) and (min-width: 768px) {
    flex: 0 0 3vw;
    width: 3vw;
    height: 3vw;
    font-size: 1.5vw;
    margin-right: 0.75vw;
  }

  @media (max-width: 768px) and (min-width: 426px) {
    flex: 0 0 4.5vw;
    width: 4.5vw;
    height: 4.5vw;
    font-size: 2.25vw;
    margin-right: 1vw;
  }

  @media (max-width: 426px) {
    flex: 0 0 7vw;
    width: 7vw;
    height: 7vw;
    font-size: 3.5vw;
    margin-right: 1.25vw;
  }
`;

const PlayerDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Picture = styled.img`
  width: 3.5vw;
  height: 3.5vw;
  border-radius: 15%;
  margin-right: 2vw;
  border: 0.15vw solid #379683;
  background-color: aliceblue;
  object-fit: cover;

  @media (max-width: 1024px) and (min-width: 768px) {
    width: 4.5vw;
    height: 4.5vw;
    border-width: 0.2vw;
  }

  @media (max-width: 768px) and (min-width: 426px) {
    width: 7vw;
    height: 7vw;
    margin-right: 3vw;
    border-width: 0.25vw;
  }

  @media (max-width: 426px) {
    width: 10vw;
    height: 10vw;
    margin-right: 4vw;
    border-width: 0.45vw;
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 1.5vw;

  @media (max-width: 1024px) and (min-width: 768px) {
    font-size: 2vw;
  }

  @media (max-width: 768px) and (min-width: 426px) {
    font-size: 2.5vw;
  }

  @media (max-width: 426px) {
    font-size: 4vw;
  }
`;

export default PlayerList;
