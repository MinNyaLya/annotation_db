import React from 'react';
import { Trash2, ArrowUpDown } from 'lucide-react';
import { Annotation, SortField } from '../types';

interface AnnotationListProps {
  annotations: Annotation[];
  onDelete: (id: string) => void;
  onSort: (field: SortField) => void;
}

const AnnotationList: React.FC<AnnotationListProps> = ({ annotations, onDelete, onSort }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const SortableHeader: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        {children}
        <ArrowUpDown className="w-4 h-4 ml-1" />
      </div>
    </th>
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="event">Event</SortableHeader>
              <SortableHeader field="startDate">Start Date</SortableHeader>
              <SortableHeader field="endDate">End Date</SortableHeader>
              <SortableHeader field="impact">Impact</SortableHeader>
              <SortableHeader field="financialImpact">Financial Impact</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <SortableHeader field="responsibleTeam">Responsible Team</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                JIRA Ticket
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {annotations.map((annotation) => (
              <tr key={annotation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{annotation.event}</div>
                  {annotation.description && (
                    <div className="text-sm text-gray-500">{annotation.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(annotation.startDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(annotation.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${annotation.impact === 'high' ? 'bg-red-100 text-red-800' : 
                      annotation.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {annotation.impact}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(annotation.financialImpact)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {annotation.createdBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {annotation.responsibleTeam}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {annotation.jiraTicket && (
                    <a
                      href={annotation.jiraTicket}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Ticket
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => annotation.id && onDelete(annotation.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnnotationList;