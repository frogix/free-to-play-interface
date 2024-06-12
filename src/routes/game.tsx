import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { GameInfo, getGameInfo } from "../api/games";
import { DetailedGameCard, DetailedGameCardSkeleton } from "../components/DetailedGameCard";

function gameInfoLoader({ params }) {
	return params.gameId;
}

export function GameCardPage() {
	const gameId: number = useLoaderData();

	const [game, setGame] = useState<GameInfo>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error>();

	useEffect(() => {
		getGameInfo(gameId)
			.then(
				(res: GameInfo) => setGame(res),
				(error: Error) => setError(error)
			)
			.finally(() => setLoading(false));
	}, [gameId]);

	if (loading) {
		return <DetailedGameCardSkeleton/>
	}

	if (error) {
		return `Error occured: ${error}`;
	}

	if (!game) {
		return "Game not found!";
	}

	return <DetailedGameCard {...game} />;
}

GameCardPage.loader = gameInfoLoader;
