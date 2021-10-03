import { success, failure } from "src/core/logic";
import { UnexpectedError } from "src/core/logic/errors";
import { QuestionRepository, QuestionArrayResponse } from "../../domain/repos";

import { QUESTIONS } from "./data";
export class MemoryQuestionRepository implements QuestionRepository {
    constructor() {}

    async findActive(): Promise<QuestionArrayResponse> {
        try {
            return success(QUESTIONS);
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }
}
