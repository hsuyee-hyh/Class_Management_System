
import { Select } from "antd";
export default function SearchInputWidget({
    placeholder,
    options,
    className=""
}) {
    return (
        <>
            <div className="w-full md:w-auto flex-1">
                <Select
                    placeholder={placeholder}
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={options}
                    optionRender={(option) => (
                        <div className="px-4 py-1 hover:!bg-yellow-200 focus:!bg-yellow-200">
                            {option.label}
                        </div>
                    )}
                    className=" w-full  h-10 !border-yellow-400 rounded-md "
                />
            </div>
        </>
    );
}
