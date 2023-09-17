import { Descriptions, DescriptionsProps, Image, Row, Tag } from "antd";
import { GameInfo } from "./api/games";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const dateFormat = new Intl.DateTimeFormat('ru-RU');


function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [
		{ key: "developer", label: "Developer", children: info.developer },
		{ key: "release_date", label: "Release date", children: dateFormat.format(info.release_date) },
	];

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
			{game.platform.map((p) => (
				<Tag key={p}>{p.trim()}</Tag>
			))}
			<Paragraph ellipsis={true}>{game.short_description}</Paragraph>
			<Descriptions column={1} items={gameInfoToDescriptionItems(game)}></Descriptions>
		</>
	);
}
