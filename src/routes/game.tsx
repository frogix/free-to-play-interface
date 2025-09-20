import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { DetailedGameInfo, getGameInfo } from "../api/games";
import { DetailedGameCard, DetailedGameCardSkeleton } from "../components/DetailedGameCard";
import { GameNotFoundDisplay, GenericErrorDisplay } from "../components/ErrorDisplay";

function gameInfoLoader({ params }: LoaderFunctionArgs) {
	return params.gameId || "";
}

export function GameCardPage() {
	const gameId = useLoaderData() as string;
	const gameIdNumber = parseInt(gameId, 10);

	const [game, setGame] = useState<DetailedGameInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error>();

	const loadGameData = useCallback(() => {
		setLoading(true);
		setError(undefined);
		getGameInfo(gameIdNumber)
			.then(
				(res: DetailedGameInfo | null) => setGame(res),
				(error: Error) => setError(error)
			)
			.finally(() => setLoading(false));
	}, [gameIdNumber]);

	useEffect(() => {
		loadGameData();
	}, [loadGameData]);

	if (loading) {
		return <DetailedGameCardSkeleton/>
	}

	if (error) {
		return <GenericErrorDisplay error={error} onRetry={loadGameData} title="Failed to Load Game Details" />;
	}

	if (!game) {
		return <GameNotFoundDisplay />;
	}

	return <DetailedGameCard {...game} />;
}

GameCardPage.loader = gameInfoLoader;
