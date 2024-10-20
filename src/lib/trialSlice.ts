'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrialState {
  trialPrompt: string;
  judgeName: string;
  prosecutorName: string;
}

const initialState: TrialState = {
  trialPrompt:
    'The defendant, a renowned doctor (Nikita Polevoi), is accused of illegally prescribing opioids to patients without proper medical justification. The evidence includes patient records, undercover operation reports, and witness testimonies from former patients.',
  judgeName: '',
  prosecutorName: '',
};

const trialSlice = createSlice({
  name: 'trial',
  initialState,
  reducers: {
    setTrialPrompt: (state, action: PayloadAction<string>) => {
      state.trialPrompt = action.payload;
    },
    setJudgeName: (state, action: PayloadAction<string>) => {
      state.judgeName = action.payload;
    },
    setProsecutorName: (state, action: PayloadAction<string>) => {
      state.prosecutorName = action.payload;
    },
  },
});

export const { setTrialPrompt, setJudgeName, setProsecutorName } =
  trialSlice.actions;
export default trialSlice.reducer;
