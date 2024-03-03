import * as authSagas from "./auth/saga";
import * as galleriesSagas from "./gallery/saga";

const sagas = {
  ...authSagas,
  ...galleriesSagas,
};

export default sagas;
