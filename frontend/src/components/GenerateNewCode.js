import React from "react";
/**
 * Logged in users can click a button to generate a new
 * session code.
 *
 * When a user clicks the button, send a request to
 * POST /api/class/:classId/session-code. If it returns
 * successfully, call the `props.onCodeGenerated` callback
 * to tell the parent component to refresh the view
 */
const GenerateNewCode = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("On handle create session");

    fetch(`/api/class/${props.classId}/session-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Create session successful");
        props.onCodeGenerated();
      } else {
        console.log("Create classes went wrong");
      }
    });
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <button className="button is-primary">Generate New Code</button>
      </form>
    </div>
  );
};

export default GenerateNewCode;
