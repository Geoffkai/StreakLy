import type { Request, Response } from "express";
import { DatabaseError } from "pg";
import {
  findSubjectsByUser,
  createSubject,
  updateSubjectName,
  updateSubjectArchived,
} from "./subjects.model";

export async function listSubjects(_req: Request, res: Response) {
  try {
    const userId = res.locals.userId;

    const subjects = await findSubjectsByUser(userId);
    return res.status(200).json({ subjects });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
}

export async function addSubject(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;
    const subjectCleanName =
      typeof req.body?.name === "string" ? req.body.name.trim() : null;

    if (!subjectCleanName) {
      return res.status(422).json({ message: "Wrong or invalid name format" });
    }

    const subject = await createSubject(subjectCleanName, userId);

    return res.status(201).json({ subject });
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      return res.status(409).json({ message: "Subject already exists" });
    }
    console.error(err);
    res.status(500).json({ ok: false });
  }
}

export async function renameSubject(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const subjectCleanName =
      typeof req.body?.name === "string" ? req.body.name.trim() : null;
    const userId = res.locals.userId;
    const subjectId = req.params.id;

    if (!subjectCleanName) {
      return res.status(422).json({ message: "Wrong or invalid name format" });
    }

    const subject = await updateSubjectName(
      subjectCleanName,
      subjectId,
      userId,
    );

    if (!subject) {
      return res.status(404).json({ message: "No match found" });
    }

    return res.status(200).json({ subject });
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      return res.status(409).json({ message: "Subject already exists" });
    }
    //Not a valid uuid code (/subjects/abc)
    if (err instanceof DatabaseError && err.code === "22P02") {
      return res.status(404).json({ message: "No match found" });
    }
    console.error(err);
    res.status(500).json({ ok: false });
  }
}

export async function setSubjectArchived(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const userId = res.locals.userId;
    const subjectId = req.params.id;
    const isArchived =
      typeof req.body?.is_archived === "boolean" ? req.body?.is_archived : null;

    if (isArchived === null) {
      return res.status(422).json({ message: "Wrong or invalid format" });
    }

    const subject = await updateSubjectArchived(isArchived, subjectId, userId);

    if (!subject) {
      return res.status(404).json({ message: "No match found" });
    }

    return res.status(200).json({ subject });
  } catch (err) {
    //Not a valid uuid code (/subjects/abc)
    if (err instanceof DatabaseError && err.code === "22P02") {
      return res.status(404).json({ message: "No match found" });
    }
    console.error(err);
    res.status(500).json({ ok: false });
  }
}
