import { ConfigProvider, Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { TopMenu } from "../components/TopMenu";

export function Root() {
	return (
		<ConfigProvider
			theme={{
				components: {
					Image: {
						// previewOperationColor: "red"
					}
				}
			}}
		>
			<Layout>
				<Header>
					<TopMenu />
				</Header>
			</Layout>

			<main>
				<Outlet />
			</main>

			<Layout>
				<Footer style={{ textAlign: "center" }}>Created by frogix in 2025.</Footer>
			</Layout>
		</ConfigProvider>
	);
}
