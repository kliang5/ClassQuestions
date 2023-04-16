let database = {
  clazz: [],
  classSessions: [],
};

export const getQuestions = (sessionCode) => {
  // find questions for a class session
  const session = database.classSessions.find(
    (classSession) => classSession.id === Number(sessionCode)
  );
  if (session != null) {
    return session.questions;
  } 
  return null;
};

export const getClasses = (ownername) => {
  const classes = database.clazz.filter((claz) => claz.owner === ownername);
  return classes;
};

export const isClassBelong = (classId, ownername) => {
  const claz = database.clazz.find((clazz) => clazz.id === Number(classId));
  if (claz != null) {
    return claz.owner === ownername;
  }
  return null;
}

export const createQuestionForSession = (sessionCode, question) => {
  const session = database.classSessions.find(
    (classSession) => classSession.id === Number(sessionCode)
  );
  if (session != null) {
    const newQuestion = {
      question: question.question,
      id: session.questions.length,
      upvotes: 0,
      name: question.name,
    };
    session.questions.push(newQuestion);
    return newQuestion;
  }
  return null;
};

export const upvoteQuestionForSession = (sessionCode, questionCode) => {
  const session = database.classSessions.find(
    (classSession) => classSession.id === Number(sessionCode)
  );
  if (session != null) {
    const ques = session.questions.find((quest) => quest.id === Number(questionCode));
    if (ques != null) {
      ques.upvotes += 1;
      return ques;
    }
    return null;
  }
  return null;
};

export const createSessionCodeForClass = (classId) => {
  const clazz = database.clazz.find((claz) => claz.id === Number(classId));
  if (clazz != null) {
    const newSession = {
      id: Math.floor(100000 + Math.random() * 900000),
      classId: Number(classId),
      questions: [],
    };
    database.classSessions.push(newSession);
    const newClassSession = {
      id: newSession.id,
      createdAt: new Date(),
    };
    clazz.sessionCodes.push(newClassSession);
    return newSession;
  }
  return null;
};

export const getClassSession = (sessionCode) => {
  const session = database.classSessions.find(
    (classSession) => classSession.id === Number(sessionCode)
  );
  if (session != null) {
    return session;
  }
  return null;
};

export const createClass = (classData) => {
  const newClass = {
    name: classData.name,
    owner: classData.owner,
    id: database.clazz.length,
    sessionCodes: [],
  };
  database.clazz.push(newClass);
  return newClass;
};

export const clear = () => {
  database = {
    clazz: [],
    classSessions: [],
  };
};
