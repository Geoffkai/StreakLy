import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";

//Wraps pages for logged-out users only (/login, /signup).
//Logged-in users are sent to /today
export default function RedirectIfAuthed() {
  const { session } = useAuth();
  const location = useLocation();
  const path = location.state?.from ?? "/today";

  if (session === undefined) return null; //Supabase hasn't answered yet

  if (session) return <Navigate to={path} replace />;

  return <Outlet />;
}
