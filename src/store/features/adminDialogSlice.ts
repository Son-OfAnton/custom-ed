import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AdminDialogState {
  isOpen: boolean;
  teacherId?: string | null;
}

const initialState: AdminDialogState = {
  isOpen: false,
  teacherId: null,

};

export const adminDialogSlice = createSlice({
  name: "adminDialog",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
    setTeacherId: (state, action) => {
      state.teacherId = action.payload;
    },
  },
});

export const selectAdminDialog = (state: RootState) => state.adminDialog.isOpen;
export const selectTeacherId = (state: RootState) => state.adminDialog.teacherId;
export const { openDialog, closeDialog, setTeacherId } = adminDialogSlice.actions;
export default adminDialogSlice.reducer;
