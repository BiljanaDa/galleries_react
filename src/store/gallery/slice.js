import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getGalleries: () => {},
  getGallery: () => {},
  addGallery: () => {},
  editGallery: () => {},
  deleteGallery: () => {},
};

export const galleriesSlice = createSlice({
  name: "galleries",
  initialState: {
    page: {
      data: [],
      current_page: 0,
      last_page: 0,
    },
    gallery: {},
    newGallery: {
      title: "",
      description: "",
      images: [],
    },
  },
  reducers: {
    setGalleries(state, action) {
      state.page = action.payload;
    },
    setGallery(state, action) {
      state.gallery = action.payload;
    },
    setPaginaated(state, action) {
      state.page.data = [...state.page.data, ...action.payload.data];
      state.page.current_page = action.payload.current_page;
    },
    setNewGallery(state, action) {
      state.newGallery = action.payload;
    },
    setGalleriesWithNewGallery(state, action) {
      state.page.data = [...state.page.data, action.payload];
    },
    ...middlewareActions,
  },
});

export const {
  setGalleries,
  setGallery,
  setPaginated,
  getGalleries,
  getGallery,
  setGalleriesWithNewGallery,
  setNewGallery,
  addGallery,
  editGallery,
  deleteGallery,
} = galleriesSlice.actions;
export default galleriesSlice.reducer;
