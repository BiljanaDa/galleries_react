import HttpService from "./HttpService";

class GalleryService extends HttpService {
  getAll = async (page = 0) => {
    let endpoint = `/galleries/?page=${page}`;

    const { data } = await this.client.get(endpoint);
    return data;
  };

  getById = async (id) => {
    const { data } = await this.client.get(`/galleries/${id}`);
    return data;
  };

  add = async (newGallery) => {
    const { data } = await this.client.post("/galleries", newGallery);
    return data;
  };

  edit = async (galleryId, newGallery) => {
    const { data } = await this.client.put(
      `galleries/${galleryId}`,
      newGallery
    );
    return data;
  };

  delete = async (id) => {
    const { data } = await this.client.delete(`galleries/${id}`);
    return data;
  };

  addComment = async ({ galleryId, comment }) => {
    const { data } = await this.client.post(
      `/galleries/${galleryId}/comments`,
      comment
    );
    return data;
  };

  deleteComment = async ({ commentId }) => {
    const { data } = await this.client.delete(`/comments/${commentId}`);
    return data;
  };
}

export const galleryService = new GalleryService();
