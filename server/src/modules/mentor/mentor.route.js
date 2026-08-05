import express from "express";

import {
getMentor
}
from "./mentor.controller.js";


const router=express.Router();



router.get("/:userId",getMentor);



export default router;