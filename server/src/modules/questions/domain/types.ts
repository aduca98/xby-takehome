export enum QuestionType {
    ShortAnswer = "short_answer",
    MultipleChoice = "multiple_choice",
}

export type BaseQuestion = {
    id: string;
    type: QuestionType;
    title: string;
    required: boolean;
};

export type ShortAnswerQuestion = BaseQuestion & {
    type: QuestionType.ShortAnswer;
};

export type QuestionOption = {
    id: string;
    label: string;
    value: string;
};

export type MultipleChoiceQuestion = BaseQuestion & {
    type: QuestionType.MultipleChoice;
    options: QuestionOption[];
};

export type Question = ShortAnswerQuestion | MultipleChoiceQuestion;
