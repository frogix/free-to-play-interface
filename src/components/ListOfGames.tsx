import Pagination from "antd/es/pagination";
import type { PaginationProps } from "antd/es/pagination";
import { GameInfo } from "../api/games";
import { GameCard, GameCardSkeleton } from "./GameCard";
import { NetworkErrorDisplay, GenericErrorDisplay } from "./ErrorDisplay";
import { useRef } from "react";

interface ListOfGamesProps {
	games: GameInfo[];
	isLoading: boolean;
	error?: Error | null;
	onRetry?: () => void;
	currentPage: number;
	pageSize: number;
	onPageChange: (page: number, pageSize: number) => void;
}

const listOfGamesDivStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
	gap: '16px',
	marginBottom: '24px'
};

export function ListOfGames({
	games,
	isLoading,
	error,
	onRetry,
	currentPage,
	pageSize,
	onPageChange

}: ListOfGamesProps) {
	const gameListStartDiv = useRef<HTMLDivElement | null>(null);

	const gamesOnPage = games.slice(pageSize * (currentPage - 1), pageSize * currentPage);

	const onPageChanged: PaginationProps["onChange"] = (page, newPageSize) => {
		onPageChange(page, newPageSize);
		gameListStartDiv.current?.scrollIntoView({ behavior: "smooth" });
	};

	if (isLoading) {
		return (
			<div style={listOfGamesDivStyle}>
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
				ref={gameListStartDiv}
				style={listOfGamesDivStyle}
			>
				{gamesOnPage.map(game => (
					<GameCard key={game.id} {...game} />
				))}
			</div>

			<Pagination
				current={currentPage}
				pageSize={pageSize}
				style={{ marginBottom: 30, textAlign: "center" }}
				onChange={onPageChanged}
				total={games.length}
			/>
		</>
	);
}
