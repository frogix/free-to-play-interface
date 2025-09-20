import { Descriptions, DescriptionsProps, Image, Skeleton, Tag, Card, Space } from "antd";
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
		<Card
			style={{
				borderRadius: 8,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
			}}
		>
			<Skeleton active={true} paragraph={false} />
			<Skeleton.Image active style={{ width: '100%', height: 200 }} />
			<Skeleton active={true} title={false} />
		</Card>
	);
}

export function GameCard(game: GameInfo) {
	return (
		<Card
			style={{
				borderRadius: 8,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				transition: 'box-shadow 0.3s ease',
				height: 'fit-content'
			}}
			cover={
				<Link to={`/game/${game.id}`} style={{ display: 'block' }}>
					<div
						style={{
							overflow: 'hidden',
							borderRadius: '8px 8px 0 0',
							cursor: 'pointer',
							backgroundColor: '#f5f5f5',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: '200px'
						}}
					>
						<Image
							alt={game.title}
							preview={false}
							src={game.thumbnail}
							width={"100%"}
							height={"100%"}
							style={{
								maxHeight: '250px',
								objectFit: 'fill',
								transition: 'transform 0.3s ease'
							}}
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
					</div>
				</Link>
			}
		>
			<Link to={`/game/${game.id}`} style={{ textDecoration: 'none' }}>
				<Title
					level={4}
					style={{
						margin: '0 0 12px 0',
						color: '#1890ff',
						transition: 'color 0.3s ease',
						cursor: 'pointer'
					}}
				>
					{game.title}
				</Title>
			</Link>

			<Space wrap style={{ marginBottom: 12 }}>
				<Tag color="blue">{game.genre}</Tag>
				{game.platform && game.platform.map((p) => (
					<Tag key={p} color="green">{p}</Tag>
				))}
			</Space>

			<Paragraph
				ellipsis={{ rows: 2 }}
				style={{
					color: '#666',
					fontSize: '14px',
					marginBottom: 12,
					minHeight: 44 // Ensure consistent card height
				}}
			>
				{game.short_description}
			</Paragraph>

			<Descriptions
				column={1}
				items={gameInfoToDescriptionItems(game)}
				size="small"
				style={{ fontSize: '12px' }}
			/>
		</Card>
	);
}
