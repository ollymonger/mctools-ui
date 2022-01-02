import { createSlice, configureStore } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

type initial = {
    isOpen: boolean,
    theme: PaletteMode
}

const initialState: initial = {
    isOpen: false,
    theme: 'dark'
}

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState: initialState,
    reducers: {
        toggleSideBar: (state) => {
            state.isOpen = !state.isOpen;
        },
        changeTheme: (state, action) => {
            state.theme = action.payload;
            console.log(state.theme);
        }
    },
});


// export actions
export const { toggleSideBar, changeTheme } = sideBarSlice.actions;

// export store
export const store = configureStore({
    reducer: {
        sideBar: sideBarSlice.reducer,
    }
});