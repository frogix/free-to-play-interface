import ConfigProvider from "antd/es/config-provider";
import Layout from "antd/es/layout";
import { Footer, Header } from "antd/es/layout/layout";
import { Outlet, useLocation } from "react-router-dom";
import { TopMenu } from "../components/TopMenu";
import { useEffect } from "react";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export function Root() {
	return (
		<ConfigProvider>
			<Layout>
				<Header>
					<TopMenu />
				</Header>
			</Layout>

			<main>
				<ScrollToTop />
				<Outlet />
			</main>

			<Layout>
				<Footer style={{ textAlign: "center" }}>Created by frogix in 2025.</Footer>
			</Layout>
		</ConfigProvider>
	);
}
