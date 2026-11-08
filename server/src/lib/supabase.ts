import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

//Stop the server right away if the keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in server/.env");
}

//createClient makes the object we use to talk to Supabase
//Server only uses it to check tokens in requireAuth
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, //Don't save a session, each request sends its own token
    autoRefreshToken: false, //Nothing saved, so nothing to refresh
  },
});
