import React from "react";
import { Radio } from "semantic-ui-react";
import {
    Question,
    QuestionOption,
    QuestionType,
} from "src/api/graphql/generated/types";
import { Colors, Input } from "src/components";

function QuestionComponent({ question }: { question: Question }) {
    return (
        <div>
            <h2>
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
    if (question.type === QuestionType.MultipleChoice && question.options) {
        return (
            <div>
                {question.options.map((option) => {
                    return <Option option={option!} />;
                })}
            </div>
        );
    }

    return (
        <div>
            <Input />
        </div>
    );
};

const Option = ({ option }: { option: QuestionOption }) => {
    return (
        <div>
            <Radio checked={false} label={option.label} />
        </div>
    );
};

export default React.memo(QuestionComponent);
