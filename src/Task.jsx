/* eslint-disable react/prop-types */


function Task({ task, setTask, onDelete }) {
    const handleEdit = () => {
        setTask(task)
    }
    const handleDelete = () => {
        onDelete(task.id)
    }
    return (
        <div className="flex gap-4 mb-2 items-center border border-slate-600 w-[520px] rounded-xl px-4 py-1">
            <div className="flex gap-2 ">
                <div className={`flex text-sm items-center gap-1 px-1 ${task.category === 'Yet to start' ? ('bg-orange-500') : ((task.category === 'Completed') ? ('bg-lime-500') : ('bg-amber-400'))}  w-[90px] text-center rounded-[6px]`}>
                    <div className={`${task.category === 'Yet to start' ? ('bg-orange-800') : ((task.category === 'Completed') ? ('bg-lime-800') : ('bg-amber-800'))} w-[6px] h-[6px]  rounded-[50%]`}></div>
                    <div className="-mt-[1px]">{task.category}</div>
                </div>
                <div className="w-[254px]">{task.task}</div>
            </div>
            <div className="flex gap-2">
                <button className="bg-amber-300 px-2 py-1 rounded-md" onClick={handleEdit} >Edit</button>
                <button className="bg-red-700 text-white px-2 py-1  rounded-md " onClick={handleDelete}>Delete</button>
            </div>

        </div>
    )
}

export default Task