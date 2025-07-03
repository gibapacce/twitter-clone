// Sugestão: buscar cor padrão do CSS em vez de hardcoded, ex:
// getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
let users = [
  { id: 1, username: 'admin', password: 'admin', name: 'Administrador', avatarColor: '#70D96A', avatarImage: null }
];
let sessions = {};

export async function POST(request) {
  const { action, username, password, name, avatarColor, avatarImage } = await request.json();
  if (action === 'register') {
    if (users.find(u => u.username === username)) {
      return new Response(JSON.stringify({ error: 'Usuário já existe' }), { status: 400 });
    }
    const newUser = { id: users.length + 1, username, password, name, avatarColor, avatarImage };
    users.push(newUser);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  }
  if (action === 'login') {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Credenciais inválidas' }), { status: 401 });
    }
    // Sessão fake: retorna id do usuário
    return new Response(JSON.stringify({ success: true, user: { id: user.id, username: user.username, name: user.name, avatarColor: user.avatarColor, avatarImage: user.avatarImage } }), { status: 200 });
  }
  return new Response(JSON.stringify({ error: 'Ação inválida' }), { status: 400 });
} 