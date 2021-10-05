export enum QuestionType {
    ShortAnswer = "ShortAnswer",
    MultipleChoice = "MultipleChoice",
}

export type Question = {
    id: string;
    type: QuestionType;
    title: string;
    required: boolean;
    options: QuestionOption[];
};

export type QuestionOption = {
    id: string;
    label: string;
    value: string;
};
