import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";

//Wraps every logged-in page. Logged-out users are sent to /.
export default function RequireAuth() {
  const { session } = useAuth();
  const location = useLocation();

  if (session === undefined) return null;

  if (session === null)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return <Outlet />;
}
