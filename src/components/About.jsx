import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  const features = [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience'
    },
    {
      icon: 'fas fa-laptop-code',
      title: 'Hands-on Learning',
      description: 'Practical projects and assignments to reinforce your learning'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Industry Certification',
      description: 'Get certified with credentials recognized by top companies'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Round-the-clock assistance from our dedicated support team'
    }
  ];

  return (
    <section className="section-padding">
      <Container>
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="pe-lg-4">
              <h2 className="display-5 fw-bold text-gradient mb-4">
                Why Choose Technolearn Trainings?
              </h2>
              <p className="fs-5 text-muted mb-4">
                We are committed to providing world-class online training that transforms 
                careers and opens new opportunities. Our comprehensive approach ensures 
                you gain both theoretical knowledge and practical skills.
              </p>
              <div className="row g-4">
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="fw-bold text-primary">98%</h3>
                    <p className="text-muted mb-0">Job Placement Rate</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h3 className="fw-bold text-primary">15+</h3>
                    <p className="text-muted mb-0">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="About Technolearn"
              className="img-fluid rounded-4 shadow-lg"
            />
          </Col>
        </Row>

        <Row>
          {features.map((feature, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <Card className="border-0 text-center h-100 card-hover">
                <Card.Body className="p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <i className={`${feature.icon} fs-1 text-primary`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default About;