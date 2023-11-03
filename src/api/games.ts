interface GameThumbnail {
	w: number;
	h: number;
	hash: string;
}

export interface GameInfo {
	id: number;
	title: string;
	thumbnail: string;
	thumbnail_lazy: GameThumbnail;
	short_description: string;
	game_url: string;
	genre: string;
	platform: string[];
	publisher: string;
	developer: string;
	release_date: Date;
	freetogame_profile_url: string;
}

interface TimeSpan {
	min: Date;
	max: Date;
}

export type GameFieldsPossibleValues = {
	genre: string[];
	platform: string[];
	publisher: string[];
	developer: string[];
	release_date: TimeSpan | null;
};

const BASE_URL = "http://localhost:1337";

export const getFieldsPossibleValues = (): Promise<GameFieldsPossibleValues> => {
	return fetch(BASE_URL + "/filtering-options").then((response) => response.json());
};

/**
 * Try to convert string `YYYY-MM-DD` into date
 */
const tryParseDate = (dateStr: string): Date | string => {
	const parsed = new Date(dateStr);

	if (parsed instanceof Date && !isNaN(+parsed)) {
		return parsed;
	}

	// try to replace DD=00 with DD=01
	if (dateStr.substring(dateStr.length - 2) === "00") {
		return tryParseDate(dateStr.substring(0, dateStr.length - 2) + "01");
	}

	return dateStr;
};

export const getGamesList = (): Promise<GameInfo[]> => {
	return fetch(BASE_URL + "/games")
		.then((response) => response.json())
		.then((games) => games.map((g) => ({ ...g, release_date: tryParseDate(g.release_date) })));
};

export const getGameInfo = (gameId: number): Promise<GameInfo> => {
	return fetch(BASE_URL + "/game/" + gameId)
		.then((response) => response.json())
		.then((game) => ({...game, release_date: tryParseDate(game.release_date)}));
};
