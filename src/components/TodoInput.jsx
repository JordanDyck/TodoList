import { useState, useRef, useEffect, useCallback } from "react"

const TodoInput = ({ setTodos, todos }) => {
  const titleRef = useRef()
  const descRef = useRef()

  // used to display input errors.
  const [visible, setVisible] = useState(false)
  const [showInput, setShowInput] = useState(false)

  const handleInput = useCallback(() => {
    if (titleRef.current.value.length > 0) {
      setTodos([
        ...todos,
        {
          name: titleRef.current.value,
          description: descRef.current.value,
          completed: false,
        },
      ])
      setVisible(false)
      setShowInput(false)
    } else {
      setVisible(true)
      setShowInput(true)
    }
  }, [setTodos, todos])

  // deletes completed todos
  const clearCompleted = () => {
    const filterCompleted = todos.filter((item) => !item?.completed)
    localStorage.setItem("todoData", JSON.stringify(filterCompleted))
    setTodos(filterCompleted)
  }

  // sets todos in local storage
  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todoData", JSON.stringify(todos))
    }
  }, [todos])

  // focus title & returns input to default value
  useEffect(() => {
    titleRef.current.focus()
    titleRef.current.value = ""
    descRef.current.value = ""
  }, [showInput])

  return (
    <div>
      <div className="add-input-container">
        <button
          id="show-input"
          onClick={() => {
            setShowInput(!showInput)
          }}
          style={{ visibility: showInput ? "hidden" : "visible" }}
        >
          +
        </button>
      </div>
      {/* used to make blur effect */}
      <div className={showInput ? "modal-wrapper" : ""}>
        <div className={!showInput ? "hide-input" : "input-box"}>
          {/* shows input field */}
          <div className={!showInput ? "hide-input" : "input-container"}>
            {/* input for title */}
            <input
              className={visible ? "input-error" : ""}
              ref={titleRef}
              placeholder={visible ? "Title is required" : "Add title..."}
              onKeyUp={({ key }) => {
                if (key === "Enter") {
                  handleInput()
                }
              }}
            />

            {/* input for description */}
            <input
              ref={descRef}
              placeholder="Add description(Optional)"
              onKeyUp={({ key }) => {
                if (key === "Enter") {
                  handleInput()
                }
              }}
            />

            {/* sends input to todo list */}
            <div className="add-cancel-btns">
              <button
                id="add-btn"
                onClick={() => {
                  handleInput()
                }}
              >
                Add
              </button>
              <button
                id="cancel-btn"
                onClick={() => {
                  setShowInput(!showInput)
                  setVisible(false)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="clear-container">
        <button
          id="clear-all-btn"
          onClick={() => {
            setTodos([])
            localStorage.clear()
          }}
        >
          Clear All
        </button>
        <button id="clear-completed-btn" onClick={clearCompleted}>
          Clear Done
        </button>
      </div>
    </div>
  )
}
export default TodoInput
