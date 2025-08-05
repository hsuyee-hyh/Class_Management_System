import { List } from "antd";
import { useState } from "react";

export default function SearchInputWidget({
    placeholder,
    name,
    value,
    onChange,
    onKeyDown,
    onItemSelect,
    filteredList,
}) {
    return (
        
        
        
        <>
            <div className="w-full md:w-auto flex-1 relative">
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    className="w-full h-10 px-4 py-2 border border-gray-300 rounded 
                                focus:outline-none focus:ring-yellow-500 focus:ring-2
                                placeholder-gray-500"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />

                {/* {value && ( */}
                    {/* // <div className="mt-2 absolute z-50 w-full bg-white rounded"> */}
                        {/* <List */}
                            {/* // bordered */}
                            {/* // dataSource={filteredList} */}
                            {/* // renderItem={(item) => ( */}
                                {/* // <List.Item */}
                                    {/* // onClick={() => onItemSelect(item)} */}
                                    {/* // className="cursor-pointer hover:bg-gray-300 px-4 py-2" */}
                                {/* // >{item}</List.Item> */}
                            {/* // )} */}
                            {/* // locale={{ */}
                                {/* // emptyText: "No results found ", */}
                            {/* // }} */}
                        {/* // /> */}
                    {/* </div> */}
                {/* // )} */}
            </div>
        </>
    );
}
