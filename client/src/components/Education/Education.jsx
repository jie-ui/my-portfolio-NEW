import React, { useEffect, useState } from 'react';
import http from '@/api/http';
import EducationForm from './EducationForm.jsx';
import styles from './Education.module.css'; 

export default function EducationPage() {
  const [educations, setEducations] = useState([]);
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const { data } = await http.get('/education');
      setEducations(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Load education failed:', err);
    }
  };

  useEffect(() => { load(); }, []);

  const onDeleted = async (id) => {
    if (!confirm('Delete this education?')) return;
    try {
      await http.delete(`/education/${id}`);
      setEducations((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  const onSaved = async () => {
    setEditing(null);
    await load();
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Education</h2>

        {educations.length ? (
          <div className={styles.list}>
            {educations.map((edu) => (
              <div key={edu._id} className={styles.card}>
                <h3 className={styles.cardTitle}>{edu.title}</h3>
                <p className={styles.cardInfo}>
                  {edu.firstname} {edu.lastname} — {edu.email}
                </p>
                <p className={styles.cardInfo}>
                  {new Date(edu.completion).toLocaleDateString()}
                </p>
                {edu.description && (
                  <p className={styles.cardDesc}>{edu.description}</p>
                )}

                {isAdmin && (
                  <div className={styles.cardActions}>
                    <button className={styles.btn} onClick={() => setEditing(edu)}>
                      Edit
                    </button>
                    <button className={styles.btnDelete} onClick={() => onDeleted(edu._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No education yet.</p>
        )}

        {isAdmin && (
          <>
            <hr className={styles.divider} />
            <h3 className={styles.formTitle}>
              {editing ? 'Edit Education' : 'Add New Education'}
            </h3>
            <EducationForm initial={editing} onSuccess={onSaved} />
          </>
        )}
      </div>
    </div>
  );
}