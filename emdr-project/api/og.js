export const config = { runtime: 'edge' };

const BLOG_POSTS = {
  "what-happens-in-an-emdr-session": { title: "What Actually Happens in an EMDR Session", image: "/emdr-session-blog.jpg", description: "A clear, honest breakdown of what an EMDR session looks like from start to finish." },
  "why-talk-therapy-wasnt-enough": { title: "Why Talk Therapy Wasn't Enough and What to Try Instead", image: "/talk-therapy-blog.jpg", description: "If you have done real work in therapy and still feel stuck, the problem is not your effort." },
  "why-your-nervous-system-gets-stuck": { title: "Why Your Nervous System Gets Stuck and How EMDR Helps", image: "/nervous-system-blog.jpg", description: "Trauma is not a character flaw. It is an incomplete biological process." },
  "emdr-for-anxiety-how-it-works": { title: "EMDR for Anxiety: How It Works and What to Expect", image: "/blog-emdr-anxiety.jpg", description: "EMDR therapy for anxiety targets the root memories keeping your nervous system on alert." },
  "what-is-complex-ptsd": { title: "What Is Complex PTSD and How Is It Different from PTSD", image: "/blog-complex-ptsd.jpg", description: "Complex PTSD develops from chronic trauma and affects identity, self-worth, and relationships." },
  "emdr-vs-cbt-which-is-right": { title: "EMDR vs CBT: Which Is Right for You", image: "/blog-emdr-vs-cbt.jpg", description: "EMDR and CBT are both evidence-based — but they work differently and suit different people." },
  "how-many-emdr-sessions-will-i-need": { title: "How Many EMDR Sessions Will I Need", image: "/blog-emdr-sessions.jpg", description: "How long does EMDR therapy take? An honest, realistic breakdown of treatment length." },
  "what-is-bilateral-stimulation": { title: "What Is Bilateral Stimulation and Why Does It Work", image: "/blog-bilateral-stimulation.jpg", description: "Bilateral stimulation is the core of EMDR therapy. Here is what it actually is and why it works." },
};

const BOT_AGENTS = ['facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'slackbot', 'telegrambot', 'discordbot', 'iMessagebot'];

export default function handler(req) {
  const url = new URL(req.url);
  const ua = (req.headers.get('user-agent') || '').toLowerCase();
  const isBot = BOT_AGENTS.some(bot => ua.includes(bot));

  if (!isBot) {
    return new Response(null, { status: 302, headers: { Location: url.pathname } });
  }

  const pathParts = url.pathname.split('/');
  const slug = pathParts[pathParts.length - 1];
  const post = BLOG_POSTS[slug];

  if (!post) {
    return new Response(null, { status: 302, headers: { Location: url.pathname } });
  }

  const imageUrl = `https://emdrtherapybayarea.com${post.image}`;
  const pageUrl = `https://emdrtherapybayarea.com/blog/${slug}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${post.title} | EMDR Therapy Bay Area</title>
  <meta name="description" content="${post.description}" />
  <meta property="og:title" content="${post.title} | EMDR Therapy Bay Area" />
  <meta property="og:description" content="${post.description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title} | EMDR Therapy Bay Area" />
  <meta name="twitter:description" content="${post.description}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta http-equiv="refresh" content="0;url=${pageUrl}" />
</head>
<body>Redirecting...</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html' },
  });
}
