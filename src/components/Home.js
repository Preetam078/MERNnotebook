import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Home = () => {
    const context = useContext(noteContext);
    const {notes,setNotes} = context;
    return (
        <div>
            <h1>Add Notes</h1>
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="Text" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h1>Your Notes</h1>
            {notes.map((note)=> {
                return note.title;
            })}
        </div>
    )
}

export default Home
