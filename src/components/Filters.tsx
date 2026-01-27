import Title from "antd/es/typography/Title";
import Button from "antd/es/button";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Divider from "antd/es/divider";
import { MouseEventHandler } from "react";
import { SortAscendingOutlined, SortDescendingOutlined, FilterOutlined } from "@ant-design/icons";

import FilterSelect from "./FilterSelect";
import { GameFieldsPossibleValues } from "../api/games";
import { SortField, SortMethod } from "./GamesListScreen";

interface FiltersProps {
	sortMethod: SortMethod;
	possibleValues: GameFieldsPossibleValues | null;
	currentFilter: GameFieldsPossibleValues | undefined;
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
	const icon = isAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />;
	return <Button icon={icon} shape="circle" onClick={onDirectionChange} />;
}

export default function Filters({
	sortMethod,
	possibleValues,
	onSomeFilterChanged,
	onSortMethodChanged,
	currentFilter
}: FiltersProps) {
	const sortByFieldsMap: Record<SortField, string> = {
		title: "Title",
		release_date: "Release date"
	};

	if (!possibleValues) return <></>;

	const onSortDirectionChanged = () => {
		onSortMethodChanged({ ...sortMethod, isAscending: !sortMethod.isAscending });
	};

	return (
		<Card
			title={
				<Space>
					<FilterOutlined />
					<span>Filters & Sorting</span>
				</Space>
			}
			style={{
				marginBottom: 16,
				borderRadius: 8,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
			}}
			bodyStyle={{ padding: '16px 20px' }}
		>
			<Space direction="vertical" size="middle" style={{ width: '100%' }}>
				<div>
					<Title level={4} style={{ margin: '0 0 12px 0', color: '#1890ff' }}>
						Genre
					</Title>
					<FilterSelect
						mode="multiple"
						style={{ width: "100%" }}
						placeholder="Select genres..."
						defaultValue={undefined}
						onChange={(value) => onSomeFilterChanged({
							...currentFilter,
							genre: value as string[],
							platform: currentFilter?.platform || [],
							publisher: currentFilter?.publisher || [],
							developer: currentFilter?.developer || [],
							release_date: currentFilter?.release_date || null
						})}
						options={possibleValues.genre.map((g) => ({ label: g, value: g }))}
					/>
				</div>

				<div>
					<Title level={4} style={{ margin: '0 0 12px 0', color: '#1890ff' }}>
						Platform
					</Title>
					<FilterSelect
						mode="multiple"
						style={{ width: "100%" }}
						placeholder="Select platforms..."
						defaultValue={undefined}
						onChange={(value) => onSomeFilterChanged({
							...currentFilter,
							platform: value as string[],
							genre: currentFilter?.genre || [],
							publisher: currentFilter?.publisher || [],
							developer: currentFilter?.developer || [],
							release_date: currentFilter?.release_date || null
						})}
						options={possibleValues.platform.map((g) => ({ label: g, value: g }))}
					/>
				</div>

				<Divider style={{ margin: '0px 0' }} />

				<div>
					<Title level={4} style={{ margin: '0 0 12px 0', color: '#1890ff' }}>
						Sort by
					</Title>
					<Row gutter={8}>
						<Col span={18}>
							<FilterSelect
								placeholder="Sort by..."
								defaultValue={"title"}
								onChange={(value) => onSortMethodChanged({ ...sortMethod, field: value as SortField })}
								options={Object.keys(sortByFieldsMap).map((k) => ({
									label: sortByFieldsMap[k as SortField],
									value: k
								}))}
								style={{ width: '100%' }}
							/>
						</Col>
						<Col span={6}>
							<SortDirectionChangeButton
								isAscending={sortMethod.isAscending}
								onDirectionChange={onSortDirectionChanged}
							/>
						</Col>
					</Row>
				</div>

			</Space>
		</Card>
	);
}
