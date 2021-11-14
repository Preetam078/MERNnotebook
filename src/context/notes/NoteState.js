
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => { 
 
    const s1 = {
        "name":"preetam",
        "class":"12"
    }
    
     const [state, setState] = useState(s1);

     const update = () => {
         setTimeout(() => {
             setState({
                 "name":"ravi",
                 "class":"11"
             })
         }, 2000);
     }

     return(
         <NoteContext.Provider value={{state:state,update:update}}>
             {props.children}
         </NoteContext.Provider>
     )

}
//will import this file in the app.js to make sure that the state will be available to all app

export default NoteState;

