import styled from "styled-components";
import PlayerScore from "./Score";


// Interface for Player object
interface Player {
    userID: string;
    displayName: string;
    picture: string;
    lastScore: number;
    score: number;
    translateY: number;
}


function PlayerList({ originalPlayers, sortedPlayers }: { originalPlayers: Player[], sortedPlayers: Player[] }) {
    // Rendering the list of players
    return (
        <PlayerListContainer>
            {originalPlayers.map((player, index) => {
                // Finding corresponding sorted player
                const sortedPlayer = sortedPlayers.find((p) => p.userID === player.userID);
                return (
                    <PlayerItem key={player.userID} translateY={sortedPlayer?.translateY}>
                        <Position>{sortedPlayers.findIndex((v) => v.userID === player.userID) + 1}</Position>
                        <PlayerDetails>
                            <Picture src={player.picture} alt={player.displayName} />
                            <Name>{player.displayName}</Name>
                        </PlayerDetails>
                        {/* Rendering PlayerScore component */}
                        <PlayerScore lastScore={Number(sortedPlayer?.lastScore)} currentScore={Number(sortedPlayer?.score)} />
                    </PlayerItem>
                )
            }
            )}
        </PlayerListContainer>
    )
}


const PlayerListContainer = styled.div`
  height: 750px;
  overflow-y: auto;
  position: relative;
`;

// Styling for each player item
const PlayerItem = styled.div<{ translateY: any }>`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 53px;
  border: 1px solid #ccc;
  background-color: #fff;

  /* Applying transition for smooth translateY animation */
  transform: translateY(${props => props.translateY}px);

  transition: transform 1s ease;
`;

const Position = styled.div`
  flex: 0 0 50px;
  text-align: center;
`;

const PlayerDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Picture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: aliceblue;
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: bold;
`;

export default PlayerList;