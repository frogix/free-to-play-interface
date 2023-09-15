import { Descriptions, DescriptionsProps, Image } from "antd";
import { GameInfo } from "./api/games";
import Title from "antd/es/typography/Title";

function gameInfoToDescriptionItems(info: GameInfo) {
	const items: DescriptionsProps["items"] = [];

	for (const key in info) {
		let value = info[key];

		if (key === "thumbnail") {
			value = <Image src={value} />;
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
            <Title level={2}>{props.title}</Title>
            <Descriptions column={1} items={gameInfoToDescriptionItems(props)}></Descriptions>
        </>
    );
}

