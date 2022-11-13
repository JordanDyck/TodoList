const Todo = ({ todo, todos, setTodos, index }) => {
  const updateTodos = () => {
    const todosCopy = [...todos]
    todosCopy[index].completed = !todosCopy[index].completed
    return todosCopy
  }
  return (
    <div
      className="todo"
      style={{ backgroundColor: !!todo.completed ? "#0f5a25" : "#424242" }}
    >
      <input
        type="checkbox"
        className="todo-check"
        //switch checkbox between true and false
        onChange={() => {
          setTodos(updateTodos())
        }}
        checked={!!todo.completed}
      ></input>
      <button
        className="delete-btn"
        onClick={() => {
          setTodos((todos) => {
            const updatedList = todos.filter((todo, id) => {
              if (id !== index) {
                return true
              } else {
                return false
              }
            })
            localStorage.setItem("todoData", JSON.stringify(updatedList))
            return updatedList
          })
        }}
      >
        X
      </button>
      <label id="title" htmlFor="todoli">
        {todo.description.length > 0 ? `${todo.name}:` : `${todo.name}`}
      </label>
      <label id="desc" htmlFor="todoli">
        {todo.description}
      </label>
    </div>
  )
}
export default Todo
