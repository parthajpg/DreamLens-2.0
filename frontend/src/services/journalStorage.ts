import { JournalEntry } from '../types';

const STORAGE_KEY = 'dreamlens_private_journal_v2';

export const journalStorage = {
  getEntries(): JournalEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load private journal from localStorage', e);
      return [];
    }
  },

  saveEntry(entry: JournalEntry): JournalEntry[] {
    try {
      const current = this.getEntries();
      const existingIndex = current.findIndex(item => item.id === entry.id);
      
      let updated: JournalEntry[];
      if (existingIndex >= 0) {
        updated = [...current];
        // Merge interpretations if existing
        updated[existingIndex] = {
          ...current[existingIndex],
          ...entry,
          interpretations: {
            ...current[existingIndex].interpretations,
            ...entry.interpretations,
          }
        };
      } else {
        updated = [entry, ...current];
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save to private journal', e);
      return [];
    }
  },

  deleteEntry(id: string): JournalEntry[] {
    try {
      const current = this.getEntries();
      const filtered = current.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return filtered;
    } catch (e) {
      console.error('Failed to delete journal entry', e);
      return [];
    }
  },

  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear private journal', e);
    }
  }
};
