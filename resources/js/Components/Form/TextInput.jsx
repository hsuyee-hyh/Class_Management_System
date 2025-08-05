import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

export default function TextInput({ label, type, name, value, onChange, required, error, readOnly})
{
    return (
        <div>
            <Field>
                <Label className="block text-gray-800">
                    {label}
                    {required && <span className="text-red-500 ml-2">*</span>}
                </Label>
                <Input
                    type={type || "text"}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={clsx(
                        "mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm",
                        error && "border-red-500"
                    )}
                    readOnly={readOnly}
                />
                {error && (
                    <div className="mt-2 text-sm text-red-600">{error}</div>
                )}
            </Field>
        </div>
    );
}
