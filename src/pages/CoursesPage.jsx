import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CoursesPage = () => {
  const { addToCart } = useCart();

  const allCourses = [
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
      rating: 4.8,
      category: 'Programming'
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
      rating: 4.9,
      category: 'Data Science'
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
      rating: 4.7,
      category: 'Marketing'
    },
    {
      id: 4,
      title: 'Cloud Computing with AWS',
      description: 'Master AWS services and cloud architecture fundamentals',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
      price: 16999,
      originalPrice: 24999,
      duration: '5 months',
      level: 'Intermediate',
      students: 1500,
      rating: 4.6,
      category: 'Cloud'
    },
    {
      id: 5,
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=500',
      price: 17999,
      originalPrice: 26999,
      duration: '6 months',
      level: 'Intermediate',
      students: 1200,
      rating: 4.5,
      category: 'Mobile'
    },
    {
      id: 6,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn ethical hacking, security protocols, and risk management',
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=500',
      price: 19999,
      originalPrice: 29999,
      duration: '7 months',
      level: 'Advanced',
      students: 900,
      rating: 4.8,
      category: 'Security'
    }
  ];

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-gradient mb-3">All Courses</h1>
          <p className="fs-5 text-muted">Choose from our comprehensive range of professional training programs</p>
        </div>

        <Row>
          {allCourses.map((course) => (
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
                  <Badge 
                    bg="dark"
                    className="position-absolute top-0 start-0 m-2"
                  >
                    {course.category}
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
      </Container>
    </section>
  );
};

export default CoursesPage;