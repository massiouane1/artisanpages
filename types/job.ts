export interface JobAttachment {
  id?: string;
  url: string;
  name: string;
  type: string;
}

export interface CreateJobDto {
  title: string;
  description: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  minPrice: number;
  estimatedDuration: string;
  tags: string[];
  attachments: JobAttachment[];
}
