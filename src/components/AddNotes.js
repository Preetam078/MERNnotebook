import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNotes = () => {
    
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"", tag:""})
    
    const handleClick = (e) => {
        e.preventDefault()
       addNote(note.title, note.description, note.tag);
       setNote({title:"",description:"", tag:""})
    }

    const handleChange = (e) => {
      setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
        <h1>Add Notes</h1>
        <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="Text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="Text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange}/>
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
    )
}

export default AddNotes
