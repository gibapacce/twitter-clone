"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bulma/css/bulma.min.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", username, password }),
    });
    const data = await res.json();
    if (data.success) {
      // Salva usuário no localStorage (simulação de sessão)
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } else {
      setError(data.error || "Erro ao fazer login");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 80 }}>
      <h1 className="title has-text-centered">Entrar</h1>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label className="label">Usuário</label>
          <div className="control">
            <input className="input" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Senha</label>
          <div className="control">
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </div>
        {error && <p className="has-text-danger">{error}</p>}
        <div className="field is-grouped is-grouped-centered" style={{ marginTop: 20 }}>
          <div className="control">
            <button className="button is-link" type="submit">Entrar</button>
          </div>
          <div className="control">
            <button className="button is-text" type="button" onClick={() => router.push("/register")}>Criar conta</button>
          </div>
        </div>
      </form>
    </div>
  );
} 