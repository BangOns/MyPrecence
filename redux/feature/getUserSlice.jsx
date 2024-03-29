import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ValidationPrev } from "./ValidationPreview";

const initialState = {
  // Login
  userLoginFullField: [],
  userLoginPending: false,

  // Register
  RegisterAccountFullField: [],
  RegisterAccountPending: false,

  // List user
  ListUserFullField: [],
  ListUserPending: false,

  // Get user ID
  GetUserByIDSFullField: [],
  GetUserByIDSPending: false,
  // Get user IDS
  GetUserIDSFullField: [],
  GetUserIDSPending: false,
  // Update user ID
  UpdateUserByIDSFullField: [],
  UpdateUserByIDSPending: false,
  // delete user
  DeleteUserFullField: [],
  DeleteUserPending: false,
};

export const userList = createAsyncThunk("user/list", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/user", {
      method: "GET",
      cache: "no-store",
    });
    const response = await res.json();
    return thunkAPI.fulfillWithValue(response);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const LoginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Akun anda tidak ditemukan");
    }
  }
);
export const CreateUser = createAsyncThunk(
  "user/create",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Akun tidak berhasil dibuat");
    }
  }
);

export const DeleteUser = createAsyncThunk(
  "user/delete",
  async (dataid, thunkAPI) => {
    try {
      const response = await fetch(`/api/userId/${dataid}`, {
        method: "DELETE",
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Gagal menghapus user");
    }
  }
);
export const GetUserId = createAsyncThunk(
  "user/getId",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`/api/userId/${data.dataID}`, {
        method: "GET",
        cache: "no-store",
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Gagal mengambil data user");
    }
  }
);
export const GetUserById = createAsyncThunk(
  "user/getById",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`/api/userId/${data.dataID}`, {
        method: "GET",
        cache: "no-store",
      });
      const res = await response.json();
      res.data.preview = data.dataPrev;
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Gagal mengambil data user");
    }
  }
);
export const UpdateUserById = createAsyncThunk(
  "user/UpdateById",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`/api/userId/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      thunkAPI.rejectWithValue("Gagal mengambil data user");
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.userLoginFullField.push(action.payload);
        state.userLoginPending = false;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.userLoginPending = false;
      })
      .addCase(LoginUser.pending, (state) => {
        state.userLoginPending = true;
      });
    builder
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.RegisterAccountFullField.push(action.payload);
        state.RegisterAccountPending = false;
      })
      .addCase(CreateUser.rejected, (state) => {
        state.RegisterAccountPending = false;
      })
      .addCase(CreateUser.pending, (state) => {
        state.RegisterAccountPending = true;
      });
    builder
      .addCase(userList.fulfilled, (state, action) => {
        state.ListUserFullField.push(action.payload);
        state.ListUserPending = false;
      })
      .addCase(userList.rejected, (state) => {
        state.ListUserPending = false;
      })
      .addCase(userList.pending, (state) => {
        state.ListUserPending = true;
      });
    builder
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.DeleteUserFullField.push(action.payload);
        state.DeleteUserPending = false;
      })
      .addCase(DeleteUser.rejected, (state) => {
        state.DeleteUserPending = false;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.DeleteUserPending = true;
      });
    builder
      .addCase(GetUserById.fulfilled, (state, action) => {
        if (state.GetUserByIDSFullField.length !== 0) {
          const FindPreview = state.GetUserByIDSFullField.findIndex((value) => {
            return value?.data?.name === action.payload.data.name;
          });
          if (FindPreview >= 0) {
            state.GetUserByIDSFullField[FindPreview].data.preview =
              ValidationPrev(
                state.GetUserByIDSFullField[FindPreview].data.preview,
                action.payload.data.preview
              );
          } else {
            state.GetUserByIDSFullField.push(action.payload);
          }
        } else {
          state.GetUserByIDSFullField.push(action.payload);
        }

        state.GetUserByIDSPending = false;
      })
      .addCase(GetUserById.rejected, (state) => {
        state.GetUserByIDSPending = false;
      })
      .addCase(GetUserById.pending, (state) => {
        state.GetUserByIDSPending = false;
      });
    builder
      .addCase(UpdateUserById.fulfilled, (state, action) => {
        state.UpdateUserByIDSFullField.push(action.payload);
        state.UpdateUserByIDSPending = false;
      })
      .addCase(UpdateUserById.pending, (state) => {
        state.UpdateUserByIDSPending = true;
      })
      .addCase(UpdateUserById.rejected, (state) => {
        state.UpdateUserByIDSPending = false;
      });
    builder
      .addCase(GetUserId.fulfilled, (state, action) => {
        state.GetUserIDSFullField.push(action.payload);
        state.GetUserIDSPending = false;
      })
      .addCase(GetUserId.pending, (state) => {
        state.GetUserIDSPending = true;
      })
      .addCase(GetUserId.rejected, (state) => {
        state.GetUserIDSPending = false;
      });
  },
});
export default UserSlice.reducer;
