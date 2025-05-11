import { useState } from "react";
import { Modal } from "react-bootstrap";
import MainButton from "./Components/MainButton/MainButton.jsx";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./Components/ItemCard/ItemCard.jsx";
import AddItemForm from "./Components/AddItemForm/AddItemForm.jsx";
import Navigation from "./Components/Navigation/Navigation.jsx";
import { addTask, removeTask } from "./reducers/tasksSlice";
import { addGoal, removeGoal } from "./reducers/goalsSlice";

function App() {
  const tasks = useSelector((state) => state.tasks);
  const goals = useSelector((state) => state.goals);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("tasks");

  const handleRemoveItem = async (id) => {
    const url =
      viewMode === "tasks"
        ? "http://localhost:3001/removeTask"
        : "http://localhost:3001/removeGoal";

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "dinamorales",
        },
        body: JSON.stringify({ id }), // we send the id of the itemcard we want to remove
      });

      const result = await response.json();
      if (response.ok) {
        // we eliminate the item in redux only if it was successful in the server 
        const action = viewMode === "tasks" ? removeTask(id) : removeGoal(id);
        dispatch(action);
      } else {
        console.error(result.error || "Error removing item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleAddItem = async (item) => {
    const url =
      viewMode === "tasks"
        ? "http://localhost:3001/addTask"
        : "http://localhost:3001/addGoal";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "dinamorales",
        },
        body: JSON.stringify(item),
      });

      const result = await response.json();
      if (response.ok) {
        const action = viewMode === "tasks" ? addTask(item) : addGoal(item);
        dispatch(action);
        setShowForm(false);
      } else {
        console.error(result.error || "Error adding item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <div className="MainContainer">
        <Navigation viewMode={viewMode} setViewMode={setViewMode} />
        <div className="ToDoContainer">
          {/* visible on mobile */}
          <div className="d-md-none w-100 mb-3">
            <MainButton onClick={() => setShowForm(true)}>
              {viewMode === "tasks" ? "Add Task" : "Add Goal"}
            </MainButton>
          </div>

          {/* group of desktop button and form */}
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

          {/* modal shows only on mobile */}
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

          {/* Cards of tasks or goals */}
          <div className="ItemCardContainer">
            {(viewMode === "tasks" ? tasks : goals).map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                titleName={item.name}
                description={item.description}
                titleDate="Due Date"
                date={item.dueDate}
                cardClassName="card-blue"
                onDelete={() => handleRemoveItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
