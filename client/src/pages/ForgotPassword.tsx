import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //This is what happens when the user clicks Submit button
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); //To prevent the refresh

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "If an account exists for that email, we sent a reset link.",
        );
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your Email</label>
        <input
          id="email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
          autoComplete="email"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting" : "Submit"}
        </button>
        {message && <p role="alert">{message}</p>}
      </form>
    </main>
  );
}
