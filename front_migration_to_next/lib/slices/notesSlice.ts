import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../../store";
const hydrate = createAction<RootState>(HYDRATE);
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (newNote, thunkAPI) => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();

        return thunkAPI.rejectWithValue({ error: error.errors });
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
interface MyData {}
interface MyKnownError {
  errorMessage: string;
  // ...
}
interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
export const loadNotes = createAsyncThunk(
  "notes/loadNotes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3030/api/notes");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async (updates, thunkAPI) => {
    const { id, title, content } = updates;

    try {
      const response = await fetch(`/api/notes?noteId=${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
interface MyData {
  id: string;
}
interface MyKnownError {
  errorMessage: string;
  // ...
}
interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      await fetch(`/api/notes?noteId=${id}`, { method: "DELETE" });
      return id;
    } catch (error) {
      //return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => action.payload["notes"]);

    builder.addCase(addNote.pending, (state, action) => {
      state.notes = [];
      state.loading = "loading";
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
    });
    builder.addCase(addNote.rejected, (state, action) => {
      delete state.error;
    });

    builder.addCase(loadNotes.pending, (state, action) => {
      console.log("loadNotes pending");
      state.notes = [];
      state.loading = "loading";
    });
    builder.addCase(loadNotes.fulfilled, (state, action) => {
      console.log("loadNotes.fulfiled", state, action.payload);
      state.notes = action.payload;
      state.loading = "loaded";
    });
    builder.addCase(loadNotes.rejected, (state, action) => {
      //state.error = action.payload.error;
    });
    // [HYDRATE]: (state, action) => action.payload.notes,

    // [loadNotes.pending]: (state) => {
    //   console.log("loadNotes");
    //   state.notes = [];
    //   state.loading = "loading";
    // },
    // [loadNotes.fulfilled]: (state, action) => {
    //   console.log("loadNotes.fulfiled", action.payload);
    //   state.notes = action.payload;
    //   state.loading = "loaded";
    // },
    // [loadNotes.rejected]: (state, action) => {
    //   state.loading = "error";
    //   state.error = action.payload.error;
    // },
    // [editNote.pending]: (state, action) => {
    //   const note = state.notes.find((note) => note.id === action.meta.arg.id);
    //   state.tempNote = Object.assign({}, note);
    //   note.title = action.meta.arg.title || note.title;
    //   note.content = action.meta.arg.content || note.content;
    // },
    // [editNote.fulfilled]: (state, action) => {
    //   const note = state.notes.find((note) => note.id === action.payload.id);
    //   delete state.tempNote;
    //   Object.assign(note, action.payload);
    // },
    // [editNote.rejected]: (state, action) => {
    //   const note = state.notes.find((note) => note.id === action.meta.arg.id);
    //   state.error = action.payload.error || action.error.message;
    //   Object.assign(note, state.tempNote);
    //   delete state.tempNote;
    // },
    // [deleteNote.pending]: (state, action) => {
    //   const position = state.notes.findIndex(
    //     (note) => note.id === action.meta.arg
    //   );
    //   state.backupNote = Object.assign({}, state.notes[position]);
    //   state.backupPosition = position;
    //   state.notes.splice(position, 1);
    // },
    // [deleteNote.fulfilled]: (state) => {
    //   delete state.backupNote;
    //   delete state.backupPosition;
    // },
    // [deleteNote.rejected]: (state) => {
    //   state.notes.splice(state.backupPosition, 0, state.backupNote);
    //   delete state.backupPosition;
    //   delete state.backupNote;
    // },
  },
});

// export const selectNotes = createSelector(
//   (state) => ({
//     notes: state.notes.notes,
//     error: state.notes.error,
//   }),
//   (state) => state
// );

export default notesSlice.reducer;
