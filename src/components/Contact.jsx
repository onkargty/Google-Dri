import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
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
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-gradient mb-3">Get In Touch</h2>
          <p className="fs-5 text-muted">Ready to start your learning journey? Contact us today!</p>
        </div>

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                {showAlert && (
                  <Alert variant="success" className="mb-4">
                    <i className="fas fa-check-circle me-2"></i>
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="py-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="py-3"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="py-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Interested Course</Form.Label>
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
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your learning goals..."
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
        </Row>

        <Row className="mt-5">
          <Col lg={4} className="mb-4">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="fas fa-phone fs-3 text-primary"></i>
              </div>
              <h5 className="fw-bold">Call Us</h5>
              <p className="text-muted mb-2">+91 8857096492</p>
              <small className="text-muted">Mon - Sat: 9AM to 8PM</small>
            </div>
          </Col>
          
          <Col lg={4} className="mb-4">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="fas fa-envelope fs-3 text-primary"></i>
              </div>
              <h5 className="fw-bold">Email Us</h5>
              <p className="text-muted mb-2">info@technolearn.in</p>
              <small className="text-muted">We'll respond within 24 hours</small>
            </div>
          </Col>
          
          <Col lg={4} className="mb-4">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="fas fa-globe fs-3 text-primary"></i>
              </div>
              <h5 className="fw-bold">Visit Website</h5>
              <p className="text-muted mb-2">technolearn.in</p>
              <small className="text-muted">Explore all our courses online</small>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;