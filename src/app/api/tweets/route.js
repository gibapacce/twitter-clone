let tweets = [
  { id: 1, user: 'admin', content: 'Hello Proletariado!', likes: [], retweets: [], comments: [] }
];

export async function GET() {
  return new Response(JSON.stringify(tweets), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const body = await request.json();
  if (body.action === 'like') {
    const tweet = tweets.find(t => t.id === body.tweetId);
    if (tweet && !tweet.likes.includes(body.user)) tweet.likes.push(body.user);
    return new Response(JSON.stringify(tweet), { status: 200 });
  }
  if (body.action === 'unlike') {
    const tweet = tweets.find(t => t.id === body.tweetId);
    if (tweet) tweet.likes = tweet.likes.filter(u => u !== body.user);
    return new Response(JSON.stringify(tweet), { status: 200 });
  }
  if (body.action === 'retweet') {
    const tweet = tweets.find(t => t.id === body.tweetId);
    if (tweet && !tweet.retweets.includes(body.user)) tweet.retweets.push(body.user);
    return new Response(JSON.stringify(tweet), { status: 200 });
  }
  if (body.action === 'comment') {
    const tweet = tweets.find(t => t.id === body.tweetId);
    if (tweet) tweet.comments.push({ user: body.user, text: body.text });
    return new Response(JSON.stringify(tweet), { status: 200 });
  }
  if (body.action === 'delete') {
    const idx = tweets.findIndex(t => t.id === body.tweetId && t.user === body.user);
    if (idx !== -1) tweets.splice(idx, 1);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  // Criar novo tweet
  const newTweet = {
    id: tweets.length + 1,
    user: body.user,
    content: body.content,
    likes: [],
    retweets: [],
    comments: []
  };
  tweets.unshift(newTweet);
  return new Response(JSON.stringify(newTweet), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
} 