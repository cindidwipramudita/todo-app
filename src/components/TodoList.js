import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      const newTask = {
        id: new Date().getTime(),
        task: newTodo,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  const handleCheckboxChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const sortedTodos = [...todos].sort((a, b) => {
    return a.completed - b.completed;
  });

  return (
    <section className="vh-100" style={{ backgroundColor: "#3da2c3" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <p className="mb-2">
                  <span className="h2 me-2">Todolist App</span>{" "}
                  <span className="badge bg-danger">checklist</span>
                </p>
                <p className="text-muted pb-2">22/05/2023 • ML - 1321</p>

                <ul className="list-group rounded-0">
                  {sortedTodos.map((todo) => (
                    <li
                      className="list-group-item border-0 d-flex align-items-center ps-0"
                      key={todo.id}
                    >
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        value=""
                        aria-label="..."
                        checked={todo.completed}
                        onChange={() => handleCheckboxChange(todo.id)}
                      />
                      <span
                        style={
                          todo.completed
                            ? { textDecoration: "line-through" }
                            : {}
                        }
                      >
                        {todo.task}
                      </span>
                      <button
                        className="btn-close ms-auto"
                        onClick={() => handleDelete(todo.id)}
                      ></button>
                    </li>
                  ))}
                </ul>

                <form className="mt-4" onSubmit={handleFormSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add a task..."
                      value={newTodo}
                      onChange={handleInputChange}
                    />
                    <button className="btn btn-primary" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
