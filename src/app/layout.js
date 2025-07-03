import "bulma/css/bulma.min.css";
import "./globals.css";
// Remover import ThemeToggle

export const metadata = {
  title: "ProleTwittado",
  description: "Uma rede social vibrante em vermelho e amarelo ouro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style>{`
          :root {
            --color-primary: #E63946;
            --color-secondary: #FFD600;
            --color-accent: #FF7043;
            --color-bg: #FFF8E1;
            --color-bg-card: #FFFDE7;
            --color-text: #1A1A1A;
            --color-text-muted: #6E6E6E;
            --color-border: #FFD600;
            --color-success: #43A047;
            --color-error: #E63946;
            --color-info: #FF7043;
            --color-warning: #FFD600;
          }
          [data-theme="dark"] {
            --color-primary: #E63946;
            --color-secondary: #FFD600;
            --color-accent: #FF7043;
            --color-bg: #1A1A1A;
            --color-bg-card: #232323;
            --color-text: #FFF8E1;
            --color-text-muted: #FFD600;
            --color-border: #E63946;
            --color-success: #43A047;
            --color-error: #E63946;
            --color-info: #FF7043;
            --color-warning: #FFD600;
          }
          html, body {
            background: var(--color-bg) !important;
            color: var(--color-text);
          }
          .navbar.is-light {
            background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 40%, var(--color-accent) 80%, var(--color-border) 100%);
          }
          .navbar.is-light .navbar-item, .navbar.is-light .navbar-link {
            color: var(--color-text) !important;
            font-weight: 500;
            transition: color .2s;
          }
          .navbar.is-light .navbar-item.has-text-link.active, .navbar.is-light .navbar-link.has-text-link.active {
            color: #fff !important;
          }
          .navbar.is-light .navbar-item:hover, .navbar.is-light .navbar-link:hover {
            color: var(--color-primary) !important;
          }
          .has-text-link, .navbar-item.has-text-link {
            color: var(--color-primary) !important;
          }
          .button.is-link, .is-link {
            background: var(--color-primary) !important;
            border-color: var(--color-secondary) !important;
            color: #fff !important;
          }
          .button.is-link:hover, .button.is-link:focus {
            background: var(--color-accent) !important;
            color: #222 !important;
            box-shadow: 0 2px 8px rgba(106,217,214,0.13);
          }
          .notification.is-success {
            background: var(--color-success);
            color: var(--color-text);
          }
          .notification.is-danger {
            background: var(--color-error);
            color: #fff;
          }
          .notification.is-info {
            background: var(--color-info);
            color: var(--color-primary);
          }
          .notification.is-warning {
            background: var(--color-warning);
            color: var(--color-text);
          }
          .box, .tweet-card {
            border: 1.5px solid var(--color-border);
            background: var(--color-bg-card);
            color: var(--color-text);
          }
        `}</style>
        <script dangerouslySetInnerHTML={{__html:`
          window.toggleTheme = function() {
            const html = document.documentElement;
            const theme = html.getAttribute('data-theme') === 'dark' ? '' : 'dark';
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
          };
          (function(){
            const theme = localStorage.getItem('theme');
            if(theme) document.documentElement.setAttribute('data-theme', theme);
          })();
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
