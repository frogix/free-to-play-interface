import type { GameFieldsPossibleValues } from "../api/games";

export type SortField = "title" | "release_date";

export interface SortMethod {
	field: SortField;
	isAscending: boolean;
}

const VALID_SORT_FIELDS: SortField[] = ["title", "release_date"];

function parseCommaSeparated(value: string | null): string[] {
	if (!value || value.trim() === "") return [];
	return value.split(",").map((s) => s.trim()).filter(Boolean);
}

export function parseFiltersFromSearchParams(
	params: URLSearchParams
): GameFieldsPossibleValues | undefined {
	const genre = parseCommaSeparated(params.get("genre"));
	const platform = parseCommaSeparated(params.get("platform"));
	if (genre.length === 0 && platform.length === 0) return undefined;
	return {
		genre,
		platform,
		publisher: [],
		developer: [],
		release_date: null
	};
}

export function parseSortFromSearchParams(params: URLSearchParams): SortMethod {
	const sortRaw = params.get("sort");
	const field: SortField = sortRaw && VALID_SORT_FIELDS.includes(sortRaw as SortField)
		? (sortRaw as SortField)
		: "title";
	const ascRaw = params.get("asc");
	const isAscending = ascRaw === "0" ? false : true;
	return { field, isAscending };
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MIN_PAGE = 1;
const MIN_PAGE_SIZE = 5;
const MAX_PAGE_SIZE = 100;

export function parsePaginationFromSearchParams(params: URLSearchParams): {
	page: number;
	pageSize: number;
} {
	const pageRaw = params.get("page");
	const page = Math.max(MIN_PAGE, parseInt(pageRaw ?? "", 10) || DEFAULT_PAGE);
	const pageSizeRaw = params.get("pageSize");
	const pageSize = Math.min(
		MAX_PAGE_SIZE,
		Math.max(MIN_PAGE_SIZE, parseInt(pageSizeRaw ?? "", 10) || DEFAULT_PAGE_SIZE)
	);
	return { page, pageSize };
}

/**
 * Returns the search string from the current URL.
 * With HashRouter the query is inside the hash (#/?a=1), so we must parse the hash.
 */
export function getSearchStringFromLocation(): string {
	const hash = typeof window !== "undefined" ? window.location.hash : "";
	const qIndex = hash.indexOf("?");
	return qIndex >= 0 ? hash.slice(qIndex) : "";
}

export function filtersToSearchParams(
	filteredFields: GameFieldsPossibleValues | undefined,
	sortMethod: SortMethod,
	pagination: { page: number; pageSize: number }
): URLSearchParams {
	const params = new URLSearchParams();
	if (filteredFields?.genre?.length) {
		params.set("genre", filteredFields.genre.join(","));
	}
	if (filteredFields?.platform?.length) {
		params.set("platform", filteredFields.platform.join(","));
	}
	params.set("sort", sortMethod.field);
	params.set("asc", sortMethod.isAscending ? "1" : "0");
	if (pagination.page > DEFAULT_PAGE) {
		params.set("page", String(pagination.page));
	}
	if (pagination.pageSize !== DEFAULT_PAGE_SIZE) {
		params.set("pageSize", String(pagination.pageSize));
	}
	return params;
}
