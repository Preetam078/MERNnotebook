import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => { 
   
    const notesinitial = [
          {
            "_id": "617e8c6fa8c6e365939d7392",
            "user": "61792733c9ed4cbf8c543bdc",
            "title": "second notes",
            "description": "this is the description of the second note",
            "tag": "testing phase 2",
            "date": "2021-10-31T12:30:39.127Z",
            "__v": 0
          },
          {
            "_id": "61913ca9680bb662a49079cc",
            "user": "61792733c9ed4cbf8c543bdc",
            "title": "second notes",
            "description": "this is the description of the second note",
            "tag": "testing phase 2",
            "date": "2021-11-14T16:43:21.127Z",
            "__v": 0
          }
    ]

    const [notes, setNotes] = useState(notesinitial)
      

     return(
         <NoteContext.Provider value={{notes:notes,setNotes:setNotes}}>
             {props.children}
         </NoteContext.Provider>
     )

}
//will import this file in the app.js to make sure that the state will be available to all app

export default NoteState;

