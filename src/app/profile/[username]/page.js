"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Avatar from "../../components/Avatar";
import "bulma/css/bulma.min.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const username = params?.username;

  useEffect(() => {
    const u = localStorage.getItem("user");
    console.log("Usuário localStorage:", u);
    if (!u) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(u));
    fetchProfile();
    fetchTweets();
  }, [username]);

  async function fetchProfile() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setProfile(data.find(u => u.username === username));
  }

  async function fetchTweets() {
    setLoading(true);
    const res = await fetch("/api/tweets");
    const data = await res.json();
    setTweets(data.filter(t => t.user === username));
    setLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  if (!profile) return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container" style={{ maxWidth: 600, marginTop: 30 }}>
        <p>Usuário não encontrado.</p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container" style={{ maxWidth: 600, marginTop: 30 }}>
        {/* Banner */}
        <div style={{ height: 120, background: "linear-gradient(90deg, var(--main-green) 0%, var(--main-mint) 40%, var(--main-cyan) 80%, var(--main-lightgreen) 100%)", borderRadius: 16, marginBottom: -60, position: "relative" }}></div>
        {/* Avatar grande */}
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginBottom: 16 }}>
          <div style={{ marginTop: -60, border: "4px solid #fff", borderRadius: "50%", boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
            <Avatar name={profile.name} size={96} />
          </div>
          <h2 className="title is-4 mt-2" style={{ color: "var(--main-green)" }}>@{profile.username}</h2>
          <p><strong>Nome:</strong> {profile.name}</p>
          <div className="is-flex is-align-items-center mt-2" style={{ gap: 24 }}>
            <span style={{ color: "var(--main-green)" }}><i className="fa-solid fa-feather-pointed"></i> Tweets: <strong>{tweets.length}</strong></span>
            <span style={{ color: "var(--main-mint)" }}><i className="fa-solid fa-heart"></i> Curtidas: <strong>{tweets.reduce((acc, t) => acc + t.likes.length, 0)}</strong></span>
            <span style={{ color: "var(--main-cyan)" }}><i className="fa-solid fa-retweet"></i> Retweets: <strong>{tweets.reduce((acc, t) => acc + t.retweets.length, 0)}</strong></span>
          </div>
        </div>
        <h3 className="title is-5 mt-4" style={{ color: "var(--main-green)" }}>Tweets</h3>
        {loading ? (
          <div className="has-text-centered mt-6">
            <button className="button is-loading is-large is-white" style={{ border: "none", boxShadow: "none" }}></button>
          </div>
        ) : tweets.length === 0 ? (
          <p>Nenhum tweet encontrado.</p>
        ) : (
          tweets.map(tweet => (
            <div className="box tweet-card" key={tweet.id} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderRadius: 16, marginBottom: 18, transition: "box-shadow .2s, transform .2s" }}>
              <p style={{ fontSize: 17 }}>{tweet.content}</p>
              <div className="is-size-7 has-text-grey mt-2">
                <i className="fa-solid fa-heart" style={{ color: "var(--main-mint)" }}></i> {tweet.likes.length} &nbsp;|&nbsp; <i className="fa-solid fa-retweet" style={{ color: "var(--main-cyan)" }}></i> {tweet.retweets.length} &nbsp;|&nbsp; <i className="fa-solid fa-comment" style={{ color: "var(--main-lightgreen)" }}></i> {tweet.comments.length}
              </div>
            </div>
          ))
        )}
        <style jsx global>{`
          .tweet-card:hover {
            box-shadow: 0 6px 24px rgba(106,217,214,0.13);
            transform: translateY(-2px) scale(1.01);
          }
        `}</style>
      </div>
    </div>
  );
} 