import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,Row, Col,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooks,deleteBook, updateBookRating,
} from "../Features/booksSlice";
import { FaStar, FaRegStar } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  // const { books } = useSelector((state) => state.books);
  const { books } = useSelector((state) => state.books || { books: [] }); 

  const { user } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  
  const totalBooks = books.length;
  const readBooks = books.filter((book) => book.status === "read").length;
  const readingBooks = books.filter((book) => book.status === "reading").length;
  const wantToReadBooks = books.filter((book) => book.status === "wantToRead").length;
  const recentBooks = [...books].reverse();

  const handleRatingChange = (bookId, newRating) => {
    dispatch(updateBookRating({ bookId, newRating }));
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(bookId));
    }
  };

  
  return (
    <div className="home-page container mt-4">
      <h2 className="mb-3">Welcome {user?.name}</h2>

      <Row className="mb-4">
        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Total Books</CardTitle>
              <CardText>{totalBooks}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Read</CardTitle>
              <CardText>{readBooks}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Reading</CardTitle>
              <CardText>{readingBooks}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Want to Read</CardTitle>
              <CardText>{wantToReadBooks}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <div>
        <h4 className="custom-heading">Books:</h4>
        {recentBooks.length === 0 ? (
          <p>No books added yet.</p>
        ) : (
          <Row>
            {recentBooks.map((book, idx) => (
              <Col key={idx} md="4" className="mb-3">
                <Card>
                  <CardBody>
                    <CardTitle tag="h6">{book.title}</CardTitle>
                    <CardText>Status: {book.status}</CardText>
                    <CardText>Author: {book.author}</CardText>

                    <CardText>
                      Rating:{" "}
                      <span className="star-rating">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            onClick={() => handleRatingChange(book._id, i + 1)}
                            style={{ cursor: "pointer" }}
                          >
                            {i < book.rating ? (
                              <FaStar color="gold" />
                            ) : (
                              <FaRegStar color="lightgray" />
                            )}
                          </span>
                        ))}
                      </span>
                    </CardText>

                    <CardText>Category: {book.category}</CardText>
                    <CardText>User ID: {book.userId}</CardText>

                    {/* Notes Section */}
                    {book.notes && book.notes.length > 0 && (
                      <div>
                        <strong>Notes:</strong>
                        <ul>
                          {book.notes.map((note, i) => (
                            <li key={i}>{note.content}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="d-flex gap-2 mt-2">
                     
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
