import { Button, Label } from "@headlessui/react";

export default function FormButton({Label}) {
    return (
        <>
            <Button 
                type="submit"
                className="bg-yellow-500 text-black font-semibold rounded-md w-full p-2 mt-2
                             hover:bg-yellow-700"
             >
                {Label}
            </Button>
        </>
    );
}
