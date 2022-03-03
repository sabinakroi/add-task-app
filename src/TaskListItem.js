import styled from "@emotion/styled";
import { DeleteOutline, EditOutlined, SaveOutlined } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlined from "@mui/icons-material/CircleOutlined";
import {
  Checkbox,
  IconButton,
  ListItem as MuiListItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { TaskTitle } from "./TaskList";

const ListItem = styled(MuiListItem)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const CheckboxContainer = styled.div`
  display: flex;
`;

const EditingTaskListItem = ({ task, editTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  return (
    <ListItem>
      <TextField
        label="Title"
        variant="filled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="filled"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <IconButton
        onClick={() => {
          editTask({ title, description });
        }}
      >
        <SaveOutlined />
      </IconButton>
    </ListItem>
  );
};

const TaskListItem = ({ task, setIsChecked, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (editedTask) => {
    editTask(task.id, editedTask);
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditingTaskListItem editTask={handleEdit} task={task} />;
  }

  return (
    <ListItem>
      <CheckboxContainer>
        <Checkbox
          checkedIcon={<CircleIcon />}
          icon={<CircleOutlined />}
          checked={task.isChecked}
          onChange={(_e, checked) => {
            setIsChecked(task.id, checked);
          }}
        />
        <div>
          <TaskTitle variant="subtitle1">{task.title}</TaskTitle>
          {task.description && <div> {task.description}</div>}
        </div>
      </CheckboxContainer>
      <div>
        <IconButton
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <EditOutlined />
        </IconButton>

        <IconButton
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <DeleteOutline />
        </IconButton>
      </div>
    </ListItem>
  );
};

export default TaskListItem;
