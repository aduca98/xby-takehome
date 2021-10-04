import React from "react";

// FIXME: make better type support here
function Input(props: any) {
    console.log(props);

    let _Input = (
        <input
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            {...props}
        />
    );

    if (props.type === "textarea") {
        _Input = (
            <textarea
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                {...props}
            />
        );
    }

    return (
        <>
            {props.label && <div>{props.label}</div>}
            {_Input}
        </>
    );
}

export { Input };
