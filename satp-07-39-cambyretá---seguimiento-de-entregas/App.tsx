import React, { useState, useMemo, useEffect } from 'react';
import { INSTITUTION_DATA } from './constants';
import type { InstitutionCategory, WorkHistoryEntry, Institution } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InstitutionList from './components/InstitutionList';
import Footer from './components/Footer';
import WorkTracker from './components/WorkTracker';
import History from './components/History';

const APP_STORAGE_KEY_PREFIX = 'satp-cambyreta-';

// Custom hook for state with localStorage persistence
function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(APP_STORAGE_KEY_PREFIX + key);
      if (storedValue) {
        // Special handling for Set
        if (key === 'submittedIds' && Array.isArray(JSON.parse(storedValue))) {
            return new Set(JSON.parse(storedValue)) as T;
        }
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.error(`Error reading '${key}' from localStorage`, error);
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      // Special handling for Set
      const valueToStore = state instanceof Set ? JSON.stringify(Array.from(state)) : JSON.stringify(state);
      localStorage.setItem(APP_STORAGE_KEY_PREFIX + key, valueToStore);
    } catch (error) {
      console.error(`Error saving '${key}' to localStorage`, error);
    }
  }, [key, state]);

  return [state, setState];
}


const App: React.FC = () => {
  const [categories] = useState<InstitutionCategory[]>(INSTITUTION_DATA);
  const [currentWorkName, setCurrentWorkName] = usePersistentState<string>('currentWorkName', '');
  const [submittedIds, setSubmittedIds] = usePersistentState<Set<number>>('submittedIds', new Set());
  const [workHistory, setWorkHistory] = usePersistentState<WorkHistoryEntry[]>('workHistory', []);

  const allInstitutions = useMemo(() => categories.flatMap(c => c.institutions), [categories]);
  const institutionMap = useMemo(() => {
    const map = new Map<number, Institution>();
    allInstitutions.forEach(inst => map.set(inst.id, inst));
    return map;
  }, [allInstitutions]);

  const handleToggleSubmission = (institutionId: number) => {
    setSubmittedIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(institutionId)) {
        newIds.delete(institutionId);
      } else {
        newIds.add(institutionId);
      }
      return newIds;
    });
  };

  const handleSaveResults = () => {
    if (!currentWorkName.trim() || submittedIds.size === 0) {
      return;
    }

    const submittedInstitutions = Array.from(submittedIds).map(id => {
        const inst = institutionMap.get(id);
        return { id, name: inst ? inst.name : 'Nombre no encontrado' };
    });

    const newHistoryEntry: WorkHistoryEntry = {
      id: Date.now().toString(),
      workName: currentWorkName.trim(),
      dateSaved: new Date().toLocaleDateString('es-PY'),
      submitted: submittedInstitutions,
    };

    setWorkHistory(prevHistory => [newHistoryEntry, ...prevHistory]);
    setCurrentWorkName('');
    setSubmittedIds(new Set());
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <Header />
        <main>
          <WorkTracker
            currentWorkName={currentWorkName}
            onWorkNameChange={setCurrentWorkName}
            onSave={handleSaveResults}
            canSave={currentWorkName.trim().length > 0 && submittedIds.size > 0}
          />
          <Dashboard submittedCount={submittedIds.size} totalCount={allInstitutions.length} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {categories.map(category => (
              <InstitutionList
                key={category.title}
                title={category.title}
                institutions={category.institutions}
                submittedIds={submittedIds}
                onToggleSubmission={handleToggleSubmission}
              />
            ))}
          </div>
          <History history={workHistory} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;