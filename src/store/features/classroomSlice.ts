import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface classroomState {
  currClassroomId: string;
  currClassroomName: string;
}

const initialState: classroomState = {
  currClassroomId: '',
  currClassroomName: '',
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setCurrClassroomId: (state, action: PayloadAction<string>) => {
      state.currClassroomId = action.payload;
    },
    setCurrClassroomName: (state, action: PayloadAction<string>) => {
      state.currClassroomName = action.payload;
    },
  },
});

export const selectCurrClassroomId = (state: { classroom: classroomState }) => state.classroom.currClassroomId;
export const selectCurrClassroomName = (state: { classroom: classroomState }) => state.classroom.currClassroomName;

export const { setCurrClassroomId, setCurrClassroomName } = classroomSlice.actions;
export default classroomSlice.reducer;
