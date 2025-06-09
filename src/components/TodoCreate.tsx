import { useState } from "react"

import { Add } from "@mui/icons-material"
import { Input } from "./Input"
import { Checkbox, FormControlLabel, IconButton } from "@mui/material"
import { SingleTodo } from "./SingleTodo"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const TodoCreate = () => {
  const [hasDeadline, setHasDeadline] = useState(false);

  return (
    <div className="text-center mx-20 w-full">
        <h3 className="text-3xl mb-20">Create new TODO task</h3>
        <form>
          <Input position="items-center" type="text" placeholder="Enter title" label="title" title="Title" className="w-1/2 text-center"/>
          <div className="my-10 flex flex-row items-end justify-center gap-2">
            <Input required isLabel={false} position="items-center" type="text" placeholder="Enter your task" label="task" title="Task" className="ml-10 w-96 text-center"/>
            <IconButton>
              <Add color="warning" />
            </IconButton>
          </div>
          <FormControlLabel control={
            <Checkbox 
             checked={hasDeadline} 
             onChange={(e) => setHasDeadline(e.target.checked)} 
             color="warning"/>
            } label="Does it have deadline?"/>
          {hasDeadline &&
          <div className="flex flex-col items-center mt-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker disablePast label="Select deadline"/>
            </LocalizationProvider>
          </div>}
        </form>
        <div className="mt-40 h-60 flex flex-col gap-4 overflow-y-scroll">
          <SingleTodo text="Lqiwoe asd xzcasd zcxaewq czxc"/>   
          <SingleTodo text="Lqiwoe adsd zxcgrtr m,nbfgh" deadline="20.02.2026"/>   
          <SingleTodo text="Lqiwoe qweascc qwe" deadline="20.02.2026"/>   
          <SingleTodo text="Lqivcxhh trrre asde dss" deadline="20.02.2026"/>   
        </div>
    </div>
  )
}
