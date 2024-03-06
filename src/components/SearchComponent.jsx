import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm } from "../store/gallery/selectors";
import { getGalleries, setSearchTerm } from "../store/gallery/slice";

export function SearchComponent() {
  const term = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  function handleChangeSearchTerm(event) {
    const searchTerm = event.target.value;
    dispatch(setSearchTerm(searchTerm));

    // Dodajte uvjet za pokretanje pretrage samo ako je unos teksta dovoljno dug
    if (searchTerm.length >= 3 || searchTerm.length === 0) {
      dispatch(getGalleries({ page: 1, term: searchTerm }));
    }
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
      </Col>
    </div>
  );
}
