import create, { SetState, GetState } from 'zustand';
import { createDashboardSlice, DashboardSlice } from './slices/createDashboardSlice';
import { createUserSlice, UserSlice } from './slices/createUserSlice';
import { devtools } from 'zustand/middleware';

export type StoreState = UserSlice & DashboardSlice;

export type StoreSlice<T> = (set: SetState<StoreState>, get: GetState<StoreState>) => T;

const useStore = create<StoreState>()(
    devtools((...a) => ({
        ...createUserSlice(...a),
        ...createDashboardSlice(...a),
    })),
);

export default useStore;
