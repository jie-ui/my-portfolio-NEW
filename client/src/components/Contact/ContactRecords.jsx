import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '@/api/http';
import { useAuth } from "@/auth/authContext";
import styles from './Contact.module.css'; 

export default function ContactRecords() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await http.get('/contacts');
        setContacts(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load contact messages.');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await http.delete(`/contacts/${id}`);
      setContacts((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to delete message.');
    }
  };

  return (
    <section className={styles.recordsSection}>
      <div className={styles.recordsContainer}>
        <h2 className={styles.recordsTitle}>📬 Contact Messages</h2>

        {loading ? (
          <p className={styles.loading}>⏳ Loading messages...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : contacts.length === 0 ? (
          <div className={styles.emptyState}>
            <p> No one has left a message yet.</p>
            <div className={styles.backBtnWrapper}>
              <button onClick={() => navigate('/')} className={styles.backBtn}>
                ⬅ Back to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((msg) => (
                    <tr key={msg._id}>
                      <td>{msg.firstname}</td>
                      <td>{msg.lastname}</td>
                      <td>{msg.email}</td>
                      <td>{msg.message}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className={styles.deleteBtn}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.backBtnWrapper}>
              <button onClick={() => navigate('/')} className={styles.backBtn}>
                ⬅ Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}