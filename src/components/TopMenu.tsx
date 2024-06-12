import { LeftOutlined } from "@ant-design/icons";
import Menu from "antd/es/menu";
import { Link, useLocation } from "react-router-dom";

export function TopMenu() {
	const location = useLocation();

	return (
		<Menu selectable={false} theme="dark" mode="horizontal">
			{location.pathname !== "/" && (
				<Menu.Item key="0">
					<Link to="/">
						<LeftOutlined />
					</Link>
				</Menu.Item>
			)}
			<Menu.Item key="1">
				<Link to="/">Free to play games</Link>
			</Menu.Item>
		</Menu>
	);
}
