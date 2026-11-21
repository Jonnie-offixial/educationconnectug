export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          id: string
          record_id: string | null
          summary: string
          table_name: string
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          id?: string
          record_id?: string | null
          summary?: string
          table_name: string
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          id?: string
          record_id?: string | null
          summary?: string
          table_name?: string
        }
        Relationships: []
      }
      beneficiaries: {
        Row: {
          age: number | null
          community: string
          created_at: string
          district: string
          full_name: string
          gender: string
          id: string
          notes: string
          project_id: string | null
        }
        Insert: {
          age?: number | null
          community?: string
          created_at?: string
          district?: string
          full_name: string
          gender?: string
          id?: string
          notes?: string
          project_id?: string | null
        }
        Update: {
          age?: number | null
          community?: string
          created_at?: string
          district?: string
          full_name?: string
          gender?: string
          id?: string
          notes?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beneficiaries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: string
          created_at: string
          donation_type: string
          donor_name: string
          email: string
          id: string
          message: string
          receipt_sent: boolean
          status: string
        }
        Insert: {
          amount?: string
          created_at?: string
          donation_type?: string
          donor_name: string
          email: string
          id?: string
          message?: string
          receipt_sent?: boolean
          status?: string
        }
        Update: {
          amount?: string
          created_at?: string
          donation_type?: string
          donor_name?: string
          email?: string
          id?: string
          message?: string
          receipt_sent?: boolean
          status?: string
        }
        Relationships: []
      }
      me_records: {
        Row: {
          activities_completed: number
          activities_planned: number
          actual_female: number
          actual_male: number
          budget: number
          community: string
          created_at: string
          district: string
          evidence_url: string | null
          expenditure: number
          id: string
          indicator: string
          objective: string
          outcome: string
          period: string
          planned_beneficiaries: number
          project_id: string | null
          status: string
        }
        Insert: {
          activities_completed?: number
          activities_planned?: number
          actual_female?: number
          actual_male?: number
          budget?: number
          community?: string
          created_at?: string
          district?: string
          evidence_url?: string | null
          expenditure?: number
          id?: string
          indicator?: string
          objective?: string
          outcome?: string
          period?: string
          planned_beneficiaries?: number
          project_id?: string | null
          status?: string
        }
        Update: {
          activities_completed?: number
          activities_planned?: number
          actual_female?: number
          actual_male?: number
          budget?: number
          community?: string
          created_at?: string
          district?: string
          evidence_url?: string | null
          expenditure?: number
          id?: string
          indicator?: string
          objective?: string
          outcome?: string
          period?: string
          planned_beneficiaries?: number
          project_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "me_records_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          published: boolean
          title: string
        }
        Insert: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean
          title: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean
          title?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          sort_order: number
          summary: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          sort_order?: number
          summary?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          sort_order?: number
          summary?: string
          title?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          progress: number
          sort_order: number
          subtitle: string
          summary: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          progress?: number
          sort_order?: number
          subtitle?: string
          summary?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          progress?: number
          sort_order?: number
          subtitle?: string
          summary?: string
          title?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          category: string
          created_at: string
          file_url: string | null
          id: string
          project_id: string | null
          report_date: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          file_url?: string | null
          id?: string
          project_id?: string | null
          report_date?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          file_url?: string | null
          id?: string
          project_id?: string | null
          report_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          address: string
          email: string
          facebook: string
          id: number
          instagram: string
          linkedin: string
          org_name: string
          phone: string
          twitter: string
        }
        Insert: {
          address?: string
          email?: string
          facebook?: string
          id?: number
          instagram?: string
          linkedin?: string
          org_name?: string
          phone?: string
          twitter?: string
        }
        Update: {
          address?: string
          email?: string
          facebook?: string
          id?: number
          instagram?: string
          linkedin?: string
          org_name?: string
          phone?: string
          twitter?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          availability: string
          created_at: string
          email: string
          full_name: string
          id: string
          location: string
          motivation: string
          phone: string
          skills: string[]
          status: string
        }
        Insert: {
          availability?: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          location?: string
          motivation?: string
          phone?: string
          skills?: string[]
          status?: string
        }
        Update: {
          availability?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          location?: string
          motivation?: string
          phone?: string
          skills?: string[]
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      grant_role: {
        Args: { _email: string; _role: Database["public"]["Enums"]["app_role"] }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      list_admins: {
        Args: never
        Returns: {
          email: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }[]
      }
      revoke_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
