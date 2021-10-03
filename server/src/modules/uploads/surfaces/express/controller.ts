import { Response, Request } from "express";

import ApiResponse from "src/core/logic/ApiResponse";
import { ImageGoogleStorage } from "src/utils/google/Storage";
import HttpStatus from "http-status-codes";

export default class UploadController {
    static async uploadFile(req: Request, res: Response): Promise<void> {
        // TODO: would be good to add request body validation here
        const file = await ImageGoogleStorage.upload(
            (req as any).file,
            req.body.path
        );

        return ApiResponse.success(HttpStatus.OK, {
            file,
        }).send(res);
    }
}
