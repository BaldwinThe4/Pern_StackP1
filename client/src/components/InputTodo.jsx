import React, { useEffect, useState } from 'react'
import "./inputToDo.css"
function InputTodo() {
    const [des, setDes] = useState("");
    const onSubmitForm = async (e) => {
       
        try {
            console.log(des);
            const body = { description: des }
            const response = fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                setDes(""); // Resetting the state variable to clear the input field
              }
        } catch (error) {
            console.log(error.message)
        }
    }
   
    return (
        < >
            <div class="parent">
                <h1 class="Head">
                    Pern Todo List
                </h1>
                <form class="Form">
                <input type="text" onChange={(e) => setDes(e.target.value)} value={des}/>
                    <button onClick={onSubmitForm}>Add</button>
                    
                </form>
            </div>

        </>
    )
}

export default InputTodo