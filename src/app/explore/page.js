"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";
import "bulma/css/bulma.min.css";

export default function ExplorePage() {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ tweets: [], users: [] });
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(u));
    fetchTweets();
    fetchUsers();
  }, []);

  async function fetchTweets() {
    const res = await fetch("/api/tweets");
    const data = await res.json();
    setTweets(data);
  }

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  function handleSearch(e) {
    e.preventDefault();
    const q = query.toLowerCase();
    setResults({
      tweets: tweets.filter(t => t.content.toLowerCase().includes(q)),
      users: users.filter(u => u.username.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)),
    });
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container" style={{ maxWidth: 600, marginTop: 30 }}>
        <form onSubmit={handleSearch} className="box" style={{ display: "flex", gap: 8, alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", background: "var(--main-lightgreen)" }}>
          <i className="fa-solid fa-magnifying-glass fa-lg" style={{ color: "var(--main-green)" }}></i>
          <input className="input" placeholder="Buscar tweets ou usuários..." value={query} onChange={e => setQuery(e.target.value)} style={{ borderRadius: 16, border: "1.5px solid var(--main-green)", color: "var(--main-mint)" }} />
          <button className="button is-link" type="submit" style={{ borderRadius: 16, background: "var(--main-mint)", color: "#222", border: "none" }}><i className="fa-solid fa-search"></i></button>
        </form>
        {results.tweets.length > 0 && (
          <div>
            <h3 className="title is-6 mt-4" style={{ color: "var(--main-green)" }}><i className="fa-solid fa-feather-pointed"></i> Tweets encontrados</h3>
            {results.tweets.map(tweet => (
              <div className="box explore-card" key={tweet.id} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderRadius: 16, marginBottom: 14, transition: "box-shadow .2s, transform .2s", border: "1.5px solid var(--main-mint)" }}>
                <div className="is-flex is-align-items-center mb-1">
                  <Avatar name={tweet.user} size={28} />
                  <strong className="ml-2" style={{ color: "var(--main-green)" }}>@{tweet.user}</strong>
                </div>
                <p style={{ fontSize: 16 }}>{tweet.content}</p>
              </div>
            ))}
          </div>
        )}
        {results.users.length > 0 && (
          <div>
            <h3 className="title is-6 mt-4" style={{ color: "var(--main-cyan)" }}><i className="fa-solid fa-user"></i> Usuários encontrados</h3>
            {results.users.map(u => (
              <div className="box explore-card" key={u.id} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderRadius: 16, marginBottom: 14, transition: "box-shadow .2s, transform .2s", border: "1.5px solid var(--main-cyan)" }}>
                <a onClick={() => router.push(`/profile/${u.username}`)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={u.name} size={28} />
                  <strong style={{ color: "var(--main-green)" }}>@{u.username}</strong> - <span style={{ color: "var(--main-mint)" }}>{u.name}</span>
                </a>
              </div>
            ))}
          </div>
        )}
        {results.tweets.length === 0 && results.users.length === 0 && query && (
          <p>Nenhum resultado encontrado.</p>
        )}
        <style jsx global>{`
          .explore-card:hover {
            box-shadow: 0 6px 24px rgba(106,217,214,0.13);
            transform: translateY(-2px) scale(1.01);
          }
        `}</style>
      </div>
    </div>
  );
} 