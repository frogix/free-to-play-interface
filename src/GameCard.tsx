import { Descriptions, DescriptionsProps, Image, Row, Skeleton, Space, Tag } from "antd";
import { GameInfo } from "./api/games";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Blurhash } from "react-blurhash";

const dateFormat = new Intl.DateTimeFormat("ru-RU");

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [
		// { key: "developer", label: "Developer", children: info.developer },
		{ key: "publisher", label: "Publisher", children: info.publisher },
		{
			key: "release_date",
			label: "Release date",
			children: dateFormat.format(info.release_date)
		}
	];

	return items;
}

export function GameCardSkeleton() {
	return (
		<>
			<Skeleton active={true} paragraph={false} />
			<Skeleton.Image active />
			<Skeleton active={true} title={false} />
		</>
	);
}

export function GameCard(game: GameInfo) {
	return (
		<>
			<Title level={4}>{game.title}</Title>
			<Image
				alt={game.title}
				preview={false}
				src={game.thumbnail}
				width={400}
				placeholder={
					<Blurhash
						hash={game.thumbnail_lazy.hash}
						width={game.thumbnail_lazy.w}
						height={game.thumbnail_lazy.h}
						resolutionX={32}
						resolutionY={32}
						punch={1}
					/>
				}
			/>
			<Tag>{game.genre}</Tag>
			{game.platform.map((p) => (
				<Tag key={p}>{p.trim()}</Tag>
			))}
			<Paragraph ellipsis={true}>{game.short_description}</Paragraph>
			<Descriptions column={1} items={gameInfoToDescriptionItems(game)}></Descriptions>
		</>
	);
}
