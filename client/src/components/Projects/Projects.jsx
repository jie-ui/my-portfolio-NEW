import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "@/api/http";
import styles from "./Projects.module.css";

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = typeof window !== "undefined" ? localStorage.getItem("role") : "";
  const isAdmin = role === "admin";

  // 从 VITE_API_BASE_URL 获取 Render 后端根域名
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // https://your-render/api
  const BACKEND_URL = API_BASE.replace("/api", "");   // https://your-render.com

  // 通用图片 URL 构造
  const getImgUrl = (imgPath) => {
    if (!imgPath) return "";

    // 打印看看后端到底返回什么
    console.log("IMG from backend:", imgPath);

    // 如果后端返回完整 URL（http 开头），直接用
    if (imgPath.startsWith("http")) return imgPath;

    // 如果后端返回没有 "/"，自动补上
    if (!imgPath.startsWith("/")) imgPath = "/" + imgPath;

    // 最终拼接可访问 URL
    return BACKEND_URL + imgPath;
  };

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await http.get("/projects");
        const list = Array.isArray(data?.data) ? data.data : [];
        if (!ignore) setItems(list);
      } catch (e) {
        console.error("Load projects failed:", e);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await http.delete(`/projects/${id}`);
      setItems((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      console.error(e);
      alert("Delete failed.");
    }
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Projects</h1>

        {isAdmin && (
          <div className={styles.addBtnWrapper}>
            <button
              className={styles.addButton}
              onClick={() => navigate("/projects/add")}
            >
              ＋ Add Project
            </button>
          </div>
        )}

        <div className={styles.grid}>
          {items.map((p, i) => (
            <article
              key={p._id}
              className={`${styles.card} ${styles.fadeInUp}`}
              style={{ animationDelay: `${0.1 + i * 0.05}s` }}
            >
              {p.img && (
                <div className={styles.imageBox}>
                  <img src={p.img} alt={p.title} />
                </div>
              )}


              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>

              <p className={styles.cardAuthor}>
                {p.firstname} {p.lastname} — {p.email}
              </p>

              {p.completion && (
                <p className={styles.cardDate}>
                  Completion: {new Date(p.completion).toLocaleDateString()}
                </p>
              )}

              {Array.isArray(p.tech) && p.tech.length > 0 && (
                <div className={styles.tech}>
                  {p.tech.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>
              )}

              <div className={styles.links}>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.btn}
                  >
                    Live Demo
                  </a>
                )}
                {p.code && (
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.btnOutline}
                  >
                    Source Code
                  </a>
                )}

                {isAdmin && (
                  <>
                    <button
                      className={styles.btnOutline}
                      onClick={() => navigate(`/projects/add?id=${p._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.btn}
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
