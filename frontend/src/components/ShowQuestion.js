import React, { useEffect } from "react";
/**
 * Show a question and upvote/dismiss it
 *
 * When a user clicks on the Upvote button,
 * make a PUT /api/class-session/:session-code/question/:question-id
 * to upvote the question.
 *
 * Only signed-in users should be able to dismiss the question
 *
 * If it completes successfully, call `props.onQuestionUpvoted()`
 * to tell the parent component to refresh the view
 */
const ShowQuestion = props => {
  const handleUpvote = questionId => {
    console.log("Upvoting questionId", questionId);
    const sessionCode = props.sessionCode

    fetch(`/api/class-session/${sessionCode}/question/${questionId}/upvote`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      if (response.ok){
        console.log("Upvote question successful");
        console.log(props.question.upvotes);
        props.onQuestionUpvoted()
      }else{
        console.log("Upvote question went wrong")
      }
    })
  };

  return (
    <div
      style={{
        borderTop: "1px solid darkgrey",
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex",
      }}
    >
      <div>
        <button
          className="button"
          onClick={() => handleUpvote(props.question.id)}
        >
          <i className="material-icons">recommend</i>
        </button>
      </div>
      <div style={{ marginLeft: "15px" }}>
        <b>{props.question.question}</b>
        <br />
        by {props.question.name}{" "}
        <br />
        {props.question.upvotes ? `Votes: ${props.question.upvotes}` : ""}
      </div>
      {props.isSignedIn && (
        <div style={{ marginLeft: "auto" }}>
          <button className="button is-danger">Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default ShowQuestion;
