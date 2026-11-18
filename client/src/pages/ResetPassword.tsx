import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/useAuth";

export default function ResetPassword() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(error.message);
      } else {
        const { error } = await supabase.auth.signOut();

        if (error) {
          setMessage(error.message);
        } else {
          navigate("/login", {
            state: {
              resetMessage: "Password changed. Log in with your new one.",
            },
          });
        }
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (session === undefined) return null;

  if (session === null) {
    return (
      <main>
        <p>The Link is invalid or expired</p>
        <Link to="/forgot-password">Request a new link</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
          minLength={8}
          autoComplete="new-password" //tells password managers to suggest a new one.
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Submit"}
        </button>
        {message && <p role="alert">{message}</p>}
      </form>
    </main>
  );
}
