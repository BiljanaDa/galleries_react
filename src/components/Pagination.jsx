import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { selectGalleries } from "../store/gallery/selectors";
import { getGalleries } from "../store/gallery/slice";
import { Button, Container, ListGroup, Row } from "react-bootstrap";

export default function PaginationComponent() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const galleries = useSelector(selectGalleries);
  const [loadedGalleries, setLoadedGalleries] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    dispatch(getGalleries({ page: 1, pageSize }));
  }, [dispatch, isAuthenticated, pageSize]);

  useEffect(() => {
    if (galleries.data) {
      setLoadedGalleries(galleries.data.slice(0, pageSize));
    }
  }, [galleries.data, isAuthenticated, pageSize]);

  function handlePagination() {
    const nextPage = galleries.current_page + 1;
    dispatch(getGalleries({ page: nextPage, pageSize }));
  }

  useEffect(() => {
    // Resetujemo prikazane galerije kada se promeni autentifikacija
    setLoadedGalleries([]);
  }, [isAuthenticated]);

  useEffect(() => {
    // Ažuriramo prikazane galerije kada se podaci sa servera promene
    if (galleries.data && isAuthenticated) {
      setLoadedGalleries((prevGalleries) => [
        ...prevGalleries,
        ...galleries.data.slice(pageSize),
      ]);
    }
  }, [galleries.data, isAuthenticated, pageSize]);

  return (
    <div>
      {galleries.current_page < galleries.last_page && (
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => handlePagination()}
        >
          Load More
        </Button>
      )}
    </div>
  );
}
