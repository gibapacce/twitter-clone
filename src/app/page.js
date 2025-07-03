"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import "bulma/css/bulma.min.css";

export default function FeedPage() {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    }
  }

  async function handleAction(tweetId, action, extra = {}) {
    await fetch("/api/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweetId, user: user.username, action, ...extra }),
    });
    fetchTweets();
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container" style={{ maxWidth: 600, marginTop: 30 }}>
        <form onSubmit={handleTweet} className="box">
          <textarea
            className="textarea"
            placeholder="O que está acontecendo?"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <button className="button is-link mt-2" type="submit">Tweetar</button>
        </form>
        {loading ? (
          <p>Carregando tweets...</p>
        ) : (
          tweets.map(tweet => (
            <div className="box" key={tweet.id}>
              <div className="is-flex is-justify-content-space-between">
                <strong>@{tweet.user}</strong>
                {tweet.user === user.username && (
                  <button className="delete" onClick={() => handleAction(tweet.id, "delete")}></button>
                )}
              </div>
              <p style={{ margin: "10px 0" }}>{tweet.content}</p>
              <div className="buttons are-small">
                <button
                  className={`button is-light ${tweet.likes.includes(user.username) ? "has-text-link" : ""}`}
                  onClick={() => handleAction(tweet.id, tweet.likes.includes(user.username) ? "unlike" : "like")}
                >
                  Curtir ({tweet.likes.length})
                </button>
                <button
                  className={`button is-light ${tweet.retweets.includes(user.username) ? "has-text-link" : ""}`}
                  onClick={() => handleAction(tweet.id, "retweet")}
                >
                  Retweetar ({tweet.retweets.length})
                </button>
                {/* Comentários podem ser expandidos depois */}
              </div>
              {tweet.comments.length > 0 && (
                <div className="mt-2">
                  <strong>Comentários:</strong>
                  <ul>
                    {tweet.comments.map((c, i) => (
                      <li key={i}><b>@{c.user}:</b> {c.text}</li>
                    ))}
                  </ul>
                </div>
              )}
              <form
                className="mt-2"
                onSubmit={e => {
                  e.preventDefault();
                  const text = e.target.elements.comment.value;
                  if (text) {
                    handleAction(tweet.id, "comment", { text });
                    e.target.reset();
                  }
                }}
              >
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input className="input" name="comment" placeholder="Comentar..." />
                  </div>
                  <div className="control">
                    <button className="button is-link" type="submit">Comentar</button>
                  </div>
                </div>
              </form>
            </div>
          ))
        )}
        {error && <p className="has-text-danger">{error}</p>}
      </div>
    </div>
  );
}
