import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: { allJobs: [], adminJobs: [], singleJob: null, searchQuery: '' },
  reducers: {
    setAllJobs: (state, action) => { state.allJobs = action.payload; },
    setAdminJobs: (state, action) => { state.adminJobs = action.payload; },
    setSingleJob: (state, action) => { state.singleJob = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
  },
});

export const { setAllJobs, setAdminJobs, setSingleJob, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;