interface GameThumbnail {
	w: number;
	h: number;
	hash: string;
}

export interface UnparsedGameInfo {
	id: number;
	title: string;
	thumbnail: string;
	thumbnail_lazy: GameThumbnail;
	short_description: string;
	game_url: string;
	genre: string;
	platform: string;
	publisher: string;
	developer: string;
	release_date: string;
	freetogame_profile_url: string;
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

type ScreenshotData = {
	id: number;
	image: string;
};

export type SystemRequirements = {
	os: string;
	processor: string;
	memory: string;
	graphics: string;
	storage: string;
};

export interface DetailedGameInfo extends GameInfo {
	description: string;
	status: string;
	minimum_system_requirements: SystemRequirements;
	screenshots: ScreenshotData[];
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
	return fetch(BASE_URL + "/filtering-options")
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: Failed to fetch filter options`);
			}
			return response.json();
		})
		.catch((err) => {
			console.error("An error has occurred during the retrieval of game fields possible options", err);
			throw new Error(err.message || "Network error: Unable to load filter options");
		});
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

const parseGameObject = (gameObject: UnparsedGameInfo): DetailedGameInfo => {
	const parsedObject = {
		...gameObject,
		release_date: tryParseDate(gameObject.release_date),
		platform: splitPlatform(gameObject.platform)
	};

	return parsedObject as DetailedGameInfo;
};

export const getGamesList = (): Promise<GameInfo[]> => {
	return fetch(BASE_URL + "/games")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: Failed to fetch games list`);
			}
			return response.json();
		})
		.then((games) => {
			if (!Array.isArray(games)) {
				throw new Error("Invalid response format: Expected array of games");
			}
			return games.map(parseGameObject);
		})
		.catch((err) => {
			console.error("An error has occurred during the retrieval of games list", err);
			throw new Error(err.message || "Network error: Unable to load games list");
		});
};

const splitPlatform = (platformString: string) => {
	if (!platformString) return [];

	return platformString.split(",").map((p) => p.trim());
};

export const getGameInfo = (gameId: number): Promise<DetailedGameInfo | null> => {
	return fetch(BASE_URL + "/game?id=" + gameId)
		.then((response) => {
			if (response.status === 404) {
				throw new Error("Game not found");
			}
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: Failed to fetch game details`);
			}
			return response.json();
		})
		.then((gameData) => {
			if (!gameData || typeof gameData !== 'object') {
				throw new Error("Invalid response format: Expected game object");
			}
			return parseGameObject(gameData);
		})
		.catch((error) => {
			console.error("An error has occurred during the retrieval of game info", error);
			if (error.message === "Game not found") {
				return null;
			}
			throw new Error(error.message || "Network error: Unable to load game details");
		});
};
