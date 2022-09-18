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

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PreviewIcon from "@mui/icons-material/Preview";
import { pink } from "@mui/material/colors";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SaveIcon from "@mui/icons-material/Save";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const AdminLiveQuiz = () => {
  //
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  //

  return (
    <>
      <div className="container">
        <div className="cel-card">
          <div className="cel-card-header">Live Quiz</div>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="ques-body">
                <div class="q-heading">
                  <div className="qn">
                    <h2 className="cel-pl-24">Aglie</h2>
                    <div class="d-flex flex-row-reverse cel-nagative-35">
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          startIcon={<CreditScoreIcon />}
                        >
                          Edit
                        </Button>
                      </Stack>
                    </div>

                    <div className="user-profile">
                      <div className="center-align white">
                        <AccountBoxIcon />
                      </div>
                    </div>
                    <div className="cel-pl-16">
                      <h5>Anurag Jain</h5>
                    </div>
                    <div className="mx-auto mt--120">
                      <Stack spacing={2} direction="row" fullWidth>
                        <Button
                          variant="contained"
                          className="btn-width"
                          fullWidth
                        >
                          Assign Homework
                        </Button>
                      </Stack>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse cel-negative-24"></div>
                </div>
                <div className="cel-pt-12"></div>
              </div>
            </div>
          </div>

          <div className="cel-card-body cel-p-0">
            <div className="h-heading">
              <h5>Questions </h5>
              <div class="d-flex flex-row-reverse cel-nagative-35 ">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    startIcon={<VisibilityOffIcon />}
                  >
                    Hide Answer
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="warning"
                    startIcon={<PreviewIcon />}
                  >
                    Preview
                  </Button>
                </Stack>
              </div>
            </div>
            <div className="q-container">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="ques-body">
                    <div class="q-heading">
                      <div className="qn">1. Multiple Choice</div>
                      <div class="d-flex flex-row-reverse cel-negative-24">
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="outlined"
                            color="info"
                            size="small"
                            startIcon={<ControlPointIcon />}
                          >
                            5 Points
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="info"
                            startIcon={<AvTimerIcon />}
                          >
                            30 Sec
                          </Button>
                        </Stack>
                      </div>
                    </div>
                    <div className="cel-pt-12">
                      <ul className="ul-list">
                        <li>
                          What is a Agile accoring to you
                          <div className="row">
                            <div className="com-sm-12 col-md-6 col-lg-6">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox defaultChecked color="success" />
                                  }
                                  label="It is just way of working"
                                />
                              </FormGroup>
                            </div>
                            <div className="com-sm-12 col-md-6 col-lg-6">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox defaultChecked color="error" />
                                  }
                                  label="It is just way of working"
                                />
                              </FormGroup>
                            </div>
                            {/*  */}
                            <div className="com-sm-12 col-md-6 col-lg-6">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox defaultChecked color="success" />
                                  }
                                  label="It is just way of working"
                                />
                              </FormGroup>
                            </div>
                            <div className="com-sm-12 col-md-6 col-lg-6">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox defaultChecked color="error" />
                                  }
                                  label="It is just way of working"
                                />
                              </FormGroup>
                            </div>
                            {/*  */}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="ques-body">
                    <div class="q-heading">
                      <div className="qn">2. Single Choice</div>
                      <div class="d-flex flex-row-reverse cel-negative-24">
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="outlined"
                            color="info"
                            size="small"
                            startIcon={<ControlPointIcon />}
                          >
                            5 Points
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="info"
                            startIcon={<AvTimerIcon />}
                          >
                            30 Sec
                          </Button>
                        </Stack>
                      </div>
                    </div>
                    <div className="cel-pt-12">
                      <ul className="ul-list">
                        <li>
                          What is a Agile accoring to you
                          <FormGroup>
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              onChange={handleChange}
                            >
                              <div className="row">
                                <div className="com-sm-12 col-md-6 col-lg-6 cel-pl-32">
                                  <FormControlLabel
                                    value="option1"
                                    control={<Radio color="error" />}
                                    label="A Matrix"
                                  />
                                </div>
                                <div className="com-sm-12 col-md-6 col-lg-6 cel-pl-32">
                                  <FormControlLabel
                                    value="option2"
                                    control={<Radio color="success" />}
                                    label="A Function"
                                  />
                                </div>
                                {/*  */}
                                <div className="com-sm-12 col-md-6 col-lg-6 cel-pl-32">
                                  <FormControlLabel
                                    value="option3"
                                    control={<Radio color="error" />}
                                    label="A Screen"
                                  />
                                </div>
                                <div className="com-sm-12 col-md-6 col-lg-6 cel-pl-32">
                                  <FormControlLabel
                                    value="option4"
                                    control={<Radio color="error" />}
                                    label="A User"
                                  />
                                </div>
                              </div>
                            </RadioGroup>
                          </FormGroup>
                          {/*  */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              {/* Next */}
              <div className="col-md-6 offset-md-3">
                <div className="mx-auto cel-pt-20">
                  <Stack spacing={2} direction="row" fullWidth>
                    <Button
                      variant="contained"
                      type="submit"
                      className="btn-width"
                      fullWidth
                    >
                      Submit
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

export default AdminLiveQuiz;
