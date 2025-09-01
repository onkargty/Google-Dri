import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Achievements = () => {
  const achievements = [
    {
      year: '2023',
      title: 'Best Online Training Provider',
      description: 'Awarded by TechEducation India for excellence in online training delivery',
      icon: 'fas fa-trophy'
    },
    {
      year: '2023',
      title: 'ISO 9001:2015 Certified',
      description: 'Quality management system certification for training services',
      icon: 'fas fa-medal'
    },
    {
      year: '2022',
      title: '10,000+ Students Milestone',
      description: 'Successfully trained over 10,000 professionals across various domains',
      icon: 'fas fa-users'
    },
    {
      year: '2022',
      title: 'Industry Partnership',
      description: 'Strategic partnerships with 50+ companies for placement assistance',
      icon: 'fas fa-handshake'
    },
    {
      year: '2021',
      title: 'Top Rated Training Institute',
      description: '4.8/5 rating on Google with 500+ reviews from satisfied students',
      icon: 'fas fa-star'
    },
    {
      year: '2021',
      title: 'COVID-19 Excellence Award',
      description: 'Recognized for seamless transition to online learning during pandemic',
      icon: 'fas fa-award'
    }
  ];

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-gradient mb-3">Our Achievements</h2>
          <p className="fs-5 text-muted">Recognitions that showcase our commitment to excellence</p>
        </div>

        <Row>
          {achievements.map((achievement, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className="border-0 achievement-card h-100 card-hover">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                      <i className={`${achievement.icon} fs-4 text-primary`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="badge bg-primary mb-2">{achievement.year}</div>
                      <h5 className="fw-bold mb-0">{achievement.title}</h5>
                    </div>
                  </div>
                  <p className="text-muted mb-0">{achievement.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Achievements;