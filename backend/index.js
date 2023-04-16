import app from './src/app.js';

const PORT = 8080;

app.listen(PORT); //app.listen(PORT, '0.0.0.0'); everbody can access my server; 'localhost' and '127.0.0.1' only my device
console.log(`Server started at http://localhost:${PORT}`);

// let database = {
//     classes:[]
// }

// export const creatClass =(className) =>{
//     database.classes.push({
//         className: className
//     })
// }

// export const getClasses = ()=>{
//     return database.classes
// }

// const getRandomNumber = () =>{
//     return `${Math.floor(100000 + Math.random() * 900000)}`
// }

// export const createClassSession =(className) =>{
//     //find the class with className
//     const classInfo = database.classes.find(classInfo => {
//         return classInfo.className == className
//     })
//     //Insert
//     classInfo.sessions = []
//     classInfo.sessions.push(getRandomNumber())
// }

// export const getClassSession =(className) =>{
//     const classInfo = database.classes.find(classInfo => {
//         return classInfo.className == className
//     })
//     return classInfo.sessions
// }

// export const askQuestion = (name,question, classSession) => {

// }

// export const clear = () =>{
//     database={
//         classes:[]
//     }
// }
