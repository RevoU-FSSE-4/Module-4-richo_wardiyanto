import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import FetchData from "./fetch";
import Category from "./category";

const DeleteCategory = () => {
  const idParams = useParams();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const optionGet = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      try {
        const response: Category = await FetchData(
          `https://library-crud-sample.vercel.app/api/category/${idParams.id}`,
          optionGet
        );
        setCategory(response.category_name);
        setDescription(response.category_description);
        setIsActive(response.is_active);
        setId(response.id);
      } catch (error: any) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    console.log("submitting");
    const newCategory: Category = {
      category_name: category,
      category_description: description,
      is_active: true,
      id: id,
    };

    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newCategory),
    };

      const response = await FetchData(
        `https://library-crud-sample.vercel.app/api/category/${idParams.id}`,
        option
      );
      if (response) {
        alert("Category Deleted Successfully");
        navigate("/insideLogin");
      }
    };

  return (
    <>
      <Formik
        initialValues={{
          category_name: "",
          description: "",
          is_active: false,
        }}
        onSubmit={(values: any, actions: any) => {
          handleSubmit(values);
          actions.resetForm();
        }}
      >
        <Form className="max-w mt-5 mb-5">
        
          <Field
            type="text"
            name="category_name"
            placeholder="Category Name"
            className="border border-gray-400 rounded-sm px-2 py-1 m-5 text-black"
            onChange={(e: any) => {
              setCategory(e.target.value);
            }}
            value={category}
          />

          <Field
            type="text"
            name="description"
            placeholder="Description"
            className="border border-gray-400 rounded-sm px-2 py-1 mr-2 text-black"
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
            value={description}
          />

          <Field
            type="checkbox"
            name="is_active"
            className="border border-gray-400 rounded-sm px-2 py-1 mr-2 text-black w-8 h-10"
            onChange={(e: any) => {
              setIsActive(e.target.checked);
            }}
            checked={isActive}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-sm mt-2"
          >
            Delete
          </button>
        </Form>
      </Formik>
    </>
  );
};


export default DeleteCategory;
