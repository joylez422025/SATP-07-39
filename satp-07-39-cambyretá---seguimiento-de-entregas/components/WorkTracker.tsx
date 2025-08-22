import React from 'react';

interface WorkTrackerProps {
  currentWorkName: string;
  onWorkNameChange: (name: string) => void;
  onSave: () => void;
  canSave: boolean;
}

const WorkTracker: React.FC<WorkTrackerProps> = ({ currentWorkName, onWorkNameChange, onSave, canSave }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-2xl">
      <h2 className="text-xl font-semibold text-slate-200 mb-4">Trabajo Actual</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={currentWorkName}
          onChange={(e) => onWorkNameChange(e.target.value)}
          placeholder="Ej: Entrega de Planillas de Mayo"
          className="flex-grow bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          aria-label="Nombre del trabajo actual"
        />
        <button
          onClick={onSave}
          disabled={!canSave}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-md transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:hover:bg-slate-600 flex-shrink-0"
          aria-label="Guardar resultados y empezar nuevo trabajo"
        >
          Guardar Resultados y Empezar Nuevo
        </button>
      </div>
       {!canSave && currentWorkName.length > 0 && (
         <p className="text-xs text-slate-500 mt-2">Marque al menos una institución para poder guardar.</p>
       )}
    </div>
  );
};

export default WorkTracker;
