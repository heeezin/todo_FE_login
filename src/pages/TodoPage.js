import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const TodoPage = ({user,setUser}) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate()

  const getTasks = async () => {
    const res = await api.get("/tasks");
    const tasks = res.data.data
    tasks.sort((a,b)=> a.isComplete - b.isComplete)
    setTodoList(tasks);
  };
  useEffect(() => {
    getTasks();
  }, []);
  const addTodo = async () => {
    try {
      const res = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (res.status === 200) {
        getTasks();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
    }
  };
  const deleteItem = async (id) => {
    try {
      console.log(id);
      const res = await api.delete(`/tasks/${id}`);
      if (res.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const res = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (res.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateTask = async (id, updateValue) => {
    try {
      const res = await api.put(`/tasks/${id}`,{
        task: updateValue
      })
      if(res.status === 200){
        getTasks()
      }
    } catch (error) {
      console.log('error',error)
    }
  }
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  return (
    <Container>
        <div className="title">
          <div className="user-name">
            <span>{user.name}</span>님 환영합니다.
          </div>
          <button onClick={handleLogout} className="button-logout">로그아웃</button>
        </div>
      <div className="add-item-row">
        <div>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
          <button onClick={addTodo} className="button-add">
            추가
          </button>
        </div>
      </div>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        updateComplete={updateComplete}
        updateTask={updateTask}
      />
    </Container>
  );
};

export default TodoPage;
