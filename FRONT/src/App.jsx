import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import MainButton from "./Components/MainButton/MainButton.jsx";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./Components/ItemCard/ItemCard.jsx";
import AddItemForm from "./Components/AddItemForm/AddItemForm.jsx";
import Navigation from "./Components/Navigation/Navigation.jsx";

import { fetchTasks, postTask, deleteTask } from "./reducers/tasksSlice";
import { fetchGoals, postGoal, deleteGoal } from "./reducers/goalsSlice";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);
  const goals = useSelector((state) => state.goals);

  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("tasks");

  useEffect(() => {
    if (viewMode === "tasks") {
      dispatch(fetchTasks());
    } else {
      dispatch(fetchGoals());
    }
  }, [dispatch, viewMode]);

  const handleRemoveItem = (id) => {
    if (viewMode === "tasks") {
      dispatch(deleteTask(id));
    } else {
      dispatch(deleteGoal(id));
    }
  };

  const handleAddItem = (item) => {
    if (viewMode === "tasks") {
      dispatch(postTask(item));
    } else {
      dispatch(postGoal(item));
    }
    setShowForm(false);
  };

  return (
    <div className="MainContainer">
      <Navigation viewMode={viewMode} setViewMode={setViewMode} />
      <div className="ToDoContainer">
        <div className="d-md-none w-100 mb-3">
          <MainButton onClick={() => setShowForm(true)}>
            {viewMode === "tasks" ? "Add Task" : "Add Goal"}
          </MainButton>
        </div>

        <div className="FormContainer">
          <AddItemForm
            labelName="Title"
            placeholderName="Write title here"
            labelDescription="Description"
            placeholderDescription="Add a description"
            labelDueDate="Due date"
            onAddItem={handleAddItem}
            viewMode={viewMode}
          />
        </div>

        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {viewMode === "tasks" ? "Add Task" : "Add Goal"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddItemForm
              labelName="Title"
              placeholderName="Write title here"
              labelDescription="Description"
              placeholderDescription="Add a description"
              labelDueDate="Due date"
              onAddItem={handleAddItem}
              viewMode={viewMode}
            />
          </Modal.Body>
        </Modal>

        <div className="ItemCardContainer">
          {(viewMode === "tasks" ? tasks : goals).map((item) => (
            <ItemCard
              key={item._id || item.id}
              id={item._id || item.id}
              titleName={item.name}
              description={item.description}
              titleDate="Due Date"
              date={item.dueDate}
              cardClassName="card-blue"
              onDelete={() => handleRemoveItem(item._id || item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
