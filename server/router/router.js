import { Router } from "express";
const router = Router();

/** import controllers */
import * as controller from "../controllers/controller.js";

router
  .route("/user")
  .get(controller.getUsers)
  .post(controller.insertUser)
  .delete(controller.dropUser);

/** Questions Routes API */

router
  .route("/questions")
  .get(controller.getQuestions) /** GET Request */
  .post(controller.insertQuestions) /** POST Request */
  .delete(controller.dropQuestions); /** DELETE Request */

router
  .route("/result")
  .get(controller.getResult)
  .post(controller.storeResult)
  .delete(controller.dropResult);

export default router;
