"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
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
        <form onSubmit={handleSearch} className="box">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" placeholder="Buscar tweets ou usuários..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="control">
              <button className="button is-link" type="submit">Buscar</button>
            </div>
          </div>
        </form>
        {results.tweets.length > 0 && (
          <div>
            <h3 className="title is-6">Tweets encontrados</h3>
            {results.tweets.map(tweet => (
              <div className="box" key={tweet.id}>
                <strong>@{tweet.user}</strong>
                <p>{tweet.content}</p>
              </div>
            ))}
          </div>
        )}
        {results.users.length > 0 && (
          <div>
            <h3 className="title is-6">Usuários encontrados</h3>
            {results.users.map(u => (
              <div className="box" key={u.id}>
                <a onClick={() => router.push(`/profile/${u.username}`)} style={{ cursor: "pointer" }}>
                  <strong>@{u.username}</strong> - {u.name}
                </a>
              </div>
            ))}
          </div>
        )}
        {results.tweets.length === 0 && results.users.length === 0 && query && (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
} 