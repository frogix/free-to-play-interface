import ConfigProvider from "antd/es/config-provider";
import Layout from "antd/es/layout";
import { Footer, Header } from "antd/es/layout/layout";
import { Outlet, useLocation } from "react-router-dom";
import { TopMenu } from "../components/TopMenu";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			gcTime: 5 * 60 * 1000, // 5 min
			staleTime: 5 * 60 * 1000 // 5 min
		},
	},
});

// This code is only for TypeScript
declare global {
	interface Window {
		__TANSTACK_QUERY_CLIENT__:
		import("@tanstack/query-core").QueryClient;
	}
}

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export function Root() {
	return (
		<QueryClientProvider client={queryClient}>
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
					<Footer style={{ textAlign: "center" }}>Created by frogix in 2026.</Footer>
				</Layout>
			</ConfigProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
