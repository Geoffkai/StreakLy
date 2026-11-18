import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Today from "./pages/Today";
import RequireAuth from "./auth/RequireAuth";
import RedirectIfAuthed from "./auth/RedirectIfAuthed";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route element={<RedirectIfAuthed />}>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/today" element={<Today />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
