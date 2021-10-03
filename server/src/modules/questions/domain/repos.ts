import { FailureOrSuccess } from "src/core/logic";
import { DefaultErrors } from "src/core/logic/errors";
import { Question } from "./types";

export type QuestionArrayResponse = FailureOrSuccess<DefaultErrors, Question[]>;

export interface QuestionRepository {
    findActive(): Promise<QuestionArrayResponse>;
}
