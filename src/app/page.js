"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Avatar from "./components/Avatar";
import Toast from "./components/Toast";
import "bulma/css/bulma.min.css";

export default function FeedPage() {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(u));
    fetchTweets();
  }, []);

  async function fetchTweets() {
    setLoading(true);
    const res = await fetch("/api/tweets");
    const data = await res.json();
    setTweets(data);
    setLoading(false);
  }

  async function handleTweet(e) {
    e.preventDefault();
    if (!content.trim()) return;
    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.username, content }),
    });
    if (res.ok) {
      setContent("");
      fetchTweets();
      setToast({ message: "Tweet enviado!", type: "success" });
    } else {
      setToast({ message: "Erro ao tweetar", type: "danger" });
    }
  }

  async function handleAction(tweetId, action, extra = {}) {
    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweetId, user: user.username, action, ...extra }),
    });
    fetchTweets();
    if (action === "like") setToast({ message: "Você curtiu o tweet!", type: "success" });
    if (action === "unlike") setToast({ message: "Você removeu o like!", type: "info" });
    if (action === "retweet") setToast({ message: "Você retweetou!", type: "success" });
    if (action === "comment") setToast({ message: "Comentário enviado!", type: "success" });
    if (action === "delete") setToast({ message: "Tweet deletado!", type: "warning" });
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="container" style={{ maxWidth: 600, marginTop: 30 }}>
        <form onSubmit={handleTweet} className="box" style={{ display: "flex", gap: 16, alignItems: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "box-shadow .2s" }}>
          <Avatar name={user?.name} size={44} />
          <div style={{ flex: 1 }}>
            <textarea
              className="textarea"
              style={{ borderRadius: 12, minHeight: 60, transition: "box-shadow .2s" }}
              placeholder="O que está acontecendo?"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
            <div className="is-flex is-justify-content-end mt-2">
              <button className="button is-link" type="submit" style={{ borderRadius: 20, fontWeight: 600, transition: "background .2s, box-shadow .2s" }}>
                <i className="fa-solid fa-feather-pointed"></i> &nbsp;Tweetar
              </button>
            </div>
          </div>
        </form>
        {loading ? (
          <div className="has-text-centered mt-6">
            <button className="button is-loading is-large is-white" style={{ border: "none", boxShadow: "none" }}></button>
          </div>
        ) : (
          tweets.map(tweet => (
            <div className="box tweet-card" key={tweet.id} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderRadius: 16, marginBottom: 18, transition: "box-shadow .2s, transform .2s" }}>
              <div className="is-flex is-align-items-center mb-2">
                <Avatar name={tweet.user} size={36} />
                <strong className="ml-2">@{tweet.user}</strong>
                {tweet.user === user.username && (
                  <button className="delete ml-auto" onClick={() => handleAction(tweet.id, "delete")}></button>
                )}
              </div>
              <p style={{ margin: "10px 0", fontSize: 17 }}>{tweet.content}</p>
              <div className="buttons are-small mt-2">
                <button
                  className={`button is-light ${tweet.likes.includes(user.username) ? "has-text-link" : ""}`}
                  onClick={() => handleAction(tweet.id, tweet.likes.includes(user.username) ? "unlike" : "like")}
                  title="Curtir"
                  style={{ transition: "background .2s, color .2s, box-shadow .2s" }}
                >
                  <i className="fa-solid fa-heart"></i> &nbsp;{tweet.likes.length}
                </button>
                <button
                  className={`button is-light ${tweet.retweets.includes(user.username) ? "has-text-link" : ""}`}
                  onClick={() => handleAction(tweet.id, "retweet")}
                  title="Retweetar"
                  style={{ transition: "background .2s, color .2s, box-shadow .2s" }}
                >
                  <i className="fa-solid fa-retweet"></i> &nbsp;{tweet.retweets.length}
                </button>
              </div>
              {tweet.comments.length > 0 && (
                <div className="mt-2">
                  <strong>Comentários:</strong>
                  <ul style={{ paddingLeft: 16 }}>
                    {tweet.comments.map((c, i) => (
                      <li key={i} style={{ marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}><Avatar name={c.user} size={22} /> @{c.user}:</span> {c.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <form
                className="mt-2"
                style={{ display: "flex", gap: 8 }}
                onSubmit={e => {
                  e.preventDefault();
                  const text = e.target.elements.comment.value;
                  if (text) {
                    handleAction(tweet.id, "comment", { text });
                    e.target.reset();
                  }
                }}
              >
                <input className="input" name="comment" placeholder="Comentar..." style={{ borderRadius: 16, transition: "box-shadow .2s" }} />
                <button className="button is-link" type="submit" style={{ borderRadius: 16, transition: "background .2s, box-shadow .2s" }}>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          ))
        )}
        {error && <p className="has-text-danger">{error}</p>}
      </div>
      <style jsx global>{`
        .tweet-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.13);
          transform: translateY(-2px) scale(1.01);
        }
        .button.is-link:hover, .button.is-link:focus {
          background: #0072ff !important;
          box-shadow: 0 2px 8px rgba(0,123,255,0.13);
        }
        .box:hover, .box:focus-within {
          transition: box-shadow .2s, transform .2s;
        }
      `}</style>
    </div>
  );
}
