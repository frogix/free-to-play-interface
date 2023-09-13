import { useEffect, useState } from "react";
import "./App.css";
import { Select, Spin } from "antd";
import { GameInfo, getGamesList } from "./api/games";
import { ListOfGames } from "./ListOfGames";

function App() {
	const [isLoading, setLoading] = useState(true);
	const [games, setGames] = useState([]);
	const [error, setError] = useState(false);

	const [genres, setGenres] = useState<string[]>([]);
	const [genreOptions, setGenreOptions] = useState([]);
	const [genreFilter, setGenreFilter] = useState<string[]>([]);

	const updateGames = (games: GameInfo[]) => {
		setGames(games);

		const allGenres = games.map((game) => game.genre.trim()).sort();

		const uniqueGenres = new Set(allGenres);
		setGenres(Array.from(uniqueGenres));

		setGenreOptions(Array.from(uniqueGenres).map(g => ({label: g, value: g}) ));
	};

	const handleGenreChanged = (genres: string[]) => {
		setGenreFilter(genres);
	}

	const filterGame = (game: GameInfo) => {
		if (genreFilter.length > 0)
		{
			return genreFilter.includes(game.genre)
		}

		return true;
	}

	useEffect(() => {
		getGamesList()
			.then(
				(games) => updateGames(games),
				(error) => setError(error)
			)
			.finally(() => setLoading(false));
	}, []);

	return (
		<>
			<h1>Free to Game</h1>

			<Select
				mode="multiple"
				allowClear
				style={{ width: '100%' }}
				placeholder="Select genres"
				defaultValue={[]}
				onChange={handleGenreChanged}
				options={genreOptions}
			/>
			{isLoading && <Spin spinning={isLoading} />}
			{error && "A network error has occured. Please try again later."}
			{games.length > 0 && <ListOfGames games={games.filter(filterGame)} />}
		</>
	);
}

export default App;
