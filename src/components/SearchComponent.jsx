import React, { useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  selectSearchUserId,
} from "../store/gallery/selectors";
import { getGalleries, setSearchTerm } from "../store/gallery/slice";

export function SearchComponent() {
  const term = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const userId = useSelector(selectSearchUserId);

  useEffect(() => {
    if (!term) {
      dispatch(getGalleries({ page: 1, term: "" }));
    }
  }, [term, dispatch]);

  function handleChangeSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: userId }));
  }

  return (
    <div className="d-flex flex-column align-items-center">
      {" "}
      {/* Dodane klase za centriranje */}
      <Col xs={6} sm={4} md={3} lg={3}>
        <Form.Control
          type="text"
          onChange={handleChangeSearchTerm}
          placeholder="Input search term here"
          className="mr-sm-2"
        />
        <Button variant="outline-primary" onClick={handleSearch}>
          Search
        </Button>
      </Col>
    </div>
  );
}
