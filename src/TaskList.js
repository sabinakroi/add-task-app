import styled from "@emotion/styled";
import { List as MuiList, TextField, Typography } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { useState } from "react";
import TaskListItem from "./TaskListItem";

const List = styled(MuiList)`
  width: 100%;
`;

const TaskListContainer = styled.div`
  background-color: #1d6892;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 100%;
`;

export const TaskTitle = styled(Typography)`
  text-transform: uppercase;
  font-size: 20px;
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const Title = styled(Typography)`
  color: white;
  border-bottom: 3px solid white;
  width: fit-content;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const Button = styled(MuiButton)`
  background-color: #111b24;
  &:disabled {
    background: lightgray;
  }
`;

const TaskList = ({
  taskList,
  setIsChecked,
  deleteTask,
  editTask,
  onAddClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <TaskListContainer>
      <Title variant="h4">TASK LIST</Title>
      <TextField
        fullWidth
        label="Search..."
        variant="filled"
        type="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <List>
        {taskList
          .filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              setIsChecked={setIsChecked}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
      </List>
      <Button variant="contained" onClick={onAddClick}>
        Add new Task
      </Button>
    </TaskListContainer>
  );
};

export default TaskList;
