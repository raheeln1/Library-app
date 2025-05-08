import * as yup from "yup"; //import all exports from the yup

export const AddSchemaValidation = yup.object().shape({
  title: yup
  .string()
  .required("Title is required")
  .min(2, "Title must be at least 2 characters"),

author: yup
  .string()
  .required("Author is required")
  .min(2, "Author must be at least 2 characters"),

category: yup
  .string()
  .required("Category is required"),

status: yup
  .string()
  .oneOf(["wantToRead", "reading", "read"], "Invalid status")
  .required("Status is required"),
  });
  