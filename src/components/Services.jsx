import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Services = () => {
  const services = [
    {
      title: 'Corporate Training',
      description: 'Customized training programs for organizations to upskill their workforce',
      icon: 'fas fa-building',
      features: ['Custom curriculum', 'On-site training', 'Progress tracking', 'Certification']
    },
    {
      title: 'Individual Coaching',
      description: 'One-on-one mentoring sessions with industry experts',
      icon: 'fas fa-user-tie',
      features: ['Personal mentor', 'Flexible schedule', 'Career guidance', 'Project reviews']
    },
    {
      title: 'Job Placement',
      description: 'Career placement assistance with our industry partner network',
      icon: 'fas fa-briefcase',
      features: ['Resume building', 'Interview prep', 'Job referrals', 'Salary negotiation']
    }
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-gradient mb-3">Our Services</h2>
          <p className="fs-5 text-muted">Comprehensive solutions for your learning journey</p>
        </div>

        <Row>
          {services.map((service, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className="border-0 shadow-sm h-100 card-hover">
                <Card.Body className="p-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '100px', height: '100px' }}>
                    <i className={`${service.icon} fs-1 text-primary`}></i>
                  </div>
                  
                  <h4 className="fw-bold mb-3">{service.title}</h4>
                  <p className="text-muted mb-4">{service.description}</p>
                  
                  <ul className="list-unstyled mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline-primary" className="btn-custom">
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;