import React, { useEffect, useState } from "react";
import ListClasses from "../components/ListClasses";
import CreateClass from "../components/CreateClass";

/**
 * Show classes on the Instructor Home Page
 *
 * When this component loads for the first time,
 * load the users classes with a GET /api/classes.
 * Save it to the component state.
 *
 * Users can create new class codes, and classes from this page.
 * When a class code is generated or a new class is created,
 * reload and display the updated list of the user's classes.
 */
const InstructorHomePage = (props) => {
  const [classes, setClasses] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    console.log("This ran once!");
    fetch("/api/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Get class got ok response");
        response.json().then((classes) => {
          const clazz = classes.classes;
          console.log(clazz);
          console.log("Up is loaded classes");
          setClasses(clazz);
        });
      } else {
        console.log("Get classes went wrong");
      }
    });
  }, [classes.length, reload]);

  const onCodeGenerated = () => {
    console.log("generated happen");
    setReload(true)
    fetch("/api/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Get class got ok response");
        response.json().then((classes) => {
          const clazz = classes.classes;
          console.log(clazz);
          console.log("Up is loaded classes");
          setClasses(classes);
        });
      } else {
        console.log("Get classes went wrong");
      }
    });
  };

  const onClassCreated = () => {
    console.log("reloaded");
    //window.location.reload();
    fetch("/api/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Get class got ok response");
        response.json().then((classes) => {
          const clazz = classes.classes;
          console.log(clazz);
          console.log("Up is loaded classes");
          setClasses(classes);
        });
      } else {
        console.log("Get classes went wrong");
      }
    });
  };

  return (
    <>
      <section>
        <div className="container ">
          <ListClasses classes={classes} onCodeGenerated={onCodeGenerated} />
        </div>
      </section>
      <br />
      <br />
      <section>
        <div className="container">
          <CreateClass onClassCreated={onClassCreated} />
        </div>
      </section>
    </>
  );
};

export default InstructorHomePage;
