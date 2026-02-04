import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { useQuery } from "@tanstack/react-query";

import {
	GameFieldsPossibleValues,
	GameInfo,
	getFieldsPossibleValues,
	getGamesList
} from "../api/games";
import {
	parseFiltersFromSearchParams,
	parseSortFromSearchParams,
	parsePaginationFromSearchParams,
	filtersToSearchParams,
	getSearchStringFromLocation,
	type SortMethod,
	type SortField
} from "../utils/filterSearchParams";
import { ListOfGames } from "./ListOfGames";
import GameFilters from "./GameFilters";
import { LoadingErrorDisplay } from "./ErrorDisplay";

export type Primitive = number | string | boolean;

export type { SortField, SortMethod };

function getInitialStateFromUrl(): {
	sortMethod: SortMethod;
	filteredFields: GameFieldsPossibleValues | undefined;
	page: number;
	pageSize: number;
} {
	const search = getSearchStringFromLocation();
	const params = new URLSearchParams(search);
	return {
		sortMethod: parseSortFromSearchParams(params),
		filteredFields: parseFiltersFromSearchParams(params),
		...parsePaginationFromSearchParams(params)
	};
}

export function GamesListScreen() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortMethod, setSortMethod] = useState<SortMethod>(() =>
		getInitialStateFromUrl().sortMethod
	);
	const [filteredFields, setFilteredFields] = useState<GameFieldsPossibleValues | undefined>(
		() => getInitialStateFromUrl().filteredFields
	);
	const [page, setPage] = useState(() => getInitialStateFromUrl().page);
	const [pageSize, setPageSize] = useState(() => getInitialStateFromUrl().pageSize);

	useEffect(() => {
		const nextSort = parseSortFromSearchParams(searchParams);
		const nextFilters = parseFiltersFromSearchParams(searchParams);
		const { page: nextPage, pageSize: nextPageSize } = parsePaginationFromSearchParams(searchParams);
		setSortMethod(nextSort);
		setFilteredFields(nextFilters);
		setPage(nextPage);
		setPageSize(nextPageSize);
	}, [searchParams]);

	const applyFiltersAndSort = (
		newFilter: GameFieldsPossibleValues | undefined,
		newSort: SortMethod
	) => {
		setFilteredFields(newFilter);
		setSortMethod(newSort);
		setPage(1);
		setSearchParams(
			filtersToSearchParams(newFilter, newSort, { page: 1, pageSize }),
			{ replace: true }
		);
	};

	const onPageChange = (newPage: number, newPageSize: number) => {
		setPage(newPage);
		setPageSize(newPageSize);
		setSearchParams(
			filtersToSearchParams(filteredFields, sortMethod, { page: newPage, pageSize: newPageSize }),
			{ replace: true }
		);
	};

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

	const {
		data: games = [],
		isLoading,
		error,
		refetch: loadGamesData,
	} = useQuery({
		queryKey: ["games"],
		queryFn: ({ signal }) => getGamesList(signal),
	});


	const { data: filterAvailableValues, error: filterError } = useQuery({
		queryKey: ["filterOptions"],
		queryFn: ({ signal }) => getFieldsPossibleValues(signal)
	});

	const filteredGames = games.filter(filterGame).sort(sortGames);
	const totalItems = filteredGames.length;
	const maxPage = Math.max(1, Math.ceil(totalItems / pageSize));
	const currentPage = Math.min(page, maxPage);

	useEffect(() => {
		if (page > maxPage && maxPage >= 1) {
			setPage(maxPage);
			setSearchParams(
				filtersToSearchParams(filteredFields, sortMethod, { page: maxPage, pageSize }),
				{ replace: true }
			);
		}
	}, [page, maxPage, pageSize, filteredFields, sortMethod, setSearchParams]);

	return (
		<Content style={{ padding: "24px 50px" }}>
			<Row gutter={24}>
				<Col lg={5} xl={4}>
					<div style={{ marginTop: 16 }}>
						{filterError && (
							<LoadingErrorDisplay error={filterError} />
						)}
						<GameFilters
							currentFilter={filteredFields}
							sortMethod={sortMethod}
							possibleValues={filterAvailableValues}
							onSortMethodChanged={(newSort: SortMethod) =>
								applyFiltersAndSort(filteredFields, newSort)
							}
							onSomeFilterChanged={(newFilter: GameFieldsPossibleValues) =>
								applyFiltersAndSort(newFilter, sortMethod)
							}
						/>
					</div>
				</Col>
				<Col lg={{ span: 16, offset: 1 }} xl={{ span: 17, offset: 1 }} xxl={{ span: 15, offset: 2 }}>
					<Title level={1}>
						{
							filteredGames.length > 0
								? `Free to Game ${filteredGames.length} games`
								: `Free to Game`
						}

					</Title>

					<ListOfGames
						isLoading={isLoading}
						error={error}
						games={filteredGames}
						onRetry={loadGamesData}
						currentPage={currentPage}
						pageSize={pageSize}
						onPageChange={onPageChange}
					/>
				</Col>
			</Row>
		</Content>
	);
}

// Default export for lazy loading
export default GamesListScreen;
