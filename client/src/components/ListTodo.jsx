import React, { useEffect, useState } from 'react'
import "./listodo.css"
import Edit from "../assets/Edit.gif"
import Delete from "../assets/Delete.gif"
function ListTodo() {
    const [data, setData] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState("")
    const [isEditId, setIsEditId] = useState("-1");
    const getdata = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            let jsonData = await response.json();
             jsonData = jsonData.slice().sort((a, b) => a.todo_id - b.todo_id);

            setData(jsonData);

        } catch (error) {
            console.log(error.message)
        }
    }
    const deleteTdo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {

                window.location.reload();
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleSave = async (id) => {
        try {
            const body = { description: editData }
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            if (response.ok) {

                window.location.reload();
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getdata();
    }, []);
   
    return (
        <>
            <div>
                <table className='table mt-5 text-center' style={{ width: '90%', borderCollapse: 'collapse', marginLeft: '130px' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#f2f2f2' }}>Sr No.</th>
                            <th style={{ backgroundColor: '#f2f2f2' }}>Name</th>
                            <th style={{ backgroundColor: '#f2f2f2' }}>Todo</th>
                            <th style={{ backgroundColor: '#f2f2f2' }}>Edit</th>
                            <th style={{ backgroundColor: '#f2f2f2' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && Array.isArray(data) && data.map((item, index) => (
                            <tr key={item.todo_id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2' }}>
                                <td>{index + 1}</td>
                                <td>Sanchit</td>
                                {(isEdit && isEditId === item.todo_id) ? (
                                    <td>
                                        <div id='ediD'>
                                            <input id="edid"
                                            onChange={(e)=>setEditData(e.target.value)}>

                                            </input>
                                            <button id="edidb"
                                                onClick={()=>handleSave(item.todo_id)} >
                                                Save
                                            </button>
                                            <button id="edidbd" onClick={() => {
                                                setIsEdit(false)
                                                setIsEditId(-1)
                                            }
                                            }>
                                                close
                                            </button>
                                        </div>

                                    </td>
                                ) : (<td>{item.description}</td>)}
                                <td>
                                    <button id='edit' onClick={() => {
                                        setIsEdit(true);
                                        setIsEditId(item.todo_id)
                                    }}>Edit</button>
                                </td><td>
                                    <button id='delete' onClick={() => deleteTdo(item.todo_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ListTodo