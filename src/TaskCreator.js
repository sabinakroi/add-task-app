import styled from "@emotion/styled";
import MuiButton from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const Container = styled.div`
  background: #111b24;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 100%;
`;

const Title = styled(Typography)`
  color: #f7fbfe;
  border-bottom: 3px solid #f7fbfe;
  width: fit-content;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const TextInput = styled(TextField)`
  background-color: #1d6892;
  border-radius: 4px;
`;

const Button = styled(MuiButton)`
  background-color: #1d6892;
  &:disabled {
    background: lightgray;
  }
`;

const TaskCreator = ({ addTask }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (title.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [title]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    if (isValid) {
      addTask({ title, description, id: v4(), isChecked: false });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Container>
      <Title variant="h4">NEW TASK</Title>
      <TextInput
        variant="filled"
        label="Task title..."
        onChange={handleTitleChange}
        value={title}
        fullWidth
      />
      <TextInput
        variant="filled"
        label="Task description..."
        multiline
        rows={5}
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
      />
      <Button disabled={!isValid} variant="contained" onClick={handleClick}>
        ADD TASK
      </Button>
    </Container>
  );
};

export default TaskCreator;
