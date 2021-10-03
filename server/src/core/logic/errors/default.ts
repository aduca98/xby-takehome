import { UnexpectedError } from "./application";
import { NotFoundError } from "./domain";

export type DefaultErrors = NotFoundError | UnexpectedError;
