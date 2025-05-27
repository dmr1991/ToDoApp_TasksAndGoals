import Card from "react-bootstrap/Card";
import CustomButton from "../MainButton/MainButton";
import "./ItemCard.scss";
import { useDispatch } from "react-redux"; // Import useDispatch

function ItemCard({
  id,
  titleName,
  description,
  titleDate,
  date,
  cardClassName, onDelete
}) {
  const dispatch = useDispatch(); // Initializes useDispatch
  
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Card className={`mb-2 ${cardClassName} w-100`}>
      <Card.Body>
        <Card.Title>{titleName}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Title>{titleDate}</Card.Title>
        <Card.Text>{formattedDate}</Card.Text>
        <div className="button-container">
          <CustomButton className="custom-btn" onClick={onDelete}>
            Remove
          </CustomButton>
          <CustomButton className="custom-btn">Edit</CustomButton>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
