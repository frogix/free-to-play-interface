import Button from "antd/es/button";
import { MouseEventHandler } from "react";
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

export default function SortDirectionChangeButton({
    isAscending, onDirectionChange
}: {
    isAscending: boolean;
    onDirectionChange: MouseEventHandler;
}) {
    const icon = isAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />;
    return <Button icon={icon} shape="circle" onClick={onDirectionChange} />;
}

