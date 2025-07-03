"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import "bulma/css/bulma.min.css";

/**
 * Renders the user profile page, displaying profile information and tweets for the specified username.
 *
 * Redirects to the login page if no user is logged in. Shows a not found message if the profile does not exist.
 */
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
        <div className="box">
          <h2 className="title is-4">@{profile.username}</h2>
          <p><strong>Nome:</strong> {profile.name}</p>
        </div>
        <h3 className="title is-5 mt-4">Tweets</h3>
        {loading ? (
          <p>Carregando tweets...</p>
        ) : tweets.length === 0 ? (
          <p>Nenhum tweet encontrado.</p>
        ) : (
          tweets.map(tweet => (
            <div className="box" key={tweet.id}>
              <p>{tweet.content}</p>
              <div className="is-size-7 has-text-grey">Curtidas: {tweet.likes.length} | Retweets: {tweet.retweets.length} | Comentários: {tweet.comments.length}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 