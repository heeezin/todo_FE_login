import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteItem, updateComplete, updateTask }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 &&
        todoList.map((item, index) => (
          <TodoItem
            item={item}
            key={index}
            deleteItem={deleteItem}
            updateComplete={updateComplete}
            updateTask={updateTask}
          />
        ))}
    </div>
  );
};

export default TodoBoard;
