import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary p-2 rounded me-3">
                <i className="fas fa-book-open text-white fs-4"></i>
              </div>
              <div>
                <h4 className="mb-0 fw-bold">Technolearn</h4>
                <small className="text-muted">Trainings</small>
              </div>
            </div>
            <p className="text-muted">
              Empowering careers through comprehensive online training programs. 
              Join thousands of professionals who have transformed their careers with us.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="social-icon bg-primary text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon bg-info text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon bg-primary text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-icon bg-danger text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="social-icon bg-success text-white">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Home</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Courses</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Services</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">Popular Courses</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Full Stack Development</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Data Science</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Digital Marketing</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Cloud Computing</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Mobile Development</a></li>
            </ul>
          </Col>
          
          <Col lg={3} className="mb-4">
            <h5 className="fw-bold mb-3">Contact Info</h5>
            <div className="mb-3">
              <i className="fas fa-phone text-primary me-2"></i>
              <span>+91 8857096492</span>
            </div>
            <div className="mb-3">
              <i className="fas fa-envelope text-primary me-2"></i>
              <span>info@technolearn.in</span>
            </div>
            <div className="mb-3">
              <i className="fas fa-globe text-primary me-2"></i>
              <span>www.technolearn.in</span>
            </div>
            <div className="mb-3">
              <i className="fab fa-whatsapp text-success me-2"></i>
              <span>WhatsApp Support</span>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0">
              &copy; 2024 Technolearn Trainings. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-muted text-decoration-none">Terms of Service</a>
              <a href="#" className="text-muted text-decoration-none">Refund Policy</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;