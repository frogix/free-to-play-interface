import Title from "antd/es/typography/Title";
import { Button, Col, Row } from "antd";
import { MouseEventHandler } from "react";
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

import FilterSelect from "./FilterSelect";
import { GameFieldsPossibleValues } from "./api/games";
import { SortMethod } from "./App";

interface FiltersProps {
	sortMethod: SortMethod;
	possibleValues: GameFieldsPossibleValues;
	currentFilter: GameFieldsPossibleValues;
	onSomeFilterChanged: (newFilterValues: GameFieldsPossibleValues) => void;
	onSortMethodChanged: (newSortMethod: SortMethod) => void;
}

function SortDirectionChangeButton({
	isAscending,
	onDirectionChange
}: {
	isAscending: boolean;
	onDirectionChange: MouseEventHandler;
}) {
	const icon = isAscending ? <SortDescendingOutlined /> : <SortAscendingOutlined />;
	return <Button icon={icon} shape="circle" onClick={onDirectionChange} />;
}

export default function Filters({
	sortMethod,
	possibleValues,
	onSomeFilterChanged,
	onSortMethodChanged,
	currentFilter
}: FiltersProps) {
	const sortByFieldsMap = {
		title: "Title",
		release_date: "Release date"
	};

	if (!possibleValues) return <>Loading...</>;

	const onSortDirectionChanged = () => {
		onSortMethodChanged({ ...sortMethod, isAscending: !sortMethod.isAscending });
	};

	return (
		<>
			<Title level={2}>Sort</Title>
			<Row>
				<Col span={21}>
					<FilterSelect
						// allowClear
						style={{ width: "100%" }}
						placeholder="Sort by..."
						defaultValue={["title"]}
						onChange={(value) => onSortMethodChanged({ ...sortMethod, field: value })}
						options={Object.keys(sortByFieldsMap).map((k) => ({
							label: sortByFieldsMap[k],
							value: k
						}))}
					/>
				</Col>

				<Col style={{ textAlign: "right" }} span={3}>
					<SortDirectionChangeButton
						isAscending={sortMethod.isAscending}
						onDirectionChange={onSortDirectionChanged}
					/>
				</Col>
			</Row>

			<Title level={2}>Filter</Title>

			<Title level={3}>Genre</Title>
			<FilterSelect
				mode="multiple"
				allowClear
				style={{ width: "100%" }}
				placeholder="Select genres..."
				defaultValue={[]}
				onChange={(value) => onSomeFilterChanged({ ...currentFilter, genre: value })}
				options={possibleValues.genre.map((g) => ({ label: g, value: g }))}
			/>

			<Title level={3}>Platform</Title>
			<FilterSelect
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
