import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DetailedGameCard } from "./DetailedGameCard";
import type { DetailedGameInfo } from "../api/games";

function createMockGame(overrides: Partial<DetailedGameInfo> = {}): DetailedGameInfo {
	return {
		id: 1,
		title: "Test Game Title",
		thumbnail: "https://placehold.co/600x400/EEE/31343C",
		thumbnail_lazy: { w: 100, h: 100, hash: "abc" },
		short_description: "Short description of the game.",
		game_url: "https://freetogame.com/game/1337",
		genre: "Action",
		platform: ["PC", "Web"],
		publisher: "Test Publisher",
		developer: "Test Developer",
		release_date: new Date("2024-02-15"),
		freetogame_profile_url: "https://freetogame.com/profile/1337",
		description: "Very detailed game description which is significantly longer than short one.",
		status: "live",
		minimum_system_requirements: {
			os: "BolgenOS",
			processor: "Intel Pentium Duo",
			memory: "2 GB RAM",
			graphics: "GTX 970",
			storage: "1 GB"
		},
		screenshots: [
			{ id: 1, image: "https://placehold.co/600x400/EEE/31343C" },
			{ id: 2, image: "https://placehold.co/600x400/EEE/313431" }
		],
		...overrides
	};
}

describe("DetailedGameCard", () => {
	it("renders game title", () => {
		const title = "Frogi brogi game";
		const game = createMockGame({ title });
		render(<DetailedGameCard {...game} />);
		expect(screen.getByText(title)).toBeInTheDocument();
	});

	it("renders short description", () => {
		const short_description = "Frogi finds his true love.";
		const game = createMockGame({ short_description });
		render(<DetailedGameCard {...game} />);
		expect(screen.getByText(short_description)).toBeInTheDocument();
	});

	it("renders full description in About section", () => {
		const description = "Frogi needs to throw the Ring of Thorns into a vulcano";
		const game = createMockGame({ description });
		render(<DetailedGameCard {...game} />);
		expect(screen.getByText("About this game")).toBeInTheDocument();
		expect(screen.getByText(description)).toBeInTheDocument();
	});

	it("renders genre and platform tags", () => {
		const game = createMockGame({
			genre: "RPG",
			platform: ["PC", "Linux"]
		});
		render(<DetailedGameCard {...game} />);
		expect(screen.getByText("RPG")).toBeInTheDocument();
		expect(screen.getByText("PC")).toBeInTheDocument();
		expect(screen.getByText("Linux")).toBeInTheDocument();
	});

	it("renders System Requirements section with requirements", () => {
		const game = createMockGame({
			minimum_system_requirements: {
				os: "Windows 11",
				processor: "AMD Ryzen 5",
				memory: "16 GB RAM",
				graphics: "RTX 3060",
				storage: "20 GB"
			}
		});
		render(<DetailedGameCard {...game} />);
		expect(screen.getByText("System Requirements")).toBeInTheDocument();
		expect(screen.getByText("Windows 11")).toBeInTheDocument();
		expect(screen.getByText("AMD Ryzen 5")).toBeInTheDocument();
	});

	it("renders developer and publisher when present", () => {
		const game = createMockGame({
			developer: "Dev Studio",
			publisher: "Pub Inc"
		});
		render(<DetailedGameCard {...game} />);
		expect(screen.getByText("Developer")).toBeInTheDocument();
		expect(screen.getByText("Dev Studio")).toBeInTheDocument();
		expect(screen.getByText("Publisher")).toBeInTheDocument();
		expect(screen.getByText("Pub Inc")).toBeInTheDocument();
	});

	it("shows fallback when genre and platform are empty", () => {
		const game = createMockGame({
			genre: "",
			platform: []
		});
		render(<DetailedGameCard {...game} />);
		expect(
			screen.getByText("Genre and platform information not available")
		).toBeInTheDocument();
	});

	it("shows fallback when system requirements are missing", () => {
		const game = createMockGame({
			minimum_system_requirements: undefined as unknown as DetailedGameInfo["minimum_system_requirements"]
		});
		render(<DetailedGameCard {...game} />);
		expect(
			screen.getByText("System requirements are not available")
		).toBeInTheDocument();
	});
});
