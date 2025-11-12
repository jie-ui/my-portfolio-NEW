import React, { useEffect, useState } from 'react';
import http from '@/api/http';

export default function EducationForm({ initial, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        firstname: initial.firstname || '',
        lastname: initial.lastname || '',
        email: initial.email || '',
        completion: initial.completion ? initial.completion.substring(0, 10) : '',
        description: initial.description || '',
      });
    } else {
      setForm({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: '',
      });
    }
    setLoading(false);
  }, [initial]);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (initial?._id) {
        await http.put(`/education/${initial._id}`, {
          ...form,
          completion: new Date(form.completion),
        });
        alert('Update successful!');
      } else {
        await http.post('/education', {
          ...form,
          completion: new Date(form.completion),
        });
        alert('Save successful!');
      }

      onSuccess?.();
    } catch (err) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'grid', gap: 16, maxWidth: 600 }}
    >
      <label>
        Program Title <span style={{ color: 'red' }}>*</span>
        <br />
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="e.g., Software Engineering Technology"
          required
          style={{ width: '100%', padding: 8 }}
        />
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <label>
          First Name <span style={{ color: 'red' }}>*</span>
          <br />
          <input
            name="firstname"
            value={form.firstname}
            onChange={onChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <label>
          Last Name <span style={{ color: 'red' }}>*</span>
          <br />
          <input
            name="lastname"
            value={form.lastname}
            onChange={onChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>
      </div>

      <label>
        Email Address <span style={{ color: 'red' }}>*</span>
        <br />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </label>

      <label>
        Completion Date <span style={{ color: 'red' }}>*</span>
        <br />
        <input
          type="date"
          name="completion"
          value={form.completion}
          onChange={onChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </label>

      <label>
        Description (Optional)
        <br />
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={onChange}
          style={{ width: '100%', padding: 8 }}
        />
      </label>

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" disabled={saving} style={{ padding: '8px 16px' }}>
          {saving ? 'Saving...' : initial?._id ? 'Update' : 'Save'}
        </button>
        {initial?._id && (
          <button 
            type="button" 
            onClick={handleCancel}
            style={{ padding: '8px 16px' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}