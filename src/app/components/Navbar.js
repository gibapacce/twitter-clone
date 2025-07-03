"use client";
import { useRouter } from "next/navigation";

export default function Navbar({ user, onLogout }) {
  const router = useRouter();

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" onClick={() => router.push("/")}>Twitter Clone</a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" onClick={() => router.push("/")}>Feed</a>
          <a className="navbar-item" onClick={() => router.push("/explore")}>Explorar</a>
          <a className="navbar-item" onClick={() => router.push(`/profile/${user?.username}`)}>Perfil</a>
        </div>
        <div className="navbar-end">
          {user && (
            <div className="navbar-item">
              <span className="mr-2">Olá, <strong>{user.name}</strong></span>
              <button className="button is-small is-light" onClick={onLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 