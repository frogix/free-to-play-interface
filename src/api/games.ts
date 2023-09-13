export interface GameInfo {
	id: number;
	title: string;
	thumbnail: string;
	short_description: string;
	game_url: string;
	genre: string;
	platform: string;
	publisher: string;
	developer: string;
	release_date: string;
	freetogame_profile_url: string;
}


const BASE_URL = "http://localhost:1337/games";

export const getGamesList = ():Promise<GameInfo[]> => {
	return fetch(BASE_URL).then((response) => response.json())
}
