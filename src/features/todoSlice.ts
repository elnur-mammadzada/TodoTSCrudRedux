import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoInitialState, TodoType } from "../types/types";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "fetchTodos",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<TodoType[]>(
        "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/todos"
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);
export const addTodo = createAsyncThunk(
  "addTodo",
  async (newTodo: TodoType, thunkApi) => {
    try {
      const response = await axios.post<TodoType>(
        "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/todos",
        newTodo
      );
      thunkApi.dispatch(fetchTodos());
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);
export const getById = createAsyncThunk<TodoType, number | undefined>(
  "todoById",
  async (id, thunkApi) => {
    if (!id) {
      return thunkApi.rejectWithValue("ID mövcud deyil.");
    }
    try {
      const response = await axios.get<TodoType>(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/todos/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "deleteTodos",
  async (id: number | undefined, thunkApi) => {
    try {
      await axios.delete(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/todos/${id}`
      );
      thunkApi.dispatch(fetchTodos());

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);
export const updateTodos = createAsyncThunk(
  "updateTodos",
  async (updatedTodos: TodoType, thunkApi) => {
    try {
      const response = await axios.put(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/todos/${updatedTodos.id}`,
        updatedTodos
      );
      thunkApi.dispatch(fetchTodos());
      const data = response.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

const initialState: TodoInitialState = {
  todos: [],
  loading: false,
  isSnackbarOpen: false,
  snackbarMessage: "",
  error: null,
  getById: {},
  todoById: {
    id: 0,
    name: "",
    description: "",
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,

  reducers: {
    closeSnackbar: (state) => {
      state.isSnackbarOpen = false;
      state.snackbarMessage = "";
    },
  },
  extraReducers: (builder) => {
    //GET
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<TodoType[]>) => {
          state.loading = false;
          state.todos = action.payload;
        }
      )
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });

    // ADD

    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Todo yaradıldı:  ${action.payload.name}`;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = String(action.payload);
      });

    // DELETE
    builder
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Todo silindi:  ${action.payload}`;
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.error = String(action.payload);
      });

    // GETBYID
    builder.addCase(getById.fulfilled, (state, action) => {
      state.loading = false;
      state.todoById = action.payload;
    });

    builder.addCase(getById.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    //UPDATE

    builder;
    builder;
    builder
      .addCase(updateTodos.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Düzəliş olundu: ${
          action.payload.name || "Naməlum Todo"
        }`;
      })

      .addCase(updateTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });
  },
});

export const { closeSnackbar } = todoSlice.actions;

export default todoSlice.reducer;
