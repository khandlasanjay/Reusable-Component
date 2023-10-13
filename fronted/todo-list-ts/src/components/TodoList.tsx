import React, { useEffect, useState } from 'react'

function TodoList() {

    const [todoList, usetodo] = useState('')

    const [data, setData] = useState<any>([])

    const sum = () => {
        setData(todoList);
    };

    // const useEffect = () => { setData("sanju") }

    return (
        <div className='Todolist'>
            <input
                type="text"
                onChange={(e) => {
                    usetodo(e.target.value);
                }}
            />
            {/* <button onClick={sum}>Add</button> */}
            <button onClick={sum}>sum</button>
            <button>All</button>
            <button>Completed</button>
            <button>Cancle</button>

            <div className='result'>{data}</div>
        </div>
    )
}

export default TodoList