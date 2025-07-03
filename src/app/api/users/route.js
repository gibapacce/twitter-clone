let users = [
  { id: 1, username: 'admin', password: 'admin', name: 'Administrador' }
];

export async function GET() {
  // Não retorna senha
  return new Response(JSON.stringify(users.map(u => ({ id: u.id, username: u.username, name: u.name }))), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 