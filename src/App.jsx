import { useState } from 'react'

const App = () => {

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()

    const copyTask = [...task]
    copyTask.push({ title, details, completed: false })   // ⭐ ADDED completed flag

    setTask(copyTask)
    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    setTask(copyTask)
  }

  // ⭐ Mark task completed / incomplete
  const toggleComplete = (idx) => {
    const copyTask = [...task]
    copyTask[idx].completed = !copyTask[idx].completed
    setTask(copyTask)
  }

  // ⭐ Calculate progress
  const completedCount = task.filter(t => t.completed).length
  const total = task.length
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100)

  return (
    <div className='h-screen lg:flex bg-black text-white'>

      {/* LEFT SIDE FORM */}
      <form onSubmit={submitHandler} className='flex gap-4 lg:w-1/2 p-10 flex-col items-start'>
        <h1 className='text-4xl mb-2 font-bold'>Add Notes</h1>

        <input
          type="text"
          placeholder='Enter Notes Heading'
          className='px-5 w-full font-medium py-2 border-2 outline-none rounded '
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className='px-5 w-full font-medium h-32 py-2 border-2 outline-none rounded '
          placeholder='Write Details here'
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button className='bg-white active:scale-95 font-medium w-full text-black px-5 py-2 rounded'>
          Add Note
        </button>
      </form>

      {/* RIGHT SIDE NOTES + PROGRESS */}
      <div className='lg:w-1/2 lg:border-l-2 p-10'>

        <h1 className='text-4xl font-bold'>Recent Notes</h1>

        {/* ⭐ PROGRESS BLOCK */}
        <div className='mt-5'>
          <h2 className='text-xl font-semibold mb-1'>Progress</h2>
          <p className='text-sm mb-2'>{completedCount} of {total} tasks completed ({percent}%)</p>

          {/* Progress bar */}
          <div className='w-full bg-gray-700 h-3 rounded'>
            <div
              className='bg-green-500 h-3 rounded'
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        <div className='flex flex-wrap items-start justify-start gap-5 mt-6 h-[80%] overflow-auto'>
          {task.map((elem, idx) => {
            return (
              <div key={idx} className="flex justify-between flex-col items-start relative h-56 w-44 bg-cover rounded-xl text-black pt-9 pb-4 px-4 bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')]">
                
                {/* ⭐ Checkbox */}
                <input 
                  type="checkbox" 
                  checked={elem.completed} 
                  onChange={() => toggleComplete(idx)}
                  className='absolute top-2 right-2 h-5 w-5 cursor-pointer'
                />

                <div>
                  <h3 className={`leading-tight text-lg font-bold ${elem.completed ? 'line-through text-green-700' : ''}`}>
                    {elem.title}
                  </h3>

                  <p className='mt-2 leading-tight text-xs font-semibold text-gray-600'>
                    {elem.details}
                  </p>
                </div>

                <button 
                  onClick={() => deleteNote(idx)} 
                  className='w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white'
                >
                  Delete
                </button>

              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default App
