export const config = { runtime: 'edge' };

const SITE_URL = 'https://emdrtherapybayarea.com';
const DEFAULT_TITLE = 'EMDR Therapy Bay Area | Licensed EMDR Therapist | Marcus Ghiasi, LMFT';
const DEFAULT_DESCRIPTION = 'Licensed EMDR therapist serving the Bay Area and all of California via telehealth. Evidence-based trauma treatment for PTSD, anxiety, and more. Free 15-minute consultation.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const MAIN_PAGES = {
  '/': { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  '/about': { title: 'About Marcus Ghiasi, LMFT | EMDR Therapist Bay Area', description: 'Marcus Ghiasi is a Licensed Marriage and Family Therapist specializing in EMDR therapy for trauma, PTSD, and anxiety. Bay Area native offering virtual therapy across California.' },
  '/services': { title: 'EMDR Therapy Services | Bay Area | Marcus Ghiasi, LMFT', description: 'EMDR therapy for trauma, PTSD, anxiety, depression, grief, and more. Virtual sessions across California. Free 15-minute consultation.' },
  '/blog': { title: 'EMDR Therapy Blog | Bay Area | Marcus Ghiasi, LMFT', description: 'Expert insights on EMDR therapy, trauma recovery, anxiety, and mental health from Marcus Ghiasi, LMFT.' },
  '/contact': { title: 'Contact | Book EMDR Therapy | Marcus Ghiasi, LMFT', description: 'Schedule your free 15-minute consultation with Marcus Ghiasi, LMFT. EMDR therapy across California via telehealth.' },
  '/faq': { title: 'EMDR Therapy FAQ | Common Questions Answered | LMFT', description: 'Common questions about EMDR therapy, what to expect, how many sessions you need, and more.' },
};

const CITY_PAGES = {
  '/emdr-therapy-oakland': { title: 'EMDR Therapist Oakland | Trauma Therapy | LMFT | Free Consultation', description: 'Licensed EMDR therapist in Oakland (LMFT). EMDR for trauma, PTSD, anxiety, and community stress. $240/45min. Free consultation.' },
  '/emdr-therapy-berkeley': { title: 'EMDR Therapist Berkeley | Trauma Therapy | LMFT | UC Berkeley', description: 'Licensed EMDR therapist in Berkeley (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Serving UC Berkeley students and East Bay.' },
  '/emdr-therapy-emeryville': { title: 'EMDR Therapist Emeryville | Trauma Therapy | LMFT | East Bay', description: 'Licensed EMDR therapist in Emeryville (LMFT). EMDR for trauma, work stress, and anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-alameda': { title: 'EMDR Therapist Alameda | Trauma Therapy | LMFT | East Bay', description: 'Licensed EMDR therapist in Alameda (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. No bridge traffic. Free consultation.' },
  '/emdr-therapy-san-leandro': { title: 'EMDR Therapist San Leandro | Trauma Therapy | LMFT | East Bay', description: 'Licensed EMDR therapist in San Leandro (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-hayward': { title: 'EMDR Therapist Hayward | Trauma Therapy | LMFT | East Bay', description: 'Licensed EMDR therapist in Hayward (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-fremont': { title: 'EMDR Therapist Fremont | Trauma Therapy | LMFT | South Bay', description: 'Licensed EMDR therapist in Fremont (LMFT). EMDR for trauma, PTSD, immigration stress. $240/45min. Culturally responsive. Free consultation.' },
  '/emdr-therapy-walnut-creek': { title: 'EMDR Therapist Walnut Creek | Trauma Therapy | LMFT | Contra Costa', description: 'Licensed EMDR therapist in Walnut Creek (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-lafayette': { title: 'EMDR Therapist Lafayette | Trauma Therapy | LMFT | Contra Costa', description: 'Licensed EMDR therapist in Lafayette (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-orinda': { title: 'EMDR Therapist Orinda | Trauma Therapy | LMFT | Contra Costa', description: 'Licensed EMDR therapist in Orinda (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-moraga': { title: 'EMDR Therapist Moraga | Trauma Therapy | LMFT | Contra Costa', description: 'Licensed EMDR therapist in Moraga (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-danville': { title: 'EMDR Therapist Danville | Trauma Therapy | LMFT | Contra Costa', description: 'Licensed EMDR therapist in Danville (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-pleasanton': { title: 'EMDR Therapist Pleasanton | Trauma Therapy | LMFT | Tri-Valley', description: 'Licensed EMDR therapist in Pleasanton (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-livermore': { title: 'EMDR Therapist Livermore | Trauma Therapy | LMFT | Tri-Valley', description: 'Licensed EMDR therapist in Livermore (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-san-ramon': { title: 'EMDR Therapist San Ramon | Trauma Therapy | LMFT | Contra Costa', description: 'Licensed EMDR therapist in San Ramon (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-concord': { title: 'EMDR Therapist Concord | Trauma Therapy | LMFT | Contra Costa', description: 'Licensed EMDR therapist in Concord (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-san-francisco': { title: 'EMDR Therapist San Francisco | Trauma Therapy | LMFT | Free Consultation', description: 'Licensed EMDR therapist in San Francisco (LMFT). EMDR for trauma, PTSD, anxiety, and occupational stress. $240/45min. Free consultation.' },
  '/emdr-therapy-marin-county': { title: 'EMDR Therapist Marin County | Trauma Therapy | LMFT | Free Consultation', description: 'Licensed EMDR therapist in Marin County (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. No Golden Gate Bridge commute. Free consultation.' },
  '/emdr-therapy-mill-valley': { title: 'EMDR Therapist Mill Valley | Trauma Therapy | LMFT | Marin County', description: 'Licensed EMDR therapist in Mill Valley (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-san-rafael': { title: 'EMDR Therapist San Rafael | Trauma Therapy | LMFT | Marin County', description: 'Licensed EMDR therapist in San Rafael (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-sausalito': { title: 'EMDR Therapist Sausalito | Trauma Therapy | LMFT | South Marin', description: 'Licensed EMDR therapist in Sausalito (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-tiburon': { title: 'EMDR Therapist Tiburon | Trauma Therapy | LMFT | Marin County', description: 'Licensed EMDR therapist in Tiburon (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-san-jose': { title: 'EMDR Therapist San Jose | Trauma Therapy | LMFT | Silicon Valley', description: 'Licensed EMDR therapist in San Jose (LMFT). EMDR for trauma, PTSD, work stress, immigration stress. $240/45min. Free consultation.' },
  '/emdr-therapy-santa-clara': { title: 'EMDR Therapist Santa Clara | Trauma Therapy | LMFT | Silicon Valley', description: 'Licensed EMDR therapist in Santa Clara (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-sunnyvale': { title: 'EMDR Therapist Sunnyvale | Trauma Therapy | LMFT | Silicon Valley', description: 'Licensed EMDR therapist in Sunnyvale (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-cupertino': { title: 'EMDR Therapist Cupertino | Trauma Therapy | LMFT | Silicon Valley', description: 'Licensed EMDR therapist in Cupertino (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-mountain-view': { title: 'EMDR Therapist Mountain View | Trauma Therapy | LMFT | Silicon Valley', description: 'Licensed EMDR therapist in Mountain View (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-palo-alto': { title: 'EMDR Therapist Palo Alto | Trauma Therapy | LMFT | Stanford', description: 'Licensed EMDR therapist in Palo Alto (LMFT). EMDR for trauma, PTSD, performance anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-menlo-park': { title: 'EMDR Therapist Menlo Park | Trauma Therapy | LMFT | Peninsula', description: 'Licensed EMDR therapist in Menlo Park (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-redwood-city': { title: 'EMDR Therapist Redwood City | Trauma Therapy | LMFT | Peninsula', description: 'Licensed EMDR therapist in Redwood City (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-san-mateo': { title: 'EMDR Therapist San Mateo | Trauma Therapy | LMFT | Peninsula', description: 'Licensed EMDR therapist in San Mateo (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-burlingame': { title: 'EMDR Therapist Burlingame | Trauma Therapy | LMFT | Peninsula', description: 'Licensed EMDR therapist in Burlingame (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-foster-city': { title: 'EMDR Therapist Foster City | Trauma Therapy | LMFT | Peninsula', description: 'Licensed EMDR therapist in Foster City (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-napa': { title: 'EMDR Therapist Napa | Trauma Therapy | LMFT | Wine Country', description: 'Licensed EMDR therapist in Napa (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-therapy-sonoma': { title: 'EMDR Therapist Sonoma | Trauma Therapy | LMFT | Sonoma County', description: 'Licensed EMDR therapist in Sonoma (LMFT). EMDR for trauma, PTSD, wildfire trauma. $240/45min. Free consultation.' },
  '/emdr-therapy-petaluma': { title: 'EMDR Therapist Petaluma | Trauma Therapy | LMFT | Sonoma County', description: 'Licensed EMDR therapist in Petaluma (LMFT). EMDR for trauma, PTSD, wildfire trauma. $240/45min. Free consultation.' },
  '/emdr-therapy-santa-rosa': { title: 'EMDR Therapist Santa Rosa | Trauma Therapy | LMFT | Sonoma County', description: 'Licensed EMDR therapist in Santa Rosa (LMFT). EMDR for trauma, PTSD, wildfire trauma. $240/45min. Free consultation.' },
  '/emdr-therapy-online-california': { title: 'Online EMDR Therapist California | Telehealth EMDR | LMFT', description: 'Licensed online EMDR therapist in California (LMFT). Telehealth EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.' },
  '/emdr-telehealth-california': { title: 'EMDR Telehealth California | Virtual EMDR Therapy | LMFT', description: 'EMDR telehealth therapy across California. Licensed LMFT. Evidence-based trauma treatment via secure video. $240/45min. Free consultation.' },
  '/virtual-emdr-therapy-california': { title: 'Virtual EMDR Therapy California | Online Trauma Treatment | LMFT', description: 'Virtual EMDR therapy across California. Licensed LMFT. Effective trauma treatment without leaving home. $240/45min. Free consultation.' },
  '/emdr-therapy-bay-area': { title: 'EMDR Therapy Bay Area | Licensed EMDR Therapist | LMFT', description: 'Licensed EMDR therapist serving the entire Bay Area (LMFT). EMDR for trauma, PTSD, anxiety, depression. $240/45min. Free consultation.' },
};

const CONDITION_PAGES = {
  '/emdr-for-trauma': { title: 'EMDR for Trauma | Evidence-Based Trauma Treatment | LMFT', description: 'EMDR therapy for trauma and PTSD. Evidence-based treatment that processes stuck memories and reduces their emotional charge. Free consultation.' },
  '/emdr-for-ptsd': { title: 'EMDR for PTSD | Trauma Therapy | Licensed LMFT | Bay Area', description: 'EMDR is one of the most effective evidence-based treatments for PTSD. Virtual sessions across California. Free 15-minute consultation.' },
  '/emdr-for-complex-ptsd': { title: 'EMDR for Complex PTSD | C-PTSD Treatment | LMFT | Bay Area', description: 'EMDR for complex PTSD from chronic trauma. Specialized treatment for C-PTSD with Marcus Ghiasi, LMFT. Free consultation.' },
  '/emdr-for-childhood-trauma': { title: 'EMDR for Childhood Trauma | Early Trauma Treatment | LMFT', description: 'EMDR therapy for childhood trauma, adverse experiences, and developmental trauma. Virtual sessions across California. Free consultation.' },
  '/emdr-for-sexual-trauma': { title: 'EMDR for Sexual Trauma | Trauma-Informed Treatment | LMFT', description: 'EMDR for sexual trauma and assault. Safe, trauma-informed treatment without requiring detailed narration. Free 15-minute consultation.' },
  '/emdr-for-medical-trauma': { title: 'EMDR for Medical Trauma | Healthcare Trauma Treatment | LMFT', description: 'EMDR therapy for medical trauma, including difficult diagnoses, procedures, and healthcare experiences. Free consultation.' },
  '/emdr-for-accident-trauma': { title: 'EMDR for Accident Trauma | Car Accidents & Injury | LMFT', description: 'EMDR for trauma from car accidents, injuries, and other accidents. Fast, effective trauma processing. Free consultation.' },
  '/emdr-for-first-responders': { title: 'EMDR for First Responders | Occupational Trauma | LMFT | Bay Area', description: 'EMDR for first responders dealing with occupational trauma, cumulative stress, and PTSD. Specialized care for police, fire, and EMS. Free consultation.' },
  '/emdr-for-anxiety': { title: 'EMDR for Anxiety | Anxiety Treatment | LMFT | Bay Area', description: 'EMDR therapy for anxiety, including generalized anxiety, panic attacks, and social anxiety. Evidence-based treatment. Free consultation.' },
  '/emdr-for-panic-attacks': { title: 'EMDR for Panic Attacks | Panic Disorder Treatment | LMFT', description: 'EMDR therapy for panic attacks and panic disorder. Address the root memories driving panic responses. Free consultation.' },
  '/emdr-for-social-anxiety': { title: 'EMDR for Social Anxiety | Social Anxiety Treatment | LMFT', description: 'EMDR therapy for social anxiety. Address the experiences that calibrated your social threat response. Free consultation.' },
  '/emdr-for-phobias': { title: 'EMDR for Phobias | Phobia Treatment | LMFT | Bay Area', description: 'EMDR therapy for phobias and specific fears. Evidence-based treatment that addresses root experiences. Free consultation.' },
  '/emdr-for-health-anxiety': { title: 'EMDR for Health Anxiety | Illness Anxiety Treatment | LMFT', description: 'EMDR therapy for health anxiety and illness anxiety disorder. Address the underlying fears driving health worry. Free consultation.' },
  '/emdr-for-perfectionism': { title: 'EMDR for Perfectionism | Perfectionism Treatment | LMFT | Bay Area', description: 'EMDR therapy for perfectionism and achievement anxiety. Address the early experiences that calibrated impossible standards. Free consultation.' },
  '/emdr-for-depression': { title: 'EMDR for Depression | Depression Treatment | LMFT | Bay Area', description: 'EMDR therapy for depression with traumatic roots. Address the experiences maintaining chronic low mood. Free consultation.' },
  '/emdr-for-persistent-depression': { title: 'EMDR for Persistent Depression | Chronic Depression Treatment | LMFT', description: 'EMDR for persistent depressive disorder and chronic low mood. Evidence-based treatment for long-standing depression. Free consultation.' },
  '/emdr-for-postpartum-depression': { title: 'EMDR for Postpartum Depression | Perinatal Mental Health | LMFT', description: 'EMDR therapy for postpartum depression and perinatal mental health. Specialized support for new parents. Free consultation.' },
  '/emdr-for-grief': { title: 'EMDR for Grief | Grief Therapy | LMFT | Bay Area', description: 'EMDR therapy for grief and loss. Process difficult losses and reduce prolonged grief symptoms. Free consultation.' },
  '/emdr-for-complicated-grief': { title: 'EMDR for Complicated Grief | Prolonged Grief Treatment | LMFT', description: 'EMDR for complicated grief and prolonged grief disorder. Specialized treatment for grief that hasn\'t resolved. Free consultation.' },
  '/emdr-for-anticipatory-grief': { title: 'EMDR for Anticipatory Grief | Terminal Illness Support | LMFT', description: 'EMDR therapy for anticipatory grief and the distress of facing terminal illness or significant loss. Free consultation.' },
  '/emdr-for-pet-loss': { title: 'EMDR for Pet Loss | Grief After Losing a Pet | LMFT', description: 'EMDR therapy for pet loss and the grief of losing an animal companion. Compassionate support. Free consultation.' },
  '/emdr-for-life-transitions': { title: 'EMDR for Life Transitions | Major Change Support | LMFT', description: 'EMDR therapy for difficult life transitions. Process the emotional weight of major changes. Free consultation.' },
  '/emdr-for-burnout': { title: 'EMDR for Burnout | Work Burnout Treatment | LMFT | Bay Area', description: 'EMDR therapy for burnout and work-related exhaustion. Address the experiences and patterns driving chronic depletion. Free consultation.' },
  '/emdr-for-career-transitions': { title: 'EMDR for Career Transitions | Job Change Stress | LMFT', description: 'EMDR therapy for career transitions, job loss, and the identity disruption of professional change. Free consultation.' },
  '/emdr-for-self-worth': { title: 'EMDR for Self-Worth | Low Self-Esteem Treatment | LMFT', description: 'EMDR therapy for low self-worth and self-esteem. Address the early experiences that shaped negative self-beliefs. Free consultation.' },
  '/emdr-for-midlife-transitions': { title: 'EMDR for Midlife Transitions | Midlife Crisis Support | LMFT', description: 'EMDR therapy for midlife transitions and the identity questions of midlife. Evidence-based support. Free consultation.' },
  '/emdr-for-aging': { title: 'EMDR for Aging | Late Life Transitions | LMFT | Bay Area', description: 'EMDR therapy for aging, late-life transitions, and the psychological challenges of growing older. Free consultation.' },
  '/emdr-for-relationship-trauma': { title: 'EMDR for Relationship Trauma | Relational Trauma Treatment | LMFT', description: 'EMDR therapy for relationship trauma, including toxic relationships, emotional abuse, and attachment wounds. Free consultation.' },
  '/emdr-for-attachment-issues': { title: 'EMDR for Attachment Issues | Attachment Trauma | LMFT', description: 'EMDR therapy for attachment issues and the relational patterns from early attachment disruption. Free consultation.' },
  '/emdr-for-divorce': { title: 'EMDR for Divorce | Divorce Recovery | LMFT | Bay Area', description: 'EMDR therapy for divorce and relationship ending. Process grief, betrayal, and identity disruption. Free consultation.' },
  '/emdr-for-betrayal-trauma': { title: 'EMDR for Betrayal Trauma | Infidelity & Trust | LMFT', description: 'EMDR therapy for betrayal trauma from infidelity, broken trust, and relational betrayal. Free consultation.' },
  '/emdr-for-codependency': { title: 'EMDR for Codependency | Relationship Patterns | LMFT | Bay Area', description: 'EMDR therapy for codependency and the early experiences that created over-reliance on others. Free consultation.' },
  '/emdr-for-negative-beliefs': { title: 'EMDR for Negative Beliefs | Core Belief Change | LMFT', description: 'EMDR therapy for negative core beliefs about self and the world. Address beliefs at their neurological root. Free consultation.' },
  '/emdr-for-shame': { title: 'EMDR for Shame | Toxic Shame Treatment | LMFT | Bay Area', description: 'EMDR therapy for shame and toxic shame. Address the experiences that created deep shame responses. Free consultation.' },
  '/emdr-for-imposter-syndrome': { title: 'EMDR for Imposter Syndrome | High Achiever Support | LMFT', description: 'EMDR therapy for imposter syndrome and the self-doubt that persists despite external achievement. Free consultation.' },
  '/emdr-for-executives': { title: 'EMDR for Executives | Executive Mental Health | LMFT | Bay Area', description: 'EMDR therapy for executives and high-performing professionals dealing with stress, trauma, and performance anxiety. Free consultation.' },
  '/emdr-for-bipoc-clients': { title: 'EMDR for BIPOC Clients | Culturally Responsive Trauma Therapy | LMFT', description: 'Culturally responsive EMDR therapy for BIPOC clients. Addresses racial trauma, intergenerational trauma, and systemic stress. Free consultation.' },
  '/lgbtq-affirming-emdr-therapy': { title: 'LGBTQ+ Affirming EMDR Therapy | Queer-Affirming Trauma Treatment | LMFT', description: 'LGBTQ+ affirming EMDR therapy. Safe, inclusive trauma treatment for queer and trans clients. Free consultation.' },
  '/emdr-for-new-parents': { title: 'EMDR for New Parents | Parenting Stress & Birth Trauma | LMFT', description: 'EMDR therapy for new parents dealing with birth trauma, parenting anxiety, and the transition to parenthood. Free consultation.' },
  '/emdr-for-prenatal-mental-health': { title: 'EMDR for Prenatal Mental Health | Pregnancy Anxiety | LMFT', description: 'EMDR therapy for prenatal mental health, pregnancy anxiety, and perinatal trauma. Free consultation.' },
  '/emdr-therapy-for-men': { title: 'EMDR Therapy for Men | Men\'s Trauma Treatment | LMFT | Bay Area', description: 'EMDR therapy specifically for men. Direct, practical trauma treatment that respects how men engage. Free consultation.' },
  '/emdr-therapy-for-adults': { title: 'EMDR Therapy for Adults | Adult Trauma Treatment | LMFT | Bay Area', description: 'EMDR therapy for adults dealing with trauma, PTSD, anxiety, and depression. Virtual sessions across California. Free consultation.' },
  '/emdr-vs-talk-therapy': { title: 'EMDR vs Talk Therapy | Which Is Right for You | LMFT', description: 'How EMDR differs from traditional talk therapy and when each approach is most effective. Free consultation.' },
  '/emdr-vs-cbt': { title: 'EMDR vs CBT | Comparing Evidence-Based Therapies | LMFT', description: 'How EMDR and CBT differ and which is right for your specific situation. Evidence-based comparison. Free consultation.' },
  '/what-to-expect-in-emdr': { title: 'What to Expect in EMDR Therapy | EMDR Process Explained | LMFT', description: 'A clear, honest guide to what EMDR therapy actually looks like from first session to completion. Free consultation.' },
};

const BLOG_POSTS = {
  'what-happens-in-an-emdr-session': { title: 'What Actually Happens in an EMDR Session', image: '/emdr-session-blog.jpg', description: 'A clear, honest breakdown of what an EMDR session looks like from start to finish.' },
  'why-talk-therapy-wasnt-enough': { title: 'Why Talk Therapy Wasn\'t Enough and What to Try Instead', image: '/talk-therapy-blog.jpg', description: 'If you have done real work in therapy and still feel stuck, the problem is not your effort.' },
  'why-your-nervous-system-gets-stuck': { title: 'Why Your Nervous System Gets Stuck and How EMDR Helps', image: '/nervous-system-blog.jpg', description: 'Trauma is not a character flaw. It is an incomplete biological process.' },
  'emdr-for-anxiety-how-it-works': { title: 'EMDR for Anxiety: How It Works and What to Expect', image: '/blog-emdr-anxiety.jpg', description: 'EMDR therapy for anxiety targets the root memories keeping your nervous system on alert.' },
  'what-is-complex-ptsd': { title: 'What Is Complex PTSD and How Is It Different from PTSD', image: '/blog-complex-ptsd.jpg', description: 'Complex PTSD develops from chronic trauma and affects identity, self-worth, and relationships.' },
  'emdr-vs-cbt-which-is-right': { title: 'EMDR vs CBT: Which Is Right for You', image: '/blog-emdr-vs-cbt.jpg', description: 'EMDR and CBT are both evidence-based — but they work differently and suit different people.' },
  'how-many-emdr-sessions-will-i-need': { title: 'How Many EMDR Sessions Will I Need', image: '/blog-emdr-sessions.jpg', description: 'How long does EMDR therapy take? An honest, realistic breakdown of treatment length.' },
  'what-is-bilateral-stimulation': { title: 'What Is Bilateral Stimulation and Why Does It Work', image: '/blog-bilateral-stimulation.jpg', description: 'Bilateral stimulation is the core of EMDR therapy. Here is what it actually is and why it works.' },
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  const pathname = slug ? `/blog/${slug}` : (url.searchParams.get('path') || url.pathname);
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let ogImage = DEFAULT_IMAGE;
  let canonicalUrl = `${SITE_URL}${cleanPath}`;

  // 1. Main pages
  if (MAIN_PAGES[cleanPath]) {
    title = MAIN_PAGES[cleanPath].title;
    description = MAIN_PAGES[cleanPath].description;
  }
  // 2. City pages
  else if (CITY_PAGES[cleanPath]) {
    title = CITY_PAGES[cleanPath].title;
    description = CITY_PAGES[cleanPath].description;
  }
  // 3. Condition pages
  else if (CONDITION_PAGES[cleanPath]) {
    title = CONDITION_PAGES[cleanPath].title;
    description = CONDITION_PAGES[cleanPath].description;
  }
  // 4. Blog posts
  else if (cleanPath.startsWith('/blog/')) {
    const blogSlug = slug || cleanPath.replace('/blog/', '');
    const post = BLOG_POSTS[blogSlug];
    if (post) {
      title = `${post.title} | EMDR Therapy Bay Area`;
      description = post.description;
      ogImage = `${SITE_URL}${post.image}`;
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="EMDR Therapy Bay Area" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Marcus Ghiasi, LMFT" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
