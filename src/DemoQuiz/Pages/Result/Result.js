
import {
  Button
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Result.css";

const Result = ({ name, score }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name, navigate]);

  return (
    <div className="result">
      <img src="/congrats.png" className="banner" alt="winner" />
      <span className="title">Your final score is: {score}</span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Start New Quiz
      </Button>
    </div>
  );
};

export default Result;
