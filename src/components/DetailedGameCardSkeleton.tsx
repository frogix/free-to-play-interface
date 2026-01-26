import Col from "antd/es/col";
import Row from "antd/es/row";
import Skeleton from "antd/es/skeleton";
import Card from "antd/es/card";
import { DetailedGameCardLayoutWrapper } from "./DetailedGameCardLayoutWrapper";

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
