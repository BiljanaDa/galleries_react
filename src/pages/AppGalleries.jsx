import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/selectors";
import {
  selectGalleries,
  selectSearchTerm,
  selectSearchUserId,
} from "../store/gallery/selectors";
import {
  getGalleries,
  loadMoreGalleries,
  setSearchTerm,
  setSearchUserId,
} from "../store/gallery/slice";
import GalleryRow from "../components/GalleryRow";
import { Button, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { SearchComponent } from "../components/SearchComponent";

export default function AppGalleries({ myId }) {
  const dispatch = useDispatch();
  const allGalleries = useSelector(selectGalleries);
  const [loadedGalleries, setLoadedGalleries] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const term = useSelector(selectSearchTerm);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(setSearchUserId(null));
      dispatch(setSearchTerm(null));

      dispatch(getGalleries({ page: 1, term: null, userId: null, pageSize }));
    };
    handleRouteChange();

    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (myId) {
      dispatch(setSearchUserId(myId));
      dispatch(getGalleries({ page: 1, term: null, userId: myId, pageSize }));
    }
    if (id) {
      dispatch(setSearchUserId(id));
      dispatch(getGalleries({ page: 1, term: null, userId: id, pageSize }));
    }
    if (!id && !myId) {
      dispatch(setSearchUserId(null));
      dispatch(getGalleries({ page: 1, term: null, userId: null, pageSize }));
    }
  }, [myId, id, dispatch, pageSize]);


  function handlePagination(page) {

    // const userId = myId || id || null;

    // dispatch(loadMoreGalleries({ page: page, term: term, userId: userId }))

    if (myId) {
      dispatch(loadMoreGalleries({ page: page, term: term, userId: myId }));
    }
    if (id) {
      dispatch(loadMoreGalleries({ page: page, term: term, userId: id }));
    }
    if (!id && !myId) {
      dispatch(loadMoreGalleries({ page: page, term: term, userId: null }));
    }
  }

  useEffect(() => {
    if (allGalleries.data) {
      setLoadedGalleries(allGalleries.data);
    }
  }, [allGalleries.data, setLoadedGalleries]);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <SearchComponent />
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
