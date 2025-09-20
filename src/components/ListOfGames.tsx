import { Pagination, PaginationProps } from "antd";
import { GameInfo } from "../api/games";
import { GameCard, GameCardSkeleton } from "./GameCard";
import { useState } from "react";

interface ListOfGamesProps {
	games: GameInfo[];
	isLoading: boolean;
	error: Error | undefined;
}

export function ListOfGames({ games, isLoading, error }: ListOfGamesProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPageSize, setCurrentPageSize] = useState(10);

	const onPageChanged: PaginationProps['onChange'] = (page, pageSize) => {
		setCurrentPage(page);
		setCurrentPageSize(pageSize);
	}

	if (isLoading) {
		return (
			<>
				{new Array(3).fill(0).map((_, i) => (
					<GameCardSkeleton key={i} />
				))}
			</>
		);
	}

	if (error) {
		return "A network error has occured. Please try again later.";
	}

	return (
		<>
			{games.slice(currentPageSize * (currentPage - 1), currentPageSize * currentPage).map((game) => (
				<GameCard key={game.id} {...game} />
			))}

			<Pagination
				// current={games.length < currentPageSize * currentPage ? 1 : currentPage}
				defaultCurrent={currentPage}
				defaultPageSize={currentPageSize}
				style={{ marginBottom: 30 }}
				onChange={onPageChanged}
				total={games.length}
				align="end"
			/>
		</>
	);
}
