import { Database } from "@/types_db";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||  '',
  process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY || ''
);