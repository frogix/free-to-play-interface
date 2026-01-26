import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter} from "react-router-dom";

import "./index.css";
import {Root} from "./routes/root.tsx";
import {GameCardPage} from "./routes/game.tsx";
import {GamesListScreen} from "./components/GamesListScreen.tsx";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Root />,
			children: [
				{
					index: true,
					element: <GamesListScreen />
				},
				{
					path: "game/:gameId",
					element: <GameCardPage />,
					loader: GameCardPage.loader
				}
			]
		}
	],
	{
		basename: import.meta.env.BASE_URL
	}
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
