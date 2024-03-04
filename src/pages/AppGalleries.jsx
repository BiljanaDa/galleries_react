import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { selectGalleries } from "../store/gallery/selectors";
import { getGalleries } from "../store/gallery/slice";
import GalleryRow from "../components/GalleryRow";
import { Button, Container, ListGroup, Row } from "react-bootstrap";

export default function AppGalleries() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const galleries = useSelector(selectGalleries);
  const [loadedGalleries, setLoadedGalleries] = useState([]);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(getGalleries({ page: 1, pageSize }));
  }, [dispatch, isAuthenticated, pageSize]);

  function handlePagination() {
    const nextPage = galleries.current_page + 1;
    dispatch(getGalleries({ page: nextPage }));
  }
  useEffect(() => {
    if (galleries.data) {
      setLoadedGalleries(galleries.data);
    }
  }, [galleries.data]);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <ListGroup>
          {loadedGalleries.length ? (
            loadedGalleries.map((gallery) => (
              <GalleryRow key={gallery.id} gallery={gallery} />
            ))
          ) : (
            <div>No galleries created.</div>
          )}
        </ListGroup>
      </Row>
      {galleries.current_page < galleries.last_page && (
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => handlePagination()}
        >
          Load More
        </Button>
      )}
    </Container>
  );
}
