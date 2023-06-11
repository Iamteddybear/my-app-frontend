import React, { useState, useEffect } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  useEffect(() => {
    fetch("http://localhost:9292/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);
  const handleInputChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddTodo = () => {
    fetch("http://localhost:9292/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo({ title: "", description: "" });
      });
  };
  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };
  const handleUpdateTodo = (id, updatedTodo) => {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
      });
  };
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={newTodo.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          <button
            onClick={() =>
              handleUpdateTodo(todo.id, {
                ...todo,
                title: todo.title + " (Updated)",
              })
            }
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
}
export default App;
