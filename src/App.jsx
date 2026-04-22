import { useEffect, useRef, useState } from 'react';
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
  const glowRef = useRef(null);
  const previewContainerRef = useRef(null);
  const previewImgRef = useRef(null);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const preloaderRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preloader Logic
  useEffect(() => {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 2,
      ease: 'power3.inOut',
      onUpdate: () => {
        setLoadingProgress(Math.round(counter.value));
      },
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut'
        });
      }
    });
  }, []);

  // Custom Cursor & Magnetic Logic
  useEffect(() => {
    const cursor = customCursorRef.current;
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.5,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('.nav-item') || e.target.closest('.project-item') || e.target.closest('.skill-pill')) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }
    };

    // Magnetic Effect for Nav Items
    const navItems = document.querySelectorAll('.nav-item');
    
    const handleMagneticMove = (e) => {
      const item = e.currentTarget;
      const position = item.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      gsap.to(item, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const handleMagneticLeave = (e) => {
      const item = e.currentTarget;
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    navItems.forEach(item => {
      item.addEventListener('mousemove', handleMagneticMove);
      item.addEventListener('mouseleave', handleMagneticLeave);
    });

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      navItems.forEach(item => {
        item.removeEventListener('mousemove', handleMagneticMove);
        item.removeEventListener('mouseleave', handleMagneticLeave);
      });
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to recalculate layout securely
      ScrollTrigger.refresh();

      // Hero Animation
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-char', 
        { y: 150 },
        {
          y: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 2.2 // wait for preloader to finish
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

      gsap.fromTo('.skills-marquee-container', 
        { opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: '.skills-marquee-container',
            start: 'top 85%',
          },
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out'
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
      <div className="preloader" ref={preloaderRef}>
        <div className="preloader-counter">{loadingProgress}%</div>
      </div>
      <div className="ambient-glow" ref={glowRef}></div>
      <div className="custom-cursor" ref={customCursorRef}></div>
      
      <nav className="navbar">
        <div className="logo">KR.</div>
        <div className="nav-links">
          <a href="#work" className="nav-item">Work</a>
          <a href="#about" className="nav-item">About</a>
          <a href="https://wa.me/918169314760" target="_blank" rel="noopener noreferrer" className="nav-item">Contact</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="about" className="section hero container" ref={heroRef}>
          <div className="hero-content">
            <div className="hero-subtitle">Full Stack Developer</div>
            <h1 className="hero-title">
              <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                {"Kiran".split('').map((char, i) => (
                  <span key={`first-${i}`} className="hero-char" style={{ display: 'inline-block' }}>{char}</span>
                ))}
              </span>
              <span style={{ display: 'inline-block', overflow: 'hidden', marginLeft: '0.3em' }}>
                {"Raut".split('').map((char, i) => (
                  <span key={`last-${i}`} className="hero-char text-gradient" style={{ display: 'inline-block' }}>{char}</span>
                ))}
              </span>
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
          <div className="skills-marquee-container">
            <div className="skills-track">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div key={`track1-${index}`} className="skill-pill">
                    <div className="skill-icon-wrap">
                      <IconComponent size={24} />
                    </div>
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="skills-track" aria-hidden="true">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div key={`track2-${index}`} className="skill-pill">
                    <div className="skill-icon-wrap">
                      <IconComponent size={24} />
                    </div>
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="section projects-section container" ref={projectsRef}>
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
      </footer>
    </>
  );
}

export default App;
