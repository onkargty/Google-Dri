import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const FeaturedCourses = () => {
  const { addToCart } = useCart();

  const courses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      description: 'Master modern web development with React, Node.js, and MongoDB',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=500',
      price: 15999,
      originalPrice: 25999,
      duration: '6 months',
      level: 'Intermediate',
      students: 2500,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Data Science & Analytics',
      description: 'Learn Python, Machine Learning, and data visualization techniques',
      image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=500',
      price: 18999,
      originalPrice: 29999,
      duration: '8 months',
      level: 'Advanced',
      students: 1800,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      description: 'Complete digital marketing course with SEO, SEM, and social media',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=500',
      price: 12999,
      originalPrice: 19999,
      duration: '4 months',
      level: 'Beginner',
      students: 3200,
      rating: 4.7
    }
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-gradient mb-3">Featured Courses</h2>
          <p className="fs-5 text-muted">Discover our most popular training programs</p>
        </div>

        <Row>
          {courses.map((course) => (
            <Col lg={4} md={6} className="mb-4" key={course.id}>
              <Card className="h-100 border-0 shadow-sm card-hover">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={course.image} 
                    className="course-image"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Badge 
                    bg={course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'warning' : 'danger'}
                    className="position-absolute top-0 end-0 m-2"
                  >
                    {course.level}
                  </Badge>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold">{course.title}</h5>
                      <div className="text-warning">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star ${i < Math.floor(course.rating) ? '' : 'text-muted'}`}></i>
                        ))}
                        <small className="text-muted ms-1">({course.rating})</small>
                      </div>
                    </div>
                    <p className="text-muted">{course.description}</p>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between text-sm mb-2">
                      <span><i className="fas fa-clock text-primary me-1"></i>{course.duration}</span>
                      <span><i className="fas fa-users text-primary me-1"></i>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="course-price">₹{course.price.toLocaleString()}</span>
                        <small className="text-muted text-decoration-line-through ms-2">₹{course.originalPrice.toLocaleString()}</small>
                      </div>
                      <Badge bg="danger" className="rounded-pill">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        className="btn-custom"
                        onClick={() => addToCart(course)}
                      >
                        <i className="fas fa-cart-plus me-2"></i>
                        Enroll Now
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Button variant="outline-primary" size="lg" className="btn-custom">
            View All Courses
            <i className="fas fa-arrow-right ms-2"></i>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCourses;