import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Code2, LayoutTemplate, Smartphone, Server, Brackets } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React', icon: Code2 },
  { name: 'Next.js', icon: LayoutTemplate },
  { name: 'React Native', icon: Smartphone },
  { name: 'Expo', icon: Smartphone },
  { name: 'Node.js', icon: Server },
  { name: 'Express', icon: Brackets },
  { name: 'MongoDB', icon: Database },
];

function App() {
  const customCursorRef = useRef(null);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  // Custom Cursor Logic
  useEffect(() => {
    const cursor = customCursorRef.current;
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('.nav-item') || e.target.closest('.project-item') || e.target.closest('.skill-pill')) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to recalculate layout securely
      ScrollTrigger.refresh();

      // Hero Animation
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-title-line', 
        { y: 100 },
        {
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2
        }
      )
      .fromTo('.hero-description', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
        '-=0.8'
      )
      .fromTo('.scroll-indicator', 
        { opacity: 0 },
        { opacity: 1, duration: 1 }, 
        '-=0.5'
      );

      // Skills Animation
      gsap.fromTo('.skills-title', 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      gsap.fromTo('.skill-pill', 
        { opacity: 0, y: 30, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.5)'
        }
      );

      // Projects Animation
      gsap.fromTo('.project-item', 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 75%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={customCursorRef}></div>
      
      <nav className="navbar">
        <div className="logo">KR.</div>
        <div className="nav-links">
          <div className="nav-item">Work</div>
          <div className="nav-item">About</div>
          <div className="nav-item">Contact</div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="section hero container" ref={heroRef}>
          <div className="hero-content">
            <div className="hero-subtitle">Full Stack Developer</div>
            <h1 className="hero-title">
              <span><span className="hero-title-line" style={{ display: 'inline-block' }}>Kiran</span></span>
              <span><span className="hero-title-line text-gradient" style={{ display: 'inline-block' }}>Raut</span></span>
            </h1>
            <p className="hero-description">
              A creative developer specializing in building exceptional digital experiences. I blend design with robust engineering, crafting everything from fluid frontends to resilient backends.
            </p>
          </div>
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line">
              <div className="scroll-line-inner"></div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section skills-section container" ref={skillsRef}>
          <div className="section-header">
            <h2 className="section-title skills-title">
              My <span className="text-gradient">Arsenal</span>
            </h2>
          </div>
          <div className="skills-container">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={index} className="skill-pill">
                  <div className="skill-icon-wrap">
                    <IconComponent size={24} />
                  </div>
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Selected Work */}
        <section className="section projects-section container" ref={projectsRef}>
          <div className="section-header">
            <h2 className="section-title">
              Selected <span className="text-gradient">Work</span>
            </h2>
          </div>
          <div className="project-list">
            <a href="https://costablancacarrental.com/" target="_blank" rel="noopener noreferrer" className="project-item">
              <div className="project-hover-bg"></div>
              <h3 className="project-name">Costa Blanca Int.</h3>
              <span className="project-tech">Website</span>
            </a>
            <a href="https://gitaflow.saarthistudio.com/" target="_blank" rel="noopener noreferrer" className="project-item">
              <div className="project-hover-bg"></div>
              <h3 className="project-name">Gitaflow</h3>
              <span className="project-tech">Web App</span>
            </a>
            <a href="https://maheshfishland.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-item">
              <div className="project-hover-bg"></div>
              <h3 className="project-name">Mahesh Fishland</h3>
              <span className="project-tech">Website</span>
            </a>
            <a href="https://www.saarthistudio.com/" target="_blank" rel="noopener noreferrer" className="project-item">
              <div className="project-hover-bg"></div>
              <h3 className="project-name">Saarthi Studio</h3>
              <span className="project-tech">Agency Site</span>
            </a>
            <a href="https://saarthi-accountability.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-item">
              <div className="project-hover-bg"></div>
              <h3 className="project-name">Internal Tool</h3>
              <span className="project-tech">Saarthi Studio</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <div className="footer-text">© {new Date().getFullYear()} Kiran Raut. All rights reserved.</div>
        <div className="footer-links" style={{display: 'flex', gap: '2rem'}}>
          <a href="#" className="nav-item">Twitter</a>
          <a href="#" className="nav-item">LinkedIn</a>
          <a href="#" className="nav-item">GitHub</a>
        </div>
      </footer>
    </>
  );
}

export default App;
