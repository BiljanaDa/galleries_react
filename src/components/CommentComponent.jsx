import React from "react";
import { useSelector } from "react-redux";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/selectors";
import useFormattedDate from "../hooks/useFormattedDate";
import { Button, Card, Container, Form } from "react-bootstrap";

export const CommentComponent = ({
  gallery,
  handleDeleteComment,

  handleAddComment,
  newComment,
  setNewComment,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  const formattedDate = useFormattedDate(
    gallery.created_at,
    "dd-MM-yyyy HH:mm"
  );

  return (
    <Container>
      {gallery && gallery.comments && (
        <Card>
          <Card.Body>
            {gallery.comments.length ? <h3>Comments</h3> : <h3>No Comments</h3>}
            <ul>
              {gallery.comments.map((comment) => (
                <li key={comment.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {comment.user.first_name} {comment.user.last_name}
                      </Card.Title>
                      <Card.Text>
                        {formattedDate === "unknown" ? (
                          <div>Unknown date</div>
                        ) : (
                          <div>Created at: {formattedDate}</div>
                        )}
                      </Card.Text>
                      <Card.Text>{comment.content}</Card.Text>
                      {activeUser && activeUser.id === comment.user.id && (
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete Comment
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}

      {isAuthenticated && (
        <Card>
          <Card.Body>
            <Form onSubmit={handleAddComment}>
              <Form.Group controlId="commentForm">
                <Form.Control
                  as="textarea"
                  required
                  value={newComment.content}
                  placeholder="Enter comment"
                  onChange={({ target }) =>
                    setNewComment({ ...newComment, content: target.value })
                  }
                />
              </Form.Group>
              <Button type="submit" onClick={handleAddComment}>
                Create Comment
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};
