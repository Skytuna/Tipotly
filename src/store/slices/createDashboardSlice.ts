import { StateCreator } from 'zustand';
import { StoreSlice } from '../useStore';

export interface DashboardSlice {
    isSidebarCollapsed: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
}

export const createDashboardSlice: StateCreator<
    DashboardSlice,
    [['zustand/devtools', never]],
    [],
    DashboardSlice
> = (set, get) => ({
    isSidebarCollapsed: true,
    openSidebar: () => set(() => ({ isSidebarCollapsed: false })),
    closeSidebar: () => set(() => ({ isSidebarCollapsed: true })),
    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
});
