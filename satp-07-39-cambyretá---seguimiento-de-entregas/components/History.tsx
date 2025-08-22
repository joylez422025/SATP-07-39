import React from 'react';
import type { WorkHistoryEntry } from '../types';

interface HistoryProps {
  history: WorkHistoryEntry[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
        <div className="mt-12 text-center p-8 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-300 mb-2">Historial de Trabajos</h2>
            <p className="text-slate-500">Aún no se ha guardado ningún resultado. Comienza por definir un trabajo, marcar las entregas y presionar "Guardar".</p>
        </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-300 mb-6 pb-3 border-b border-slate-700">Historial de Trabajos</h2>
      <div className="space-y-4">
        {history.map(entry => (
          <details key={entry.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300">
            <summary className="p-4 cursor-pointer flex justify-between items-center hover:bg-slate-700/50">
              <div>
                <span className="font-semibold text-sky-300">{entry.workName}</span>
                <span className="text-xs text-slate-400 ml-3">({entry.submitted.length} entregas)</span>
              </div>
              <div className="text-right">
                 <span className="font-mono text-sm text-slate-400">{entry.dateSaved}</span>
              </div>
            </summary>
            <div className="p-4 border-t border-slate-700 bg-slate-900/50">
                <h4 className="font-semibold text-slate-300 mb-3">Instituciones que entregaron:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-400">
                {entry.submitted.map(inst => (
                  <li key={inst.id} className="flex items-center">
                    <svg className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{inst.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default History;
