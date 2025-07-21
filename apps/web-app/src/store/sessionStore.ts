import { create } from 'zustand';
import { SessionDto } from 'ez-utils';

interface SessionStore {
  session: SessionDto | null;
  setSession: (session: SessionDto) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
}));

const SESSION_KEY = 'session-store';

if (typeof localStorage !== 'undefined') {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      useSessionStore.setState((state) => ({
        ...state,
        session: parsed.session ?? null,
      }));
    }
  } catch (err) {
    console.warn('Failed to load session', err);
  }

  useSessionStore.subscribe((state) => {
    try {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ session: state.session }),
      );
    } catch (err) {
      console.warn('Failed to save session', err);
    }
  });
}
