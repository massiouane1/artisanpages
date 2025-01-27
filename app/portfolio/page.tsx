"use client";

import React, { useState } from 'react';
import { PersonalInfo } from '@/components/profile/EditProfile/PersonalInfo';
import { CertificationSection } from '@/components/profile/EditProfile/CertificationSection';
import { ExperienceSection } from '@/components/profile/EditProfile/ExperienceSection';
import { Portfolio, Certification, Experience } from '@/types/portfolio';

export default function EditProfilePage() {
  const [portfolio, setPortfolio] = useState<Partial<Portfolio>>({});
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const handleSave = async () => {
    try {
      // Implement your save logic here
      console.log('Saving...', { portfolio, certifications, experiences });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Save Changes
          </button>
        </div>

        <PersonalInfo data={portfolio} onChange={setPortfolio} />
        <CertificationSection certifications={certifications} onUpdate={setCertifications} />
        <ExperienceSection experiences={experiences} onUpdate={setExperiences} />
      </div>
    </div>
  );
}
