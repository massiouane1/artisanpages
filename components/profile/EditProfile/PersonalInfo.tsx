"use client";

import React from 'react';
import { Portfolio } from '../../../types/portfolio';

interface PersonalInfoProps {
  data: Partial<Portfolio>;
  onChange: (data: Partial<Portfolio>) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={data.job_title || ''}
            onChange={(e) => onChange({ ...data, job_title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              value={data.years_experience || 0}
              onChange={(e) => onChange({ ...data, years_experience: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hourly Rate</label>
            <input
              type="number"
              value={data.hourly_rate || 0}
              onChange={(e) => onChange({ ...data, hourly_rate: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Summary</label>
          <textarea
            value={data.profile_summary || ''}
            onChange={(e) => onChange({ ...data, profile_summary: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};
