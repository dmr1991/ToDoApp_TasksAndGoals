
# React App - Item Card & Form

## Description

This project is a basic React application that displays item cards with a form to add new items. The app includes two main components:

1. **ItemCard**: A component that displays a card with a title, description, due date, and a button.
2. **AddItemForm**: A form component that allows users to input a title, description, and due date.

## Features

- **ItemCard Component**:
  - Displays a card with the item title, description, and due date.
  - Has a button inside each card to potentially interact with the item.
  - The card design can be customized by passing a class name through props (e.g., to change the background color).
  
- **AddItemForm Component**:
  - A form for adding new items, with input fields for title, description, and due date.
  - Styled with Bootstrap, including custom styles to change the background color and borders of input fields.
  - Includes labels and input placeholders for better UX.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Bootstrap**: A CSS framework used for responsive design and prebuilt components.
- **SCSS**: Used for custom styling, including card backgrounds and form inputs.
  
## Custom CSS Styles

- **Item Cards**: Styled with a mint background color (`#00fdc2`) and green text color (`#002820`).
- **Form Inputs**: Custom background and border colors with a light gray background and green mint border when not focused, and a darker green border when focused.
  
## How to Run

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. Navigate into the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`.

## Future Enhancements

- Make the app responsive for different screen sizes.
- Implement the functionality for the form to dynamically add items to the list of cards.
