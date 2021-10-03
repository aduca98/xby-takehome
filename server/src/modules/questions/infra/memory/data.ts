import { Question, QuestionType } from "../../domain";

export const QUESTIONS: Question[] = [
    {
        id: "question_1",
        title: "How did you get into programming?",
        type: QuestionType.ShortAnswer,
        required: true,
    },
    {
        id: "question_2",
        title: "What is your favorite programming language?",
        type: QuestionType.MultipleChoice,
        required: true,
        options: [
            {
                id: "option_2_1",
                label: "Java",
                value: "java",
            },
            {
                id: "option_2_2",
                label: "Typescript",
                value: "typescript",
            },
            {
                id: "option_2_3",
                label: "Python",
                value: "python",
            },
            {
                id: "option_2_4",
                label: "Golang",
                value: "go",
            },
            {
                id: "option_2_5",
                label: "Rust",
                value: "rust",
            },
        ],
    },
    {
        id: "question_3",
        title: "What part of software are you most passionate about?",
        type: QuestionType.ShortAnswer,
        required: true,
    },
];
