import CustomButton from "../MainButton/MainButton";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./AddItemForm.scss";

function AddItemForm({
  labelName = "Name",
  placeholderName = "Enter name",
  labelDescription = "Description",
  placeholderDescription = "Enter description",
  labelDueDate = "Due Date",
  onAddItem, // function that received new item to add from parent
  viewMode, // checks if tasks or goals
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription || !taskDueDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newItem = {
      // No ID here so that backend can generate it
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
    };

    onAddItem(newItem);

    // clean form after sending data
    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
  };

  return (
    <Form className="mainForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>{labelName}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholderName}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>{labelDescription}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={placeholderDescription}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDueDate">
        <Form.Label>{labelDueDate}</Form.Label>
        <Form.Control
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
      </Form.Group>

      <div className="mt-3 d-flex justify-content-center">
        <CustomButton type="submit">
          {viewMode === "tasks" ? "Add Task" : "Add Goal"}
        </CustomButton>
      </div>
    </Form>
  );
}

export default AddItemForm;
