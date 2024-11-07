import React from 'react';
import { Database } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Annotation, SortField } from './types';
import AnnotationForm from './components/AnnotationForm';
import AnnotationList from './components/AnnotationList';
import { db } from './services/db';
import { useState } from 'react';

function App() {
  const [sortConfig, setSortConfig] = useState<{ field: SortField; ascending: boolean }>({
    field: 'startDate',
    ascending: true,
  });

  const annotations = useLiveQuery(
    () => db.annotations.toArray()
  ) ?? [];

  const handleSubmit = async (newAnnotation: Omit<Annotation, 'id'>) => {
    await db.annotations.add(newAnnotation);
  };

  const handleDelete = async (id: string) => {
    await db.annotations.delete(id);
  };

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      ascending: prev.field === field ? !prev.ascending : true,
    }));
  };

  const sortedAnnotations = [...annotations].sort((a, b) => {
    const compareValue = sortConfig.ascending ? 1 : -1;
    switch (sortConfig.field) {
      case 'event':
        return a.event.localeCompare(b.event) * compareValue;
      case 'startDate':
        return (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) * compareValue;
      case 'endDate':
        return (new Date(a.endDate).getTime() - new Date(b.endDate).getTime()) * compareValue;
      case 'impact': {
        const impactOrder = { low: 1, medium: 2, high: 3 };
        return ((impactOrder[a.impact as keyof typeof impactOrder] || 0) - 
                (impactOrder[b.impact as keyof typeof impactOrder] || 0)) * compareValue;
      }
      case 'financialImpact':
        return (a.financialImpact - b.financialImpact) * compareValue;
      case 'responsibleTeam':
        return a.responsibleTeam.localeCompare(b.responsibleTeam) * compareValue;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Database className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Annotation Database</h1>
          </div>
          <div className="text-sm text-gray-500">
            {annotations.length} {annotations.length === 1 ? 'Entry' : 'Entries'}
          </div>
        </div>
        
        <AnnotationForm onSubmit={handleSubmit} />
        <AnnotationList
          annotations={sortedAnnotations}
          onDelete={handleDelete}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}

export default App;