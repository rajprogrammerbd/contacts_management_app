import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAddListType {
    lists: string[];
}

const initialState: IAddListType = {
    lists: []
}

export const addListsSlice = createSlice({
    name: 'favorite_lists',
    initialState,
    reducers: {
        handleFavorites(state, action: PayloadAction<string>) {
            const idx = state.lists.findIndex((v: string) => v === action.payload);

            if (idx === -1) {
                state.lists.push(action.payload);

                return;
            }

            const filter = state.lists.filter((list: string) => list !== action.payload);

            return { ...state, lists: filter };
        }
    }
});

export const { handleFavorites } = addListsSlice.actions;
export const addListsReducer = addListsSlice.reducer;