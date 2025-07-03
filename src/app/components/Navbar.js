"use client";
import { useRouter, usePathname } from "next/navigation";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ user, onLogout }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div className="navbar-brand">
        <a className="navbar-item" onClick={() => router.push("/")}
          style={{ fontWeight: 700, fontSize: 22 }}>
          <i className="fa-brands fa-twitter has-text-link" style={{ marginRight: 8 }}></i>
          Twitter Clone
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <a className={`navbar-item${pathname === "/" ? " has-text-link active" : ""}`} onClick={() => router.push("/")}> <i className="fa-solid fa-house"></i> &nbsp;Feed</a>
          <a className={`navbar-item${pathname === "/explore" ? " has-text-link active" : ""}`} onClick={() => router.push("/explore")}> <i className="fa-solid fa-hashtag"></i> &nbsp;Explorar</a>
          <a className={`navbar-item${pathname?.startsWith("/profile") ? " has-text-link active" : ""}`} onClick={() => router.push(`/profile/${user?.username}`)}> <i className="fa-solid fa-user"></i> &nbsp;Perfil</a>
        </div>
        <div className="navbar-end">
          {user && (
            <div className="navbar-item is-flex is-align-items-center" style={{ gap: 8 }}>
              <Avatar name={user.name} size={32} color={user.avatarColor} image={user.avatarImage} />
              <span className="ml-2 mr-2">Olá, <strong>{user.name}</strong></span>
              <button
                className="button is-small"
                style={{ background: 'transparent', color: 'var(--main-text)', border: 'none', boxShadow: 'none', fontWeight: 500, transition: 'color .2s, background .2s' }}
                onClick={onLogout}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.07)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <i className="fa-solid fa-sign-out-alt">Sair</i>
              </button>
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 