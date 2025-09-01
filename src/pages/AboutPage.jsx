import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutPage = () => {
  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: '15+ years in tech industry, former Microsoft architect'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Curriculum',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'PhD in Computer Science, curriculum design expert'
    },
    {
      name: 'Amit Verma',
      role: 'Lead Instructor',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Full-stack developer with 12+ years experience'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do',
      icon: 'fas fa-star'
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies and teaching methods',
      icon: 'fas fa-lightbulb'
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest ethical standards',
      icon: 'fas fa-handshake'
    },
    {
      title: 'Impact',
      description: 'We create meaningful change in students\' careers',
      icon: 'fas fa-rocket'
    }
  ];

  return (
    <div>
      <section className="hero-gradient text-white py-5">
        <Container>
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-3">About Technolearn Trainings</h1>
            <p className="fs-5 opacity-90">Transforming careers through quality education since 2009</p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold text-gradient mb-4">Our Story</h2>
              <p className="fs-6 mb-4">
                Founded in 2009, Technolearn Trainings began with a simple vision: to bridge the gap 
                between industry requirements and academic learning. What started as a small initiative 
                has grown into one of India's leading online training providers.
              </p>
              <p className="fs-6 mb-4">
                Over the years, we have successfully trained more than 10,000 professionals across 
                various domains including Software Development, Data Science, Digital Marketing, and 
                Cloud Computing. Our commitment to quality education and student success has earned 
                us recognition as a trusted training partner.
              </p>
              <div className="row g-4">
                <div className="col-4 text-center">
                  <h3 className="fw-bold text-primary">15+</h3>
                  <p className="text-muted mb-0">Years of Excellence</p>
                </div>
                <div className="col-4 text-center">
                  <h3 className="fw-bold text-primary">10K+</h3>
                  <p className="text-muted mb-0">Students Trained</p>
                </div>
                <div className="col-4 text-center">
                  <h3 className="fw-bold text-primary">98%</h3>
                  <p className="text-muted mb-0">Success Rate</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About Us"
                className="img-fluid rounded-4 shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-gradient mb-3">Our Values</h2>
            <p className="fs-5 text-muted">The principles that guide everything we do</p>
          </div>

          <Row>
            {values.map((value, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Card className="border-0 text-center h-100 card-hover">
                  <Card.Body className="p-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                      <i className={`${value.icon} fs-1 text-primary`}></i>
                    </div>
                    <h5 className="fw-bold mb-3">{value.title}</h5>
                    <p className="text-muted">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-gradient mb-3">Meet Our Team</h2>
            <p className="fs-5 text-muted">Industry experts dedicated to your success</p>
          </div>

          <Row>
            {team.map((member, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="border-0 text-center h-100 card-hover">
                  <Card.Body className="p-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-circle mb-3"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <h5 className="fw-bold mb-2">{member.name}</h5>
                    <p className="text-primary fw-semibold mb-3">{member.role}</p>
                    <p className="text-muted">{member.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;