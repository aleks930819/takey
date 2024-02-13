import { create } from 'zustand';

interface AuthModalState {
  isShownAuthModal: boolean;
  showAuthModal: () => void;
  hideAuthModal: () => void;
}

const useAuthModalState = create<AuthModalState>((set) => ({
  isShownAuthModal: false,
  showAuthModal: () => set({ isShownAuthModal: true }),
  hideAuthModal: () => set({ isShownAuthModal: false }),
}));

export default useAuthModalState;
