import { Field } from "formik";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
    Question,
    QuestionOption,
    QuestionType,
} from "src/api/graphql/generated/types";
import { Colors, Input } from "src/components";

function QuestionComponent({ question }: { question: Question }) {
    return (
        <div className="mb-6">
            <h2 className="font-semibold mb-2">
                {question.title}{" "}
                {question.required && (
                    <span style={{ color: Colors.melon50 }}>*</span>
                )}
            </h2>

            <QuestionInput question={question} />
        </div>
    );
}

const QuestionInput = ({ question }: { question: Question }) => {
    // TODO:
    const [selected, setSelected] = useState(null);

    if (question.type === QuestionType.MultipleChoice && question.options) {
        return (
            <RadioGroup value={selected} onChange={setSelected}>
                {question.options.map((option) => (
                    <Option option={option!} key={option!.id} />
                ))}
            </RadioGroup>
        );
    }

    return (
        <div className="mb-6">
            <Field
                name=""
                type="textarea"
                component={Input}
                placeholder="Your answer..."
            />
        </div>
    );
};

const Option = ({ option }: { option: QuestionOption }) => {
    return (
        <RadioGroup.Option
            key={option.id}
            value={option}
            className={({ checked }) =>
                classNames(
                    checked
                        ? "bg-indigo-50 border-indigo-200 z-10"
                        : "border-gray-200",
                    "bg-white flex flex-row items-center relative border p-4 cursor-pointer focus:outline-none  mb-3 rounded-md"
                )
            }
        >
            {({ active, checked }) => (
                <>
                    <span
                        className={classNames(
                            checked
                                ? "bg-indigo-600 border-transparent"
                                : "bg-white border-gray-300",
                            active
                                ? "ring-2 ring-offset-2 ring-indigo-500"
                                : "",
                            "h-4 w-4 rounded-full border flex items-center justify-center"
                        )}
                        aria-hidden="true"
                    >
                        <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>

                    <div className="flex-1 ml-5">
                        <RadioGroup.Label
                            as="span"
                            className={classNames(
                                checked ? "text-indigo-900" : "text-gray-900",
                                "font-medium"
                            )}
                        >
                            {option.label}
                        </RadioGroup.Label>
                    </div>
                </>
            )}
        </RadioGroup.Option>
    );
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default React.memo(QuestionComponent);
