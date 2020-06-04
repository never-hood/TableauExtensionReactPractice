import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../styles/SimpleForm.css";

const SimpleForm = React.forwardRef((props, ref) => {
  const { handleSubmit, sheetNames } = props;
  console.log("ref is:", ref);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Please select a sheet on this dashboard:</h4>
        <br />
        <select className="form-control" ref={ref} name={"shiiiiiit"}>
          {sheetNames.map((sheetName) => (
            <option key={sheetName.toString()} value={sheetName}>
              {sheetName} + {ref.current}
            </option>
          ))}
        </select>
        <br />
        <Button type="submit">Submit</Button>
        <input
          type="button"
          id="s1"
          name="s2"
          onClick={console.log("CLicked")}
        />
      </form>
    </div>
  );
});

/* 

function SimpleForm(props) {
  //const sheetRef = useRef(null);
  const { handleSubmit, sheetNames, sheetRef } = props;

  return (
    <div>
      <Modal show>
        <form onSubmit={handleSubmit} sheetNames={sheetNames}>
          <h4>Please select a sheet on this dashboard:</h4>
          <br />
          <select ref={sheetRef} className="form-control">
            {sheetNames.map((sheetName) => (
              <option key={sheetName.toString()} value={sheetName}>
                {sheetName}
              </option>
            ))}
          </select>
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  );
} */

export default SimpleForm;
