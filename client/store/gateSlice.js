import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllGates = createAsyncThunk("gate/getAllGates", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/gate/Allgates`
    );
    return response?.data;
  } catch (error) {
    return error.response.data;
  }
});

export const addGate = createAsyncThunk("gate/addGate", async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/gate/gates`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log("Error ocurred", error);
  }
});

export const updateGate = createAsyncThunk("gate/updateGate", async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/gate/gates/update/${data.id}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log("Error ocurred", error);
  }
});

export const deleteGate = createAsyncThunk("gate/deleteGate", async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/gate/gates/delete/${id}`
    );
    return response?.data;
  } catch (error) {
    console.log("Error ocurred", error);
  }
});

export const addGateMember = createAsyncThunk(
  "gate/addGateMember",
  async ({data,id}) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/gate/gates/${id}/members`,
        {data}
      );
      return response?.data;
    } catch (error) {
      console.log("Error ocurred", error);
    }
  }
);

export const deleteGateMember = createAsyncThunk(
  "gate/deleteGateMember",
  async ({gateId,index}) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/gate/gates/${gateId}/members/${index}`
      );
      return response?.data;
    } catch (error) {
      console.log("Error ocurred", error);
    }
  }
);

const initialState = {
  gates: [],
  deletedGateId: null,
  isLoading: false,
  error: null,
};

const gateSlice = createSlice({
  name: "gate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gates = action.payload?.data;
      })
      .addCase(getAllGates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(addGate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gates = [...state.gates, action.payload?.data];
      })
      .addCase(addGate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(updateGate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gates = state.gates?.map((gate) =>
          gate._id === action.payload?.data._id ? action.payload?.data : gate
        );
      })
      .addCase(updateGate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(deleteGate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deletedGateId = action.payload?.data._id;
      })
      .addCase(deleteGate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(addGateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gates = state.gates.map((gate) =>
          gate.id === action.payload?.data.id ? action.payload?.data : gate
        );
      })
      .addCase(addGateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(deleteGateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gates = state.gates.map((gate) =>
          gate.id === action.payload?.data.id ? action.payload?.data : gate
        );
      })
      .addCase(deleteGateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});

export default gateSlice.reducer;
