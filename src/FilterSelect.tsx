import Select from "antd/es/select";
import { Checkbox, Radio } from "antd";
import { ReactNode } from "react";


interface MySmartSelectOption {
	label: string | ReactNode;
	value: string;
}

interface MySmartSelectProps {
	checkboxMaxCount: number;
	placeholder: string;
	defaultValue: string | null | undefined;
	onChange: (value: string | string[]) => void;
	options: MySmartSelectOption[];
	mode: "multiple" | "tags";
}

/**
 * Select that converts to checkbox list if items count is less than maxCount
 */
export default function FilterSelect({
	options,
	checkboxMaxCount = 7,
	placeholder,
	defaultValue,
	onChange,
	mode = "tags"
}: MySmartSelectProps) {
	const handleValueChange = (value: string | string[]) => {
		onChange(value);
	};

	if (options.length > checkboxMaxCount) {
		return (
			<Select
				mode={mode}
				allowClear
				style={{ width: "100%" }}
				placeholder={placeholder}
				defaultValue={defaultValue}
				onChange={handleValueChange}
				options={options}
			/>
		);
	}

	if (mode === "multiple") {
		return (
			<Checkbox.Group
				style={{ width: "100%", display: "flex", flexDirection: "column" }}
				options={options}
				defaultValue={defaultValue}
				onChange={handleValueChange}
			/>
		);
	}

	return (
		<Radio.Group
			style={{ width: "100%", display: "flex", flexDirection: "column" }}
			defaultValue={defaultValue[0]}
			onChange={handleValueChange}
			options={options}
		></Radio.Group>
	);
}

