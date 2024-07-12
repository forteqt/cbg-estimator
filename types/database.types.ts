// File: types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          user_id?: string
        }
      }
      measurements: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          type: string
          value: number
          unit: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          type: string
          value: number
          unit: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          type?: string
          value?: number
          unit?: string
        }
      }
      estimates: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          name: string
          total_cost: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          name: string
          total_cost: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          name?: string
          total_cost?: number
        }
      }
      estimate_items: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          estimate_id: string
          description: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          estimate_id: string
          description: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          estimate_id?: string
          description?: string
          quantity?: number
          unit_price?: number
          total_price?: number
        }
      }
      reports: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          project_id: string
          name: string
          content: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id: string
          name: string
          content: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          project_id?: string
          name?: string
          content?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
