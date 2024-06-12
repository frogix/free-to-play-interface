import { Descriptions, DescriptionsProps, Image, Skeleton, Tag } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Blurhash } from "react-blurhash";
import { Link } from "react-router-dom";

import { GameInfo } from "../api/games";

const dateFormat = new Intl.DateTimeFormat("ru-RU");

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [
		{ key: "developer", label: "Developer", children: info.developer },
		// { key: "publisher", label: "Publisher", children: info.publisher },
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
			<Link to={`/game/${game.id}`}>
				<Title level={4}>{game.title}</Title>
			</Link>
			<Image
				alt={game.title}
				preview={false}
				src={game.thumbnail}
				width={400}
				placeholder={
					game.thumbnail_lazy && (
						<Blurhash
							hash={game.thumbnail_lazy.hash}
							width={game.thumbnail_lazy.w}
							height={game.thumbnail_lazy.h}
							resolutionX={32}
							resolutionY={32}
							punch={1}
						/>
					)
				}
			/>
			<Tag>{game.genre}</Tag>

			{game.platform && game.platform.map((p) => <Tag key={p}>{p}</Tag>)}

			<Paragraph ellipsis={true}>{game.short_description}</Paragraph>
			<Descriptions column={1} items={gameInfoToDescriptionItems(game)}></Descriptions>
		</>
	);
}
