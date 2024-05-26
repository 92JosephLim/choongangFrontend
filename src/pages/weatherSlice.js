import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getList2 } from '../api/openWeather';

export const fetchWeatherData = createAsyncThunk('weather/fetchWeatherData', async () => {
  const response = await getList2();
  return response;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: [],
    selectedCity: '',
    selectedDate: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.selectedCity = action.payload.length > 1 ? action.payload[1].urlKRName : '';
        state.selectedDate = new Date().toISOString().split('T')[0];
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCity, setSelectedDate } = weatherSlice.actions;

export default weatherSlice.reducer;
