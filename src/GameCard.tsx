import { Descriptions, DescriptionsProps, Image, Row, Tag } from "antd";
import { GameInfo } from "./api/games";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [];

	const displayedKeysMap = {
		developer: "Developer",
		release_date: "Release date"
	};

	for (const key in displayedKeysMap) {
		const gameField = key as keyof GameInfo;
		items.push({
			key,
			label: displayedKeysMap[key],
			children: info[gameField]
		});
	}

	return items;
}

export function GameCard(game: GameInfo) {
	return (
		<>
			<Row>
				<Title level={4}>{game.title}</Title>
			</Row>
			<Row>
				<Image src={game.thumbnail} />
			</Row>
			<Tag>{game.genre}</Tag>
			{game.platform.includes(",") ? (
				game.platform.split(",").map((p) => <Tag>{p.trim()}</Tag>)
			) : (
				<Tag>{game.platform}</Tag>
			)}
			<Paragraph ellipsis={true}>{game.short_description}</Paragraph>
			<Descriptions column={1} items={gameInfoToDescriptionItems(game)}></Descriptions>
		</>
	);
}
