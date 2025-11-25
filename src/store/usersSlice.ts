import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, syncUsersFromAPI } from "../db/userRepository";
import { UserDTO } from "../db/UserSchema";

// ---------------------------
// STATE TYPE
// ---------------------------
export interface UsersState {
  users: UserDTO[];
  loading: boolean;
  error?: string | null;
}

// Initial State
const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// ---------------------------
// THUNK: Load Realm + API Fallback
// ---------------------------
export const loadUsersFromDB = createAsyncThunk<UserDTO[]>(
  "users/loadFromDB",
  async () => {
    let users = await getAllUsers(); // read local Realm DB

    // If DB is empty → sync from GraphQL
    if (users.length === 0) {
      await syncUsersFromAPI();
      users = await getAllUsers(); // read again
    }

    return users;
  }
);

// ---------------------------
// SLICE
// ---------------------------
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsersFromDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadUsersFromDB.fulfilled,
        (state, action: PayloadAction<UserDTO[]>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadUsersFromDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load users";
      });
  },
});

export default usersSlice.reducer;
