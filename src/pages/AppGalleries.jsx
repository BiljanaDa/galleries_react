import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { selectGalleries } from "../store/gallery/selectors";
import { getGalleries, setSearchUserId } from "../store/gallery/slice";
import GalleryRow from "../components/GalleryRow";
import { Button, Container, ListGroup, Row } from "react-bootstrap";

export default function AppGalleries({ myId }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const allGalleries = useSelector(selectGalleries);
  const [loadedGalleries, setLoadedGalleries] = useState([]);
  const [pageSize] = useState(10);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setSearchUserId(myId));
      dispatch(getGalleries({ page: 1, pageSize, userId: myId }));
    }
  }, [dispatch, isAuthenticated, myId, pageSize]);

  function handlePagination(page) {
    const nextPage = allGalleries.current_page + 1;
    dispatch(getGalleries({ page: page, userId: myId }));
  }

  useEffect(() => {
    if (allGalleries.data) {
      setLoadedGalleries(allGalleries.data);
    }
  }, [allGalleries.data]);

  useEffect(() => {
    if (isAuthenticated && myId && allGalleries.data) {
      const myGalleriesData = allGalleries.data.filter(
        (gallery) => gallery.user_id === myId
      );

      setLoadedGalleries(myGalleriesData);
    }
  }, [allGalleries.data, myId, isAuthenticated]);

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
      {allGalleries.current_page !== allGalleries.last_page &&
        loadedGalleries.length >= pageSize && (
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => handlePagination(allGalleries.current_page + 1)}
          >
            Load More
          </Button>
        )}
    </Container>
  );
}
