import DatePicker from "react-datepicker"
import { Field, Label } from "@headlessui/react";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

export default function DateInput({
    name,
    label,
    selectedDate,
    onChange,
    placeholder,
    required,
    error
}) {
    return (
        <>
            <div className="mb-4">
                <Field>
                    <Label className="block text-gray-800">
                        {label}
                        {required && (
                            <span className="text-red-500 ml-2">*</span>
                        )}
                    </Label>

                    <DatePicker
                        name={name}
                        value={selectedDate}
                        selected={selectedDate}
                        onChange={(date) => onChange(name, date)}
                        placeholderText={placeholder}
                        dateFormat="yyyy-MM-dd"
                        className={clsx(
                            "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-200",
                            error && "border-red-500"
                        )}
                        required
                    />

                    {error && (
                        <div className="mt-2 text-sm text-red-600">{error}</div>
                    )}
                </Field>
            </div>
        </>
    );
}
