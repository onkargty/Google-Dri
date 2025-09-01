import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCourses from './components/FeaturedCourses';
import About from './components/About';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showCart, setShowCart] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <Hero />
            <FeaturedCourses />
            <About />
            <Services />
            <Achievements />
            <Testimonials />
            <Contact />
          </>
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-vh-100">
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          onCartClick={() => setShowCart(true)}
        />
        <main>
          {renderPage()}
        </main>
        <Footer />
        {showCart && (
          <Cart onClose={() => setShowCart(false)} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;