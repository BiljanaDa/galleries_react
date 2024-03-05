import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectGallery } from "../store/gallery/selectors";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/selectors";
import useFormatedDate from "../hooks/useFormattedDate";
import {
  addComment,
  deleteComment,
  deleteGallery,
  getGallery,
} from "../store/gallery/slice";
import { CommentComponent } from "../components/CommentComponent";
import ImageComponent from "../components/ImageComponent";
import { Button, Card, Container } from "react-bootstrap";

export default function SingleGallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gallery = useSelector(selectGallery);
  const { id } = useParams();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const formattedDate = useFormatedDate(gallery.created_at, "dd-MM-yyyy HH:mm");

  const [newComment, setNewComment] = useState({ content: "" });

  const handleEditGallery = (id) => {
    navigate(`/edit-gallery/${id}`);
  };

  useEffect(() => {
    dispatch(getGallery(id));
  }, [id, dispatch]);

  const handleDeleteGallery = async (id) => {
    const response = prompt(
      "Are you sure you want to delete? If so, type 'yes' to delete."
    );
    if (response !== "yes") {
      return;
    }
    dispatch(deleteGallery(id));
    navigate("/galleries");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    dispatch(addComment({ comment: newComment, galleryId: id }));
    setNewComment({ content: "" });
  };

  const handleDeleteComment = async (commentId) => {
    const response = prompt(
      "Are you sure you want to delete comment? If so, type 'yes' to delete."
    );
    if (response !== "yes") {
      return;
    }
    const currentGallery = gallery;
    const galleryId = currentGallery.id;

    dispatch(deleteComment({ commentId, galleryId }));
    navigate(`/galleries/${galleryId}`, { replace: true });
  };

  return (
    <Container>
      {activeUser && activeUser.id === gallery.user_id && (
        <div>
          <Button
            variant="outline-primary"
            onClick={() => handleEditGallery(id)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="outline-danger"
            onClick={() => handleDeleteGallery(id)}
          >
            Delete
          </Button>
        </div>
      )}
      <h1>{gallery.title}</h1>
      <h4>
        By: {gallery?.user?.first_name} {gallery?.user?.last_name}
      </h4>
      <div>
        {formattedDate === "unknown" ? (
          <div>Unknown date</div>
        ) : (
          <div>Created at: {formattedDate}</div>
        )}
      </div>
      <p>{gallery.description}</p>
      <div>
        <ImageComponent key={gallery.id} images={gallery.images} />
      </div>
      <br></br>
      <div>
        <Card>
          <Card.Body>
            <CommentComponent
              key={gallery.id}
              gallery={gallery}
              handleDeleteComment={handleDeleteComment}
              isAuthenticated={isAuthenticated}
              handleAddComment={handleAddComment}
              newComment={newComment}
              setNewComment={setNewComment}
            />
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
