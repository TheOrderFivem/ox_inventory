import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory, SlotWithItem } from '../typings';

interface TooltipState {
  open: boolean;
  item: SlotWithItem | null;
  inventoryType: Inventory['type'] | null;
  inventoryId: string | null;
}

const initialState: TooltipState = {
  open: false,
  item: null,
  inventoryType: null,
  inventoryId: null,
};

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    openTooltip(
      state,
      action: PayloadAction<{ item: SlotWithItem; inventoryType: Inventory['type']; inventoryId: string }>
    ) {
      state.open = true;
      state.item = action.payload.item;
      state.inventoryType = action.payload.inventoryType;
      state.inventoryId = action.payload.inventoryId;
    },
    closeTooltip(state) {
      state.open = false;
      state.item = null;
      state.inventoryType = null;
      state.inventoryId = null;
    },
  },
});

export const { openTooltip, closeTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;
