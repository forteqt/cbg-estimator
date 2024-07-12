
// File: types/supabase.ts

import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type Project = Tables<'projects'>
export type Measurement = Tables<'measurements'>
export type Estimate = Tables<'estimates'>
export type EstimateItem = Tables<'estimate_items'>
export type Report = Tables<'reports'>