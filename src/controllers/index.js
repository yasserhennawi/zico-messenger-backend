import TestRouter from "./test";

export default (app) => {
    app.use("/test", TestRouter)
}