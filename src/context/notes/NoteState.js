import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => { 
   const host = "http://localhost:5000"
   const noteInitial = []
   
    const [notes, setNotes] = useState(noteInitial)

    //Get all notes note
    const getNotes = async () => {

      //Todo:API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });

      const data = await response.json()
     
      setNotes(data);
    }

    
    //Add a note
    const addNote = async (title, description, tag) => {

      //Todo:API call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}) 
      });

      const note = await response.json();
     
      setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async (id) => {
 
      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });

      const json = response.json();
      console.log(json);
      

      const newNotes = await notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    //Edit a Note
    const editNote = async (id,title, description, tag) => {
    
      //API call
     
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description,tag}) 
      });

      const json = await response.json();
      console.log(json)

     
      //It's a way of cloning an object, so that you get a complete copy that is unique but has the same properties as the cloned object.
      let newNotes = JSON.parse(JSON.stringify(notes))
      //logic to edit the note
      for(let index = 0; index < newNotes.length; index++){
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
      
    }
      

     return(
         <NoteContext.Provider value={{notes:notes,addNote,deleteNote,editNote,getNotes}}>
             {props.children}
         </NoteContext.Provider>
     )

}
//will import this file in the app.js to make sure that the state will be available to all app

export default NoteState;

