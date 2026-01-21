import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Logo from '../../assets/logo.png';
import landingHero from '../../assets/landing_page_main.jpg';

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Navigation */}
            <nav className="landing-nav">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Logo} alt="Play2Grow" className="landing-logo" />
                    <div className="nav-links">
                        <a href="#games" className="nav-tab">Explore Games</a>
                        <a href="#how-it-works" className="nav-tab">How it Works</a>
                        <a href="#reviews" className="nav-tab">Parent Reviews</a>
                    </div>
                </div>
                <div className="nav-buttons">
                    <Link to="/SignIn" className="btn-login">Check In</Link>
                    <Link to="/SignUp" className="btn-primary-soft">Join Now</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Learn, Play, and Grow <span style={{ color: '#FFB6C1' }}>Together!</span></h1>
                    <p className="hero-subtitle">
                        A fun, engaging way to support early autism screening.
                        Play games, track progress, and discover insights—all with a smile! 🌟
                    </p>
                    <Link to="/SignUp" className="btn-cta">Start the Fun 🚀</Link>
                </div>
                <div className="hero-image">
                    <img src={landingHero} alt="Happy Kids and Robot" />
                </div>
            </section>

            {/* Features / Games Section */}
            <section id="games" className="games-section">
                <h2 className="section-title">Explore Our Magic Games 🎮</h2>
                <div className="games-grid">
                    <div className="game-card">
                        <div className="game-icon">👆</div>
                        <h3>Finger Tapping</h3>
                        <p> Tap fast! Test motor skills and coordination in a race against time.</p>
                    </div>
                    <div className="game-card">
                        <div className="game-icon">🧠</div>
                        <h3>Memory Match</h3>
                        <p>Find the pairs! A classic game to boost focus and memory power.</p>
                    </div>
                    <div className="game-card">
                        <div className="game-icon">😀</div>
                        <h3>Emoji Quiz</h3>
                        <p>What's that face? Learn to recognize emotions and expressions.</p>
                    </div>
                    <div className="game-card">
                        <div className="game-icon">👀</div>
                        <h3>Eye Tracking</h3>
                        <p>Follow the ball! Advanced tech to check visual attention patterns.</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="how-section">
                <h2 className="section-title">How It Works 🛠️</h2>
                <div className="steps-container">
                    <div className="step-item">
                        <div className="step-number">1</div>
                        <h3>Play Games</h3>
                        <p>Let your child enjoy our colorful, interactive, and scientifically designed games.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">2</div>
                        <h3>Smart Tracking</h3>
                        <p>Our app quietly analyzes behavior, attention, and responses as they play.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">3</div>
                        <h3>Get Insights</h3>
                        <p>Receive clear, parent-friendly reports to understand your child's unique growth.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials (New) */}
            <section id="reviews" className="testimonials-section">
                <h2 className="section-title">Loved by Parents 💖</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="quote-icon">❝</div>
                        <p className="testimonial-text">
                            "Finally, a screening tool that doesn't feel scary! My son thought he was just playing a video game. The insights were so helpful for our doctor visit."
                        </p>
                        <p className="parent-name">- Sarah M., Mom of 5yo</p>
                    </div>
                    <div className="testimonial-card">
                        <div className="quote-icon">❝</div>
                        <p className="testimonial-text">
                            "The design is beautiful and so kid-friendly. We use the 'Emoji Quiz' just for fun now! It's great to see a tool that focuses on 'Play' first."
                        </p>
                        <p className="parent-name">- David K., Dad of 4yo</p>
                    </div>
                    <div className="testimonial-card">
                        <div className="quote-icon">❝</div>
                        <p className="testimonial-text">
                            "Play2Grow helped us spot some attention issues early. The eye-tracking game is amazing tech right in the browser!"
                        </p>
                        <p className="parent-name">- Anjali P., Mom of 6yo</p>
                    </div>
                </div>
            </section>

            {/* Trust & Safety */}
            <section className="trust-section">
                <h2 className="section-title">Safe, Secure & Private 🔒</h2>
                <p>Your child's privacy is our top priority. All data is encrypted and secure.</p>

                <div className="disclaimer-box">
                    <strong>⚠️ Important Note:</strong>
                    <p style={{ margin: '10px 0 0' }}>
                        Play2Grow is a supportive screening tool, NOT a medical diagnosis.
                        Results should always be shared with a qualified healthcare professional for proper evaluation.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>&copy; 2026 Play2Grow. Made with love for little minds. ❤️</p>
            </footer>
        </div>
    );
};

export default LandingPage;
