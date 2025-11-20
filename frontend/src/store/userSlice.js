import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/user";

// Lấy thông tin profile
export const fetchProfile = createAsyncThunk("user/fetchProfile", async () => {
  const res = await axios.get(`${API}/profile`, {
    headers: { Authorization: localStorage.getItem("token") }
  });
  return res.data;
});

// Cập nhật profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data) => {
    const res = await axios.put(`${API}/profile`, data, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.error = "Không thể tải profile";
      })

      // update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  }
});

export default userSlice.reducer;
