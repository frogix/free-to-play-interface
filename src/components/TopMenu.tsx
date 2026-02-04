import { LeftOutlined } from "@ant-design/icons";
import Menu from "antd/es/menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./TopMenu.css";
import { MouseEventHandler } from "react";


export function TopMenu() {
	const location = useLocation();
	const navigate = useNavigate();

	const handleBackClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	const items = [
		{
			key: "1",
			label:
				<Link
					onClick={handleBackClick}
					to=".."
					style={{
						position: "relative",
					}}
				>
					{
						location.pathname !== "/" &&
						<LeftOutlined
							style={{
								position: "absolute",
								left: 0,
								top: "50%",
								transform: "translate(-20px, -50%)",
							}}
						/>
					}
					Free to play games
				</Link>
		}
	]

	return (
		<Menu selectable={false} theme="dark" mode="horizontal" items={items} />
	);
}
