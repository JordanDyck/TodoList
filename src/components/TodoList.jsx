import { v4 as uuid } from "uuid"
import Todo from "./Todo"

const TodoList = ({ todos, setTodos }) => {
  return (
    <div className="todo-list-wrapper">
      {todos.map((todo, index) => (
        <div className="todo-container" key={uuid()}>
          <Todo todo={todo} index={index} todos={todos} setTodos={setTodos} />
        </div>
      ))}
    </div>
  )
}
export default TodoList
