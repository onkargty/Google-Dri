import React, { useState } from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const Header = ({ currentPage, setCurrentPage, onCartClick }) => {
  const { items } = useCart();

  const navigation = [
    { name: 'Home', key: 'home' },
    { name: 'About', key: 'about' },
    { name: 'Courses', key: 'courses' },
    { name: 'Services', key: 'services' },
    { name: 'Contact', key: 'contact' },
  ];

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand 
          onClick={() => setCurrentPage('home')} 
          style={{ cursor: 'pointer' }}
          className="d-flex align-items-center"
        >
          <div className="bg-primary p-2 rounded me-3">
            <i className="fas fa-book-open text-white fs-4"></i>
          </div>
          <div>
            <h3 className="mb-0 fw-bold text-dark">Technolearn</h3>
            <small className="text-muted">Trainings</small>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-4">
            {navigation.map((item) => (
              <Nav.Link
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                className={`fw-semibold px-3 ${
                  currentPage === item.key ? 'text-primary border-bottom border-primary border-3 pb-1' : 'text-dark'
                }`}
                style={{ cursor: 'pointer' }}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <a 
              href="tel:+918857096492"
              className="btn btn-success btn-custom d-none d-md-flex align-items-center"
            >
              <i className="fas fa-phone me-2"></i>
              Call Now
            </a>
            
            <Button
              variant="outline-primary"
              className="position-relative"
              onClick={onCartClick}
            >
              <i className="fas fa-shopping-cart"></i>
              {items.length > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                >
                  {items.length}
                </Badge>
              )}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;