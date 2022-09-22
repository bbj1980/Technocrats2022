import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Api from "../../../_helpers/api";

import {
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar,
  Collapse,
  ListSubheader,
  ListItemIcon,
  ExpandLess,
  ExpandMore,
  Stack,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/css/custom.css";
import EditIcon from "@mui/icons-material/Edit";
const QuestionList = () => {
  const [quizName, setQuizName] = React.useState([]);

  const [appState, setAppState] = useState({
    loading: false,
    quizList: null,
    questionList: null,
  });

  async function getQuizList() {
    const res = await Api.get("/quiz/allquiz");
    console.log(res.data.data);
    const quizData = res.data.data.map((quiz) => {
      return {
        quizid: quiz.quizid,
        quizname: quiz.quizname,
        subjectid: quiz.subjectid,
        quizstatus: quiz.quizstatus,
        quiztime: quiz.description,
        istimerenabled: quiz.questionmarks,
        quizcode: quiz.questiontime,
      };
    });
    setAppState({ quizList: quizData });
  }
  async function QuizeByCode(quiz) {
    const res = await Api.post("question/findquestionbyid", quiz);
    return res;
  }
  async function getQuestionList() {
    const res = await QuizeByCode("");

    console.log(res.data.data);
    // const questionData = res.data.data.map(question => {
    //   return {
    //     "questionid": question.questionid,
    //     "questiontext": question.questiontext,
    //     "subjectid": question.subjectid,
    //     "questionTypeid": question.questionTypeid,
    //     "description": question.description,
    //     "questionmarks": question.questionmarks,
    //     "questiontime": question.questiontime,
    //     "isactive": question.isactive,
    //     "isMandatory": question.isMandatory
    //   }
    // })

    setAppState({
      questionList: res.data.data.map((questionData) => [
        {
          question: questionData.questions.questiontext,
          questionmarks: questionData.questionmarks,
          isMandatory: questionData.isMandatory,
          description: questionData.description,
          isactive: questionData.isactive,
          subjectid: questionData.subjectid,
          answer: questionData.answer.map((answerData) => answerData.answer),
        },
      ]),
    });
  }
  useEffect(() => {
    //setAppState({ loading: true });
    getQuizList();
    getQuestionList();
  }, [setAppState]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setQuizName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <div className="container">
        Quiz List
        <div className="col-sm-12 col-md-6 col-lg-6">
          <FormControl className="frm-control">
            <InputLabel id="demo-multiple-chip-label">Quiz Name</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={quizName}
              onChange={handleChange}
            >
              {appState?.quizList?.map((quiz) => (
                <MenuItem key={quiz.quizid} value={quiz.quizname}>
                  {quiz.quizid}
                  {quiz.quizname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        {/* {appState?.questionList?.map((quiz) => (
          <MenuItem
            key={quiz.quizid}
            value={quiz.quizname}
          >
            {quiz.questiontext}

          </MenuItem>
        ))} */}

        {/* 
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {appState?.questionList?.map((questions) => (
            <span> {questions[0].question}</span>

            
          ))}

        </List> */}
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Question List</ListSubheader>
          }
        >
          {appState?.questionList?.map((questions, questionIndex) => {
            console.log("Question", questions);
            const answerList = questions[0].answer;
            return (
              <>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="content-editable cel-card-header content-editable-large">
                    <ListItem>
                      <span>Question </span>&nbsp;
                      <span>{questionIndex + 1}.</span>
                      <div className="list-typograph">
                        <ListItemText primary={questions[0].question} />
                      </div>
                      <span>{questions[0].isMandatory}</span>
                      <break></break>
                      <br />
                      <br />
                      <div className="block">
                        Description : {questions[0].description}
                      </div>
                      <span>{questions[0].isactive}</span>
                      <span>{questions[0].subjectid}</span>
                      <a href="#" className="right-menu">
                        {" "}
                        <EditIcon />
                      </a>
                    </ListItem>
                  </div>
                </div>
                <div className="content-editable-large action-link pre-ans3">
                  {/* <Collapse timeout="auto" unmountOnExit> */}

                  <List component="div" disablePadding>
                    <Stack direction="row" spacing={2}>
                      {answerList.map((answer, i = 1) => (
                        <>
                          <span>{i}.</span>
                          <ListItem key={i}>
                            <ListItemText inset primary={answer} />
                          </ListItem>
                        </>
                      ))}
                    </Stack>
                  </List>
                  {/* </Collapse> */}
                </div>
              </>
            );
          })}
        </List>
      </div>
    </>
  );
};

export default QuestionList;
