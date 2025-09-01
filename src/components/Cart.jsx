import React from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const Cart = ({ onClose }) => {
  const { items, removeFromCart, getTotalPrice } = useCart();

  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-shopping-cart me-2"></i>
          Shopping Cart
          <Badge bg="primary" className="ms-2">{items.length}</Badge>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {items.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">Your cart is empty</h5>
            <p className="text-muted">Add some courses to get started!</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-1 fw-bold">{item.title}</h6>
                    <small className="text-muted">{item.duration} • {item.level}</small>
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-success mb-1">₹{item.price.toLocaleString()}</div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      
      {items.length > 0 && (
        <Modal.Footer className="flex-column">
          <div className="d-flex justify-content-between w-100 mb-3">
            <h5>Total: <span className="text-success">₹{getTotalPrice().toLocaleString()}</span></h5>
          </div>
          <div className="d-flex gap-2 w-100">
            <Button variant="outline-secondary" onClick={onClose} className="flex-fill">
              Continue Shopping
            </Button>
            <Button variant="primary" className="flex-fill btn-custom">
              <i className="fas fa-credit-card me-2"></i>
              Checkout
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Cart;