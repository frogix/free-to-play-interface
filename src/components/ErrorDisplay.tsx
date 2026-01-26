import Alert from "antd/es/alert";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Result from "antd/es/result";
import Space from "antd/es/space";
import { ExclamationCircleOutlined, ReloadOutlined, WifiOutlined } from "@ant-design/icons";

interface ErrorDisplayProps {
	error: Error | string;
	onRetry?: () => void;
	title?: string;
	showRetry?: boolean;
}

export function NetworkErrorDisplay({ onRetry, title = "Network Error" }: Omit<ErrorDisplayProps, 'error'>) {
	return (
		<Card style={{ textAlign: 'center', marginTop: 24 }}>
			<Result
				status="error"
				icon={<WifiOutlined style={{ color: '#ff4d4f' }} />}
				title={title}
				subTitle="Unable to connect to the server. Please check your internet connection and try again."
				extra={
					onRetry && (
						<Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
							Try Again
						</Button>
					)
				}
			/>
		</Card>
	);
}

export function GameNotFoundDisplay() {
	return (
		<Card style={{ textAlign: 'center', marginTop: 24 }}>
			<Result
				status="404"
				title="Game Not Found"
				subTitle="The game you're looking for doesn't exist or has been removed."
				extra={
					<Button type="primary" href="/">
						Back to Games List
					</Button>
				}
			/>
		</Card>
	);
}

export function GenericErrorDisplay({
	error,
	onRetry,
	title = "Something went wrong",
	showRetry = true
}: ErrorDisplayProps) {
	const errorMessage = typeof error === 'string' ? error : error.message;
	const isNetworkError = errorMessage.toLowerCase().includes('network') ||
		errorMessage.toLowerCase().includes('fetch') ||
		errorMessage.toLowerCase().includes('connection');

	if (isNetworkError) {
		return <NetworkErrorDisplay onRetry={onRetry} title={title} />;
	}

	return (
		<Card style={{ marginTop: 24 }}>
			<Result
				status="error"
				icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
				title={title}
				subTitle={
					<Space direction="vertical" size="middle" style={{ width: '100%' }}>
						<Alert
							message="Error Details"
							description={errorMessage}
							type="error"
							showIcon
							style={{ textAlign: 'left' }}
						/>
						{showRetry && onRetry && (
							<Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
								Try Again
							</Button>
						)}
					</Space>
				}
			/>
		</Card>
	);
}

export function LoadingErrorDisplay({ error, onRetry }: { error: Error; onRetry?: () => void }) {
	return (
		<Alert
			message="Loading Error"
			description={error.message}
			type="error"
			showIcon
			action={
				onRetry && (
					<Button size="small" type="primary" onClick={onRetry}>
						Retry
					</Button>
				)
			}
			style={{ marginBottom: 16 }}
		/>
	);
}