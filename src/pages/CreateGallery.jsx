import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectGallery, selectNewGallery } from "../store/gallery/selectors";
import { addGallery, setNewGallery } from "../store/gallery/slice";
import { Button, Col, Form } from "react-bootstrap";

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

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      dispatch(addGallery({ ...newGallery, images: newImages }));
      navigate("/galleries");
    }
    setValidated(true);
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

  useEffect(() => {
    if (id) {
      dispatch(setNewGallery(gallery));
      setNewImages(gallery?.images);
    }
  }, [id]);

  return (
    <div>
      <h2 style={{ padding: "10px" }}>Create New Gallery</h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Title"
            value={newGallery.title}
            onChange={({ target }) =>
              dispatch(setNewGallery({ ...newGallery, title: target.value }))
            }
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
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
            <Form.Group key={i}>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                required
                name="url"
                value={x.url}
                placeholder="Image url goes here"
                onChange={(e) => handleInputChange(e, i)}
                isInvalid={validated && !isValidImageUrl(x.url)}
                key={i}
              />
              <Col>
                {newImages?.length !== 1 && (
                  <Button variant="danger" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </Button>
                )}
              </Col>
              <Col>
                {newImages?.length - 1 === i && (
                  <Button variant="success" onClick={handleAddClick}>
                    Add more
                  </Button>
                )}
              </Col>
            </Form.Group>
          ))}
        <Button type="submit">Add Gallery</Button>
      </Form>
    </div>
  );
}
