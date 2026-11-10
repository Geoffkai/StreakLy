import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Today from "./pages/Today";
import RequireAuth from "./auth/RequireAuth";
import RedirectIfAuthed from "./auth/RedirectIfAuthed";
import Landing from "./pages/Landing";

function App() {
  return (
    <main>
      <Routes>
        <Route element={<RedirectIfAuthed />}>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/today" element={<Today />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
