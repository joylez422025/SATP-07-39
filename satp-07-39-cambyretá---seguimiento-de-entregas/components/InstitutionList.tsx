import React from 'react';
import type { Institution } from '../types';
import InstitutionItem from './InstitutionItem';

interface InstitutionListProps {
  title: string;
  institutions: Institution[];
  submittedIds: Set<number>;
  onToggleSubmission: (id: number) => void;
}

const InstitutionList: React.FC<InstitutionListProps> = ({ title, institutions, submittedIds, onToggleSubmission }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-2xl h-fit">
      <h3 className="text-2xl font-bold text-slate-200 mb-6 border-b border-slate-700 pb-3">{title}</h3>
      <ul className="space-y-3">
        {institutions.map(institution => (
          <InstitutionItem
            key={institution.id}
            institution={institution}
            isChecked={submittedIds.has(institution.id)}
            onToggle={onToggleSubmission}
          />
        ))}
      </ul>
    </div>
  );
};

export default InstitutionList;
