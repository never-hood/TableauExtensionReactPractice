import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../styles/FormComponent.css";

function FormComponent(props) {
  const { sheetNames } = props;
  console.log("props", props);

  const handleSubmit = (event) => {
    console.log("This is the event:", event);
    alert(sheetName);
    event.preventDefault();
  };
  return (
    <div>
      <Modal show>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Please select a sheet on this dashboard:</Form.Label>
            <Form.Control as="select">
              {sheetNames.map((sheetName) => (
                <option key={sheetName.toString()} value={sheetName}>
                  {sheetName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default FormComponent;
