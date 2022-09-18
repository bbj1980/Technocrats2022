import logo from "./logo.svg";
// import './App.css';
import "./assets/css/custom.css";

import { Row, Button, Col } from "react-bootstrap";

import React, { useState, Suspense } from "react";

function App() {
  const CustomDialog = React.lazy(() => import("./customDialog/customDialog"));
  const [showModal, setShowModal] = useState(false);
  const hideEvent = () => {
    setShowModal(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Row className="mx-0">
          <Button as={Col} variant="primary" onClick={() => setShowModal(true)}>
            Show Modal
          </Button>
          <Suspense fallback={<div>Loading ...</div>}>
            {showModal && (
              <CustomDialog
                show={showModal}
                size="lg"
                title={"test"}
                hideEvent={hideEvent}
              />
            )}
          </Suspense>
        </Row>
      </header>
    </div>
  );
}

export default App;
