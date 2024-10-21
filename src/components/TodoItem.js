import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteItem, updateComplete, updateTask }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editedTask, setEditedTask] = useState(item.task)

  const handleUpdate = () => {
    updateTask(item._id, editedTask)
    setIsEdit(false)
  }
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
        <div div className="todo-content">
            {isEdit ? (
              <input type="text" value={editedTask} onChange={(e)=>setEditedTask(e.target.value)}/>
            ): (
              <span>{item.task}</span>
            )}
          </div>
          <div>{item.author ? `by ${item.author.name}` : ''}</div>
          <div className="button-wrap">
            <button
              className="button-delete"
              onClick={() => deleteItem(item._id)}
            >
              삭제
            </button>
            {isEdit ? (
              <>
                <button className="button-save" onClick={handleUpdate}>
                  저장
                </button>
                <button className="button-cancel" onClick={() => setIsEdit(false)}>취소</button>
              </>
            ) : (
              <>
                <button
                  className="button-toggle"
                  onClick={() => updateComplete(item._id)}
                >
                  {item.isComplete ? `미완료` : `완료`}
                </button>
                {!item.isComplete && (
                  <button className="button-toggle" onClick={() => setIsEdit(true)}>수정</button>
                )}
              </>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
