import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Worker } from '../types';

interface WorkerState {
  workers: Worker[];
  addWorker: (worker: Omit<Worker, 'id'>) => void;
  updateWorker: (id: string, worker: Partial<Worker>) => void;
  getWorker: (id: string) => Worker | undefined;
}

export const useWorkerStore = create<WorkerState>()(
  persist(
    (set, get) => ({
      workers: [],
      addWorker: (worker) => {
        set((state) => ({
          workers: [...state.workers, { ...worker, id: crypto.randomUUID() }],
        }));
      },
      updateWorker: (id, updatedWorker) => {
        set((state) => ({
          workers: state.workers.map((worker) =>
            worker.id === id ? { ...worker, ...updatedWorker } : worker
          ),
        }));
      },
      getWorker: (id) => {
        return get().workers.find((worker) => worker.id === id);
      },
    }),
    {
      name: 'worker-storage',
    }
  )
);