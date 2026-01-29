import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";

import { getGameInfo } from "../api/games";
import { DetailedGameCardSkeleton } from "../components/DetailedGameCardSkeleton";
import { GameNotFoundDisplay, GenericErrorDisplay } from "../components/ErrorDisplay";

const DetailedGameCard = lazy(() => import("../components/DetailedGameCard"));

function gameInfoLoader({ params }: LoaderFunctionArgs) {
	return params.gameId || "";
}

export function GameCardPage() {
	const gameId = useLoaderData() as string;
	const gameIdNumber = parseInt(gameId, 10);

	const {
		data: game,
		isLoading,
		error,
		refetch: loadGameData,
		isFetching,
	} = useQuery({
		queryKey: ["game", gameIdNumber],
		queryFn: ({ signal }) => getGameInfo(gameIdNumber, signal)
	});


	if (isLoading || isFetching) {
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
