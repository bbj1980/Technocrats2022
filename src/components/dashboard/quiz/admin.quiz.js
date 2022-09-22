import React, {
  useState,
  useEffect,

} from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../../assets/css/custom.css";
import { adminQuizActions } from '../../../redux/_actions/admin.quiz.actions';
import Api from "../../../_helpers/api";


import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { userActions } from "../../../redux/_actions/user.actions";


// **************************
// import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";


import {
  Button,
  Stack,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Box
} from "@mui/material";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AdminQuiz = () => {
  //
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [quizName, setQuizName] = React.useState('');
  const [quiztime, setQuiztime] = useState();
  const handleSelectChange = (e) => {
    setQuiztime(e);

  }
  const [isOpened, setIsOpened] = useState(false);

  const [appState, setAppState] = useState({
    loading: false,
    subjectList: null,

  });
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (personName && quizName) {
      // get return url from location state or default to home page
      //const { from } = location.state || { from: { pathname: "/" } };
      dispatch(adminQuizActions.createQuiz({
        quizname: quizName,
        subjectid: 1,
        quizstatus: 'inprogress',
        quiztime: quiztime,
        istimerenabled: isOpened,
        quizcode: (Math.random() + 1).toString(36).substring(2)

      })).then(() => {
        alert("Created Succesfully")
      })
        .catch(() => {
          alert("Error")
        });
    }
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //

  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
  }

  useEffect(() => {
    setAppState({ loading: true });
    getSubjects();
  }, [setAppState]);

  async function getSubjects() {
    const res = await Api.get('/masters/subject');
    console.log(res.data.data);
    const subjectData = res.data.data.map(subject => {
      return {
        value: subject.subjectid,
        label: subject.subjectname
      }
    })
    setAppState({ subjectList: subjectData });
  }

  return (
    <>
      <div className="container">
        <div className="cel-card">
          <div className="cel-card-header">Create Quiz</div>
          <div className="cel-card-body">
            <form name="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <FormControl className="frm-control">
                    <TextField
                      fullWidth
                      id="usernameid"
                      label="Quiz Name"
                      type="text"
                      onChange={(evt) => { setQuizName(evt.target.value); }}
                    />
                  </FormControl>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <FormControl className="frm-control">
                    <InputLabel id="demo-multiple-chip-label">
                      Choose Relevent Subjects
                    </InputLabel>
                    {/* <Select>
                      <option value="volvo">Volvo</option>
                    </Select> */}

                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Choose Relevent Subjects"
                        />
                      }
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.9 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    // MenuProps={MenuProps}
                    >
                      {appState?.subjectList?.map((subject) => (
                        <MenuItem
                          key={subject.value}
                          value={subject.label}
                          style={getStyles(subject.label, personName, theme)}
                        >
                          {subject.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {/* Next */}
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <Stack spacing={2} direction="row">
                    <FormControlLabel
                      control={<Checkbox value="remember" onClick={toggle} color="primary" />}
                      label="Time Required"
                    />

                    {isOpened && (

                      <select
                        onChange={(event) => handleSelectChange(event.target.value)}
                        value={quiztime}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                      </select>

                    )}

                  </Stack>

                </div>
                {/* <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="mx-auto cel-pt-20">
                    <Stack spacing={3} direction="row">


                      <Button variant="outlined">Create Quiz</Button>
                      <Link to="/managequestion" className="nav-link">
                        <Button variant="outlined">Cancel</Button>
                      </Link>
                    </Stack>
                  </div>
                </div> */}
                <Grid item xs={12} sm={12} md={4} lg={4} style={{ textAlign: 'center' }}>
                  <div>
                    <Button className="signUpSubmit" variant="contained" type="submit" style={{ margin: 10 }}>
                      Create Quiz
                    </Button>
                    <Button className="signUpSubmit" variant="contained" >
                      Cancel
                    </Button>
                  </div>
                </Grid>


              </div>
            </form>

          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default AdminQuiz;