import styles from './Home.module.css'
import { NavLink } from 'react-router-dom'
import github from '@/assets/github.png';
import linkedin from '@/assets/linkedin.png';
import email from '@/assets/email.png';
import girl from '@/assets//girl.png';


export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.copy}>
          {/* first displayn Title */}
          <h1 className={`${styles.title} ${styles.fadeInUp}`}>
            Welcome My Portfolio 
          </h1>

          {/* second display  */}
          <p className={`${styles.desc} ${styles.fadeInUp}`}>
            Aspiring Full Stack Software Developer.
          </p>

          {/* thrid display */}
          <p className={`${styles.mission} ${styles.fadeInUp}`}>
            My mission is to leverage my technical expertise,<br />
            problem-solving ability, and teamwork to build practical solutions,<br />
            while continuously learning and growing as a full-stack engineer.
          </p>
        </div>

        {/* last one */}
        <div className={`${styles.footer} ${styles.fadeInUp}`}>
          <div className={styles.icons}>
            <a href="https://github.com/jie-ui" target="_blank" rel="noreferrer">
              <img src={github} alt="GitHub" width="28" />
            </a>
            <a href="https://www.linkedin.com/in/jie-yang-9799b521an" target="_blank" rel="noreferrer">
              <img src={linkedin} alt="LinkedIn" width="28" />
            </a>
            <a href="mailto:jyang239@my.centennialcollege.ca">
              <img src={email} alt="Mail" width="28" />
            </a>
            <NavLink to="/about">
              <img src={girl} alt="About Me" width="28" />
            </NavLink>

          </div>


        </div>


      </div>
    </section>
  )
}

