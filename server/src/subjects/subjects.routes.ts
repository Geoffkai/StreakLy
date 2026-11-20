import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  listSubjects,
  addSubject,
  renameSubject,
  setSubjectArchived,
} from "./subjects.controller";

const router = Router();

router.use(requireAuth);
router.get("/", listSubjects);
router.post("/", addSubject);
router.patch("/:id", renameSubject);
router.patch("/:id/archived", setSubjectArchived);

export default router;
