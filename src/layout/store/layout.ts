import create from 'zustand';

interface LayoutState {
  open?: boolean;
  toggle: () => void;
}
const useLayoutStore = create<LayoutState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));

export default useLayoutStore;
