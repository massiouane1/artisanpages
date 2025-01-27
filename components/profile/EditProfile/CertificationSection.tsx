"use client";

import React from 'react';
import { Certification } from '../../../types/portfolio';
import { FileUpload } from './FileUpload';

interface CertificationSectionProps {
  certifications: Certification[];
  onUpdate: (certifications: Certification[]) => void;
}

export const CertificationSection: React.FC<CertificationSectionProps> = ({ certifications, onUpdate }) => {
  const handleAdd = () => {
    const newCert: Certification = {
      certification_id: `temp-${Date.now()}`,
      user_id: '',
      name: '',
      issuing_authority: '',
      issue_date: new Date(),
      created_at: new Date(),
    };
    onUpdate([...certifications, newCert]);
  };

  const handleDelete = (id: string) => {
    onUpdate(certifications.filter(cert => cert.certification_id !== id));
  };

  const handleFileUpload = (id: string, file: File) => {
    const updated = certifications.map(cert => {
      if (cert.certification_id === id) {
        return { ...cert, document_url: URL.createObjectURL(file) };
      }
      return cert;
    });
    onUpdate(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Certifications</h2>
          <p className="text-sm text-gray-500 mt-1">Add your professional certifications and licenses</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Certification
        </button>
      </div>
      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div key={cert.certification_id} className="p-6 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = [...certifications];
                      updated[index] = { ...cert, name: e.target.value };
                      onUpdate(updated);
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                    placeholder="e.g. AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Issuing Authority</label>
                  <input
                    type="text"
                    value={cert.issuing_authority}
                    onChange={(e) => {
                      const updated = [...certifications];
                      updated[index] = { ...cert, issuing_authority: e.target.value };
                      onUpdate(updated);
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                    placeholder="e.g. Amazon Web Services"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                  <input
                    type="date"
                    value={cert.issue_date.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const updated = [...certifications];
                      updated[index] = { ...cert, issue_date: new Date(e.target.value) };
                      onUpdate(updated);
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={cert.expiry_date?.toISOString().split('T')[0] || ''}
                    onChange={(e) => {
                      const updated = [...certifications];
                      updated[index] = { ...cert, expiry_date: new Date(e.target.value) };
                      onUpdate(updated);
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Certificate Document</label>
                <FileUpload
                  onFileSelect={(file) => handleFileUpload(cert.certification_id, file)}
                  currentFileName={cert.document_url ? 'Document uploaded' : undefined}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleDelete(cert.certification_id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
