import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Row, Col, Container } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBook } from "../Features/booksSlice";
import { AddSchemaValidation } from "../Validations/AddValidation ";

const AddBook = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.users);
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [category, setcategory] = useState("");
  const [status, setstatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddSchemaValidation),
  });

  const onSubmit = (data) => {
    const newBook = {
      title,
      author,
      category,
      status,
      ...data,
      rating: 0,
      userId: user?._id || "guest",
    };

    dispatch(createBook(newBook));
    reset(); 
    setSuccessMessage(" Book added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  return (
    <div className="auth-wrapper">
      {successMessage && (
  <div className="alert alert-success text-center mt-3">
    {successMessage}
  </div>
)}

      <Container>
        <Row className="justify-content-center">
          <Col lg="6">
            <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
              <section>
                <p className="text-center fs-3">Add New Book!</p>

                <div className="form-group">
                  <input
                   role = "title"
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter title..."
                    {...register("title", {
                      onChange: (e) => settitle(e.target.value),
                    })}
                  />
                  <p className="error text-danger">{errors.title?.message}</p>
                </div>

                <div className="form-group">
                  <input
                   role = "author"
                    type="text"
                    className="form-control"
                    id="author"
                    placeholder="Enter author..."
                    {...register("author", {
                      onChange: (e) => setauthor(e.target.value),
                    })}
                  />
                  <p className="error text-danger">{errors.author?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter category..."
                    {...register("category", {
                      onChange: (e) => setcategory(e.target.value),
                    })}
                  />
                  <p className="error text-danger">{errors.category?.message}</p>
                </div>

                <div className="form-group">
                  <select
                    className="form-control"
                    {...register("status", {
                      onChange: (e) => setstatus(e.target.value),
                    })}
                  >
                    <option value="">Select status</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="reading">Reading</option>
                    <option value="read">Read</option>
                  </select>
                  <p className="error text-danger">{errors.status?.message}</p>
                </div>

                <button type="submit" className="button btn btn-primary w-100">
                  Add Book
                </button>
              </section>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddBook;
