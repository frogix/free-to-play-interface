import { Descriptions, DescriptionsProps } from "antd";
import { GameInfo } from "./api/games";

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [];

	for (const key in info) {
		let value = info[key];

		if (key === "thumbnail") {
			value = <img src={value} />;
		}
		items.push({
			key,
			label: key,
			children: value
		});
	}

	return items;
}

export function GameCard(props: GameInfo) {

    return (
        <>
            <h2>{props.title}</h2>
            <Descriptions column={1} items={gameInfoToDescriptionItems(props)}></Descriptions>
        </>
    );
}

