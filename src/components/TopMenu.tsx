import { LeftOutlined } from "@ant-design/icons";
import Menu from "antd/es/menu";
import { Link, useLocation } from "react-router-dom";

export function TopMenu() {
	const location = useLocation();

	const items = [
		{
			key: "1",
			label: <Link to="/">Free to play games</Link>,
		}
	]

	if (location.pathname !== "/") {
		items.unshift(
			{
				key: "0",
				label: (
					<Link to="/">
						<LeftOutlined />
					</Link>
				),
			},
		);
	}

	return (
		<Menu selectable={false} theme="dark" mode="horizontal" items={items} />
	);
}
