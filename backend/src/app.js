import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import * as db from "./database.js";

const app = express();
app.use(
  cookieSession({
    secret: "cookiesecret",
    signed: false,
    name: '__session'
  })
);
app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/class-session/:sessionCode", (req, res) => {
  /**
   * Get a Class Session by Session Code
   *
   * Using `db`, find the class session using the session code, and return:
   * 200 OK - with an object containing the questions for that class session
   * 404 Not Found - when there is no class session with that code
   *
   * All users should have access
   */
  const sessionId = req.params.sessionCode;
  const classSession = db.getClassSession(sessionId);

  if (classSession != null) {
    const Questions = db.getQuestions(sessionId);
    res.status(200).send({ questions: Questions });
  } else {
    res.status(404).send("there is no class session with that code");
  }
});

app.post("/api/class-session/:sessionCode/question", (req, res) => {
  /**
   * Create a Question for a Class Session by Session Code
   *
   * Using `db`, find the class session using the session code, and
   * add a new question to the list.
   *
   * Return:
   * 201 Created - with the new question object
   * 404 Not Found - when there is no class session with that code
   *
   * All users should have access
   */

  const sessionId = req.params.sessionCode;
  const classSession = db.getClassSession(sessionId);

  if (classSession != null) {
    const Question = db.createQuestionForSession(sessionId, req.body);
    res.status(201).send(Question);
  } else {
    res.status(404).send("there is no class session with that code");
  }
});

app.put(
  "/api/class-session/:sessionCode/question/:questionId/upvote",
  (req, res) => {
    /**
     * Upvote a question in a session
     *
     * Using `db`, find the class session using the session code, and
     * then find the question using the question id. Increase the amount
     * of question.upvote by 1.
     *
     * Return:
     * 201 Created - with the updated question object
     * 404 Not Found - when there is no class session with that code, or no question
     *   with that id was found
     *
     * All users should have access
     */
    const sessionId = req.params.sessionCode;

    const question = db.upvoteQuestionForSession(
      sessionId,
      req.params.questionId
    );
    if (question != null) {
      res.status(201).send(question);
    } else {
      res
        .status(404)
        .send("Not Found -there is no class session, or no question found");
    }
  }
);

app.post("/api/class/:classId/session-code", (req, res) => {
  /**
   * Create a new Class Session for a Class
   *
   * Using `db`, find the class using the class id, and
   * add  a new session to the class
   *
   * Return:
   * 201 Created - with the new class session object
   * 401 Unauthorized - if user is not allowed to access. Only the
   *   owner of the class should be able to create a new class session
   * 404 Not Found - when there is no class with that id
   */
  if (!req.session.username) {
    res.status(401).send("No user logged in");
    return;
  }
  const isBelonged = db.isClassBelong(req.params.classId, req.session.username);
  if (isBelonged != null) {
    if (isBelonged) {
      const session = db.createSessionCodeForClass(req.params.classId);
      res.status(201).send(session);
    } else {
      res.status(401).send("Unauthorized - the user is not allowed to access.");
    }
  } else {
    res.status(404).send("Not Found - there is no class with that id");
  }
});

app.get("/api/classes", (req, res) => {
  /**
   * List all classes that belong to the current user
   *
   * Using `db`, find all the classes that belong to the
   * current user, and return it
   *
   * Return:
   * 200 OK - with an array of all the classes. Should return an empty array
   *   if user has no classes yet.
   * 401 Unauthorized - when there is no current user
   *
   * Users should only see their own classes, and not those belonging to
   * other users
   */
  if (!req.session.username) {
    res.status(401).send("No user logged in");
    return;
  }
  res.status(200).send({classes:db.getClasses(req.session.username)});
});

app.post("/api/classes", (req, res) => {
  /**
   * Create a new Class
   *
   * Using `db`, create a new class using the provided name and add
   * to the list of classes
   *
   * Return:
   * 201 Created - with the new class object
   * 400 Bad Request - when the request body is missing the name field
   * 401 Unauthorized - Only signed in users should be able to create a class
   *
   */
  if (!req.session.username) {
    res.status(401).send("No user logged in");
    return;
  }
  if (!req.body.name) {
    res.status(400).send("Missing name for the new class");
    return;
  }
  const classInfo = db.createClass({
    name: req.body.name,
    owner: req.session.username,
  });
  res.status(200).send(classInfo);
});

app.post("/api/login", (req, res) => {
  /**
   * Login the user using our mock login
   *
   * Only a username is provided for our mock login system.
   * Get the username from the request body and to a cookie
   * session to begin their logged in session.
   *
   * Return:
   * 200 OK - no body
   * 401 Unauthorized - when no username is provided
   *
   */
  if (req.body.username) {
    // succeed case with username
    req.session.username = req.body.username;
    // req.session ={
    //   username: 'nico',
    //   class: 'cs'
    // }
    res.status(200).send();
  } else {
    // without username
    res.status(400).send("missing username");
  }
});

app.get("/api/logout", (req, res) => {
  /**
   * Logout
   *
   * Log the current user out by deleting their cookie session
   *
   * Return:
   * 200 OK - no body
   *
   */
  req.session = null;
  res.status(200).send();
});

app.get("/api/user", (req, res) => {
  /**
   * Get the current user
   *
   * Get the current user's info by reading their username from
   * their cookie session.
   *
   * Return:
   * 200 OK - when there is a current user based on the cookie session
   * 400 Bad Request - when the username field is missing from the body
   * 401 Unauthorized - when there is no current user
   *
   */
  if (!req.session.username) {
    res.status(401).send("missing session");
    return;
  }
  if (req.session.username) {
    res.status(200).send({ username: req.session.username });
  } else {
    res.status(400).send("missing username");
  }
});

export default app;
