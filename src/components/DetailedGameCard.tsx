import { Carousel, Col, Descriptions, DescriptionsProps, Image, Row, Skeleton, Tag, Card, Space } from "antd";
import { DetailedGameInfo, GameInfo, SystemRequirements } from "../api/games";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Blurhash } from "react-blurhash";
import { ReactNode } from "react";

const dateFormat = new Intl.DateTimeFormat("ru-RU");

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [];

	if (info.developer) {
		items.push({ key: "developer", label: "Developer", children: info.developer });
	}

	if (info.publisher) {
		items.push({ key: "publisher", label: "Publisher", children: info.publisher });
	}

	if (info.release_date) {
		items.push({
			key: "release_date",
			label: "Release date",
			children: dateFormat.format(info.release_date)
		});
	}

	return items;
}

function minRequirementsToDescItems(reqs: SystemRequirements | undefined) {
	const items: DescriptionsProps["items"] = [];

	if (!reqs) {
		return items;
	}

	if (reqs.os) {
		items.push({ key: "os", label: "OS", children: reqs.os });
	}

	if (reqs.processor) {
		items.push({ key: "processor", label: "Processor", children: reqs.processor });
	}

	if (reqs.memory) {
		items.push({ key: "memory", label: "Memory", children: reqs.memory });
	}

	if (reqs.graphics) {
		items.push({ key: "graphics", label: "Graphics", children: reqs.graphics });
	}

	if (reqs.storage) {
		items.push({ key: "storage", label: "Storage", children: reqs.storage });
	}

	return items;
}

function DetailedGameCardLayoutWrapper({ children }: { children: ReactNode }) {
	return (
		<div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
			{children}
		</div>
	);
}

export function DetailedGameCardSkeleton() {
	return (
		<DetailedGameCardLayoutWrapper>
			<Card
				style={{
					marginBottom: '24px',
					borderRadius: '12px',
					boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
				}}
			>
				<Skeleton active paragraph={false} title={{ width: '300px' }} />

				<Row gutter={24} style={{ marginTop: '24px' }}>
					<Col lg={14} xs={24}>
						<Card style={{ marginBottom: '16px', borderRadius: '8px' }} bodyStyle={{ padding: 0 }}>
							<Skeleton.Image style={{ width: '100%', height: '350px' }} />
						</Card>
					</Col>

					<Col lg={10} xs={24}>
						<Card style={{ borderRadius: '8px' }}>
							<Skeleton.Image style={{ width: '100%', height: '200px', marginBottom: '16px' }} />
							<Skeleton active paragraph={{ rows: 3 }} title={false} />
						</Card>
					</Col>
				</Row>
			</Card>

			<Row gutter={24}>
				<Col lg={14} xs={24}>
					<Card style={{ marginBottom: '24px', borderRadius: '8px' }}>
						<Skeleton active paragraph={{ rows: 4 }} title={{ width: '200px' }} />
					</Card>
				</Col>

				<Col lg={10} xs={24}>
					<Card style={{ marginBottom: '24px', borderRadius: '8px' }}>
						<Skeleton active paragraph={{ rows: 5 }} title={{ width: '200px' }} />
					</Card>
				</Col>
			</Row>
		</DetailedGameCardLayoutWrapper>
	);
}

export function DetailedGameCard(game: DetailedGameInfo) {
	return (
		<DetailedGameCardLayoutWrapper>
			<Card
				style={{
					marginBottom: '24px',
					borderRadius: '12px',
					overflow: 'hidden',
					boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
				}}
			>
				<Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>
					{game.title}
				</Title>

				<Row gutter={24}>
					<Col lg={14} xs={24}>
						<Card
							style={{
								marginBottom: '16px',
								borderRadius: '8px',
								overflow: 'hidden'
							}}
							bodyStyle={{ padding: 0 }}
						>
							<Image.PreviewGroup preview={{ movable: false }}>
								<Carousel
									autoplay
									infinite={false}
									style={{ borderRadius: '8px' }}
									autoplaySpeed={4000}
								>
									{game.screenshots.map((s) => (
										<div key={s.id}>
											<Image
												src={s.image}
												style={{
													width: '100%',
													height: '350px',
													objectFit: 'cover',
													borderRadius: '8px'
												}}
											/>
										</div>
									))}
								</Carousel>
							</Image.PreviewGroup>
						</Card>
					</Col>

					<Col lg={10} xs={24}>
						<Card
							style={{
								height: 'fit-content',
								borderRadius: '8px',
								marginBottom: '16px'
							}}
						>
							<Image
								alt={game.title}
								preview={false}
								src={game.thumbnail}
								style={{
									width: '100%',
									borderRadius: '8px',
									marginBottom: '16px'
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

							<Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
								{game.short_description}
							</Paragraph>

							<Space wrap style={{ marginBottom: '20px' }}>
								{game.genre && (
									<Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
										{game.genre}
									</Tag>
								)}
								{game.platform && game.platform.length > 0 && game.platform.map((p) => (
									<Tag key={p} color="green" style={{ fontSize: '14px', padding: '4px 12px' }}>
										{p}
									</Tag>
								))}
								{(!game.genre && (!game.platform || game.platform.length === 0)) && (
									<Tag color="orange" style={{ fontSize: '14px', padding: '4px 12px' }}>
										Genre and platform information not available
									</Tag>
								)}
							</Space>

							{(() => {
								console.log(game);
								const gameInfoItems = gameInfoToDescriptionItems(game);
								if (gameInfoItems.length === 0) {
									return (
										<Paragraph style={{ fontStyle: 'italic', color: '#888', textAlign: 'center', padding: '16px' }}>
											Game information not available
										</Paragraph>
									);
								}
								return (
									<Descriptions
										column={1}
										items={gameInfoItems}
										size="small"
										bordered
										style={{ backgroundColor: '#fafafa' }}
									/>
								);
							})()}
						</Card>
					</Col>
				</Row>
			</Card>

			<Row gutter={24}>
				<Col lg={14} xs={24}>
					<Card
						style={{
							marginBottom: '24px',
							borderRadius: '8px'
						}}
					>
						<Title level={4} style={{ marginBottom: '16px', color: '#1890ff' }}>
							About this game
						</Title>
						<Paragraph style={{ fontSize: '15px', lineHeight: '1.7' }}>
							{game.description}
						</Paragraph>
					</Card>
				</Col>

				<Col lg={10} xs={24}>
					<Card
						style={{
							marginBottom: '24px',
							borderRadius: '8px'
						}}
					>
						<Title level={4} style={{ marginBottom: '16px', color: '#1890ff' }}>
							System Requirements
						</Title>
						{(() => {
							const sysReqItems = minRequirementsToDescItems(game.minimum_system_requirements);
							if (sysReqItems.length === 0) {
								return (
									<Paragraph style={{ fontStyle: 'italic', color: '#888', textAlign: 'center', padding: '16px' }}>
										System requirements not available
									</Paragraph>
								);
							}
							return (
								<Descriptions
									column={1}
									items={sysReqItems}
									size="small"
									bordered
									style={{ backgroundColor: '#fafafa' }}
								/>
							);
						})()}
					</Card>
				</Col>
			</Row>
		</DetailedGameCardLayoutWrapper>
	);
}
