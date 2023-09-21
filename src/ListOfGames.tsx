import { Skeleton, Spin } from "antd";
import { GameInfo } from "./api/games";
import { GameCard, GameCardSkeleton } from "./GameCard";

interface ListOfGamesProps {
	games: GameInfo[];
	isLoading: boolean;
	error: Error | undefined;
}

export function ListOfGames({ games, isLoading, error }: ListOfGamesProps) {
	if (isLoading) {
		return (
			<>
				{new Array(3).fill(0).map((_, i) => (
					<GameCardSkeleton key={i} />
				))}
			</>
		);
	}

	return (
		<>
			{error && "A network error has occured. Please try again later."}
			{games.map((game) => (
				<GameCard key={game.id} {...game} />
			))}
		</>
	);
}
