import { useState } from "react";
import { useLocation, Link } from "react-router";
import { supabase } from "../lib/supabase";
import { EyeSlashIcon, EyeIcon } from "@phosphor-icons/react";
import AuthShell from "../components/auth/AuthShell";

export default function SignUp() {
  const location = useLocation();
  const preEmail = location.state?.email ?? "";
  const [email, setEmail] = useState(preEmail);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email to confirm"); //This is set because in the production this should be the message
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Create account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-bold">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="min-h-13 rounded-xl border-[1.5px] border-ink-2 bg-sheet px-3.5 text-base font-medium focus:border-ember-deep focus:outline-hidden focus:ring-3 focus:ring-ember-wash"
          />
        </div>

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

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-bold">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordShown ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              aria-describedby="password-hint"
              required
              autoComplete="new-password"
              minLength={8}
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
          <p id="password-hint" className="text-[13px] font-[550] text-ink-2">
            At least 8 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 min-h-13 cursor-pointer rounded-xl bg-ember-deep text-base font-bold text-sheet transition hover:bg-ember-ink active:scale-98 disabled:opacity-60"
        >
          {loading ? "Creating account" : "Create account"}
        </button>
        {message && (
          <p role="alert" className="text-sm font-semibold text-ember-ink">
            {message}c
          </p>
        )}
      </form>

      <p className="mt-5 text-center text-[14.5px] text-ink-2">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-ember-ink hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
