import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Developer at TCS',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'The Full Stack Web Development course at Technolearn changed my career completely. The instructors were knowledgeable and the practical approach helped me land my dream job.',
      rating: 5
    },
    {
      name: 'Rahul Kumar',
      role: 'Data Analyst at Infosys',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Excellent training quality! The Data Science course was comprehensive and the placement support helped me secure a position in a top IT company.',
      rating: 5
    },
    {
      name: 'Anita Verma',
      role: 'Digital Marketing Manager',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'The Digital Marketing course exceeded my expectations. I learned practical skills that I immediately applied in my work. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-gradient mb-3">Student Success Stories</h2>
          <p className="fs-5 text-muted">Hear from our satisfied students</p>
        </div>

        <Row>
          {testimonials.map((testimonial, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className="border-0 testimonial-card h-100">
                <Card.Body className="p-4">
                  <div className="text-warning mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  
                  <p className="mb-4 fst-italic">"{testimonial.content}"</p>
                  
                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;