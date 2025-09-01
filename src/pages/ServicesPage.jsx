import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const ServicesPage = () => {
  const services = [
    {
      title: 'Corporate Training',
      description: 'Customized training programs designed specifically for organizations to upskill their workforce and improve productivity.',
      icon: 'fas fa-building',
      price: 'Starting at ₹50,000',
      features: [
        'Custom curriculum development',
        'On-site and remote training options',
        'Progress tracking and analytics',
        'Industry-recognized certification',
        'Dedicated project manager',
        'Post-training support'
      ],
      duration: 'Flexible',
      level: 'All Levels'
    },
    {
      title: 'Individual Coaching',
      description: 'One-on-one personalized mentoring sessions with industry experts to accelerate your career growth.',
      icon: 'fas fa-user-tie',
      price: 'Starting at ₹5,000/month',
      features: [
        'Personal mentor assignment',
        'Flexible scheduling',
        'Career roadmap planning',
        'Project portfolio reviews',
        'Interview preparation',
        'Industry networking opportunities'
      ],
      duration: '3-6 months',
      level: 'All Levels'
    },
    {
      title: 'Job Placement Assistance',
      description: 'Comprehensive career placement support with our extensive industry partner network.',
      icon: 'fas fa-briefcase',
      price: 'Included with courses',
      features: [
        'Professional resume building',
        'Mock interview sessions',
        'Direct job referrals',
        'Salary negotiation guidance',
        'LinkedIn profile optimization',
        '6-month placement guarantee'
      ],
      duration: 'Ongoing',
      level: 'All Levels'
    },
    {
      title: 'Certification Programs',
      description: 'Industry-recognized certification programs that validate your skills and boost your career prospects.',
      icon: 'fas fa-certificate',
      price: 'Starting at ₹8,000',
      features: [
        'Globally recognized certificates',
        'Hands-on project assessments',
        'Practical skill evaluations',
        'Digital badge issuance',
        'Verification services',
        'Continuing education credits'
      ],
      duration: '1-3 months',
      level: 'Intermediate to Advanced'
    },
    {
      title: 'Workshop Series',
      description: 'Intensive weekend workshops on trending technologies and industry best practices.',
      icon: 'fas fa-chalkboard-teacher',
      price: 'Starting at ₹2,500',
      features: [
        'Weekend intensive sessions',
        'Hands-on practical exercises',
        'Industry expert speakers',
        'Networking opportunities',
        'Workshop completion certificates',
        'Access to recorded sessions'
      ],
      duration: '2-3 days',
      level: 'Beginner to Intermediate'
    },
    {
      title: 'Consulting Services',
      description: 'Expert technology consulting for businesses looking to implement new solutions or optimize existing processes.',
      icon: 'fas fa-lightbulb',
      price: 'Custom pricing',
      features: [
        'Technology assessment',
        'Solution architecture design',
        'Implementation roadmap',
        'Team training and support',
        'Performance optimization',
        'Ongoing maintenance support'
      ],
      duration: 'Project-based',
      level: 'Enterprise'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-5">
        <Container>
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-3">Our Services</h1>
            <p className="fs-5 opacity-90">Comprehensive solutions for your learning and career growth</p>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <Container>
          <Row>
            {services.map((service, index) => (
              <Col lg={6} className="mb-5" key={index}>
                <Card className="border-0 shadow-sm h-100 card-hover">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start mb-4">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                        <i className={`${service.icon} fs-2 text-primary`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <h4 className="fw-bold mb-2">{service.title}</h4>
                        <p className="text-muted mb-3">{service.description}</p>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-success fw-bold fs-5">{service.price}</span>
                          <div className="d-flex gap-2">
                            <span className="badge bg-info">{service.duration}</span>
                            <span className="badge bg-secondary">{service.level}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ListGroup variant="flush" className="mb-4">
                      {service.features.map((feature, idx) => (
                        <ListGroup.Item key={idx} className="border-0 px-0 py-2">
                          <i className="fas fa-check-circle text-success me-2"></i>
                          {feature}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    <div className="d-grid gap-2 d-md-flex">
                      <Button variant="primary" className="btn-custom me-md-2">
                        <i className="fas fa-info-circle me-2"></i>
                        Get Details
                      </Button>
                      <Button variant="outline-primary" className="btn-custom">
                        <i className="fas fa-phone me-2"></i>
                        Contact Us
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="display-5 fw-bold text-gradient mb-4">
                Ready to Get Started?
              </h2>
              <p className="fs-5 text-muted mb-4">
                Choose the service that best fits your needs and let us help you achieve your goals.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="primary" size="lg" className="btn-custom">
                  <i className="fas fa-calendar-alt me-2"></i>
                  Schedule Consultation
                </Button>
                <a href="tel:+918857096492" className="btn btn-success btn-lg btn-custom">
                  <i className="fas fa-phone me-2"></i>
                  Call Now: +91 8857096492
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;