// File: lib/supabase/client.ts

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database.types'

export const createClientSupabaseClient = () =>
  createClientComponentClient<Database>()