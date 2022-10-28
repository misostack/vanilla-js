import { applyMiddleware } from "redux";
import logger from "../middlewares/logger";

const exampleEnhancer = applyMiddleware(logger);

export default exampleEnhancer;
