import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import "./style.css";

function DisplayTasks() {

    let taskList = [{id: "1234", task: "Bake a cake", completionStatus: false}, {id: "1224", task: "Bake a banana", completionStatus: false}, {id: "1235", task: "Eat a cake", completionStatus: false}];

    const [list, setList] = useState(taskList)
    const [input, setInput] = useState("");


    const handleSubmit = e => {
        e.preventDefault();
        
        
        let newNum = Math.floor(Math.random() * 10000);
        let stringNum = newNum.toString()

        setList([...list, {id: stringNum, task: input, completionStatus: false, style: "task orange"}])


        console.log(list)
        

        
        setInput("")
    }


    const handleChange = e => {
        setInput(e.target.value);
    }

    const deleteTask = (uniqueId) => {
        let toDel;

        for(let i = 0; i < list.length; i++){
            if (list[i].id == uniqueId){
                toDel = i;

                console.log( "You deleted " + list[i].task)
            }else{}
        }


        let newList = list;

        newList.splice(toDel,1);


        setList([...newList])   

    }

    const handleCompletion = (id) => {    /* FIX THE ISSUE HERE, BASICALLY MAKE BUTTON UNCLICKABLE ONCE ITS BEEN CLICKED ONCE. */
       let newStatus;

       

        for(let i = 0; i < list.length; i++){
            if (list[i].completionStatus == false && list[i].id == id){
                newStatus = i;

            }else{}
        }

        let newList = list;

        newList[newStatus].completionStatus = true;
    

        console.log(newStatus)

        setList([...newList])


    }

    const remainingTasks = () => {
        let rem = 0;

        for(let i = 0; i < list.length; i++){
            if(list[i].task != null && list[i].task != undefined && list[i].task.trim().length != 0 && list[i].completionStatus != true){
                rem++;
                console.log("ran")
            }else{}
        }

        return rem
    }

    const generateTasks = list.map((item) =>{

      const genButton = () => {
          
        if(item.completionStatus == false){
           return <a className="btndesign" value="active" onClick={() => handleCompletion(item.id)}><strong>Completed</strong></a>}
            else if(item.completionStatus == true){
                return <a className="btndesign disabled" value="active" onClick={() => handleCompletion(item.id)}><strong>Completed</strong></a>
            }else{} }
    

            if(item.task != ""){

            

                let stat = (item.completionStatus ? "task green" : "task orange")
       return  <>
                    <div key={item.id} className={stat}>

                        <div className="info">
                            <h3>{item.task}</h3>
                        </div>

                        <div className="btns">
                            {genButton()}
                            <a className="btndesign" onClick={() => deleteTask(item.id)}><strong>Remove</strong></a>
                        </div>
                    </div>
                </>
            }else{
            
            }

        
    }
    )



    return (
        <>
       
       <div className="plan">
            <h1 className="title">So, Whats The Plan For Today?</h1>
            <p className="lead">Feel free to add a task, mark a task as completed or remove a task once you're done.</p>

            <div className="addingTask">
                <form onSubmit={handleSubmit}>
                    <input name="tasktitle" onChange={handleChange} placeholder="Add a Task" value={input}></input>
                    <button type="submit">Add Task</button>
                </form>

                <div>
                    <h3>{remainingTasks()} tasks remaining...</h3>
                </div>
            </div>
        </div>



        <div className="tasklist">
            {generateTasks}
        </div>
        </>
    )
}

export default DisplayTasks
