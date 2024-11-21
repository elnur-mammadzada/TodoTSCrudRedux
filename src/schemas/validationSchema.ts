import * as yup from "yup";

export const todoValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
});
