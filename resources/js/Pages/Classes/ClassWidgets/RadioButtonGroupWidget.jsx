import { Radio } from "antd";

export default function RadioButtonGroupWidget({
    options,
    defaultValue,
    buttonStyle = "solid",
}) {
    return (
        <>
            <div>
                <Radio.Group
                    // block
                    options={options}
                    defaultValue={defaultValue}
                    optionType="button"
                    buttonStyle={buttonStyle}
                    buttonBg
                />
            </div>
        </>
    );
}
