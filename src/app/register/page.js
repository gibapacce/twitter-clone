"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bulma/css/bulma.min.css";

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarColor, setAvatarColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#70D96A';
    }
    return '#70D96A';
  });
  const [avatarImage, setAvatarImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    let image = avatarImage;
    if (e.target.avatarImage.files[0]) {
      image = await toBase64(e.target.avatarImage.files[0]);
    }
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", username, password, name, avatarColor, avatarImage: image }),
    });
    const data = await res.json();
    if (data.success) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } else {
      setError(data.error || "Erro ao registrar");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 80 }}>
      <h1 className="title has-text-centered">Criar Conta</h1>
      <form onSubmit={handleRegister}>
        <div className="field">
          <label className="label">Nome</label>
          <div className="control">
            <input className="input" value={name} onChange={e => setName(e.target.value)} required />
          </div>
        </div>
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
        <div className="field">
          <label className="label">Avatar (opcional)</label>
          <div className="control">
            <input className="input" type="file" name="avatarImage" accept="image/*" onChange={e => setAvatarImage(null)} />
          </div>
          <div className="control mt-2">
            <label>Ou escolha uma cor:</label>
            <input type="color" value={avatarColor} onChange={e => setAvatarColor(e.target.value)} style={{ width: 40, height: 40, border: "none", marginLeft: 8 }} />
          </div>
        </div>
        {error && <p className="has-text-danger">{error}</p>}
        {success && <p className="has-text-success">Conta criada! Redirecionando...</p>}
        <div className="field is-grouped is-grouped-centered" style={{ marginTop: 20 }}>
          <div className="control">
            <button className="button is-link" type="submit">Registrar</button>
          </div>
          <div className="control">
            <button className="button is-text" type="button" onClick={() => router.push("/login")}>Voltar</button>
          </div>
        </div>
      </form>
    </div>
  );
} 