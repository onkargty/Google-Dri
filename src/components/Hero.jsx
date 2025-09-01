import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section className="hero-gradient text-white section-padding">
      <Container>
        <Row className="align-items-center min-vh-75">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="pe-lg-5">
              <h1 className="display-3 fw-bold mb-4 hero-title">
                Advance Your Career with 
                <span className="d-block text-warning">Expert Training</span>
              </h1>
              <p className="fs-5 mb-4 text-light opacity-90">
                Join thousands of professionals who have transformed their careers with our 
                comprehensive online training programs. Learn from industry experts and get 
                certified in the latest technologies.
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Button size="lg" variant="warning" className="btn-custom fw-semibold">
                  <i className="fas fa-play me-2"></i>
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline-light" className="btn-custom">
                  Free Demo
                </Button>
              </div>

              <Row className="text-center">
                <Col xs={4}>
                  <div className="mb-3">
                    <i className="fas fa-users fs-1 text-warning"></i>
                  </div>
                  <h3 className="fw-bold">10,000+</h3>
                  <p className="text-light">Students Trained</p>
                </Col>
                <Col xs={4}>
                  <div className="mb-3">
                    <i className="fas fa-award fs-1 text-warning"></i>
                  </div>
                  <h3 className="fw-bold">50+</h3>
                  <p className="text-light">Expert Trainers</p>
                </Col>
                <Col xs={4}>
                  <div className="mb-3">
                    <i className="fas fa-star fs-1 text-warning"></i>
                  </div>
                  <h3 className="fw-bold">4.8/5</h3>
                  <p className="text-light">Student Rating</p>
                </Col>
              </Row>
            </div>
          </Col>
          
          <Col lg={6}>
            <div className="position-relative">
              <div className="bg-white bg-opacity-10 rounded-4 p-4 transform-hover">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Online Learning"
                  className="img-fluid rounded-3 shadow-lg"
                />
              </div>
              
              <div className="position-absolute bottom-0 start-0 bg-warning text-dark p-3 rounded-3 shadow-lg translate-middle">
                <div className="fw-bold">Live Classes</div>
                <small>Interactive Learning</small>
              </div>
              
              <div className="position-absolute top-0 end-0 bg-success text-white p-3 rounded-3 shadow-lg translate-middle">
                <div className="fw-bold">Certified</div>
                <small>Industry Recognized</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;