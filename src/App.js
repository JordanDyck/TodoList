import React, { useState } from "react"
import "./App.scss"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todoData")) || []
  )

  return (
    <div className="content-wrapper">
      <h1>Todos</h1>
      <TodoInput setTodos={setTodos} todos={todos} />
      <TodoList todos={todos} setTodos={setTodos} />
      <p className="disclaimer">
        * do not put sensitive information on this site.
      </p>
    </div>
  )
}

export default App
