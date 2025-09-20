import { useEffect, useState } from "react";
import { Col, Row, theme } from "antd";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";

import {
	GameFieldsPossibleValues,
	GameInfo,
	getFieldsPossibleValues,
	getGamesList
} from "../api/games";
import { ListOfGames } from "./ListOfGames";
import Filters from "./Filters";

export type Primitive = number | string | boolean;

export type SortField = "title" | "release_date";

export interface SortMethod {
	field: SortField;
	isAscending: boolean;
}

export function GamesListScreen() {
	const [isLoading, setLoading] = useState(true);
	const [games, setGames] = useState<GameInfo[]>([]);
	const [error, setError] = useState<Error | undefined>();

	const [sortMethod, setSortMethod] = useState<SortMethod>({
		field: "title",
		isAscending: true
	});

	const [filterAvailableValues, setFilterAvailableValues] =
		useState<GameFieldsPossibleValues | null>(null);

	const [filteredFields, setFilteredFields] = useState<GameFieldsPossibleValues>();

	const checkIfArraysIntercept = (arr1: Primitive[], arr2: Primitive[]) => {
		if (!arr1 || !arr1.length || !arr2 || !arr2.length) return false;

		for (const el of arr1) {
			if (arr2.includes(el)) return true;
		}

		return false;
	};

	const filterGame = (game: GameInfo) => {
		const genre = filteredFields?.genre;
		const platform = filteredFields?.platform;

		if (genre && genre.length > 0 && !genre.includes(game.genre)) {
			return false;
		}

		if (platform && platform.length > 0 && !checkIfArraysIntercept(platform, game.platform)) {
			return false;
		}

		return true;
	};

	const sortGames = (game1: GameInfo, game2: GameInfo) => {
		const { field, isAscending } = sortMethod;

		const gameField = field as keyof GameInfo;

		const field1 = game1[gameField];
		const field2 = game2[gameField];

		if (!isAscending) {
			return field2 > field1 ? 1 : -1;
		}

		return field2 < field1 ? 1 : -1;
	};

	useEffect(() => {
		getGamesList()
			.then(
				(games: GameInfo[]) => setGames(games),
				(error: Error) => setError(error)
			)
			.finally(() => setLoading(false));

		getFieldsPossibleValues().then((filterValues: GameFieldsPossibleValues) =>
			setFilterAvailableValues(filterValues)
		);
	}, []);

	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const filteredGames = games.filter(filterGame).sort(sortGames);

	return (
		<Content style={{ padding: "0 50px", backgroundColor: colorBgContainer }}>
			<Row gutter={16}>
				<Col lg={6}>
					<Filters
						currentFilter={filteredFields}
						sortMethod={sortMethod}
						possibleValues={filterAvailableValues}
						onSortMethodChanged={(sortMethod: SortMethod) => setSortMethod(sortMethod)}
						onSomeFilterChanged={(newFilter: GameFieldsPossibleValues) =>
							setFilteredFields(newFilter)
						}
					/>
				</Col>
				<Col lg={{ span: 17, offset: 1 }}>
					<Title level={1}>Free to Game ({filteredGames.length} games)</Title>

					<ListOfGames
						isLoading={isLoading}
						error={error}
						games={filteredGames}
					/>
				</Col>
			</Row>
		</Content>
	);
}
