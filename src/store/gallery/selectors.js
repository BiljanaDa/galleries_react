export function selectGalleries(state) {
  return state.galleries.page;
}
export function selectGallery(state) {
  return state.galleries.gallery;
}

export function selectNewGallery(state) {
  return state.galleries.newGallery;
}

export function selectSearchUserId(state) {
  return state.galleries.userId;
}

export function selectSearchTerm(state) {
  return state.galleries.term;
}

export function selectPaginations(state) {
  return state.galleries.pagination;
}
