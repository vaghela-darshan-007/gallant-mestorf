import playersJson from "../data/players.json";

const useInitialPlayersData = () => {
  return [...playersJson];
};

export default useInitialPlayersData;
