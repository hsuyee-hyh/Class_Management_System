import { Field, Label, Select } from '@headlessui/react';
import clsx from 'clsx';

export default function Selection({
    label,
    type,
    name,
    value,
    options,
    onChange,
    required,
    error
}) {
    return (
        <div className="mb-4">
            <Field>
                <Label className="block text-gray-800">
                    {label}
                    {required && <span className="text-red-500 ml-2">*</span>}
                </Label>
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={clsx(
                        "mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm",
                        error && "border-red-500"
                    )}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                {error && (
                    <div className="mt-2 text-sm text-red-600">{error}</div>
                )}
            </Field>
        </div>
    );
}
