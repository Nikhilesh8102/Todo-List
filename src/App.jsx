import { useEffect, useState } from 'react'
import Task from './Task';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('allTasks')) || []);
  const [task, setTask] = useState({ id: '', task: '', category: '' });
  const [error, setError] = useState({ task: '', category: '' });

  const validateConfig = {
    task: [{ required: true, message: 'please enter a task' },
    { minLength: 2, message: 'Task should be minimum of 2 characters' }
    ],
    category: [{ required: true, message: 'please select a category' }
    ]
  }

  function validate(task) {
    const errors = {};

    // Iterate over keys in task (e.g., 'task', 'category')
    Object.keys(task).forEach(key => {
      // Get validation rules for the current key from validateConfig
      const rules = validateConfig[key];

      // Check if there are validation rules for the current key
      if (rules) {
        // Check each rule for the current key
        rules.some(rule => {
          // Validate based on rule type (e.g., required, minLength)
          if (rule.required && !task[key]) {
            errors[key] = rule.message;
            return true; // Exit some() loop early if validation fails
          }
          if (rule.minLength && task[key].length < rule.minLength) {
            errors[key] = rule.message;
            return true; // Exit some() loop early if validation fails
          }
          // Add more validation rules as needed
        });
      }
    });

    return errors;
  }


  function handleClick() {
    console.log('clicked');



    const newTask = { ...task, id: task.id || crypto.randomUUID() }

    const error = validate(newTask);
    if (Object.keys(error).length) return;
    // const prevTasks = tasks.filter(task => task.id !== newTask.id);
    // const allTasks = [...prevTasks, newTask];
    if (tasks.length === 0) {
      setTasks([newTask])
    } else {
      // Check if the task ID already exists in tasks array
      const existingTaskIndex = tasks.findIndex(t => t.id === newTask.id);
      if (existingTaskIndex !== -1) {
        // If task exists, update it in the tasks array
        const updatedTasks = [...tasks];
        updatedTasks[existingTaskIndex] = newTask;
        setTasks(updatedTasks);
      } else {
        // Otherwise, add newTask to the existing tasks
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
      }
    }

    setTask({ id: '', task: '', category: '' })
    setError({ task: '', category: '' });

  }

  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(tasks))
  }, [tasks])

  function handleDelete(taskId) {
    setTasks(tasks => tasks.filter(t => t.id !== taskId))
  }
  return (
    <div className="w-[80vh] mx-auto mt-6 px-8 py-12 border-2 border-gray-200 rounded-2xl shadow-lg flex flex-col gap-3">

      <div className='  flex flex-col gap-6'>
        <div className='relative '>
          {error.task && <p className='text-red-700 text-[12px]'>{error.task}</p>}
          <input value={task.task} onChange={(e) => { setTask({ ...task, task: e.target.value }) }} className="block w-full border-2 border-sky-700 rounded-lg px-3 py-1" type="text" placeholder="Enter task here..." />
        </div>
        <div className='relative'>
          {error.category && <p className='text-red-700 text-[12px]'>{error.category}</p>}
          <select value={task.category} onChange={(e) => { setTask({ ...task, category: e.target.value }) }} name="" id="" className="w-full px-4 border-2 border-sky-700 py-1 rounded-lg">
            <option value="" disabled>Select category</option>
            <option value="Yet to start">Yet to start</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button className='bg-blue-600 text-white active:bg-blue-400 rounded-xl duration-100 py-1' onClick={handleClick}>Add</button>
      </div>


      <div className='mt-6'>
        {tasks.map(task =>
          <Task key={task.id} onDelete={handleDelete} task={task} setTask={setTask} setTasks={setTasks} tasks={tasks} />
        )}
      </div>

    </div>
  )
}

export default App