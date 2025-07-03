"use client";
import { useRouter, usePathname } from "next/navigation";
import Avatar from "./Avatar";

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
          <a className={`navbar-item${pathname === "/" ? " has-text-link" : ""}`} onClick={() => router.push("/")}> <i className="fa-solid fa-house"></i> &nbsp;Feed</a>
          <a className={`navbar-item${pathname === "/explore" ? " has-text-link" : ""}`} onClick={() => router.push("/explore")}> <i className="fa-solid fa-hashtag"></i> &nbsp;Explorar</a>
          <a className={`navbar-item${pathname?.startsWith("/profile") ? " has-text-link" : ""}`} onClick={() => router.push(`/profile/${user?.username}`)}> <i className="fa-solid fa-user"></i> &nbsp;Perfil</a>
        </div>
        <div className="navbar-end">
          {user && (
            <div className="navbar-item is-flex is-align-items-center">
              <Avatar name={user.name} size={32} />
              <span className="ml-2 mr-2">Olá, <strong>{user.name}</strong></span>
              <button className="button is-small is-light" onClick={onLogout}><i className="fa-solid fa-sign-out-alt"></i> Sair</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 