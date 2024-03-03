import { galleryService } from "../../services/GalleryService";
import {
  getGalleries,
  getGallery,
  setGalleries,
  setGallery,
  setPaginated,
} from "./slice";
import { call, put, takeLatest } from "redux-saga/effects";

function* getGalleriesHandler(action) {
  try {
    const galleries = yield call(galleryService.getAll, action.payload?.page);
    if (action.payload?.data > 1) {
      yield put(setPaginated(galleries));
    } else {
      yield put(setGalleries(galleries));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getGalleryHandler(action) {
  try {
    const gallery = yield call(galleryService.getById, action.payload);
    yield put(setGallery(gallery));
  } catch (e) {
    console.log(e);
  }
}

export function* watchForGalleries() {
  yield takeLatest(getGalleries.type, getGalleriesHandler);
  yield takeLatest(getGallery.type, getGalleryHandler);
}
