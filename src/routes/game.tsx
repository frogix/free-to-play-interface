import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { DetailedGameInfo, getGameInfo } from "../api/games";
import { DetailedGameCardSkeleton } from "../components/DetailedGameCardSkeleton";
import { GameNotFoundDisplay, GenericErrorDisplay } from "../components/ErrorDisplay";

const DetailedGameCard = lazy(() => import("../components/DetailedGameCard"));

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
		return <DetailedGameCardSkeleton />
	}

	if (error) {
		return <GenericErrorDisplay error={error} onRetry={loadGameData} title="Failed to Load Game Details" />;
	}

	if (!game) {
		return <GameNotFoundDisplay />;
	}

	return (
		<Suspense fallback={<DetailedGameCardSkeleton />}>
			<DetailedGameCard {...game} />
		</Suspense>
	);
}

GameCardPage.loader = gameInfoLoader;
