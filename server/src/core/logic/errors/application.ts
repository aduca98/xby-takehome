import { IError } from "./IError";

export class UnexpectedError implements IError {
    public readonly type = "UnexpectedError";

    constructor(readonly error?: Error | unknown, readonly data?: unknown) {}

    public get message(): string {
        if (this.error instanceof Error) {
            return this.error.message;
        }

        return "An unexpected error occurred.";
    }
}
