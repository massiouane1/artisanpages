import React, { useState } from 'react';
import { CreateJobDto, JobAttachment } from '@/types/job';
import { useRouter } from 'next/navigation';

export const JobCreationPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateJobDto>({
    title: '',
    description: '',
    location: '',
    jobType: 'Full-time',
    minPrice: 0,
    estimatedDuration: '',
    tags: [],
    attachments: []
  });
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement job creation logic
      console.log(formData);
      router.push('/profile'); // Navigate back to profile after success
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to JobAttachment array
    const newAttachments: JobAttachment[] = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }));

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const addTag = () => {
    if (currentTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Job</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          Back to Profile
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title*</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description*</label>
          <textarea
            required
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location*</label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Job Type*</label>
          <select
            required
            value={formData.jobType}
            onChange={e => setFormData({...formData, jobType: e.target.value as any})}
            className="w-full p-2 border rounded"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Minimum Price*</label>
          <input
            type="number"
            required
            min="0"
            value={formData.minPrice}
            onChange={e => setFormData({...formData, minPrice: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Estimated Duration*</label>
          <input
            type="text"
            required
            placeholder="e.g., 2 weeks, 3 months"
            value={formData.estimatedDuration}
            onChange={e => setFormData({...formData, estimatedDuration: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags*</label>
          <div className="flex gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="bg-teal-100 px-2 py-1 rounded">
                {tag}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    tags: prev.tags.filter((_, i) => i !== index)
                  }))}
                  className="ml-2 text-teal-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTag}
              onChange={e => setCurrentTag(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-teal-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Attachments</label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.attachments.map((file, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded flex items-center">
                <span className="text-sm">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    attachments: prev.attachments.filter((_, i) => i !== index)
                  }))}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
};
