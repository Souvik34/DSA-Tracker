import express from "express";

import {
getMentor, completeMentorProblemController
}
from "./mentor.controller.js";
import {protect} from "../../middlewares/auth.middleware.js";

const router=express.Router();

router.post(
    "/complete",
    protect,
    completeMentorProblemController
);

router.get("/:userId",getMentor);



export default router;