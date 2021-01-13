import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { toast } from 'react-toastify';

export type RGLItem = {
  i: string;
  x: number;
  y: number; // puts it at the bottom
  w: number;
  h: number;
  item: any;
  name: any;
  static: boolean;
};

export type ComponentItem = {
  component: any;
  name: string;
  category: string;
  pageView: string; // puts it at the bottom
};

type ChangeStaticPayloadType = {
  checked: boolean;
  id: string;
};
type CurrentDisplayState = {
  layout: RGLItem[];
  layoutTemp: string;
  componentList: ComponentItem[];
  isEdit: boolean;
  isSidebarOpen: boolean;
};

const initialState: CurrentDisplayState = {
  layout: [],
  layoutTemp: '',
  componentList: [],
  isEdit: true,
  isSidebarOpen: true,
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    changeStatic(state, { payload }: PayloadAction<ChangeStaticPayloadType>) {},
    initLayout(state) {},
    addComponent(state, { payload }: PayloadAction<string>) {},

    setComponentList(state, action: PayloadAction<ComponentItem[]>) {
      state.componentList = action.payload;
    },
    removeItem(state, action: PayloadAction<string>) {},
    editHandle(state) {},
    onLayoutChange(state, action: PayloadAction<RGLItem[]>) {},
    saveLayout(state) {},

    getLoadPage(state) {},
  },
});

export const {
  initLayout,
  addComponent,
  setComponentList,
  removeItem,
  editHandle,
  onLayoutChange,
  saveLayout,
  getLoadPage,
  changeStatic,
} = editSlice.actions;

export default editSlice.reducer;
