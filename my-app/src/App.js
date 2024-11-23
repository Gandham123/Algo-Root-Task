import './App.css';
import {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PendingCardsEl from './Components/DataCards';
import { ThreeDots } from 'react-loader-spinner';
import CompletedTaskaEl from './Components/CompletedTasks';

class App extends Component {
  state={titleInput:'',descriptionInput:'',titleErrorShow:false,
    decriptionErrorShow:false,pendingTasksShow:true,editingData:{},
    inProgress:false,pendingTasksList:[],completedTasksList:[]}
  componentDidMount(){
    this.getPosts()
  }
  getPosts=async()=>{
    const option={
      method:'GET'
    }
    const response=await fetch('http://localhost:4000/',option);
    const data=await response.json();
    if (response.ok===true){
        const currentPendingTasks=data.posts.filter((eachItem)=>(eachItem.work_status==="not completed"))
        const currentCompletedTasks=data.posts.filter((eachItem)=>(eachItem.work_status==="Completed"))
        this.setState({pendingTasksList:currentPendingTasks,completedTasksList:currentCompletedTasks})
    }
  }
  titleInputHandeling=(event)=>{
    this.setState({titleInput:event.target.value})
  }
  decriptionInputHandeling=(event)=>{
    this.setState({descriptionInput:event.target.value})
  }
  addData=async()=>{
    const{titleInput,descriptionInput,pendingTasksList}=this.state;
    if(titleInput.length===0){
      this.setState({titleErrorShow:true})
    }
    if(descriptionInput.length===0){
      this.setState({decriptionErrorShow:true})
    }
    if(descriptionInput.length!==0 && titleInput.length!==0){
      const randomNumber = JSON.stringify(Math.floor(Math.random() * (100 - 50 + 1)) + 50);
      const addedData={
        _id:randomNumber,
        title:titleInput,
        description:descriptionInput,
        work_status:'not completed'
      }
      this.setState({titleErrorShow:false,decriptionErrorShow:false,inProgress:true,pendingTasksList:[...pendingTasksList,addedData]})
      const finalDataToPost={
        title:titleInput,
        description:descriptionInput,
        work_status:'not completed'
      }
      const option={
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(finalDataToPost)
      }
      const response=await fetch('http://localhost:4000/',option);
      const data=await response.json();
      if(response.ok===true){
        console.log(data);
        this.setState({inProgress:false,titleInput:'',descriptionInput:''})
      }
      else{
        alert(data.message)
      }
    }
  }
  pendingTaskHandeling=()=>{
    this.setState({pendingTasksShow:true})
  }
  completedTasksHandeling=()=>{
    this.setState({pendingTasksShow:false})
  }
//this is function to get the data in the clicked id and to update in the popup input tags for editing 
  editingDataHandle=(recieveId)=>{
    const{pendingTasksList}=this.state
    console.log(recieveId)
     const editData=pendingTasksList.filter((eachItem)=>(eachItem._id===recieveId))
     this.setState({editingData:editData})
  }
  //this is the function for updating the data instantly in frontend after successfully editing the content
  updatingData=(editedTitle,editedDescription,Id)=>{
      const {pendingTasksList}=this.state;
      const updatedTasksList = pendingTasksList.map((eachItem) =>
        eachItem._id === Id
          ? { ...eachItem, title: editedTitle, description: editedDescription }
          : eachItem
      );
      this.setState({pendingTasksList:updatedTasksList})
  }
  //this is the function for the mark as read when user click on the competd then it will be deleted on the 
  //pendingTask list and will be added to completed list that frontend logicwill goes here
  completedDataUpdating=(recieveId)=>{
    const{pendingTasksList,completedTasksList}=this.state;
    const finallyUpdatedPendinList=pendingTasksList.filter((eachItem)=>(eachItem._id!==recieveId))
    const completedEl=pendingTasksList.filter((eachItem)=>(eachItem._id===recieveId))
    this.setState({pendingTasksList:finallyUpdatedPendinList,completedTasksList:[...completedTasksList,completedEl[0]]})
  }
  //the below function is for deleting an item from pendingTasks List
  deletingItem=(recieveId)=>{
    const{pendingTasksList}=this.state;
    const updatedList=pendingTasksList.filter((eachItem)=>(eachItem._id!==recieveId))
    this.setState({pendingTasksList:updatedList})
  }
  //the below function is for the deleting an item from completedTasks List
  completedItemDelete=(recieveId)=>{
    const{completedTasksList}=this.state;
    const updatedCompletdList=completedTasksList.filter((eachItem)=>(eachItem._id!==recieveId))
    this.setState({completedTasksList:updatedCompletdList})
  } 
  renderingPendingTasks=()=>{
    const{editingData,pendingTasksList}=this.state;
    return(
      <>
      {pendingTasksList.map((eachItem)=>(<PendingCardsEl key={eachItem._id} tasksData={eachItem} 
      editfun={this.editingDataHandle} editDataObj={editingData}
      updateFun={this.updatingData}  completedFun={this.completedDataUpdating} deleteFun={this.deletingItem}/>))}
      </>
    )
  }
    render(){
      const{titleInput,descriptionInput,titleErrorShow,
        decriptionErrorShow,pendingTasksShow,inProgress,completedTasksList}=this.state;
      return(
        <>
        <div style={{marginTop:"70px"}}>
          <h1 className='to-do-heading'>To-do Application</h1>
          <div className='d-flex flex-row justify-content-center'>
            <div className='to-do-input-main-container'>
              <div className='mb-4'>
                <label className='input-label-styling'>Title</label>
                <br/>
                <input type='text' className='title-input-styling' onChange={this.titleInputHandeling} value={titleInput} placeholder='Enter Your Title'/>
                <p className='error-message-styling'>{titleErrorShow?"*Required":''}</p>
              </div>
              <div className='mb-4'>
                <label className='input-label-styling'>Description</label>
                <br/>
                <textarea rows={4} cols={30} className='title-input-styling' onChange={this.decriptionInputHandeling}
                 value={descriptionInput} placeholder='Enter Your Description Text..' style={{height:'100%',paddingTop:"15px"}}></textarea>
                 <p className='error-message-styling'>{decriptionErrorShow?"*Required":''}</p>
              </div>
              <button className='btn btn-primary' onClick={this.addData}>{inProgress?<ThreeDots color='#ffffff' height={30} width={30}/>:'Add'}</button>
            </div>
          </div>
         <div className='m-5'>
            <div className='d-flex flex-row justify-content-center'>
              <p className={`pending-tasks-name-styling ${pendingTasksShow?'active-tab-styling':''}`} onClick={this.pendingTaskHandeling}>Pending Tasks</p>
              <p className={`pending-tasks-name-styling ${pendingTasksShow?'':'active-tab-styling'}`} onClick={this.completedTasksHandeling}>Completed Tasks</p>
            </div>
            <div className='tasks-main-container container-fluid'>
              {pendingTasksShow?this.renderingPendingTasks():completedTasksList.map((eachItem)=>(<CompletedTaskaEl key={eachItem._id} completedData={eachItem} deleteFun={this.completedItemDelete}/>))}
            </div>
         </div>
        </div>
        </>
      )
    }
}

export default App;
