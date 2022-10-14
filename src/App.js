import React, { useCallback, useEffect, useState } from "react";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import TodoList from "./components/TodoList";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP_STORAGE_KEY";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

	useEffect(() => {
		const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
		if(storagedTodoList) {
			setTodoList(JSON.parse(storagedTodoList));
		}
	}, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const handlerTextInput = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const handlerAddClick = useCallback(
    (e) => {
      setTodoList([...todoList, { id: v4(), name: textInput, isCompleted: false }]);
      setTextInput("");
    },
    [todoList, textInput]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((preTodoList) =>
      preTodoList.map((todo) => (todo.id === id ? { ...todo, isCompleted: true } : todo))
    );
  }, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="app-todo"
        placeholder="Thêm việc cần làm"
        elemAfterInput={
          <Button isDisabled={!textInput} appearance={"primary"} onClick={handlerAddClick}>
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={handlerTextInput}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
