import { useState } from "react";
import { Link } from "react-router";
import { supabase } from "../lib/supabase";
import AuthShell from "../components/auth/AuthShell";

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
    <AuthShell title="Forgot password">
      <p className="-mt-3 mb-6 text-center text-[14.5px] text-ink-2">
        Enter your email and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="min-h-13 rounded-xl border-[1.5px] border-ink-2 bg-sheet px-3.5 text-base font-medium placeholder:text-ink-3 focus:border-ember-deep focus:outline-hidden focus:ring-3 focus:ring-ember-wash"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 min-h-13 cursor-pointer rounded-xl bg-ember-deep text-base font-bold text-sheet transition hover:bg-ember-ink active:scale-98 disabled:opacity-60"
        >
          {loading ? "Sending link" : "Send reset link"}
        </button>
        {message && (
          <p role="alert" className="text-sm font-semibold text-ember-ink">
            {message}
          </p>
        )}
      </form>

      <p className="mt-5 text-center text-[14.5px] text-ink-2">
        Remembered it?{" "}
        <Link to="/login" className="font-bold text-ember-ink hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
