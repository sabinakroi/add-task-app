import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import TaskCreator from "./TaskCreator";
import TaskList from "./TaskList";

const LOCAL_STORAGE_STATE_KEY = "taskAppState";

const AppContainer = styled.div`
  @media (max-width: 450px) {
    width: 100%;
  }
  width: 450px;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
`;

const TaskApp = () => {
  const [taskList, setTaskList] = useState(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
    return savedState ? JSON.parse(savedState) : [];
  });

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (task) => {
    setTaskList((prev) => [...prev, task]);
    setIsAdding(false);
  };

  const editTask = (id, editedTask) => {
    setTaskList((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...editedTask } : task))
    );
  };

  const deleteTask = (id) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const setIsChecked = (id, checked) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isChecked: checked } : task
      )
    );
  };

  return (
    <AppContainer>
      {isAdding ? (
        <TaskCreator addTask={addTask} />
      ) : (
        <TaskList
          taskList={taskList}
          setIsChecked={setIsChecked}
          deleteTask={deleteTask}
          editTask={editTask}
          onAddClick={() => {
            setIsAdding(true);
          }}
        />
      )}
    </AppContainer>
  );
};

export default TaskApp;
