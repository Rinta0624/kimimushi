import { createClient } from '@supabase/supabase-js'

// .env.localファイルで環境変数を管理するのが安全でおすすめです
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)