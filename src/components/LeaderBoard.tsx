import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerList from "./PlayerList";
import playersJson from '../data/players.json'

const TRANSLATE_FACTOR = 75;
const SCORE_UPDATE_INTERVAL = 1000;

// Interface for Player object
interface Player {
    userID: string;
    displayName: string;
    picture: string;
    lastScore: number;
    score: number;
    translateY: number;
}

// Function to update scores of players randomly
const updateScores = (players: Player[]): Player[] => {
    return players.map((player) => ({
        ...player,
        lastScore: player.score,
        score: player.score + Math.floor(Math.random() * 10000)
    }));
};

// Function to sort leaderboard based on scores
const rearrangeLeaderboard = (players: Player[]): Player[] => {
    return [...players].sort((a, b) => b.score - a.score);
};

// Function to calculate translateY for sorted players
const sortedPlayersWithTranslate = (sortedPlayers: Player[], originalPlayers: Player[]) => {
    const updatedSortedPlayers = sortedPlayers.map((sortedPlayer, sortedIndex) => {
        const originalIndex = originalPlayers.findIndex(originalPlayer => originalPlayer.userID === sortedPlayer.userID);
        if (originalIndex !== -1) {
            const translateY = originalPlayers[originalIndex].translateY + ((sortedIndex - originalIndex) * TRANSLATE_FACTOR);
            return { ...sortedPlayer, translateY };
        } else {
            return sortedPlayer;
        }
    });

    return updatedSortedPlayers;
}

function LeaderBoard() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [originalPlayers, setOriginalPlayers] = useState<Player[]>([]);
    const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

    // useEffect hook to initialize players
    useEffect(() => {
        const initialPlayers: Player[] = [
            ...playersJson
        ];
        setOriginalPlayers(initialPlayers);
        setSortedPlayers(initialPlayers);
        setPlayers(initialPlayers);
    }, []);

    // useEffect hook to update scores and rearrange leaderboard at intervals
    useEffect(() => {
        const interval = setInterval(() => {
            setOriginalPlayers(sortedPlayers);
            const updatedPlayers = updateScores(sortedPlayers);
            const rearrangedPlayers = rearrangeLeaderboard(updatedPlayers);
            const sortedPlayersWithTranslateY = sortedPlayersWithTranslate(rearrangedPlayers, originalPlayers);
            setSortedPlayers(sortedPlayersWithTranslateY);
        }, SCORE_UPDATE_INTERVAL);

        return () => clearInterval(interval);
    });
    return (
        <LeaderboardContainer>
            <LeaderBoardTitle>Leaderboard</LeaderBoardTitle>
            <PlayerList originalPlayers={players} sortedPlayers={sortedPlayers}></PlayerList>
        </LeaderboardContainer>
    )
}

const LeaderboardContainer = styled.div`
  font-family: Oswald, sans-serif;
  max-width: 600px;
  margin: 0 auto;
`;

const LeaderBoardTitle = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 36px;
  margin: 24px 0px;
  background-color: white;
  padding: 16px;
  border: 1px black solid;
  border-radius: 5px;
`;

export default LeaderBoard;