import React from 'react';
import type { Institution } from '../types';

interface InstitutionItemProps {
  institution: Institution;
  isChecked: boolean;
  onToggle: (id: number) => void;
}

const CheckboxIcon: React.FC<{ isChecked: boolean }> = ({ isChecked }) => (
  <div className={`w-6 h-6 flex-shrink-0 border-2 rounded-md flex items-center justify-center transition-all duration-200 mr-4 ${
    isChecked ? 'bg-sky-500 border-sky-400' : 'bg-slate-700 border-slate-600'
  }`}>
    {isChecked && (
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    )}
  </div>
);


const InstitutionItem: React.FC<InstitutionItemProps> = ({ institution, isChecked, onToggle }) => {
  const { id, name } = institution;

  return (
    <li
      onClick={() => onToggle(id)}
      className={`flex items-center p-3 rounded-lg transition-all duration-300 cursor-pointer border ${
        isChecked
          ? 'bg-sky-900/40 border-sky-500/30 hover:bg-sky-900/60'
          : 'bg-slate-700/50 hover:bg-slate-700'
      }`}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') onToggle(id)}}
    >
      <CheckboxIcon isChecked={isChecked} />
      <span className={`transition-colors duration-300 ${isChecked ? 'text-sky-300' : 'text-slate-300'}`}>
        {name}
      </span>
    </li>
  );
};

export default InstitutionItem;
