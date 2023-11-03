import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import { Root } from "./routes/root.tsx";
import { GamesListScreen } from "./GamesListScreen.tsx";
import { GameCardPage, gameInfoLoader } from "./routes/game.tsx";

const router = createBrowserRouter([
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
				loader: gameInfoLoader
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
