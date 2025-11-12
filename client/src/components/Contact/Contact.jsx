import styles from './Contact.module.css';
import github from '@/assets/github.png';
import linkedin from '@/assets/linkedin.png';
import emailIcon from '@/assets/email.png';
import { useState } from 'react';
import http from '@/api/http';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  
 
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAdmin = token && role === 'admin';

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await http.post('/contacts', form);
      alert('Message submitted!');
      setForm({ firstname: '', lastname: '', email: '', message: '' });
      navigate('/');
    } catch (err) {
      alert('Submit failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Get In Touch</h2>
        <p className={styles.desc}>Feel free to connect with me or send a message!</p>

        <form className={styles.contactForm} onSubmit={onSubmit}>
          <input name="firstname" value={form.firstname} onChange={onChange} placeholder="First Name" required />
          <input name="lastname" value={form.lastname} onChange={onChange} placeholder="Last Name" required />
          <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Your Email" required />
          <textarea name="message" rows="5" value={form.message} onChange={onChange} placeholder="Your Message" required />
          <button type="submit" disabled={saving}>{saving ? 'Sending...' : 'Send Message'}</button>
        </form>

       
        {isAdmin && (
          <div className={styles.adminButton}>
            <button onClick={() => navigate('/contact-records')}>
              View Contact Records
            </button>
          </div>
        )}

        <div className={styles.icons}>
          <a href="https://github.com/jie-ui" target="_blank" rel="noreferrer"><img src={github} alt="GitHub" /></a>
          <a href="https://www.linkedin.com/in/jie-yang-9799b521a" target="_blank" rel="noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
          <a href="mailto:jyang239@my.centennialcollege.ca"><img src={emailIcon} alt="Mail" /></a>
        </div>
      </div>

      <footer>
        <p className={styles.copyRight}>© {new Date().getFullYear()} Jie Yang — Built with React</p>
      </footer>
    </section>
  );
}

