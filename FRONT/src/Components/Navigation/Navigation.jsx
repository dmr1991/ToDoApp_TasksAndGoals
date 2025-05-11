import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navigation.scss'; // Import custom css
function Navigation({ viewMode, setViewMode }) {
  return (
    <Navbar expand="md" className='navigation' collapseOnSelect>
      <Container>
        <Navbar.Brand className='navtext'>ToDo List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link className='navtext'
              active={viewMode === 'tasks'}
              onClick={() => setViewMode('tasks')}
              variant="link"
            >
              Tasks
            </Nav.Link>
            <Nav.Link className='navtext'
              active={viewMode === 'goals'}
              onClick={() => setViewMode('goals')}
              variant="link"
            >
              Goals
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
