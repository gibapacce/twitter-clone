let tweets = [
  { id: 1, user: 'admin', content: 'Hello Twitter!', likes: [], retweets: [], comments: [] }
];

export async function GET() {
  // Retorna todos os comentários de todos os tweets
  const comments = tweets.flatMap(t => t.comments.map(c => ({ tweetId: t.id, ...c })));
  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 