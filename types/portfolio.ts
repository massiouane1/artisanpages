export interface Portfolio {
  portfolio_id: string;
  user_id: string;
  job_title: string;
  years_experience: number;
  hourly_rate: number;
  cv_document_url?: string;
  profile_summary: string;
  skills: string[];
  service_areas: string[];
  languages: string[];
  availability_status: 'available' | 'busy' | 'unavailable';
  is_verified: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Certification {
  certification_id: string;
  user_id: string;
  name: string;
  issuing_authority: string;
  issue_date: Date;
  expiry_date?: Date;
  document_url?: string;
  created_at?: Date;
}

export interface Experience {
  experience_id: string;
  user_id: string;
  title: string;
  description: string;
  start_date: Date;
  end_date?: Date;
  attachments: string[];
  created_at?: Date;
}
