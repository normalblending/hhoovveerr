import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameParams, Layout } from "./types";
import { EditorState } from "../index";

const initialState: GameParams = {
    layout: Layout.Center,
    background: 'lightgrey',
};

export const gameParamsSlice = createSlice({
    name: 'gameParams',
    initialState,
    reducers: {
        setGameParams: (state: GameParams, action: PayloadAction<GameParams>) => {
            return action.payload;
        },
    },
});

export const {
    setGameParams
} = gameParamsSlice.actions;

export const selectGameParams = (state: EditorState) => state.gameParams;
