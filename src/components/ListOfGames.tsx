import Pagination from "antd/es/pagination";
import type { PaginationProps } from "antd/es/pagination";
import { GameInfo } from "../api/games";
import { GameCard, GameCardSkeleton } from "./GameCard";
import { NetworkErrorDisplay, GenericErrorDisplay } from "./ErrorDisplay";
import { useState } from "react";

interface ListOfGamesProps {
	games: GameInfo[];
	isLoading: boolean;
	error: Error | undefined;
	onRetry?: () => void;
}

export function ListOfGames({ games, isLoading, error, onRetry }: ListOfGamesProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [currentPageSize, setCurrentPageSize] = useState(10);

	const onPageChanged: PaginationProps['onChange'] = (page, pageSize) => {
		setCurrentPage(page);
		setCurrentPageSize(pageSize);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	if (isLoading) {
		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
					gap: '16px',
					marginBottom: '24px'
				}}
			>
				{new Array(6).fill(0).map((_, i) => (
					<GameCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (error) {
		const errorMessage = error.message.toLowerCase();
		if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('connection')) {
			return <NetworkErrorDisplay onRetry={onRetry} title="Failed to Load Games" />;
		}
		return <GenericErrorDisplay error={error} onRetry={onRetry} title="Failed to Load Games" />;
	}

	return (
		<>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
					gap: '16px',
					marginBottom: '24px'
				}}
			>
				{games.slice(currentPageSize * (currentPage - 1), currentPageSize * currentPage).map((game) => (
					<GameCard key={game.id} {...game} />
				))}
			</div>

			<Pagination
				// current={games.length < currentPageSize * currentPage ? 1 : currentPage}
				defaultCurrent={currentPage}
				defaultPageSize={currentPageSize}
				style={{ marginBottom: 30, textAlign: "center" }}
				onChange={onPageChanged}
				total={games.length}
			/>
		</>
	);
}
