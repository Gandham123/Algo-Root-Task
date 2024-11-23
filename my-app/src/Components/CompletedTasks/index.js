import './index.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const CompletedTaskaEl=(props)=>{
    const{completedData,deleteFun}=props;
    const{title,description,_id}=completedData;
    const deleteTask=async ()=>{
        deleteFun(_id)
        const option={
            method:'DELETE'
        }
        const response=await fetch(`http://localhost:4000/remove/${_id}`,option)
        if(response.ok!==true){
            alert('Please try again')
        }
    }
    return(
        <>
         <div className='card-main-container'>
         <div className='d-flex flex-row justify-content-between'>
            <p className='pending-tasks-title-styling'>{title}</p>
            <FontAwesomeIcon icon={faTrash} className='trash-icon-styling' onClick={deleteTask}/>
         </div>
            <p className='pending-task-description'>{description}</p>
            </div>
        </>
    )
}
export default CompletedTaskaEl