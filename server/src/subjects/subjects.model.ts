import { pool } from "../config/db";

export type Subject = {
  id: string;
  name: string;
  is_archived: boolean;
};

export async function findSubjectsByUser(userId: string): Promise<Subject[]> {
  const result = await pool.query<Subject>(
    "SELECT id, name, is_archived FROM subjects WHERE user_id = $1 ORDER BY created_at DESC",
    [userId],
  );

  return result.rows;
}

export async function createSubject(
  name: string,
  userId: string,
): Promise<Subject> {
  const result = await pool.query<Subject>(
    "INSERT INTO subjects (name, user_id) VALUES ($1, $2) RETURNING id, name, is_archived",
    [name, userId],
  );

  return result.rows[0];
}

export async function updateSubjectName(
  name: string,
  subjectId: string,
  userId: string,
): Promise<Subject | undefined> {
  const result = await pool.query<Subject>(
    "UPDATE subjects SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING id, name, is_archived",
    [name, subjectId, userId],
  );

  return result.rows[0];
}

export async function updateSubjectArchived(
  isArchived: boolean,
  subjectId: string,
  userId: string,
): Promise<Subject | undefined> {
  const result = await pool.query<Subject>(
    "UPDATE subjects SET is_archived = $1 WHERE id = $2 AND user_id = $3 RETURNING id, name, is_archived",
    [isArchived, subjectId, userId],
  );

  return result.rows[0];
}
