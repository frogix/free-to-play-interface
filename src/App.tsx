import { useEffect, useState } from "react";
import "./App.css";
import { Col, Layout, Menu, Row, Select, Spin, theme } from "antd";
import { GameInfo, getGamesList } from "./api/games";
import { ListOfGames } from "./ListOfGames";
import Title from "antd/es/typography/Title";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { BaseOptionType } from "antd/es/select";

function App() {
	const [isLoading, setLoading] = useState(true);
	const [games, setGames] = useState<GameInfo[]>([]);
	const [error, setError] = useState<Error | undefined>();

	const [genres, setGenres] = useState<string[]>([]);
	const [genreOptions, setGenreOptions] = useState<BaseOptionType[]>([]);
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
				(games: GameInfo[]) => updateGames(games),
				(error: Error) => setError(error)
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
					<Row gutter={16}>
						<Col span={6}>
							<Title level={2}>Filter</Title>

							<Title level={3}>Genre</Title>
							<Select
								mode="multiple"
								allowClear
								style={{ width: "100%" }}
								placeholder="Select genres"
								defaultValue={[]}
								onChange={handleGenreChanged}
								options={genreOptions}
							/>
						</Col>
						<Col offset={1} span={17}>
							<Title level={1}>Free to Game</Title>

							<ListOfGames
								isLoading={isLoading}
								error={error}
								games={games.filter(filterGame)}
							/>
						</Col>
					</Row>
				</Content>
				<Footer style={{ textAlign: "center" }}>Created by frogix in 2023.</Footer>
			</Layout>
		</>
	);
}

export default App;
