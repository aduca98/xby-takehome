import expressPromise from "express-promise-router";

import Upload from "src/modules/uploads/surfaces/express/routes";

const routes = expressPromise();

routes.use("/uploads", Upload);

export default routes;
