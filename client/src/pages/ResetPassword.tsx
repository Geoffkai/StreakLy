import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/useAuth";
import AuthShell from "../components/auth/AuthShell";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

export default function ResetPassword() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

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
      <AuthShell title="Link expired">
        <p className="-mt-3 mb-6 text-center text-[14.5px] text-ink-2">
          The reset link is invalid or has already been used.
        </p>
        <Link
          to="/forgot-password"
          className="flex min-h-13 items-center justify-center rounded-xl bg-ember-deep text-base font-bold text-sheet transition hover:bg-ember-ink active:scale-98"
        >
          Request a new link
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Reset password">
      <p className="-mt-3 mb-6 text-center text-[14.5px] text-ink-2">
        Choose a new password for your account.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-bold">
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordShown ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              aria-describedby="password-hint"
              required
              minLength={8}
              autoComplete="new-password" //tells password managers to suggest a new one.
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
          {loading ? "Saving" : "Save new password"}
        </button>
        {message && (
          <p role="alert" className="text-sm font-semibold text-ember-ink">
            {message}
          </p>
        )}
      </form>
    </AuthShell>
  );
}
