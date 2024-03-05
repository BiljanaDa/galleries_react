import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

export default function GalleryRow({ gallery }) {
  const formattedDate = useFormattedDate(
    gallery.created_at,
    "dd-MM-yyyy HH:mm"
  );

  return (
    <Card
      style={{ width: "25rem", height: "30rem", marginBottom: "20px" }}
      className="mx-auto"
    >
      <Card.Img
        variant="top"
        src={gallery?.images[0]?.url}
        alt={gallery.title}
        style={{ height: "15rem" }}
      />
      <Card.Body>
        <Link to={`/galleries/${gallery.id}`}>
          <Card.Title>{gallery.title}</Card.Title>
        </Link>
        {formattedDate === "unknown" ? (
          <div>Unknown date</div>
        ) : (
          <div>Created at: {formattedDate}</div>
        )}
        <Card.Text>{gallery.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          By:{" "}
          {gallery.user ? (
            <Link to={`/authors/${gallery.user.id}`}>
              {gallery?.user?.first_name} {gallery?.user?.last_name}
            </Link>
          ) : (
            "Unknown User"
          )}
        </small>
      </Card.Footer>
    </Card>
  );
}
