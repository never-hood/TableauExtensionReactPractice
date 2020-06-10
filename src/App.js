import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
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
      const selectedSheet1 = tableau.extensions.settings.get("sheet");
      console.log("The saved sheet setting is:", selectedSheet1);
      setSelectedSheet(selectedSheet1);

      const sheetNames1 = tableau.extensions.dashboardContent.dashboard.worksheets.map(
        (worksheet) => worksheet.name
      );
      console.log("Sheet names list taken from Tableau:", sheetNames1);
      setSheetNames(sheetNames1);
      console.log("Sheet names set with a hook:", sheetNames);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadColumns = (sheet) => {
    console.log("4.About to load columns for ", sheet);
    sheet.getUnderlyingDataAsync().then((marks) => {
      //const worksheetData = marks.data[0];
      //const headers = worksheetData.columns.map((column) => column.fieldName);
      console.log("5.The marks for this sheet are:", marks);
    });
  };

  const loadSheet = (sheet) => {
    console.log("1.About to load columns of the sheet:", sheet);
    console.log("2.About to load columns of the sheet:", selectedSheet);

    const sheetName = sheet || selectedSheet;
    const theSheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(
      (worksheet) => worksheet.name === sheetName
    );
    console.log("3.The sheet object from Tableau is", theSheet);

    loadColumns(theSheet);
  };

  const handleSubmit = (event) => {
    console.log("This is the returned selected sheet:", sheetRef.current.value);
    setSelectedSheet(sheetRef.current.value);
    console.log("This is the saved sheet:", selectedSheet);
    window.newOutput = (
      <div>
        <h3>The sheet you chose is:</h3>
        <strong> {sheetRef.current.value}</strong>
      </div>
    );
    loadSheet(sheetRef.current.value);

    event.preventDefault();
  };

  const onConfigExtention = () => {
    console.log("Sheet names passed down:", sheetNames);

    window.newOutput = (
      <div>
        <Modal show>
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
        </Modal>
      </div>
    );
    setSelectedSheet("NotEmpty");
    console.log("Putting this value for selectedSheet:", selectedSheet);
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
