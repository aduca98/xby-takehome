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
                label: "",
                value: "",
            },
            {
                id: "option_2_2",
                label: "",
                value: "",
            },
            {
                id: "option_2_3",
                label: "",
                value: "",
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
