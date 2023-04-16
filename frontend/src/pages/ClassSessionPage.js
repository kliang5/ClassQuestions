import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListQuestions from "./../components/ListQuestions";
import CreateQuestion from "./../components/CreateQuestion";

/**
 * Allow users to ask questions, and view
 * other questions in the class session.
 *
 * When this component first loads, grab the questions
 * for this session code by making a
 * GET /api/class-session/:session-code request
 *
 * If it is successful, save the questions from the request
 * into the state.
 *
 * If a user submits a question or a question on the list
 * is upvoted, reload the latest questions from the server
 */
const ClassSessionPage = props => {
  const [questions, setQuestions] = useState([]);
  const { sessionCode } = useParams();

  useEffect(() => {
    console.log("This ran once! -session");
    fetch(`/api/class-session/${sessionCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Get question got ok response");
        response.json().then((questions) => {
          const Ques = questions.questions;
          console.log(Ques);
          console.log("Up is loaded questions");
          setQuestions(Ques);
        });
      } else {
        console.log("Get questions went wrong");
      }
    });
  }, [questions.length]);

  const onQuestionCreated = () => {
    console.log("On question created");
    fetch(`/api/class-session/${sessionCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Get question got ok response");
        response.json().then((questions) => {
          const Ques = questions.questions;
          console.log(Ques);
          console.log("Up is loaded questions");
          setQuestions(Ques);
        });
      } else {
        console.log("Get questions went wrong");
      }
    });
  };

  const onQuestionUpvoted = () => {
    console.log("On question upvoted");
    fetch(`/api/class-session/${sessionCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Get question got ok response");
        response.json().then((questions) => {
          const Ques = questions.questions;
          console.log(Ques);
          console.log("Up is loaded questions");
          setQuestions(Ques);
        });
      } else {
        console.log("Get questions went wrong");
      }
    });
  };

  return (
    <section>
      <div className="container">
        <CreateQuestion
          sessionCode={sessionCode}
          onQuestionCreated={onQuestionCreated}
        />
      </div>
      <div className="container">
        <ListQuestions
          sessionCode={sessionCode}
          questions={questions}
          isSignedIn={false}
          onQuestionUpvoted={onQuestionUpvoted}
        />
      </div>
    </section>
  );
};

export default ClassSessionPage;
