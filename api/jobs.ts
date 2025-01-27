import { JobFormData } from '../components/dashboard/CreateJobForm';

interface ApiError {
  message: string;
  code?: string;
}

interface JobResponse extends JobFormData {
  id: string;
  createdAt: string;
}

export const createJob = async (jobData: JobFormData): Promise<JobResponse> => {
  try {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create job');
    }

    return data as JobResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to create job: ${errorMessage}`);
  }
};
