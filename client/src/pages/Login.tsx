import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router";
import { useLocation } from "react-router";
import AuthShell from "../components/auth/AuthShell";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

export default function Login() {
  const location = useLocation();
  const resetMessage = location.state?.resetMessage ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  //This is what happens when the user clicks Login button
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); //To prevent the refresh

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Log in">
      {resetMessage && (
        <p
          role="alert"
          className="mb-4 rounded-xl bg-ember-wash px-3.5 py-3 text-sm font-semibold text-ember-ink"
        >
          {resetMessage}
        </p>
      )}
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
            className="min-h-13 rounded-xl border-[1.5px] border-ink-2 bg-sheet px-3.5 text-base font-medium placeholder:text-ink-3 focus:border-ember-deep focus:outline-hidden focus:ring-3 focus:ring-ember-wash"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <label htmlFor="password" className="text-sm font-bold">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-bold text-ember-ink hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={isPasswordShown ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              autoComplete="current-password"
              required
              className="min-h-13 w-full rounded-xl border-[1.5px] border-ink-2 bg-sheet pr-13 pl-3.5 text-base font-medium focus:border-ember-deep focus:outline-hidden focus:ring-3 focus:ring-ember-wash"
            />
            <button
              type="button"
              onClick={() => {
                setIsPasswordShown(!isPasswordShown);
              }}
              aria-label="Show password"
              aria-pressed={isPasswordShown}
              aria-controls="password"
              className="absolute top-1 right-1 grid size-11 place-items-center rounded-[10px] text-ink-2 hover:bg-paper"
            >
              {isPasswordShown ? (
                <EyeSlashIcon aria-hidden className="size-5 shrink-0" />
              ) : (
                <EyeIcon aria-hidden className="size-5 shrink-0" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 min-h-13 rounded-xl bg-ember-deep text-base font-bold text-sheet transition hover:bg-ember-ink active:scale-98 disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Logging in" : "Log in"}
        </button>
        {message && (
          <p role="alert" className="text-sm font-semibold text-ember-ink">
            {message}
          </p>
        )}
      </form>

      <p className="mt-5 text-center text-[14.5px] text-ink-2">
        New to StreakLy?{" "}
        <Link to="/signup" className="font-bold text-ember-ink hover:underline">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}
