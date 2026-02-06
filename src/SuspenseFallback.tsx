import { Space, Spin } from "antd";

export const SuspenseFallback = () => (
	<div style={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '400px'
	}}>
		<Space orientation="vertical" align="center" size="middle">
			<Spin size="large" />
			Loading content...
		</Space>
	</div>
);

