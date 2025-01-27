import React, { useState } from 'react';

interface CreateJobFormProps {
  onClose: () => void;
  onSubmit: (data: JobFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface JobFormData {
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  budget?: string;
  deadline?: string;
}

export const CreateJobForm: React.FC<CreateJobFormProps> = ({ onClose, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    category: '',
    budget: 0,
    deadline: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    if (formData.budget < 1) {
      newErrors.budget = 'Budget must be greater than 0';
    }
    if (new Date(formData.deadline) < new Date()) {
      newErrors.deadline = 'Deadline cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    if (validateForm()) {
      try {
        await onSubmit(formData);
        onClose();
      } catch (error) {
        setSubmitError('Failed to create job. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Job</h2>
        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Job Title</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: sanitizeInput(e.target.value)})}
                className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
                required
                aria-label="Job Title"
                maxLength={100}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description <span className="text-gray-500">({formData.description.length}/500)</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: sanitizeInput(e.target.value)})}
                className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
                rows={4}
                required
                maxLength={500}
                aria-label="Job Description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Drawing">Drawing</option>
                <option value="Writing">Writing</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-1">Budget ($)</label>
              <input
                id="budget"
                type="number"
                min="1"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: Math.max(0, Number(e.target.value))})}
                className={`w-full p-2 border rounded ${errors.budget ? 'border-red-500' : ''}`}
                required
                aria-label="Job Budget"
              />
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium mb-1">Deadline</label>
              <input
                id="deadline"
                type="date"
                value={formData.deadline}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className={`w-full p-2 border rounded ${errors.deadline ? 'border-red-500' : ''}`}
                required
                aria-label="Job Deadline"
              />
              {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 disabled:bg-teal-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
