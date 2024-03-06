import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectGallery, selectNewGallery } from "../store/gallery/selectors";
import {
  addGallery,
  editGallery,
  setNewGallery,
  setResetForm,
} from "../store/gallery/slice";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { galleryService } from "../services/GalleryService";

export default function CreateGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gallery = useSelector(selectGallery);
  const newGallery = useSelector(selectNewGallery);
  const [newImages, setNewImages] = useState([{ url: "" }]);
  const [validated, setValidated] = useState(false);

  const isValidImageUrl = (url) => {
    const imageExtensions = /\.(png|jpg|jpeg)$/;
    return imageExtensions.test(url);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    newImages.forEach((image) => {
      if (!isValidImageUrl(image.url)) {
        isValid = false;
      }
    });

    if (!isValid) {
      setValidated(true);
      return;
    }
    if (id) {
      dispatch(
        editGallery({
          newGallery: {
            id: id,
            title: newGallery.title,
            description: newGallery.description,
            images: newImages,
          },
        })
      );
      dispatch(setResetForm());
      navigate(`/galleries/${gallery.id}`);
    } else {
      dispatch(addGallery({ ...newGallery, images: newImages }));
      dispatch(setResetForm());
      navigate("/galleries/my-galleries");
    }
    dispatch(setResetForm());
  };

  const handleInputChange = (e, index) => {
    const list = [...newImages];
    list[index][e.target.name] = e.target.value;
    setNewImages(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...newImages];
    list.splice(index, 1);
    setNewImages(list);
  };

  const handleAddClick = () => {
    setNewImages([...newImages, { url: "" }]);
  };

  const handleSingleGallery = async (id) => {
    if (id) {
      const response = await galleryService.getById(id);
      dispatch(setNewGallery(response));
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (id) {
      navigate(`/galleries/${gallery.id}`);
    } else {
      navigate("/galleries/me");
    }
  };

  useEffect(() => {
    if (id) {
      handleSingleGallery(id);
    }
  }, [id]);

  return (
    <Container>
      <h2 style={{ padding: "10px" }}>
        {id ? "Edit Gallery" : "Create New Gallery"}
      </h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={newGallery.title}
            onChange={({ target }) =>
              dispatch(setNewGallery({ ...newGallery, title: target.value }))
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={newGallery.description}
            onChange={({ target }) =>
              dispatch(
                setNewGallery({ ...newGallery, description: target.value })
              )
            }
          />
        </Form.Group>

        {newImages &&
          newImages.map((x, i) => (
            <Row key={i} className="mb-3">
              <Col>
                <Form.Control
                  required
                  name="url"
                  placeholder="Image URL"
                  value={x.url}
                  onChange={(e) => handleInputChange(e, i)}
                  isInvalid={!isValidImageUrl(x.url)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid image URL ending with .png, .jpg, or
                  .jpeg.
                </Form.Control.Feedback>
              </Col>
              {newImages.length - 1 === i && (
                <Col xs="auto">
                  <Button variant="primary" onClick={handleAddClick}>
                    Add More
                  </Button>
                </Col>
              )}
            </Row>
          ))}

        <Form.Group>
          <Button variant="primary" type="submit">
            {id ? "Edit" : "Add Gallery"}
          </Button>{" "}
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
