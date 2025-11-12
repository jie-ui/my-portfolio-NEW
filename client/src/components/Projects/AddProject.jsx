import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import http from "@/api/http";
import styles from "./Projects.module.css";

export default function AddProject() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    img: "",
    tech: "",
    demo: "",
    code: "",
    isDefault: false,
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await http.get(`/projects/${id}`);
        const p = data?.data || {};
        setForm({
          title: p.title || "",
          description: p.description || "",
          firstname: p.firstname || "",
          lastname: p.lastname || "",
          email: p.email || "",
          completion: p.completion ? String(p.completion).slice(0, 10) : "",
          img: p.img || "",
          tech: Array.isArray(p.tech) ? p.tech.join(", ") : "",
          demo: p.demo || "",
          code: p.code || "",
          isDefault: !!p.isDefault,
        });
        setPreview(p.img || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load project.");
      }
    })();
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");
    if (!form.description.trim()) return alert("Description is required");

    setSaving(true);
    try {
      let imgUrl = form.img.trim();
      if (file) {
        const fd = new FormData();
        fd.append("image", file);
        const { data } = await http.post("/uploads/image", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imgUrl = data?.url || "";
      }

      const payload = {
        title: form.title,
        description: form.description,
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        completion: form.completion || null,
        img: imgUrl,
        tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
        demo: form.demo,
        code: form.code,
        isDefault: !!form.isDefault,
      };

      if (id) {
        await http.put(`/projects/${id}`, payload);
        alert("Updated!");
      } else {
        await http.post("/projects", payload);
        alert("Created!");
      }
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.formTitle}>{id ? "Edit Project" : "Add Project"}</h1>

        <form onSubmit={submit} className={styles.form}>
          <div>
            <label className={styles.label}>Title *</label>
            <input className={styles.input} name="title" value={form.title} onChange={onChange} required />
          </div>

          <div>
            <label className={styles.label}>Description *</label>
            <textarea className={styles.textarea} name="description" value={form.description} onChange={onChange} rows={4} required />
          </div>

          <div className={styles.row2}>
            <div>
              <label className={styles.label}>First Name *</label>
              <input className={styles.input} name="firstname" value={form.firstname} onChange={onChange} required />
            </div>
            <div>
              <label className={styles.label}>Last Name *</label>
              <input className={styles.input} name="lastname" value={form.lastname} onChange={onChange} required />
            </div>
          </div>

          <div className={styles.row2}>
            <div>
              <label className={styles.label}>Email *</label>
              <input className={styles.input} name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <label className={styles.label}>Completion Date</label>
              <input className={styles.input} name="completion" type="date" value={form.completion} onChange={onChange} />
            </div>
          </div>

          <div>
            <label className={styles.label}>Upload Image</label>
            <input className={styles.input} type="file" accept="image/*" onChange={onFile} />
            {preview && (
              <div className={styles.previewWrapper}>
                <img src={preview} alt="Preview" className={styles.preview} />
              </div>
            )}
          </div>

          <div>
            <label className={styles.label}>Tech (comma separated)</label>
            <input className={styles.input} name="tech" value={form.tech} placeholder="React, Node.js, MongoDB" onChange={onChange} />
          </div>

          <div className={styles.row2}>
            <div>
              <label className={styles.label}>Live Demo URL</label>
              <input className={styles.input} name="demo" value={form.demo} onChange={onChange} />
            </div>
            <div>
              <label className={styles.label}>Source Code URL</label>
              <input className={styles.input} name="code" value={form.code} onChange={onChange} />
            </div>
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={onChange} />
            <span>Mark as default</span>
          </label>

          <div className={styles.btnGroup}>
            <button className={styles.btn} type="submit" disabled={saving}>
              {saving ? "Saving..." : id ? "Save Changes" : "Create Project"}
            </button>
            <button
              className={styles.btnOutline}
              type="button"
              onClick={() => navigate("/projects")}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}