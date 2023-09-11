import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, DatePicker, Descriptions, DescriptionsProps, Spin } from "antd";

// const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
// const options = {
// 	method: "GET",
// 	headers: {
// 		'X-RapidAPI-Key': 'a1676f9cf7msh9b40def354a3a80p10fcb6jsn1d224ff962e1',
// 		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
// 	}
// };

const url = "http://localhost:1337/games";
const options = { method: "GET" };

interface GameInfo {
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

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps['items'] = [];

	for (const key in info) {
		let value = info[key];

		if (key === "thumbnail") {
			value = <img src={value}/>;
		}
		items.push({
			key,
			label: key,
			children: value
		});
	}

	return items;
}

function GameCard(props: GameInfo) {
	return (
		<>
		<h2>{props.title}</h2>
		<Descriptions column={1} items={gameInfoToDescriptionItems(props)}></Descriptions>
	</>
	);
}

function ListOfGames({ games }: { games: GameInfo[] }) {
	gameInfoToDescriptionItems(games[0]);
	return (
		<>
		{games.map((game) => (
			<GameCard key={game.id} {...game}/>
		))}
		</>
	);
}

function App() {
	const [count, setCount] = useState(0);

	const [isLoading, setLoading] = useState(true);
	const [games, setGames] = useState([]);

	useEffect(() => {
		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				setGames(data);
			});
	}, []);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

				<Button>Hello</Button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>

			{isLoading ? <Spin spinning={isLoading} /> : <ListOfGames games={games} />}

		</>
	);
}

export default App;
