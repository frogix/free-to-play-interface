import { Spin } from "antd";
import { GameInfo } from "./api/games";
import { GameCard } from "./GameCard";

interface ListOfGamesProps {
	games: GameInfo[];
	isLoading: boolean;
	error: Error | undefined;
}

export function ListOfGames({ games, isLoading, error }: ListOfGamesProps) {
	return (
		<>
			{isLoading && <Spin spinning={isLoading} />}
			{error && "A network error has occured. Please try again later."}
			{games.map((game) => (
				<GameCard key={game.id} {...game} />
			))}
		</>
	);
}
