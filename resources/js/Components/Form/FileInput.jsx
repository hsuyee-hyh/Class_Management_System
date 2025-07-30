import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

export default function FileInput({ label, type, name, onChange, required, error })
{
    return (
        <div className="mb-4">
            <Field>
                <Label className="block text-gray-800">
                    {label}
                    {required && <span className="text-red-500 ml-2">*</span>}
                </Label>
                <Input
                    type="file"
                    id={name}
                    name={name}
                    onChange={onChange}
                    className={clsx(
                        "border border-gray-400 rounded-md focus:ring-amber-500 p-2 w-full mb-2 ",
                        error && "border-red-500"
                    )}
                />
                {error && (
                    <div className="mt-2 text-sm text-red-600">{error}</div>
                )}
            </Field>
        </div>
    );
}
