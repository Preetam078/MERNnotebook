import React,{ useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext);
    const {deleteNote} = context;
   const {note, updateNote} = props
    return (
        <div className="col-md-3">
            <div className="card my-3">
  
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} lorem34</p>
                   
                </div>
                <div className="my-4">
                    <EditIcon className="mx-4" style={{"cursor":"pointer"}} onClick={()=>{updateNote(note)}}/>
                    <DeleteIcon style={{"cursor":"pointer"}} onClick={()=>{deleteNote(note._id)}}/>
                   </div>
                </div>
        </div>
    )
}

export default NoteItem
