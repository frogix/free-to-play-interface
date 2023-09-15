import { useEffect, useState } from "react";
import "./App.css";
import { Layout, Menu, Select, Spin, theme } from "antd";
import { GameInfo, getGamesList } from "./api/games";
import { ListOfGames } from "./ListOfGames";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { Content, Footer, Header } from "antd/es/layout/layout";

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

		setGenreOptions(Array.from(uniqueGenres).map((g) => ({ label: g, value: g })));
	};

	const handleGenreChanged = (genres: string[]) => {
		setGenreFilter(genres);
	};

	const filterGame = (game: GameInfo) => {
		if (genreFilter.length > 0) {
			return genreFilter.includes(game.genre);
		}

		return true;
	};

	useEffect(() => {
		getGamesList()
			.then(
				(games) => updateGames(games),
				(error) => setError(error)
			)
			.finally(() => setLoading(false));
	}, []);

	const {
		token: { colorBgContainer }
	} = theme.useToken();

	return (
		<>
			<Layout>
				<Header>
					<Menu theme="dark" mode="horizontal" items={[{ key: 1, label: "Main!" }]} />
				</Header>
			</Layout>
			<Layout>
				<Content style={{ padding: "0 50px", backgroundColor: colorBgContainer }}>
					<Title level={1}>Free to Game</Title>

					<Select
						mode="multiple"
						allowClear
						style={{ width: "100%" }}
						placeholder="Select genres"
						defaultValue={[]}
						onChange={handleGenreChanged}
						options={genreOptions}
					/>
					{isLoading && <Spin spinning={isLoading} />}
					{error && "A network error has occured. Please try again later."}
					{games.length > 0 && <ListOfGames games={games.filter(filterGame)} />}
				</Content>
			<Footer style={{textAlign: "center"}}>Created by frogix in 2023.</Footer>
			</Layout>
		</>
	);
}

export default App;
