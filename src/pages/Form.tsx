import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import "../style/Form.css";
import swal from "sweetalert";
import { GOOGLE_SHEET_API_LINK } from "../config/api";

export const FormComponent: React.FC<{}> = (props) => {
  /**
   *@interface {GoogleSheetForm}
   *we usually use interface to create spesific type, in this case we want to use this type for our form
   * if you try to add more type it will throw error, that is exactly how it becomse easy to remember the type of your object
   *
   */
  interface GoogleSheetForm {
    name: string;
    age: string;
    salary: string;
    hobby: string;
  }

  const [form, setForm] = useState<GoogleSheetForm>({
    name: "",
    age: "",
    salary: "",
    hobby: "",
  });

  /**
   * @function updateForm
   * @param event
   * @returns {object} contains form data
   */

  const updateForm: Function = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  /**
   * @function onSubmitForm
   * @param emty
   * send a post request to the google sheets api and save the Form object in it.
   * @returns {string<Promise>}
   */
  const onSubmitForm: Function = () => {
    if (
      form.name !== "" ||
      form.age !== "" ||
      form.hobby !== "" ||
      form.salary !== ""
    ) {
      axios
        .post(GOOGLE_SHEET_API_LINK, form)
        .then(({ data }) => {
          swal("Good job!", "You clicked the button!", "success");
        })
        .catch((err) => swal(err.message, "Warning!", "warning"));
    } else {
      swal("please fill out the form!", "Warning!", "warning");
    }
  };

  return (
    <div>
      <Container fluid className="container">
        <Header as="h2">React Google Sheets!</Header>
        <Form className="form">
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Enter your name"
              name="name"
              onChange={(e) => updateForm(e)}
              value={form.name}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input
              placeholder="Enter your age"
              name="age"
              value={form.age}
              required
              onChange={(e) => updateForm(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Salary</label>
            <input
              placeholder="Enter your salary"
              name="salary"
              onChange={(e) => updateForm(e)}
              required
              value={form.salary}
            />
          </Form.Field>
          <Form.Field>
            <label>Hobby</label>
            <input
              placeholder="Enter your hobby"
              name="hobby"
              onChange={(e) => updateForm(e)}
              value={form.hobby}
              required
            />
          </Form.Field>

          <Button color="blue" type="submit" onClick={(e) => onSubmitForm(e)}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};
