// pending task cards designing will goes here
import './index.css';
import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { borderRadius } from '@mui/system';
import { ThreeDots } from 'react-loader-spinner';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
    backgroundColor:"#d9d9dd"
};  
const editButtonStyle={
    backgroundColor: 'red',
    height: '35px',
    width: '60px',
    borderRadius: '5px', // Adjust the radius as needed
    borderWidth: '0',
    border: 'none',
    color: 'white', // Optional: To make text visible on a red background
    cursor: 'pointer',
    marginTop:'4px' // Optional: Adds a pointer cursor on hover
}

class PendingCardsEl extends Component{
    state = {
        open: false, editedTitle:'',editedDescription:'',updateInProgress:false,
        updateDataid:''
    };
    handleOpen = () => {
        const{_id}=this.props.tasksData;
        this.props.editfun(_id)
        setTimeout(() => {
            console.log('Editing Data:', this.props.editDataObj); // Access updated prop
            this.setState({editedTitle:this.props.editDataObj[0].title,
                editedDescription:this.props.editDataObj[0].description,
            updateDataid:this.props.editDataObj[0]._id})
          }, 100); // Slight delay to wait for props to update
        this.setState({ open: true});
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    updateHandel=async ()=>{
        this.setState({updateInProgress:true})
        const{editedTitle,editedDescription,updateDataid}=this.state;
        const finallyUpdatedData={
        title:editedTitle,
        description:editedDescription,
       }
       const option={
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(finallyUpdatedData)
       }
       const response=await fetch(`http://localhost:4000/edit/${updateDataid}`,option);
       const data=await response.json();
       if(response.ok==true){
        this.setState({updateInProgress:false,open:false})
        this.props.updateFun(editedTitle,editedDescription,updateDataid)
       }
       console.log(data)
    }
    completedHandling=async()=>{
        const{_id}=this.props.tasksData;
        this.props.completedFun(_id)
        const option={
            method:'PUT'
        }
        const response= await fetch(`http://localhost:4000/statusupdate/${_id}`,option)
        const data=await response.json();
        console.log(data);
    }
    deleteTask=async ()=>{
        const{_id}=this.props.tasksData;
        this.props.deleteFun(_id)
        const option={
            method:'DELETE'
        }
        const response=await fetch(`http://localhost:4000/remove/${_id}`,option)
        if(response.ok!==true){
            alert('Please try again')
        }
    }
    editTitleHandeling=(event)=>{
        this.setState({editedTitle:event.target.value})
    }
    editDescriptionHandeling=(event)=>{
        this.setState({editedDescription:event.target.value})
    }
    render(){
        const{open,editedTitle,editedDescription,updateInProgress}=this.state;
        const{tasksData}=this.props;
        const{title,description,createdAt}=tasksData;
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - createdDate.getTime(); // difference in millisecon
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let timeString = '';
        if (days > 0) timeString = `${days} days `;
        else if (hours > 0) timeString = `${hours} hours `;
        else if (minutes > 0) timeString = `${minutes} minutes `;
        else if (seconds > 0) timeString = `${seconds} seconds `;
        
        return(
            <>
            <div className='card-main-container'>
              <div className='d-flex flex-row justify-content-between'>
                <p className='pending-tasks-title-styling'>{title}</p>
                <FontAwesomeIcon icon={faTrash} className='trash-icon-styling' onClick={this.deleteTask}/>
              </div>
              <p className='pending-task-description'>{description}</p>
              <p className='posted-date-styling'>{timeString} ago</p>
              <div className='mt-4 d-flex flex-row justify-content-between'>
                <button className="btn btn-success" onClick={this.completedHandling}>Completed</button>
                <div>
                    <Button onClick={this.handleOpen} style={editButtonStyle}>Edit</Button>
                    <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                        timeout: 500,
                        },
                    }}
                    >
                    <Fade in={open}>
                        <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                          <div className='mb-4'>
                            <label className='popup-input-label-styling'>Title</label>
                            <br/>
                            <input type='text' className='popup-title-input-styling' onChange={this.editTitleHandeling} value={editedTitle} placeholder='Enter Your Title'/>
                          </div>
                          <div className='mb-4'>
                            <label className='popup-input-label-styling'>Description</label>
                            <br/>
                            <textarea rows={4} cols={30} className='title-input-styling' onChange={this.editDescriptionHandeling}
                               value={editedDescription} placeholder='Enter Your Description Text..' style={{height:'100%',paddingTop:"15px"}}></textarea>
                          </div>
                          <div className='d-flex flex-row justify-content-between'>
                            <button className='btn btn-primary' onClick={this.updateHandel}>{updateInProgress?<ThreeDots color='#ffffff' height={30} width={30}/>:'Update'}</button>
                            <button className='btn btn-danger' onClick={this.handleClose}>Cancel</button>
                          </div>
                        </Typography>
                        </Box>
                    </Fade>
                    </Modal>
                </div>
              </div>
            </div>
            </>
        )
    }
}
export default PendingCardsEl