"use client";

import React from 'react';
import { Experience } from '../../../types/portfolio';
import { FileUpload } from './FileUpload';

interface ExperienceSectionProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, onUpdate }) => {
  const handleAdd = () => {
    const newExp: Experience = {
      experience_id: `temp-${Date.now()}`,
      user_id: '',
      title: '',
      description: '',
      start_date: new Date(),
      attachments: [],
      created_at: new Date(),
    };
    onUpdate([...experiences, newExp]);
  };

  const handleDelete = (id: string) => {
    onUpdate(experiences.filter(exp => exp.experience_id !== id));
  };

  const handleFileUpload = (id: string, file: File) => {
    const updated = experiences.map(exp => {
      if (exp.experience_id === id) {
        return { 
          ...exp, 
          attachments: [...exp.attachments, URL.createObjectURL(file)]
        };
      }
      return exp;
    });
    onUpdate(updated);
  };

  const removeAttachment = (expId: string, attachmentUrl: string) => {
    const updated = experiences.map(exp => {
      if (exp.experience_id === expId) {
        return {
          ...exp,
          attachments: exp.attachments.filter(url => url !== attachmentUrl)
        };
      }
      return exp;
    });
    onUpdate(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Experience</h2>
          <p className="text-sm text-gray-500 mt-1">Add your work experience and achievements</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Experience
        </button>
      </div>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.experience_id} className="p-6 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[index] = { ...exp, title: e.target.value };
                    onUpdate(updated);
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[index] = { ...exp, description: e.target.value };
                    onUpdate(updated);
                  }}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                  placeholder="Describe your role, responsibilities, and achievements..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={exp.start_date.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index] = { ...exp, start_date: new Date(e.target.value) };
                      onUpdate(updated);
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={exp.end_date?.toISOString().split('T')[0] || ''}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index] = { ...exp, end_date: new Date(e.target.value) };
                      onUpdate(updated);
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <FileUpload
                  onFileSelect={(file) => handleFileUpload(exp.experience_id, file)}
                  acceptedTypes=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {exp.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exp.attachments.map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border">
                        <span className="text-sm text-gray-600">Attachment {idx + 1}</span>
                        <button
                          onClick={() => removeAttachment(exp.experience_id, url)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleDelete(exp.experience_id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
