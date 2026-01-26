import Select from "antd/es/select";
import Checkbox from "antd/es/checkbox";
import Radio from "antd/es/radio";
import type { RadioChangeEvent } from "antd/es/radio";
import { ReactNode } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";


interface MySmartSelectOption {
	label: string | ReactNode;
	value: string;
}

interface MySmartSelectProps {
	checkboxMaxCount?: number;
	placeholder: string;
	defaultValue: string | number | boolean | null | undefined;
	onChange: (value: string | string[]) => void;
	options: MySmartSelectOption[];
	mode?: "multiple" | "tags";
	style?: React.CSSProperties;
}

type SelectValueType = string | string[] | null | undefined;

/**
 * Select that converts to checkbox list if items count is less than maxCount
 */
export default function FilterSelect({
	options,
	checkboxMaxCount = 7,
	placeholder,
	defaultValue,
	onChange,
	mode = "tags",
	style
}: MySmartSelectProps) {

	const onRadioValueChanged = (e: RadioChangeEvent) => {
		handleValueChange(e.target.value);
	};

	const onCheckboxValueChanged = (v: CheckboxValueType[]) => {
		handleValueChange(v as string[])
	};

	const handleValueChange = (value: string | string[]) => {
		onChange(value);
	};

	if (options.length > checkboxMaxCount) {
		return (
			<Select
				mode={mode}
				allowClear
				style={style || { width: "100%" }}
				placeholder={placeholder}
				defaultValue={defaultValue as SelectValueType}
				onChange={handleValueChange}
				options={options}
			/>
		);
	}

	if (mode === "multiple") {
		return (
			<Checkbox.Group
				style={style || { width: "100%", display: "flex", flexDirection: "column" }}
				options={options}
				defaultValue={[defaultValue as CheckboxValueType]}
				onChange={onCheckboxValueChanged}
			/>
		);
	}

	return (
		<Radio.Group
			style={style || { width: "100%", display: "flex", flexDirection: "column" }}
			defaultValue={defaultValue}
			onChange={onRadioValueChanged}
			options={options}
		></Radio.Group>
	);
}

