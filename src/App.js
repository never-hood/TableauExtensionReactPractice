import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import SimpleForm from "./components/SimpleForm";

// Declare this so our linter knows that tableau is a global object
/* global tableau */

function MainComponent() {
  const [selectedSheet, setSelectedSheet] = useState(undefined);
  const [sheetNames, setSheetNames] = useState([]);
  const sheetRef = useRef("");

  useEffect(() => {
    tableau.extensions.initializeAsync().then(() => {
      const selectedSheet = tableau.extensions.settings.get("sheet");
      console.log("The saved sheet setting is:", selectedSheet);
      setSelectedSheet(selectedSheet);

      const sheetNames = tableau.extensions.dashboardContent.dashboard.worksheets.map(
        (worksheet) => worksheet.name
      );
      console.log("Sheet names list taken from Tableau:", sheetNames);
      setSheetNames(sheetNames);
      console.log("Sheet names a little later:", sheetNames);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    console.log("This is the returned selected sheet:", sheetRef.current.value);

    event.preventDefault();
  };

  const onConfigExtention = () => {
    console.log("Sheet names passed down:", sheetNames);

    window.newOutput = (
      <div>
        <form onSubmit={handleSubmit}>
          <h4>Please select a sheet on this dashboard:</h4>
          <br />
          <select
            className="form-control"
            ref={sheetRef}
            name={"SheetSelector"}
          >
            {sheetNames.map((sheetName) => (
              <option key={sheetName.toString()} value={sheetName}>
                {sheetName}
              </option>
            ))}
          </select>
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
    setSelectedSheet(sheetRef.current.value);
  };

  let output = <p></p>;
  let initialOutput = (
    <div>
      <div>
        <h4>Extension Header</h4>
        <p>Please configure this extension first</p>
        <Button variant="info" onClick={onConfigExtention}>
          Setup
        </Button>
      </div>
    </div>
  );

  if (!selectedSheet) {
    output = initialOutput;
  }
  if (!!selectedSheet) {
    output = window.newOutput;
  }

  return <>{output}</>;
}

export default MainComponent;

/* const onConfigExtention = () => {
  console.log("Sheet names passed down:", sheetNames);

  window.newOutput = (
    <SimpleForm
      onSubmit={handleSubmit}
      sheetNames={sheetNames}
      ref={sheetRef}
    />
  );
  setSelectedSheet("City");
}; */
