import { galleryService } from "../../services/GalleryService";
import {
  addComment,
  addGallery,
  deleteComment,
  deleteGallery,
  editGallery,
  getGalleries,
  getGallery,
  setGalleries,
  setGalleriesWithNewGallery,
  setGallery,
  setGalleryWithComment,
  setGalleryWithoutComment,
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

function* addGalleryHandler(action) {
  try {
    console.log("Request Payload:", action.payload);
    const newGallery = yield call(galleryService.add, action.payload);
    console.log("New Gallery:", newGallery);
    yield put(setGalleriesWithNewGallery(newGallery));
  } catch (e) {
    console.log(e);
  }
}

function* editGalleryHandler(action) {
  try {
    const gallery = yield call(
      galleryService.edit,
      action.payload.newGallery.id,
      action.payload.newGallery
    );
    yield put(setGalleriesWithNewGallery(gallery));
  } catch (e) {
    console.error(e);
  }
}

function* deleteGalleryHandler(action) {
  try {
    yield call(galleryService.delete, action.payload);
    const gallery = yield call(galleryService.getGallery);
    yield put(setGalleries(gallery));
  } catch (e) {
    console.log(e);
  }
}

function* addCommentHendler(action) {
  try {
    const newComment = yield call(galleryService.addComment, action.payload);
    yield put(setGalleryWithComment(newComment));
  } catch (e) {
    console.log(e);
  }
}

function* deleteCommentHandler(action) {
  try {
    const comment = yield call(
      galleryService.deleteComment,
      action.setPaginated
    );
    yield put(setGalleryWithoutComment(comment));
  } catch (e) {
    console.log(e);
  }
}

export function* watchForGalleries() {
  yield takeLatest(getGalleries.type, getGalleriesHandler);
  yield takeLatest(getGallery.type, getGalleryHandler);
  yield takeLatest(addGallery.type, addGalleryHandler);
  yield takeLatest(editGallery.type, editGalleryHandler);
  yield takeLatest(deleteGallery.type, deleteGalleryHandler);
  yield takeLatest(addComment.type, addCommentHendler);
  yield takeLatest(deleteComment.type, deleteCommentHandler);
}
