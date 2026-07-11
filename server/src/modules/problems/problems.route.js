import express from "express";
import { getAllProblems,getProblemById, createProblem, getProgress, addBookmark,
  removeBookmark,
  getBookmarks, saveNotes,
getNotes,
getProblemNotes,} from "./problems.controller.js";
import { markProblemSolved } from "./problems.controller.js";
import { revisionMiddleware } from "../../middlewares/revision.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", getAllProblems);

router.get(
  "/progress",
  protect,
  getProgress
);
router.post("/", createProblem);
router.post(
  "/solve",
  protect,
  revisionMiddleware,
  markProblemSolved
);

router.get(
  "/bookmarks",
  protect,
  getBookmarks
);

router.post(
  "/:id/bookmark",
  protect,
  addBookmark
);

router.delete(
  "/:id/bookmark",
  protect,
  removeBookmark
);

router.get(
  "/notes",
  protect,
  getNotes
);

router.get(
  "/:id/notes",
  protect,
  getProblemNotes
);

router.put(
  "/:id/notes",
  protect,
  saveNotes
);
router.get("/:id", getProblemById);
export default router;