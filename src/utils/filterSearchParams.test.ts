import { describe, it, expect } from "vitest";
import {
	parseFiltersFromSearchParams,
	parseSortFromSearchParams,
	parsePaginationFromSearchParams,
	getSearchStringFromLocation,
	filtersToSearchParams,
} from "./filterSearchParams";

describe("parseFiltersFromSearchParams", () => {
	it("returns undefined when no genre or platform", () => {
		expect(parseFiltersFromSearchParams(new URLSearchParams())).toBeUndefined();
		expect(parseFiltersFromSearchParams(new URLSearchParams("foo=bar"))).toBeUndefined();
	});

	it("parses comma-separated genre and platform", () => {
		const params = new URLSearchParams("genre=Action,RPG&platform=PC,Web");
		const result = parseFiltersFromSearchParams(params);
		expect(result).toEqual({
			genre: ["Action", "RPG"],
			platform: ["PC", "Web"],
			publisher: [],
			developer: [],
			release_date: null,
		});
	});
});

describe("parseSortFromSearchParams", () => {
	it("defaults to title ascending when params missing", () => {
		expect(parseSortFromSearchParams(new URLSearchParams())).toEqual({
			field: "title",
			isAscending: true,
		});
	});

	it("parses valid sort field and direction", () => {
		expect(
			parseSortFromSearchParams(new URLSearchParams("sort=release_date&asc=0"))
		).toEqual({ field: "release_date", isAscending: false });
		expect(
			parseSortFromSearchParams(new URLSearchParams("sort=title&asc=1"))
		).toEqual({ field: "title", isAscending: true });
	});

	it("asc=0 means descending", () => {
		expect(
			parseSortFromSearchParams(new URLSearchParams("asc=0"))
		).toEqual({ field: "title", isAscending: false });
	});
});

describe("parsePaginationFromSearchParams", () => {
	it("returns defaults when params missing", () => {
		expect(parsePaginationFromSearchParams(new URLSearchParams())).toEqual({
			page: 1,
			pageSize: 10,
		});
	});

	it("parses page and pageSize", () => {
		expect(
			parsePaginationFromSearchParams(new URLSearchParams("page=3&pageSize=20"))
		).toEqual({ page: 3, pageSize: 20 });
	});

	it("clamps page to min 1", () => {
		expect(
			parsePaginationFromSearchParams(new URLSearchParams("page=0"))
		).toEqual({ page: 1, pageSize: 10 });
		expect(
			parsePaginationFromSearchParams(new URLSearchParams("page=-5"))
		).toEqual({ page: 1, pageSize: 10 });
	});

	it("clamps pageSize between 5 and 100", () => {
		expect(
			parsePaginationFromSearchParams(new URLSearchParams("pageSize=3"))
		).toEqual({ page: 1, pageSize: 5 });
		expect(
			parsePaginationFromSearchParams(new URLSearchParams("pageSize=200"))
		).toEqual({ page: 1, pageSize: 100 });
	});
});

describe("getSearchStringFromLocation", () => {
	it("returns query string from hash when using HashRouter", () => {
		window.location.hash = "#/?genre=Action&page=2";
		expect(getSearchStringFromLocation()).toBe("?genre=Action&page=2");
	});

	it("returns empty string when hash has no query", () => {
		window.location.hash = "";
		expect(getSearchStringFromLocation()).toBe("");
	});
});

describe("filtersToSearchParams", () => {
	it("builds params from filters, sort and pagination", () => {
		const params = filtersToSearchParams(
			{
				genre: ["Action"],
				platform: ["PC"],
				publisher: [],
				developer: [],
				release_date: null,
			},
			{ field: "release_date", isAscending: false },
			{ page: 2, pageSize: 20 }
		);
		expect(params.get("genre")).toBe("Action");
		expect(params.get("platform")).toBe("PC");
		expect(params.get("sort")).toBe("release_date");
		expect(params.get("asc")).toBe("0");
		expect(params.get("page")).toBe("2");
		expect(params.get("pageSize")).toBe("20");
	});
});
