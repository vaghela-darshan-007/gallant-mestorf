import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerList from "./PlayerList";
import useInitialPlayersData from "../hooks/UseInitialPlayersData";

const SCORE_UPDATE_INTERVAL = 1000;

// Player item Y direction numbers in pixels for total height calculation
const playerItemHeightCalculation = {
  PlayerItemHeight: 75,
  marginBottom: 20,
};

const totalHeight = Object.values(playerItemHeightCalculation).reduce(
  (sum, value) => sum + value,
  0
);

// Interface for Player object
interface Player {
  userID: string;
  displayName: string;
  picture: string;
  lastScore: number;
  lastPosition: number;
  currentPosition: number;
  score: number;
  translateY: number;
}

// Function to sort leaderboard based on scores
const rearrangeLeaderboard = (players: Player[]): Player[] => {
  const rearrangedPlayers = players
    .map((player) => ({
      ...player,
      lastScore: player.score,
      score: player.score + Math.floor(Math.random() * 10000),
    }))
    .sort((a, b) => b.score - a.score);
  return rearrangedPlayers;
};

// Function to calculate translateY for sorted players
const sortedPlayersWithTranslate = (
  sortedPlayers: Player[],
  originalPlayers: Player[]
) => {
  const updatedSortedPlayers = sortedPlayers.map(
    (sortedPlayer, sortedIndex) => {
      const originalIndex = originalPlayers.findIndex(
        (originalPlayer) => originalPlayer.userID === sortedPlayer.userID
      );
      if (originalIndex !== -1) {
        const translateY =
          originalPlayers[originalIndex].translateY +
          (sortedIndex - originalIndex) * totalHeight;
        return {
          ...sortedPlayer,
          translateY,
          lastPosition: originalIndex + 1,
          currentPosition: sortedIndex + 1,
        };
      } else {
        return {
          ...sortedPlayer,
          lastPosition: originalIndex + 1,
          currentPosition: sortedIndex + 1,
        };
      }
    }
  );

  return updatedSortedPlayers;
};

function LeaderBoard() {
  const initialPlayers = useInitialPlayersData();
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  useEffect(() => {
    const interval = setInterval(() => {
      const rearrangedPlayers = rearrangeLeaderboard(players);
      setPlayers((previousPlayers) => {
        return sortedPlayersWithTranslate(rearrangedPlayers, previousPlayers);
      });
    }, SCORE_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  });
  return (
    <LeaderboardContainer>
      <LeaderBoardTitle>
        Streamer Showdown: Dynamic Scoreboard Challenge
      </LeaderBoardTitle>
      <LeaderBoardDescription>
        Experience the thrill of intense competition as 10 streamers battle it
        out live, with dynamically increasing scores and real-time leaderboard
        updates.
      </LeaderBoardDescription>
      <PlayerListContainer>
        <PlayerList
          originalPlayers={initialPlayers}
          sortedPlayers={players}
          playerItemHeightCalculation={playerItemHeightCalculation}
        ></PlayerList>
      </PlayerListContainer>
    </LeaderboardContainer>
  );
}

const LeaderboardContainer = styled.div`
  font-family: Homenaje, sans-serif;
  max-width: 50vw;
  margin: 0 auto;
  color: #464859;
  padding: 3vh 1vw;
  font-size: 1.2rem;

  @media (max-width: 768px) and (min-width: 426px) {
    max-width: 65vw;
    padding: 3vh 1vw;
    font-size: 1rem;
  }

  @media (max-width: 426px) {
    max-width: 80vw;
  }
`;

const LeaderBoardTitle = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 2.5vw;
  margin: 3vh 2vw;
  color: #05386b;

  @media (max-width: 768px) and (min-width: 426px) {
    font-size: 3vw;
    margin: 2vh 1vw;
  }

  @media (max-width: 426px) {
    font-size: 5vw;
  }
`;

const PlayerListContainer = styled.div`
  background-color: #8ee4af;
  padding: 5vw;
  border-radius: 10px;

  @media (max-width: 426px) {
    padding: 7vw;
  }
`;

const LeaderBoardDescription = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 1.5vw;
  margin: 8vh 2vw;
  color: #05386b;

  @media (max-width: 768px) and (min-width: 426px) {
    font-size: 2.5vw;
    margin: 5vh 1vw;
  }

  @media (max-width: 426px) {
    font-size: 4vw;
    margin: 4vh 1vw;
  }
`;

export default LeaderBoard;
