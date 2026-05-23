import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchMyRequests = createAsyncThunk('leaves/fetchMyRequests', async () => {
  const response = await API.get('/leaves/my-requests');
  return response.data;
});

export const applyLeave = createAsyncThunk('leaves/applyLeave', async (leaveData) => {
  const response = await API.post('/leaves', leaveData);
  return response.data;
});

export const cancelRequest = createAsyncThunk('leaves/cancelRequest', async (id) => {
  await API.delete(`/leaves/${id}`);
  return id;
});

export const fetchBalance = createAsyncThunk('leaves/fetchBalance', async () => {
  const response = await API.get('/leaves/balance');
  return response.data;
});

export const fetchAllRequests = createAsyncThunk('leaves/fetchAllRequests', async () => {
  const response = await API.get('/leaves/all');
  return response.data;
});

export const fetchPendingRequests = createAsyncThunk('leaves/fetchPendingRequests', async () => {
  const response = await API.get('/leaves/pending');
  return response.data;
});

export const approveLeave = createAsyncThunk('leaves/approveLeave', async ({ id, managerComment }) => {
  const response = await API.put(`/leaves/${id}/approve`, { managerComment });
  return response.data;
});

export const rejectLeave = createAsyncThunk('leaves/rejectLeave', async ({ id, managerComment }) => {
  const response = await API.put(`/leaves/${id}/reject`, { managerComment });
  return response.data;
});

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    myRequests: [],
    allRequests: [],
    pendingRequests: [],
    balance: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.myRequests = action.payload;
        state.loading = false;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.myRequests.unshift(action.payload);
        state.loading = false;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.myRequests = state.myRequests.filter(req => req._id !== action.payload);
        state.loading = false;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.allRequests = action.payload;
        state.loading = false;
      })
      .addCase(fetchPendingRequests.fulfilled, (state, action) => {
        state.pendingRequests = action.payload;
        state.loading = false;
      })
      .addCase(approveLeave.fulfilled, (state, action) => {
        state.pendingRequests = state.pendingRequests.filter(req => req._id !== action.payload._id);
        state.loading = false;
      })
      .addCase(rejectLeave.fulfilled, (state, action) => {
        state.pendingRequests = state.pendingRequests.filter(req => req._id !== action.payload._id);
        state.loading = false;
      });
  }
});

export default leaveSlice.reducer;
