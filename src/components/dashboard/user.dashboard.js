import { useDispatch, useSelector } from "react-redux";
import { UserQuizService } from "../../_services/quiz/user.quiz.service";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import user from '../../_helpers/user';
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
  Button

} from '@mui/material';
import "../../assets/css/custom.css";

const UserDashboard = () => {
  const navigate = useNavigate();


  const [appState, setAppState] = useState({
    loading: false,
    quizList: null,
    quizListByUser: null

  });
  // useEffect(() => {

  // }, []);

  async function getQuizByCode(quizcode) {
    const quizCode = { "quizcode": quizcode };
    const res = await UserQuizService.QuizeByCode(quizCode);
    const quizData = res.data.data.map(quiz => {
      return {
        quizname: quiz.data.quizname,
        quizid: quiz.data.quizid
      }
    })
    //setAppState({ quizList: quizData });
  }



  async function getQuizByUser(userid) {
    const quizCode = { "userid": userid };
    const res = await UserQuizService.QuizeByUser(quizCode);
    // const quizData = res.data.data.map(quiz => {
    //   return {
    //     quizquizDetail: quiz.quizDetail
    //   }
    // })
    setAppState({ quizListByUser: res });
  }

  if (localStorage.getItem('quizcode')) {
    getQuizByCode(localStorage.getItem('quizcode'));
    // fetchQuestions(17, 'easy');
  } else {
    getQuizByUser(user.userId);
  }

  return <>
    <div className="container">
      <div className="cel-card">
        <div className="cel-card-header">
          Question Preview

        </div>
        <div className="cel-card-body">
          <div className="row">


            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 cel-pt-20">
              <div
                contentEditable="true"
                className="content-editable-large action-link pre-ans1"
              >
                Type an answer option here
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 cel-pt-20">
              <div
                contentEditable="true"
                className="content-editable-large action-link pre-ans2"
              >
                Type an answer option here
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 cel-pt-20">
              <div
                contentEditable="true"
                className="content-editable-large action-link pre-ans3"
              >
                Type an answer option here
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 cel-pt-20">
              <div
                contentEditable="true"
                className="content-editable-large action-link pre-ans4"
              >
                Type an answer option here
              </div>
            </div>
            {/*  */}
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="mx-auto cel-pt-20">
              <Stack spacing={2} direction="row">
                {/* <Button variant="contained">Show Answer</Button> */}
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>

    <div className="cel-card-body">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 cel-pt-20">
          <div className="content-editable-large action-link pre-ans1">
            <ul>
              {appState?.quizListByUser?.map((quiz, index) => (

                <li
                  key={quiz.quizquizDetail[0].quizid}
                  value={quiz.quizquizDetail[0].quizid}
                >

                  {quiz.quizquizDetail[0].quizname}
                  {quiz.quizquizDetail[0].quizstatus}


                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>;



};

export default UserDashboard;