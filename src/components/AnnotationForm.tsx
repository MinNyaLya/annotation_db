import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Annotation, Impact } from '../types';

interface AnnotationFormProps {
  onSubmit: (annotation: Omit<Annotation, 'id'>) => void;
}

const AnnotationForm: React.FC<AnnotationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Annotation, 'id'>>({
    event: '',
    startDate: '',
    endDate: '',
    impact: 'low',
    description: '',
    financialImpact: 0,
    createdBy: '',
    responsibleTeam: '',
    jiraTicket: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, createdAt: new Date() });
    setFormData({
      event: '',
      startDate: '',
      endDate: '',
      impact: 'low',
      description: '',
      financialImpact: 0,
      createdBy: '',
      responsibleTeam: '',
      jiraTicket: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'financialImpact' ? parseFloat(value) || 0 : value
    }));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = () => {
    return (
      formData.event &&
      formData.startDate &&
      formData.endDate &&
      formData.createdBy &&
      formData.responsibleTeam &&
      (!formData.jiraTicket || isValidUrl(formData.jiraTicket))
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            name="event"
            value={formData.event}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Impact Level
          </label>
          <select
            name="impact"
            value={formData.impact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Financial Impact ($)
          </label>
          <input
            type="number"
            name="financialImpact"
            value={formData.financialImpact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Created By
          </label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Responsible Team
          </label>
          <input
            type="text"
            name="responsibleTeam"
            value={formData.responsibleTeam}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            JIRA Ticket URL
          </label>
          <input
            type="url"
            name="jiraTicket"
            value={formData.jiraTicket}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="https?://.*"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={!isFormValid()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Annotation
        </button>
      </div>
    </form>
  );
};

export default AnnotationForm;