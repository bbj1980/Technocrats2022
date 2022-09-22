import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../../assets/css/custom.css";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

// **************************
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const JoinQuiz = () => {
  //

  //

  return (
    <>
      <div className="container">
        <div className="cel-card">
          <div className="cel-card-header">Join Quiz</div>
          <div className="cel-card-body">
            {/* <h2>Your Quiz name is... </h2> */}
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6 mx-auto">
                <div className="code-section">
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      className="frm-control c-height"
                      id="outlined-basic"
                      label="Enter your Quiz Code"
                      variant="outlined"
                    />
                  </Box>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 mx-auto">
                <div className="join-code">
                  Join Code
                  <div className="join-big-font">67598130</div>
                </div>
              </div>
            </div>
            <div class="row">
              {/* Next */}
              <div className="col-md-6 offset-md-3">
                <div className="mx-auto cel-pt-20">
                  <Stack spacing={2} direction="row" fullWidth>
                    <Button variant="contained" className="btn-width" fullWidth>
                      Start Game
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default JoinQuiz;
