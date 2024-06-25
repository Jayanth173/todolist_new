import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function Component() {
    const [input, setInput] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setInput(response.data);
    };

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = async () => {
        if (newTask.trim() !== "") {
            const response = await axios.post('http://localhost:5000/tasks', { task: newTask });
            setInput([...input, response.data]);
            setNewTask("");
        }
    };

    const removeTask = async (index, id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        const updatedTasks = input.filter((_, i) => i !== index);
        setInput(updatedTasks);
    };

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...input];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setInput(updatedTasks);
        }
    };

    const moveTaskDown = (index) => {
        if (index < input.length - 1) {
            const updatedTasks = [...input];
            [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
            setInput(updatedTasks);
        }
    };

    return (
        <div className="main">
            <h1 className="header" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bannertodo1.jpg)`, height: '200px', marginTop: '0px', backgroundRepeat: 'none', backgroundSize: 'cover' }}>
                My ToDo
            </h1>
            <div className="add">
                <input type='text'
                    className='input'
                    placeholder="Enter your List"
                    value={newTask}
                    onChange={handleInputChange} />
                <button className="btn"
                    onClick={addTask}>
                    +
                </button>
            </div>
            <div className="ol">
                <ol className="ol1">
                    {input.map((task, index) =>
                        <li key={task._id}>
                            <span>{task.task}</span>
                            <button className="delete"
                                onClick={() => removeTask(index, task._id)}>
                                Delete
                            </button>
                            <button className="up"
                                onClick={() => moveTaskUp(index)}>
                                up
                            </button>
                            <button className="down"
                                onClick={() => moveTaskDown(index)}>
                                down
                            </button>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default Component;
