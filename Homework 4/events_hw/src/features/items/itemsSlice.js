import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { moviesService } from '../../services/moviesService';

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
  page: 1,
  totalPages: 1,
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const trimmedQuery = (query || '').trim();
      const data = trimmedQuery
        ? await moviesService.searchMovies(trimmedQuery, page)
        : await moviesService.getNowPlaying(page);

      return {
        results: data.results,
        total_pages: data.total_pages,
        query: trimmedQuery,
        page,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    }
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, { rejectWithValue }) => {
    try {
      return await moviesService.getById(id);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.results;
        state.totalPages = action.payload.total_pages || 1;
        state.page = action.payload.page || 1;
        state.query = action.payload.query ?? '';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload ?? action.error.message ?? 'Ошибка';
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload ?? action.error.message ?? 'Ошибка';
      });
  },
});

export const { setQuery } = itemsSlice.actions;

export default itemsSlice.reducer;

