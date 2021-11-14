import { createContext } from "react";

const noteContext = createContext();
//it will hold all the state of the notes from the noteState.js which will be accesible to all the app

export default noteContext;

//it is the file which declares that i want to use the ContextAPI and will import thuis file in the contextState page