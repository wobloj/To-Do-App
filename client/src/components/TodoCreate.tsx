import { useState, useEffect } from "react"

import { Button } from "./Button"

import { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { Add } from "@mui/icons-material"
import { Input } from "./Input"
import { Checkbox, FormControlLabel, IconButton } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stepper, Step, StepLabel } from "@mui/material";
import { TodoListPreview } from "./TodoListPreview"



export const TodoCreate = () => {
  const [hasDeadline, setHasDeadline] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [title, setTitle] = useState("New Task");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState<string>("");
  const [todos, setTodos] = useState<{ text: string; deadline?: string }[]>([]);

  const [list , setList] = useState<{title: string; todos: {text: string; deadline?: string}[]}>({title:"", todos:[]});
  
    useEffect(() =>{
      if(list){
        console.log("Current Shopping List:", list);
      }
    }, [list])
  
    const handleSaveList = () => {
      const newList = { title, todos };
      setList(newList);
      console.log("Shopping List Saved:", newList);
  
      setActiveStep(0);
      setTitle("New Shopping List");
      setTodos([]);
    };


  const handleStep = () => {
    setActiveStep(activeStep+1)
  }

  const handleDeadlineChange = (date: Dayjs | null) => {
    if (hasDeadline && date) {
      setDeadline(date.format("DD.MM.YYYY"));
    } else {
      setDeadline("");
    }
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return true;
      case 1:
        return todos.length > 0;
      case 2:
        return true;
      default:
        return false;
    }
  }

  return (
    <div className="text-center mx-20 w-full">
        <h3 className="text-3xl mb-20">Create new TODO list</h3>
        <Stepper className="mb-20" activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>TODO Title</StepLabel>
            </Step>
            <Step>
              <StepLabel>Add TODO task</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm and save</StepLabel>
            </Step>
          </Stepper>
        <form className="flex flex-col items-center min-h-32">
          {activeStep === 0 &&
            <>
              <div className="mb-20">
                <p className="text-xl font-light">Enter Your TODO list title</p>
                <p className="text-sm text-gray-400">Not required (Default title: New Task)</p>
              </div>
              
              <Input 
                position="items-center" 
                onChange={(e)=>setTitle(e.target.value)} 
                type="text" 
                placeholder="Enter title" 
                label="title" 
                title="Title" 
                className="min-w-92 mb-10 text-center"/>
            </>
          }

          {activeStep === 1 &&
          <>
            <p className="text-xl font-light mb-20">Enter Your tasks</p>
            <div className="flex flex-row justify-center gap-2 mb-4">
              <Input 
                required 
                isLabel={false} 
                position="items-center" 
                type="text" 
                placeholder="Enter your task" 
                label="task" 
                title="Task" 
                className="ml-10 w-96 text-center"
                onChange={(e) => setTask(e.target.value)}/>
              <IconButton onClick={() => {
                if(task.trim()){
                  setTodos([...todos, { text: task, deadline: hasDeadline && deadline ? deadline : "" }]);
                  setTask("");
                  setHasDeadline(false);
                  setDeadline("");
                }
                console.log("Todos:", todos);
              }}>
                <Add color="warning" />
              </IconButton>
            </div>
          
            <FormControlLabel className="mb-10" control={
              <Checkbox 
              checked={hasDeadline} 
              onChange={(e) => {
                setHasDeadline(e.target.checked)
                if (!e.target.checked) setDeadline("")
              }} 
              color="warning"/>
              } label="Does it have deadline?"/>
            {hasDeadline &&

            <div className="flex flex-col items-center my-10">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={deadline ? dayjs(deadline, "DD.MM.YYYY"):null} onChange={handleDeadlineChange} disablePast label="Select deadline"/>
              </LocalizationProvider>
            </div>}
          </>
          }

          {activeStep === 2 &&
          <>
            <p className="text-xl font-light mb-10">Confirm Your TODO tasks.</p>
            <TodoListPreview title={title} todos={todos}/>
          </>
          }
        </form>
        
        <div className="flex flex-row justify-center items-center gap-5">
          {activeStep > 0 && <Button onClick={() => setActiveStep(activeStep-1)} type="button">Back</Button>}
          {activeStep === 2 ? 
          <Button onClick={() => handleSaveList()} type="button">Save</Button>:
          <Button disabled={!isStepValid()} onClick={() => handleStep()} type="button">Next</Button>}
        </div>
    </div>
  )
}
