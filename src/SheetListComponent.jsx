import React from "react";
import { Button } from "react-bootstrap";
import "./styles/SheetList.css";

function SheetListComponent(props) {
  console.log("props", props);
  const makeSheetButton = (sheetName) => {
    return (
      <div>
        <Button
          key={sheetName}
          variant="light"
          block
          //onClick={() => props.onSelectSheet(sheetName)}
        >
          {sheetName}
        </Button>
        <br />
      </div>
    );
  };

  const sheetButtons = props.sheetNames.map((sheetName) =>
    makeSheetButton(sheetName)
  );

  return <div>{sheetButtons}</div>;
}

export default SheetListComponent;
