import React from 'react';

interface DashboardProps {
  submittedCount: number;
  totalCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({ submittedCount, totalCount }) => {
  const progressPercentage = totalCount > 0 ? (submittedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-2xl mt-8">
      <h2 className="text-xl font-semibold text-slate-200 mb-4">Progreso del Trabajo Actual</h2>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-slate-400">Instituciones con entregas</span>
        <span className="font-bold text-slate-100">{submittedCount} / {totalCount}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-right mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
        {Math.round(progressPercentage)}%
      </p>
    </div>
  );
};

export default Dashboard;
