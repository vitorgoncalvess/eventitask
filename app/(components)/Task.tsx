import React from 'react'

interface Task {
  _id: string;
  name: string;
  description: string;
  ref_id: string;
  subtasks: Task[];
}

const Task = ({task}: {task: Task}) => {
  return (
    <div className='flex flex-col h-24 w-64 bg-primary rounded-md p-4 text-text cursor-pointer'>
      <h1 className='text-lg text-white font-medium'>{task.name}</h1>
      <h2 className='text-sm'><b>0</b> de <b>{task.subtasks.length}</b> subtarefas feitas.</h2>
    </div>
  )
}

export default Task