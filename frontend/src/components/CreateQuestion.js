import React from "react";
/**
 * Create a question for a class session
 *
 * A user can provide the content of their question,
 * and their name. When they submit the form, make a
 * POST /api/class-session/:session-code/question
 * with the value of their inputs in the body of
 * the request.
 *
 * If it is successful, call `props.onQuestionCreated()`
 * to tell the parent component to refresh the view
 */
const CreateQuestion = props => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log("On create question form submitted");
    const sessionCode = props.sessionCode
    let Username = "Anonymous";
    if (e.target.Username.value){
      Username = e.target.Username.value;
    }

    fetch(`/api/class-session/${sessionCode}/question`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({question: e.target.questioncontent.value, name:Username})
    }).then(response=>{
      if (response.ok){
        console.log("Create question successful")
        props.onQuestionCreated()
      }else{
        console.log("Create question went wrong")
      }
    })

  };
  return (
    <>
      <div className="has-text-centered">
        <h1 className="title">Ask a Question</h1>
      </div> <br />
      <form
        className="is-flex is-flex-direction-column is-align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="field" style={{ width: "50%" }}>
          <label className="label" htmlFor="question">
            Type your question
          </label>
          <div className="control">
            <input name ="questioncontent" className = "input" />
          </div>
        </div>
        <div className="field" style={{ width: "50%" }}>
          <label className="label" htmlFor="name">
            Name (optional)
          </label>
          <input name ="Username" className = "input" />
        </div>

        <div className="field">
          <div className="control">
            <input type ="submit" className = "button is-primary"/>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateQuestion;
