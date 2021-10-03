import expressPromise from "express-promise-router";
import * as multer from "multer";

import UploadController from "./controller";

const routes = expressPromise();

routes.post(
    "/",
    multer({
        storage: multer.memoryStorage(),
        limits: { fieldSize: 25 * 1024 * 1024 }, //25 mb
    }).single("image"),
    UploadController.uploadFile
);

export default routes;
