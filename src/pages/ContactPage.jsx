import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-5">
        <Container>
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
            <p className="fs-5 opacity-90">Get in touch with our team - We're here to help!</p>
          </div>
        </Container>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={8} className="mb-5">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5">
                  <h3 className="fw-bold mb-4 text-gradient">Send us a Message</h3>
                  
                  {showAlert && (
                    <Alert variant="success" className="mb-4">
                      <i className="fas fa-check-circle me-2"></i>
                      Thank you for your message! We'll get back to you within 24 hours.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="py-3"
                            placeholder="Enter your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="py-3"
                            placeholder="Enter your email"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">Phone Number *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="py-3"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">Interested Course</Form.Label>
                          <Form.Select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="py-3"
                          >
                            <option value="">Select a course</option>
                            <option value="fullstack">Full Stack Web Development</option>
                            <option value="datascience">Data Science & Analytics</option>
                            <option value="digitalmarketing">Digital Marketing</option>
                            <option value="cloud">Cloud Computing</option>
                            <option value="mobile">Mobile App Development</option>
                            <option value="cybersecurity">Cybersecurity</option>
                            <option value="corporate">Corporate Training</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your learning goals and any questions you have..."
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button type="submit" variant="primary" size="lg" className="btn-custom">
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Message
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <div className="sticky-top" style={{ top: '100px' }}>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body className="p-4">
                    <h5 className="fw-bold mb-4 text-gradient">Contact Information</h5>
                    
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="fas fa-phone text-primary"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Phone</div>
                          <a href="tel:+918857096492" className="text-decoration-none">+91 8857096492</a>
                        </div>
                      </div>
                      <small className="text-muted">Mon - Sat: 9:00 AM to 8:00 PM</small>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="fab fa-whatsapp text-success"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">WhatsApp</div>
                          <a href="https://wa.me/918857096492" className="text-decoration-none">+91 8857096492</a>
                        </div>
                      </div>
                      <small className="text-muted">Quick responses available</small>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="fas fa-envelope text-primary"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Email</div>
                          <a href="mailto:info@technolearn.in" className="text-decoration-none">info@technolearn.in</a>
                        </div>
                      </div>
                      <small className="text-muted">We'll respond within 24 hours</small>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="fas fa-globe text-primary"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Website</div>
                          <a href="https://technolearn.in" className="text-decoration-none">technolearn.in</a>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4 text-center">
                    <h6 className="fw-bold mb-3">Follow Us</h6>
                    <div className="d-flex justify-content-center gap-3">
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
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;