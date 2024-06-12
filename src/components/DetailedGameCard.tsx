import { Carousel, Col, Descriptions, DescriptionsProps, Image, Row, Skeleton, Tag } from "antd";
import { DetailedGameInfo, GameInfo, SystemRequirements } from "../api/games";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Blurhash } from "react-blurhash";
import { ReactNode } from "react";

const dateFormat = new Intl.DateTimeFormat("ru-RU");

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [
		{ key: "developer", label: "Developer", children: info.developer },
		{ key: "publisher", label: "Publisher", children: info.publisher },
		{
			key: "release_date",
			label: "Release date",
			children: dateFormat.format(info.release_date)
		}
	];

	return items;
}

function minRequirementsToDescItems(reqs: SystemRequirements) {
	const items: DescriptionsProps["items"] = [
		{ key: "os", label: "OS", children: reqs.os },
		{ key: "processor", label: "Processor", children: reqs.processor },
		{ key: "memory", label: "Memory", children: reqs.memory },
		{ key: "graphics", label: "Graphics", children: reqs.graphics },
		{ key: "storage", label: "Storage", children: reqs.storage },
	];

	return items;
}

function DetailedGameCardLayoutWrapper({ children }: { children: ReactNode }) {
	return (
		<Row>
			<Col offset={4} sm={16}>
				{children}
			</Col>
		</Row>
	);
}

export function DetailedGameCardSkeleton() {
	return (
		<DetailedGameCardLayoutWrapper>
			<Skeleton active paragraph={false} title={{width: "20rem"}} style={{marginTop: "1.5rem"}}/>

			<Row>
				<Col lg={14}>
					<Skeleton.Image style={{minWidth: 500, minHeight: 300}}/>
				</Col>

				<Col offset={1} lg={9}>
					<Skeleton.Image/>

					<Skeleton active={true} paragraph={true}/>
				</Col>
			</Row>

			<Skeleton active={true} paragraph={true} title={true}/>

			<Skeleton active={true} paragraph={true} title={true}/>

		</DetailedGameCardLayoutWrapper>
	);
}

export function DetailedGameCard(game: DetailedGameInfo) {
	return (
		<DetailedGameCardLayoutWrapper>
			<Title level={4}>{game.title}</Title>
			<Row>
				<Col lg={14}>
					<Image.PreviewGroup preview={{movable: false}}>
						<Carousel autoplay infinite={false}>
							{game.screenshots.map((s) => (
								<Image key={s.id} src={s.image} />
							))}
						</Carousel>
					</Image.PreviewGroup>
				</Col>

				<Col lg={{span: 9, offset: 1}}>
					<Image
						alt={game.title}
						preview={false}
						src={game.thumbnail}
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
					<Paragraph>{game.short_description}</Paragraph>

					<Descriptions column={1} items={gameInfoToDescriptionItems(game)}></Descriptions>
				</Col>
			</Row>

			<Tag>{game.genre}</Tag>

			{game.platform && game.platform.map((p) => <Tag key={p}>{p}</Tag>)}

			<Title level={5}>About this game</Title>
			<Paragraph>{game.description}</Paragraph>

			<Title level={5}>System requirements</Title>
			<Descriptions column={1} items={minRequirementsToDescItems(game.minimum_system_requirements)}/>

		</DetailedGameCardLayoutWrapper>
	);
}
