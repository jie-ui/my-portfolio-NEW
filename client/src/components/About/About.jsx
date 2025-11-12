import styles from './About.module.css'
import github from '@/assets/github.png';
import linkedin from '@/assets/linkedin.png';
import email from '@/assets/email.png';
import resume from '@/assets/resume.png';
import my_photo from '@/assets/my_photo.png';


export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutContainer}>

        {/* Left Photo */}
        <div className={styles.left}>
          <img src={my_photo} alt="my_photo"
            className={`${styles.photo} ${styles.fadeInUp}`} />
        </div>

        {/* right Text */}
        <div className={styles.right}>
          <h2 className={`${styles.title} ${styles.fadeInUp}`}>
            Hi, I’m Jie Yang
          </h2>
          <p className={`${styles.desc} ${styles.fadeInUp}`}>
            A Software Engineering Technology student passionate about full-stack development,
            with experience in C#, Java, JavaScript, SQL, and React.
          </p>
          <p className={`${styles.desc} ${styles.fadeInUp}`}>
            My goal is to build user-friendly applications and grow as a developer through projects and teamwork.
          </p>
          {/* resumeLink */}
          <div className={styles.icons}>

            <a
              href="https://drive.google.com/file/d/152MRMnAgAH0MN6A392vRzVI9radd5tpU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeIcon}
            >
              <img src={resume} alt="Resume" />
            </a>

            <a href="https://github.com/jie-ui" target="_blank" rel="noreferrer">
              <img src={github} alt="GitHub" width="28" />
            </a>
            <a href="https://www.linkedin.com/in/jie-yang-9799b521a" target="_blank" rel="noreferrer">
              <img src={linkedin} alt="LinkedIn" width="28" />
            </a>
            <a href="mailto:jyang239@my.centennialcollege.ca">
              <img src={email} alt="Mail" width="28" />
            </a>


          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className={`${styles.fadeInUp}`}>
        <p className={styles.copyRight}>© {new Date().getFullYear()} Jie Yang</p>
      </footer>
    </section>
  )
}
