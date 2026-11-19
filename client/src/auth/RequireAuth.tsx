import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";

/**
 * Route guard for pages that need a Logged-in user.
 *
 * Sends Logged-out users to /login and saves where they were going in
 * `state.from`, so RedirectIfAuthed can send them back after login.
 */
export default function RequireAuth() {
  const { session } = useAuth();
  const location = useLocation();

  if (session === undefined) return null;

  if (session === null)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return <Outlet />;
}
