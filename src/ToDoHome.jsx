import React, { useState } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

function ToDoHome() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleAddTask = () => {
        if (input.trim() === "") return;
        setTasks([
            ...tasks,
            { text: input, completed: false, id: Date.now() },
        ]);
        setInput("");
    };

    const handleToggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleRemoveTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") handleAddTask();
    };

    const handleEdit = (id, currentText) => {
        setEditingId(id);
        setEditValue(currentText);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEditSave = (id) => {
        if (editValue.trim() === "") return;
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, text: editValue } : task
            )
        );
        setEditingId(null);
        setEditValue("");
    };

    const handleEditKeyDown = (e, id) => {
        if (e.key === "Enter") handleEditSave(id);
        if (e.key === "Escape") {
            setEditingId(null);
            setEditValue("");
        }
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditValue("");
    };

    return (
        <div className="max-w-md mx-auto  p-6 border border-gray-200 rounded-lg bg-gray-50 shadow">
            <h2 className="text-2xl font-bold text-center mb-6">To-Do List</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Add a new task..."
                    className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddTask}
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-1"
                >
                    <Plus size={18} />
                    Add
                </button>
            </div>
            <ul className="list-none p-0">
                {tasks.length === 0 && (
                    <li className="text-gray-400 text-center">No tasks yet!</li>
                )}
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                        {editingId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={handleEditChange}
                                    onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                                    className="flex-1 px-2 py-1 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                                    autoFocus
                                />
                                <button
                                    onClick={() => handleEditSave(task.id)}
                                    className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 text-sm mr-1 flex items-center gap-1"
                                    aria-label="Save"
                                >
                                    <Save size={16} />
                                </button>
                                <button
                                    onClick={handleEditCancel}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-2 py-1 text-sm flex items-center gap-1"
                                    aria-label="Cancel"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    onClick={() => handleToggleComplete(task.id)}
                                    className={`flex-1 cursor-pointer select-none ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                                >
                                    {task.text}
                                </span>
                                <button
                                    onClick={() => handleEdit(task.id, task.text)}
                                    className="ml-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded px-3 py-1 text-sm transition flex items-center gap-1"
                                    aria-label="Edit"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleRemoveTask(task.id)}
                                    className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm transition flex items-center gap-1"
                                    aria-label="Remove"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ToDoHome  