import '../config/dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// console.log(process.env);

const supabase: SupabaseClient = createClient(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default supabase;
