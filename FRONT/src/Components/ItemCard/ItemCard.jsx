import Card from "react-bootstrap/Card";
import CustomButton from "../MainButton/MainButton";
import "./ItemCard.scss";
import { useDispatch } from "react-redux"; // Import useDispatch
import { removeTask } from "../../reducers/tasksSlice"; // Import removeTask action

function ItemCard({
  id,
  titleName,
  description,
  titleDate,
  date,
  cardClassName,
}) {
  const dispatch = useDispatch(); // Initializes useDispatch

  const handleRemove = async () => {
    try {
      const response = await fetch("http://localhost:3001/removeTask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "dinamorales", // api key
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        dispatch(removeTask(id)); // delete task from front if the process is successful in back
      } else {
        console.error("No se pudo eliminar la tarea.");
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <Card className={`mb-2 ${cardClassName} w-100`}>
      <Card.Body>
        <Card.Title>{titleName}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Title>{titleDate}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <div className="button-container">
          <CustomButton className="custom-btn" onClick={handleRemove}>
            Remove
          </CustomButton>
          <CustomButton className="custom-btn">Edit</CustomButton>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
