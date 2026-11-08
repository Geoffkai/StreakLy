import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //1. Split the "Bearer <token>" once into two parts
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];

  //2. Reject if the header missing, not "Bearer", or has no token
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (!data.user || error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    res.locals.userId = data.user.id;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
}
