// One shared connection to Supabase Auth. Pages import `supabase` from here
// instead of each building their own.

// STEP 1: import the factory function from the package you installed.
// Fill the blank with the function's name; the package is "@supabase/supabase-js".
import { createClient } from "@supabase/supabase-js";

// STEP 2: read the two public values from client/.env.
// Same pattern as App.tsx: import.meta.env.<VARIABLE_NAME>
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// STEP 3: stop early with a clear message if either one is missing.
// Why: otherwise you get a confusing error much later, far from the real cause.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in client/.env",
  );
}

// STEP 4: build the client and export it so other files can import it.
// createClient takes two arguments: the project URL, then the anon key.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
