import Select from "antd/es/select";
import Title from "antd/es/typography/Title";
import { GameFieldsPossibleValues } from "./api/games";
import { SortMethod } from "./App";

interface FiltersProps {
	possibleValues: GameFieldsPossibleValues;
	onSomeFilterChanged: (newFilterValues: GameFieldsPossibleValues) => void;
	onSortMethodChanged: (newSortMethod: SortMethod) => void;
}

export default function Filters({ possibleValues, onSomeFilterChanged, onSortMethodChanged }: FiltersProps) {
	const currentFilter: GameFieldsPossibleValues = {
		genre: [],
		platform: [],
		publisher: [],
		developer: [],
		release_date: null
	};

	const sortMethod: SortMethod = {
		field: "title",
		isAscending: true
	}

	const sortByFieldsMap = {
		title: "Title",
		release_date: "Release date"
	};

	if (!possibleValues) return <>Loading...</>;

	return (
		<>
			<Title level={2}>Sort</Title>
			<Select
				allowClear
				style={{ width: "100%" }}
				placeholder="Sort by..."
				defaultValue={[]}
				onChange={(value) => onSortMethodChanged({...sortMethod, field: value})}
				options={Object.keys(sortByFieldsMap).map((k) => ({ label: sortByFieldsMap[k], value: k }))}
			/>

			<Title level={2}>Filter</Title>

			<Title level={3}>Genre</Title>
			<Select
				mode="multiple"
				allowClear
				style={{ width: "100%" }}
				placeholder="Select genres..."
				defaultValue={[]}
				onChange={(value) => onSomeFilterChanged({ ...currentFilter, genre: value })}
				options={possibleValues.genre.map((g) => ({ label: g, value: g }))}
			/>

			<Title level={3}>Platform</Title>
			<Select
				mode="multiple"
				allowClear
				style={{ width: "100%" }}
				placeholder="Select platforms..."
				defaultValue={[]}
				onChange={(value) => onSomeFilterChanged({ ...currentFilter, platform: value })}
				options={possibleValues.platform.map((g) => ({ label: g, value: g }))}
			/>
		</>
	);
}
