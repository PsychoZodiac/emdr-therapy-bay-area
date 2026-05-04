import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

// ─── SEO LANDING PAGE DATA ───────────────────────────────────────────────────

const SEO_LOCATIONS = [
  // East Bay
  { slug: "emdr-therapy-oakland", city: "Oakland", region: "the East Bay", state: "CA" },
  { slug: "emdr-therapy-berkeley", city: "Berkeley", region: "the East Bay", state: "CA" },
  { slug: "emdr-therapy-emeryville", city: "Emeryville", region: "the East Bay", state: "CA" },
  { slug: "emdr-therapy-alameda", city: "Alameda", region: "the East Bay", state: "CA" },
  { slug: "emdr-therapy-san-leandro", city: "San Leandro", region: "the East Bay", state: "CA" },
  { slug: "emdr-therapy-hayward", city: "Hayward", region: "the East Bay", state: "CA" },
  { slug: "emdr-therapy-fremont", city: "Fremont", region: "the East Bay", state: "CA" },
  // Contra Costa
  { slug: "emdr-therapy-walnut-creek", city: "Walnut Creek", region: "Contra Costa County", state: "CA" },
  { slug: "emdr-therapy-lafayette", city: "Lafayette", region: "Contra Costa County", state: "CA" },
  { slug: "emdr-therapy-orinda", city: "Orinda", region: "Contra Costa County", state: "CA" },
  { slug: "emdr-therapy-moraga", city: "Moraga", region: "Contra Costa County", state: "CA" },
  { slug: "emdr-therapy-danville", city: "Danville", region: "Contra Costa County", state: "CA" },
  { slug: "emdr-therapy-pleasanton", city: "Pleasanton", region: "the Tri-Valley", state: "CA" },
  { slug: "emdr-therapy-livermore", city: "Livermore", region: "the Tri-Valley", state: "CA" },
  { slug: "emdr-therapy-san-ramon", city: "San Ramon", region: "the Tri-Valley", state: "CA" },
  { slug: "emdr-therapy-concord", city: "Concord", region: "Contra Costa County", state: "CA" },
  // San Francisco
  { slug: "emdr-therapy-san-francisco", city: "San Francisco", region: "San Francisco", state: "CA" },
  // Marin
  { slug: "emdr-therapy-marin-county", city: "Marin County", region: "Marin", state: "CA" },
  { slug: "emdr-therapy-mill-valley", city: "Mill Valley", region: "Marin", state: "CA" },
  { slug: "emdr-therapy-san-rafael", city: "San Rafael", region: "Marin", state: "CA" },
  { slug: "emdr-therapy-sausalito", city: "Sausalito", region: "Marin", state: "CA" },
  { slug: "emdr-therapy-tiburon", city: "Tiburon", region: "Marin", state: "CA" },
  // South Bay / Peninsula
  { slug: "emdr-therapy-san-jose", city: "San Jose", region: "the South Bay", state: "CA" },
  { slug: "emdr-therapy-santa-clara", city: "Santa Clara", region: "the South Bay", state: "CA" },
  { slug: "emdr-therapy-sunnyvale", city: "Sunnyvale", region: "the South Bay", state: "CA" },
  { slug: "emdr-therapy-cupertino", city: "Cupertino", region: "the South Bay", state: "CA" },
  { slug: "emdr-therapy-mountain-view", city: "Mountain View", region: "the Peninsula", state: "CA" },
  { slug: "emdr-therapy-palo-alto", city: "Palo Alto", region: "the Peninsula", state: "CA" },
  { slug: "emdr-therapy-menlo-park", city: "Menlo Park", region: "the Peninsula", state: "CA" },
  { slug: "emdr-therapy-redwood-city", city: "Redwood City", region: "the Peninsula", state: "CA" },
  { slug: "emdr-therapy-san-mateo", city: "San Mateo", region: "the Peninsula", state: "CA" },
  { slug: "emdr-therapy-burlingame", city: "Burlingame", region: "the Peninsula", state: "CA" },
  { slug: "emdr-therapy-foster-city", city: "Foster City", region: "the Peninsula", state: "CA" },
  // North Bay
  { slug: "emdr-therapy-napa", city: "Napa", region: "the North Bay", state: "CA" },
  { slug: "emdr-therapy-sonoma", city: "Sonoma", region: "the North Bay", state: "CA" },
  { slug: "emdr-therapy-petaluma", city: "Petaluma", region: "the North Bay", state: "CA" },
  { slug: "emdr-therapy-santa-rosa", city: "Santa Rosa", region: "the North Bay", state: "CA" },
  // SoCal
  { slug: "emdr-therapy-los-angeles", city: "Los Angeles", region: "Los Angeles", state: "CA", noindex: true },
  { slug: "emdr-therapy-santa-monica", city: "Santa Monica", region: "Los Angeles", state: "CA", noindex: true },
  { slug: "emdr-therapy-beverly-hills", city: "Beverly Hills", region: "Los Angeles", state: "CA", noindex: true },
  { slug: "emdr-therapy-brentwood", city: "Brentwood", region: "Los Angeles", state: "CA", noindex: true },
  { slug: "emdr-therapy-pacific-palisades", city: "Pacific Palisades", region: "Los Angeles", state: "CA", noindex: true },
  { slug: "emdr-therapy-pasadena", city: "Pasadena", region: "the Los Angeles area", state: "CA", noindex: true },
  { slug: "emdr-therapy-manhattan-beach", city: "Manhattan Beach", region: "Los Angeles", state: "CA", noindex: true },
  { slug: "emdr-therapy-newport-beach", city: "Newport Beach", region: "Orange County", state: "CA", noindex: true },
  { slug: "emdr-therapy-laguna-beach", city: "Laguna Beach", region: "Orange County", state: "CA", noindex: true },
  { slug: "emdr-therapy-san-diego", city: "San Diego", region: "San Diego", state: "CA", noindex: true },
  { slug: "emdr-therapy-la-jolla", city: "La Jolla", region: "San Diego", state: "CA", noindex: true },
  { slug: "emdr-therapy-del-mar", city: "Del Mar", region: "San Diego", state: "CA", noindex: true },
  // Statewide / Online
  { slug: "emdr-therapy-online-california", city: "Online", region: "California", state: "CA", isOnline: true },
  { slug: "emdr-telehealth-california", city: "Telehealth", region: "California", state: "CA", isOnline: true },
  { slug: "virtual-emdr-therapy-california", city: "Virtual", region: "California", state: "CA", isOnline: true },
  { slug: "emdr-therapy-bay-area", city: "Bay Area", region: "the Bay Area", state: "CA" },
];

const SEO_CONDITIONS = [
  // Trauma & PTSD
  {
    slug: "emdr-for-trauma",
    condition: "Trauma",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for Trauma",
    intro: "Trauma lives in the body and the nervous system — not just in memory. Whether you experienced a single overwhelming event or years of cumulative stress, EMDR works directly with how trauma is stored, helping your brain complete the processing it could not finish at the time. You do not need to retell what happened in detail. You need a process that actually moves things."
  },
  {
    slug: "emdr-for-ptsd",
    condition: "PTSD",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for PTSD",
    intro: "PTSD is not a character flaw or a sign that you are not strong enough — it is a predictable response to overwhelming experience. EMDR is recognized by the WHO, APA, and VA as a gold-standard treatment for PTSD, and it works without requiring you to retell your story in detail. The goal is not to erase what happened, but to change your relationship to it."
  },
  {
    slug: "emdr-for-complex-ptsd",
    condition: "Complex PTSD (C-PTSD)",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for Complex PTSD",
    intro: "Complex PTSD develops from prolonged, repeated trauma — often in childhood or within close relationships. It affects identity, self-worth, emotional regulation, and relationships in ways that can feel permanent. EMDR, combined with careful stabilization work, is one of the most effective approaches for C-PTSD available today."
  },
  {
    slug: "emdr-for-childhood-trauma",
    condition: "Childhood Trauma",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for Childhood Trauma",
    intro: "What happened in childhood does not stay in childhood — it shapes how the nervous system develops, how we relate to others, and what we believe about ourselves. EMDR helps process early wounds at their root, not just manage their symptoms. Many clients find that childhood experiences that seemed fixed begin to shift in ways they did not expect."
  },
  {
    slug: "emdr-for-sexual-trauma",
    condition: "Sexual Trauma",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for Sexual Trauma",
    intro: "Sexual trauma — whether recent or from years ago — can affect every dimension of life: relationships, intimacy, self-image, and the basic sense of safety in the world. EMDR offers a path through it that does not require you to describe what happened in detail, which many survivors find to be a significant relief. Healing is possible."
  },
  {
    slug: "emdr-for-medical-trauma",
    condition: "Medical Trauma",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for Medical Trauma",
    intro: "Medical trauma is often overlooked, but a difficult diagnosis, a frightening procedure, or a hospitalization can leave lasting marks on the nervous system. Fear, helplessness, and grief from medical experiences are real — and EMDR helps process them so they no longer interfere with your ability to get the care you need or feel safe in your body."
  },
  {
    slug: "emdr-for-accident-trauma",
    condition: "Accident & Injury Trauma",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for Accident & Injury Trauma",
    intro: "Accidents and injuries can be deeply traumatic — the suddenness, the loss of control, and the physical aftermath can leave you hypervigilant, anxious, or avoidant long after the body has healed. EMDR helps the nervous system finally catch up with the recovery, processing what the accident left behind in ways the body could not do on its own."
  },
  {
    slug: "emdr-for-first-responders",
    condition: "First Responder & Vicarious Trauma",
    category: "Trauma & PTSD",
    title: "EMDR Therapy for First Responders & Vicarious Trauma",
    intro: "First responders — firefighters, paramedics, police officers, ER workers — carry an invisible weight. Repeated exposure to crisis, loss, and human suffering accumulates in ways that standard talk therapy often cannot reach. EMDR is specifically well-suited for layered, repetitive trauma, and I work with first responders who are ready to do something about what they carry."
  },
  // Anxiety
  {
    slug: "emdr-for-anxiety",
    condition: "Anxiety",
    category: "Anxiety",
    title: "EMDR Therapy for Anxiety",
    intro: "Anxiety is more than worry — it is the nervous system stuck in a state of alert, scanning for danger that may not be present. EMDR helps identify and reprocess the experiences that taught your system it needed to stay on guard, shifting anxiety at its roots rather than just managing it at the surface."
  },
  {
    slug: "emdr-for-panic-attacks",
    condition: "Panic Attacks",
    category: "Anxiety",
    title: "EMDR Therapy for Panic Attacks",
    intro: "Panic attacks can feel like a complete loss of control — heart racing, chest tightening, the sense that something is terribly wrong. EMDR works with the underlying triggers and memories that activate the panic response, reducing both the frequency and intensity of attacks over time. You do not have to keep white-knuckling through them."
  },
  {
    slug: "emdr-for-social-anxiety",
    condition: "Social Anxiety",
    category: "Anxiety",
    title: "EMDR Therapy for Social Anxiety",
    intro: "Social anxiety often has roots in specific experiences — moments of humiliation, rejection, or judgment that the nervous system never fully processed. EMDR targets those root memories, which can shift the experience of social situations in ways that cognitive approaches alone often cannot. Many clients are surprised by how much changes."
  },
  {
    slug: "emdr-for-phobias",
    condition: "Phobias",
    category: "Anxiety",
    title: "EMDR Therapy for Phobias",
    intro: "Phobias are the nervous system's attempt to protect you from something it has learned to fear. EMDR is highly effective for phobias because it works directly with the memory network underlying the fear response, rather than just teaching you to tolerate discomfort. For many phobias, the results can be significant and lasting."
  },
  {
    slug: "emdr-for-health-anxiety",
    condition: "Health Anxiety",
    category: "Anxiety",
    title: "EMDR Therapy for Health Anxiety",
    intro: "Health anxiety — the persistent fear that something is seriously wrong with your body — can be exhausting and isolating. It often has roots in past experiences with illness, loss, or medical crisis. EMDR helps address those roots rather than just the surface-level worry, so you can stop living in dread of your own body."
  },
  {
    slug: "emdr-for-perfectionism",
    condition: "Perfectionism & Performance Anxiety",
    category: "Anxiety",
    title: "EMDR Therapy for Perfectionism & Performance Anxiety",
    intro: "Perfectionism and performance anxiety are often driven by deep-seated beliefs about worthiness and failure — beliefs that formed early and have been reinforced ever since. EMDR can shift the underlying conviction that your value depends on your output, which changes not just how you perform but how you live."
  },
  // Mood
  {
    slug: "emdr-for-depression",
    condition: "Depression",
    category: "Mood",
    title: "EMDR Therapy for Depression",
    intro: "Depression is not simply sadness — it is a heaviness that disconnects you from yourself, your relationships, and your sense of possibility. For many people, depression has roots in unprocessed loss, trauma, or long-held negative beliefs. EMDR addresses those roots directly, often producing shifts that talk therapy alone could not reach."
  },
  {
    slug: "emdr-for-persistent-depression",
    condition: "Persistent Depressive Disorder",
    category: "Mood",
    title: "EMDR Therapy for Persistent Depressive Disorder",
    intro: "Persistent depressive disorder (dysthymia) is a low-grade, chronic depression that can become so familiar it feels like personality rather than illness. EMDR helps uncover and reprocess the experiences that sustain it — often producing shifts that years of talk therapy or medication management did not."
  },
  {
    slug: "emdr-for-postpartum-depression",
    condition: "Postpartum Depression",
    category: "Mood",
    title: "EMDR Therapy for Postpartum Depression",
    intro: "Postpartum depression is more common than most people realize, and it carries a particular weight — the expectation that this should be a joyful time can make the struggle feel even more isolating. EMDR offers gentle, effective support for postpartum depression and the anxiety that often accompanies it, on a timeline that works for new parents."
  },
  // Grief & Loss
  {
    slug: "emdr-for-grief",
    condition: "Grief & Loss",
    category: "Grief & Loss",
    title: "EMDR Therapy for Grief & Loss",
    intro: "Grief does not follow a schedule or a set of stages. It is deeply personal, and it can be complicated by the circumstances of the loss, the nature of the relationship, or grief that was never fully allowed. EMDR creates space to process loss at a depth that talking about it alone sometimes cannot reach."
  },
  {
    slug: "emdr-for-complicated-grief",
    condition: "Complicated Grief",
    category: "Grief & Loss",
    title: "EMDR Therapy for Complicated Grief",
    intro: "Complicated grief — also called prolonged grief disorder — is grief that has become stuck. It may involve guilt, anger, ambivalence, or a loss so sudden or violent that the mind cannot integrate it. EMDR is particularly effective when grief has become lodged in the nervous system rather than moving through it naturally."
  },
  {
    slug: "emdr-for-anticipatory-grief",
    condition: "Anticipatory Grief",
    category: "Grief & Loss",
    title: "EMDR Therapy for Anticipatory Grief",
    intro: "Anticipatory grief — the grief that comes before a loss, when someone you love is dying or a significant ending is approaching — is real and valid. EMDR can help you hold the complexity of loving someone while also preparing to lose them, without shutting down or becoming overwhelmed by what is coming."
  },
  {
    slug: "emdr-for-pet-loss",
    condition: "Pet Loss",
    category: "Grief & Loss",
    title: "EMDR Therapy for Pet Loss",
    intro: "The grief of losing a pet is often minimized by others, but it can be profound — pets are family, and their absence can leave a genuine void. I offer the same compassionate, effective EMDR processing for pet loss that I bring to any other form of grief. Your loss deserves to be taken seriously."
  },
  // Life & Identity
  {
    slug: "emdr-for-life-transitions",
    condition: "Life Transitions",
    category: "Life & Identity",
    title: "EMDR Therapy for Life Transitions",
    intro: "Major life transitions — a move, a career change, the end of a relationship, becoming a parent, retiring — can destabilize a sense of identity and purpose even when they are chosen. EMDR helps process the loss and uncertainty that transitions carry, so you can move forward with clarity rather than getting stuck in the in-between."
  },
  {
    slug: "emdr-for-burnout",
    condition: "Burnout",
    category: "Life & Identity",
    title: "EMDR Therapy for Burnout",
    intro: "Burnout is more than exhaustion — it is a depletion that touches identity, meaning, and the capacity to care. It often develops in people who have been giving more than they have for a long time. EMDR addresses the underlying beliefs and experiences that made it hard to stop, and helps rebuild a sustainable relationship with work and self."
  },
  {
    slug: "emdr-for-career-transitions",
    condition: "Career Transitions",
    category: "Life & Identity",
    title: "EMDR Therapy for Career Transitions",
    intro: "Career transitions — whether chosen or forced — can raise deep questions about identity, worth, and purpose. EMDR helps process the fear, grief, and self-doubt that often accompany them, so you can approach what is next from a grounded place rather than from anxiety or avoidance."
  },
  {
    slug: "emdr-for-self-worth",
    condition: "Identity & Self-Worth",
    category: "Life & Identity",
    title: "EMDR Therapy for Identity & Self-Worth",
    intro: "A fractured sense of self-worth is rarely just a thought — it is a felt belief, often rooted in early experience. EMDR works with those root experiences to shift not just what you think about yourself, but what you feel in your body when you consider who you are. That is a different kind of change."
  },
  {
    slug: "emdr-for-midlife-transitions",
    condition: "Midlife Transitions",
    category: "Life & Identity",
    title: "EMDR Therapy for Midlife Transitions",
    intro: "Midlife can bring a reckoning — with choices made, paths not taken, and a changed relationship to time. EMDR helps process the grief and reassessment that midlife transitions carry, and supports a genuine sense of meaning and direction in what comes next."
  },
  {
    slug: "emdr-for-aging",
    condition: "Aging & End of Life",
    category: "Life & Identity",
    title: "EMDR Therapy for Aging & End of Life",
    intro: "The approach of later life raises questions about legacy, loss, and meaning that deserve more than platitudes. EMDR can help process the accumulated grief, regret, and fear that aging and end-of-life awareness can bring to the surface — with honesty and genuine care."
  },
  // Relationships
  {
    slug: "emdr-for-relationship-trauma",
    condition: "Relationship Trauma",
    category: "Relationships",
    title: "EMDR Therapy for Relationship Trauma",
    intro: "Relationship trauma — emotional abuse, coercive control, chronic invalidation, or the slower wound of a relationship that consistently made you feel not enough — can be as lasting as any other form of trauma. EMDR addresses the specific memories and beliefs it leaves behind, not just the behaviors that resulted."
  },
  {
    slug: "emdr-for-attachment-issues",
    condition: "Attachment Issues",
    category: "Relationships",
    title: "EMDR Therapy for Attachment Issues",
    intro: "Attachment patterns form early and shape how we relate to others throughout life — how close we let people get, how we respond to conflict, and what we expect from love. EMDR can help rework insecure attachment at its roots rather than just its surface behaviors, which is what allows new patterns to actually stick."
  },
  {
    slug: "emdr-for-divorce",
    condition: "Divorce & Separation",
    category: "Relationships",
    title: "EMDR Therapy for Divorce & Separation",
    intro: "Divorce and separation are among the most disorienting experiences a person can go through — even when they are the right choice. EMDR helps process the grief, anger, and disrupted sense of self that separation brings, so healing can actually happen rather than just time passing."
  },
  {
    slug: "emdr-for-betrayal-trauma",
    condition: "Infidelity & Betrayal Trauma",
    category: "Relationships",
    title: "EMDR Therapy for Infidelity & Betrayal Trauma",
    intro: "Betrayal trauma — whether from infidelity, broken trust, or discovering a significant deception — strikes at the foundation of safety and reality. EMDR is particularly effective for betrayal trauma because it addresses both the shock of discovery and the deeper wounds it activates."
  },
  {
    slug: "emdr-for-codependency",
    condition: "Codependency",
    category: "Relationships",
    title: "EMDR Therapy for Codependency",
    intro: "Codependency is not a personality trait — it is a learned pattern, often rooted in early experiences where attunement to others' needs was necessary for safety or love. EMDR helps address those roots so that different, healthier patterns of relating become genuinely possible — not just intellectually understood."
  },
  // Negative Cognition
  {
    slug: "emdr-for-negative-beliefs",
    condition: "Negative Self-Beliefs",
    category: "Negative Cognition",
    title: "EMDR Therapy for Negative Self-Beliefs",
    intro: "Beliefs like 'I am not enough,' 'I am fundamentally flawed,' or 'I am not safe' do not respond well to positive thinking alone — they are held in the body and the nervous system. EMDR targets the specific experiences that installed them, which is often what finally makes them shift in a lasting way."
  },
  {
    slug: "emdr-for-shame",
    condition: "Shame & Self-Criticism",
    category: "Negative Cognition",
    title: "EMDR Therapy for Shame & Self-Criticism",
    intro: "Shame is among the most painful human experiences — and one of the hardest to talk about. EMDR offers a way to process shame that does not require extensive verbal disclosure, which many people find makes the work both more bearable and more effective. You do not have to explain it to heal it."
  },
  {
    slug: "emdr-for-imposter-syndrome",
    condition: "Imposter Syndrome",
    category: "Negative Cognition",
    title: "EMDR Therapy for Imposter Syndrome",
    intro: "Imposter syndrome — the persistent sense that you do not deserve your success and will eventually be found out — often has roots in early experiences of conditional approval, criticism, or environments where nothing was ever quite good enough. EMDR addresses those roots, not just the thought patterns they produce."
  },
  // Population
  {
    slug: "emdr-for-executives",
    condition: "Executives & High Performers",
    category: "Population",
    title: "EMDR Therapy for Executives & High Performers",
    intro: "High-achieving executives and professionals often carry a particular burden — performing at the highest level while managing stress, pressure, and the isolation that can come with leadership. EMDR offers a private, efficient, results-oriented approach to the inner work that sustained high performance sometimes requires."
  },
  {
    slug: "emdr-for-bipoc-clients",
    condition: "BIPOC Clients",
    category: "Population",
    title: "EMDR Therapy for BIPOC Clients",
    intro: "As a second-generation Persian American, I understand firsthand the complexity of navigating multiple cultural identities, intergenerational trauma, and systems that were not built with you in mind. I offer affirming, culturally sensitive EMDR care to BIPOC clients throughout California — where your full experience is seen and taken seriously."
  },
  {
    slug: "lgbtq-affirming-emdr-therapy",
    condition: "LGBTQ+ Clients",
    category: "Population",
    title: "LGBTQ+ Affirming EMDR Therapy",
    intro: "LGBTQ+ individuals face unique stressors — minority stress, family rejection, identity-based trauma, and the cumulative weight of navigating a world that is not always safe. I provide fully affirming, knowledgeable EMDR care where your full identity is welcome and your experiences are understood in their full context."
  },
  {
    slug: "emdr-for-new-parents",
    condition: "New Parents & Postpartum",
    category: "Population",
    title: "EMDR Therapy for New Parents & Postpartum",
    intro: "The transition to parenthood is profound, disorienting, and often much harder than expected. Whether you are navigating postpartum depression, anxiety, birth trauma, or the identity shift that parenthood brings, EMDR offers effective and compassionate support — on a schedule that works for where you are."
  },
  {
    slug: "emdr-for-prenatal-mental-health",
    condition: "Prenatal & Perinatal Mental Health",
    category: "Population",
    title: "EMDR Therapy for Prenatal & Perinatal Mental Health",
    intro: "Pregnancy and the perinatal period can surface anxiety, past trauma, fears about the future, and grief — all while the body and identity are undergoing enormous change. I offer specialized EMDR support for mental health during pregnancy and early parenthood, with particular sensitivity to this complex season of life."
  },
  {
    slug: "emdr-therapy-for-men",
    condition: "Men",
    category: "Population",
    title: "EMDR Therapy for Men",
    intro: "Many men have been taught — explicitly or implicitly — that seeking help is a sign of weakness. It is not. EMDR offers a practical, structured, results-oriented approach to healing that resonates with many men who find traditional talk therapy too open-ended or slow. You do not have to process out loud to make progress."
  },
  {
    slug: "emdr-therapy-for-adults",
    condition: "Adults",
    category: "Population",
    title: "EMDR Therapy for Adults",
    intro: "Adult life carries its own particular weight — accumulated stress, unresolved history, and the pressure of maintaining a life while trying to heal within it. EMDR is well-suited for adults at any stage who are ready to address what has been getting in the way, without having to spend years talking around it."
  },
  // Informational
  {
    slug: "emdr-vs-talk-therapy",
    condition: "EMDR vs. Talk Therapy",
    category: "Informational",
    title: "EMDR vs. Talk Therapy — What's the Difference?",
    intro: "Talk therapy and EMDR are not opposites — but they work differently. Talk therapy primarily works through insight and narrative. EMDR works more directly with how the nervous system stores memory, which means it can reach places that talking alone often cannot. For many people dealing with trauma, anxiety, or deeply held beliefs, the difference is significant."
  },
  {
    slug: "emdr-vs-cbt",
    condition: "EMDR vs. CBT",
    category: "Informational",
    title: "EMDR vs. CBT — Which Is Right for You?",
    intro: "Both EMDR and CBT are evidence-based and effective — but they take meaningfully different approaches. CBT works by identifying and restructuring unhelpful thought patterns. EMDR works by reprocessing the memories that generate those patterns in the first place. For trauma in particular, EMDR often produces change more efficiently and with less need for verbal processing."
  },
  {
    slug: "what-to-expect-in-emdr",
    condition: "What to Expect in EMDR",
    category: "Informational",
    title: "What to Expect in EMDR Therapy",
    intro: "If you have never done EMDR before, it is natural to wonder what it actually looks like — and whether it will work for you. EMDR follows a structured eight-phase protocol, takes place entirely within the session, and does not require you to describe traumatic events in detail. Most people find it more manageable than they expected, and more effective than they hoped."
  },
];

// Build a lookup map for fast routing
const SEO_PAGE_MAP = {};
SEO_LOCATIONS.forEach(p => { SEO_PAGE_MAP[`/${p.slug}`] = { type: "location", data: p }; });
SEO_CONDITIONS.forEach(p => { SEO_PAGE_MAP[`/${p.slug}`] = { type: "condition", data: p }; });

// ─── SEO LANDING PAGE TEMPLATE ───────────────────────────────────────────────

// Shared "is it right for you" items and FAQs injected into each page's data

// Location pages — unique isForYou + faqs per region type
// Condition pages — unique isForYou + faqs per condition

// Add isForYou + faqs to each location
SEO_LOCATIONS.forEach(p => {
  const isOnline = p.isOnline;
  const city = p.city;
  const region = p.region;

  // Shared telehealth FAQ used by all location pages
  const telehealthFaq = { q: "Can you really do EMDR effectively over video?", a: "Yes — and this is one of the most common questions I get. EMDR via telehealth has been well-studied and produces outcomes comparable to in-person work. The bilateral stimulation tool I use works through your screen. All you need is a private space and a reliable internet connection. Many clients actually prefer the comfort of being in their own environment." };
  const insuranceFaq = { q: "Do you accept insurance?", a: "I'm an out-of-network provider. Sessions are $240 for 45 minutes and $320 for 60 minutes. Many clients use out-of-network benefits or HSA/FSA funds. I can provide a superbill for reimbursement." };
  const sessionCountFaq = { q: "How many sessions does EMDR take?", a: "It depends on what we're working on. Some focused issues resolve in 6–12 sessions. Complex trauma or longstanding patterns may take longer. I don't keep people in therapy longer than they need to be." };
  const worseFaq = { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two after early sessions. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." };
  const licenseFaq = { q: "Are you licensed to see clients in California?", a: "Yes. I hold California LMFT license #158475 and am authorized to practice throughout the state via telehealth. You don't need to be in the same city or county — just in California." };
  const fitFaq = { q: "What if I'm not sure EMDR is right for me?", a: "That's exactly what the free 15-minute consultation is for. We talk briefly about what's going on, I explain how I work, and you can ask anything. There's no pressure and no obligation. Many people arrive uncertain and leave with a clear sense of whether this is the right fit." };

  p.isForYou = isOnline ? [
    "You've tried talk therapy before and felt like you were going in circles",
    "Something from the past keeps showing up in your present — in your body, your relationships, your reactions",
    "You're high-functioning on the outside but exhausted by what you're carrying inside",
    "You want a structured, evidence-based approach — not open-ended conversation for its own sake",
    "You're comfortable meeting via video and want the flexibility of working from home",
    "You're ready to do real work, not just feel heard",
  ] : [
    `You're in ${city} or ${region} and want a therapist you don't have to commute to`,
    "You've tried talk therapy before and felt like you were just spinning your wheels",
    "Something from the past keeps showing up in your present — in your body, your relationships, your reactions",
    "You're high-functioning on the outside but exhausted by what you're carrying inside",
    "You want a structured, evidence-based approach — not open-ended conversation for its own sake",
    "You're ready to do real work, not just feel heard",
  ];

  p.faqs = [
    telehealthFaq,
    insuranceFaq,
    sessionCountFaq,
    fitFaq,
  ];
});

// Add isForYou + faqs to each condition
const CONDITION_DATA = {
  "emdr-for-trauma": {
    isForYou: [
      "You've tried talking about it and it hasn't shifted — you can tell the story but you still feel it",
      "Your nervous system is stuck in a state of alert even when you're safe",
      "Certain situations, sounds, or smells trigger a reaction you can't control",
      "You're managing day-to-day but the weight of what happened is always there",
      "You don't want to have to describe every detail of what happened to get better",
      "You're ready to actually process it, not just cope with it",
    ],
    faqs: [
      { q: "Do I have to talk about what happened in detail?", a: "No — and for many trauma survivors, this is the most important thing to know about EMDR. You don't need to narrate or retell your experience at length. You hold the memory in mind while we do the bilateral stimulation. The processing happens internally. Many people find this is what makes EMDR bearable when other approaches weren't." },
      { q: "What if I've had trauma for a long time — is it too late?", a: "No. The nervous system doesn't have an expiration date for healing. EMDR works with memories regardless of how old they are. In fact, some of the most significant shifts I've seen in this work have happened with people processing events from 20 or 30 years ago." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How is EMDR different from other trauma therapies?", a: "Most talk-based trauma therapies work through narrative and insight — you talk about what happened and try to make meaning of it. EMDR works differently: it targets how the memory is stored in the nervous system and helps the brain complete the processing it couldn't finish at the time. For many people, this reaches places that talking alone couldn't." },
    ],
  },
  "emdr-for-ptsd": {
    isForYou: [
      "You meet the criteria for PTSD or suspect you do — hypervigilance, flashbacks, avoidance, emotional numbing",
      "You've been told EMDR is the gold standard for PTSD and want to try it",
      "You're tired of managing symptoms and want to address the source",
      "You don't want to have to retell what happened in detail to get better",
      "You're ready for something that actually has evidence behind it",
      "You want a therapist who takes PTSD seriously and knows how to work with it",
    ],
    faqs: [
      { q: "Is EMDR actually proven to work for PTSD?", a: "Yes — EMDR is recognized as a first-line treatment for PTSD by the WHO, APA, American Psychiatric Association, and the VA. It's one of the most extensively researched trauma treatments available. The evidence base is strong and consistent across populations, including combat veterans, survivors of sexual trauma, and first responders." },
      { q: "Do I have to have a formal PTSD diagnosis to work with you?", a: "No. A diagnosis can be useful context, but it's not required. What matters is what you're experiencing — the symptoms, the triggers, the impact on your life. We'll assess together in the consultation and first sessions what's going on and what approach makes the most sense." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How long does EMDR take for PTSD?", a: "For single-incident PTSD — one specific traumatic event — significant improvement often happens within 8–16 sessions. Complex or developmental trauma takes longer. I'll be honest with you about what I'm seeing as we go and won't keep you in therapy longer than necessary." },
    ],
  },
  "emdr-for-complex-ptsd": {
    isForYou: [
      "Your trauma wasn't one event — it was ongoing, relational, or happened during childhood",
      "You struggle with emotional regulation, self-worth, or feeling safe in relationships",
      "You've been in therapy before and made progress, but something still feels stuck at a deeper level",
      "You have a fragmented or painful relationship with your own identity",
      "Standard talk therapy has helped somewhat but hasn't reached the roots",
      "You want a therapist who understands the difference between PTSD and C-PTSD",
    ],
    faqs: [
      { q: "How is C-PTSD different from PTSD?", a: "PTSD typically develops from a specific traumatic event or series of events. C-PTSD develops from prolonged, repeated trauma — especially in childhood or within close relationships. It affects identity, self-worth, emotional regulation, and attachment in ways that go beyond the classic PTSD symptom picture. EMDR treatment for C-PTSD is more gradual and requires careful stabilization work before processing begins." },
      { q: "Is EMDR safe for complex trauma?", a: "Yes, when done carefully. With C-PTSD, we spend more time in the early phases — building stabilization resources and ensuring you have the capacity to process without becoming overwhelmed. I don't rush this. The preparation work is itself therapeutic, and we don't begin active processing until you're genuinely ready." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How long does treatment take for C-PTSD?", a: "Longer than single-incident trauma, and I'll be honest with you about that upfront. Complex trauma treatment is typically measured in months, not weeks. Progress is real and meaningful throughout — it's not a matter of waiting until the end to feel better. But this kind of work takes the time it takes, and I won't rush it." },
    ],
  },
  "emdr-for-childhood-trauma": {
    isForYou: [
      "What happened in your childhood is showing up in your adult life in ways you can't fully explain",
      "You have beliefs about yourself — not being enough, not being safe, not deserving love — that feel bone-deep",
      "Your relationships follow patterns you can see but can't seem to break",
      "You've done some therapy and gained insight, but insight alone hasn't changed how you feel",
      "You don't want to spend years talking about your childhood — you want something to actually shift",
      "You're ready to address the roots, not just the symptoms",
    ],
    faqs: [
      { q: "Do I have to remember my childhood clearly for EMDR to work?", a: "No. EMDR doesn't require detailed or chronological memories. We work with what's available — images, body sensations, emotions, fragments. Incomplete memories can still be processed effectively. You don't need to reconstruct a precise narrative." },
      { q: "What if my childhood wasn't 'bad enough' to explain how I feel?", a: "This is one of the most common things I hear, and it deserves a direct answer: you don't need to have survived something dramatic for it to have left a mark. Emotional neglect, inconsistent parenting, feeling like a burden, chronic criticism — these shape the nervous system just as surely as more obvious traumas. Your experience is valid regardless of how it compares to someone else's." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How is working with childhood trauma different from other trauma work?", a: "Childhood trauma is often more diffuse — it's less about specific events and more about the cumulative effect of an environment. We typically need more time in the preparation phase, identifying the beliefs and body sensations that carry the charge before targeting specific memories. The work is gradual and thorough." },
    ],
  },
  "emdr-for-sexual-trauma": {
    isForYou: [
      "Something happened that you haven't fully processed — recently or long ago",
      "It's affecting your relationships, your sense of safety, or your relationship with your own body",
      "You're not ready or willing to describe what happened in detail to a therapist",
      "You've been managing it alone and it's taking more energy than you have",
      "You want a therapist who understands sexual trauma specifically and won't push you faster than you're ready",
      "You're ready to start healing, on your terms",
    ],
    faqs: [
      { q: "Do I have to describe what happened?", a: "No — and for survivors of sexual trauma, this is often the most important thing to know. EMDR does not require you to narrate what happened. You hold the memory in mind while we do the bilateral stimulation. The processing happens internally. You are in control of how much you share and when." },
      { q: "What if I'm not sure what happened counts as trauma?", a: "If it affected you, it matters. You don't need to meet a legal or clinical definition of assault for an experience to have left a mark on your nervous system. Many survivors minimize their own experiences. In our work, what matters is what you're carrying — not how it compares to anyone else's story." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How do you approach safety in the therapeutic relationship?", a: "Carefully and explicitly. We discuss boundaries, pacing, and your level of control at every stage. You can slow down, pause, or stop at any point. I take the therapeutic relationship seriously, and I understand that trust — especially for survivors of interpersonal trauma — is built slowly and must be earned." },
    ],
  },
  "emdr-for-medical-trauma": {
    isForYou: [
      "A medical experience — diagnosis, procedure, hospitalization, or close call — left you more shaken than you expected",
      "You're now anxious about medical appointments, your body, or health in ways you weren't before",
      "The physical experience has healed but something else hasn't",
      "You feel like you should be over it by now, but you're not",
      "You want to address the psychological aftermath of what your body went through",
      "You're ready to actually process it rather than just push through",
    ],
    faqs: [
      { q: "Is medical trauma really 'trauma' in the clinical sense?", a: "Yes. Medical trauma — including frightening diagnoses, painful or invasive procedures, ICU stays, or witnessing a medical emergency — meets the clinical criteria for trauma and can produce PTSD symptoms. The fact that the trauma occurred in a medical context doesn't make it less real or less treatable." },
      { q: "What if my anxiety is specifically about future medical care?", a: "This is very common after medical trauma, and EMDR addresses it directly. We work with both the past experiences that created the fear and the anticipated future ones — a technique called future template installation — so you can approach necessary medical care without being overwhelmed." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can EMDR help even if the medical issue is ongoing?", a: "Yes. You don't have to be fully recovered or medically stable to benefit from EMDR. We can work with what has already happened — the fear, the helplessness, the specific memories — even if you're still in the middle of a medical situation. Many people find that processing the psychological component helps them engage more clearly with their ongoing care." },
    ],
  },
  "emdr-for-accident-trauma": {
    isForYou: [
      "You've been in an accident or experienced an injury and haven't felt like yourself since",
      "You're hypervigilant, easily startled, or anxious in situations that remind you of it",
      "The physical recovery is complete or underway, but something in your nervous system is still reacting",
      "You're avoiding driving, certain roads, or activities you used to do without thinking",
      "You feel like you should be over it but you're not, and you're frustrated by that",
      "You want to address the psychological aftermath, not just the physical one",
    ],
    faqs: [
      { q: "Can EMDR help with accident-related phobias like driving anxiety?", a: "Yes — this is one of EMDR's most well-documented applications. We work with the specific memories from the accident that are fueling the avoidance and anxiety, and often use future template installation to help you re-approach the feared situation with a different nervous system response." },
      { q: "What if the accident was minor — does it still count?", a: "Absolutely. The severity of an accident doesn't determine whether it was traumatic. What matters is how your nervous system responded. A minor fender-bender can be just as psychologically impactful as a serious collision, depending on the circumstances and your history. Your response is valid regardless of the objective severity." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How quickly can accident trauma resolve with EMDR?", a: "Single-incident trauma like accidents often responds relatively quickly to EMDR. Many clients see significant improvement within 6–12 sessions. Of course, this depends on the severity of the accident, whether there were pre-existing vulnerabilities, and the extent of any ongoing physical recovery." },
    ],
  },
  "emdr-for-first-responders": {
    isForYou: [
      "You've seen things that most people never will, and you carry that weight",
      "The job has changed you — and not entirely in ways you chose",
      "You're noticing hypervigilance, emotional numbing, or difficulty being present at home",
      "Talking about it to someone who doesn't understand the work feels pointless",
      "You're not looking for sympathy — you're looking for something that actually works",
      "You're ready to deal with what you've accumulated before it costs you more",
    ],
    faqs: [
      { q: "Do you understand first responder culture?", a: "I do — and I know that trust is earned, not assumed. I work with firefighters, paramedics, law enforcement, and ER clinicians who need a therapist who won't flinch at what they describe, won't pathologize the work, and won't push them to process in ways that feel incompatible with who they are. EMDR is well-suited for this population precisely because it doesn't require you to verbally process at length." },
      { q: "Is EMDR effective for the kind of repeated, cumulative trauma first responders experience?", a: "Yes. EMDR was originally developed for single-incident trauma, but its application has expanded significantly. For cumulative, occupational trauma — the layered, repetitive exposure that first responders experience — EMDR addresses both specific critical incidents and the underlying nervous system state that develops over a career." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Is telehealth appropriate for this kind of work?", a: "For many first responders, telehealth is actually preferable — you don't have to be seen walking into a therapist's office, you can schedule around shifts, and you can be in your own space. The clinical work is the same. I've found that some clients are more open in a telehealth format precisely because of the privacy it affords." },
    ],
  },
  "emdr-for-anxiety": {
    isForYou: [
      "You've tried the breathing exercises, the CBT worksheets, the meditation apps — and you're still anxious",
      "Your anxiety spikes in specific situations and you can't always explain why",
      "It shows up in your body — tight chest, racing heart, difficulty sleeping — not just your thoughts",
      "You're high-functioning, but it costs you more than it should",
      "You want to understand where it actually comes from, not just learn to cope with it",
      "You're ready for an approach that goes deeper than symptom management",
    ],
    faqs: [
      { q: "How is EMDR different from CBT for anxiety?", a: "CBT works by identifying and challenging anxious thought patterns. EMDR goes a level deeper — it targets the specific memories and experiences that created those patterns in the first place. For many people with anxiety, EMDR produces change that cognitive work alone couldn't reach, because it addresses the root rather than the branches." },
      { q: "What if I don't know why I'm anxious?", a: "That's actually very common, and it's fine. We start with what you're experiencing now — the sensations, the triggers, the beliefs — and work backward from there. You don't need to arrive with a clear origin story. The work often reveals connections that weren't obvious at the start." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two after early sessions. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How many sessions does it take to see results for anxiety?", a: "Many clients notice meaningful shifts within 6–10 sessions. For anxiety specifically, results can come relatively quickly when we identify the core memories and beliefs driving it. That said, it depends on the complexity and history. I'll be honest with you about what I'm seeing as we go." },
    ],
  },
  "emdr-for-panic-attacks": {
    isForYou: [
      "You've had at least one panic attack and are now afraid of having another",
      "You're avoiding situations, places, or activities because of what might happen",
      "The panic feels completely out of your control and you can't predict when it will hit",
      "You've been to the ER or had your heart checked and everything came back normal",
      "You're tired of white-knuckling through situations that most people handle easily",
      "You want to address why your nervous system is responding this way, not just manage it when it happens",
    ],
    faqs: [
      { q: "Can EMDR actually stop panic attacks?", a: "EMDR doesn't target panic attacks directly — it targets the underlying memories, triggers, and nervous system patterns that produce them. For many clients, when those roots are addressed, the panic attacks reduce significantly in frequency and intensity, and some resolve entirely. The goal is to change what's driving the response, not just manage the response itself." },
      { q: "What if my panic attacks don't seem connected to any trauma?", a: "Panic is often connected to experiences that don't feel 'traumatic' in an obvious way — a moment of humiliation, a time you felt out of control, an early experience of illness or fear. EMDR helps identify these connections even when they're not immediately obvious. You don't need to arrive with a clear explanation." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Do you teach coping strategies for panic attacks?", a: "Yes — and this happens before any processing work begins. The preparation phase of EMDR involves building stabilization resources, including tools for managing acute anxiety and panic between sessions. You won't start processing without a toolkit to support you outside of our work." },
    ],
  },
  "emdr-for-social-anxiety": {
    isForYou: [
      "Social situations cost you significantly more energy than they seem to cost other people",
      "You're hyper-aware of how you're coming across and replay interactions afterward",
      "The anxiety is specific — certain situations trigger it more than others",
      "You've read about social anxiety, you understand the cognitive patterns, but understanding hasn't made it go away",
      "You suspect there are specific experiences that made you this way — and you want to address those",
      "You're tired of organizing your life around avoidance",
    ],
    faqs: [
      { q: "Why does EMDR work for social anxiety when CBT hasn't?", a: "CBT is effective for many people with social anxiety, but it works primarily at the level of thoughts. EMDR works at the level of the specific memories — moments of humiliation, rejection, or judgment — that trained your nervous system to respond with fear in social situations. When those memories are processed, the threat response often diminishes in ways that cognitive restructuring alone couldn't achieve." },
      { q: "What if I can't identify specific memories that caused my social anxiety?", a: "You don't need to. We can begin with the sensations and beliefs you experience in anxiety-provoking situations and work back from there. EMDR often surfaces relevant memories during the process itself. Arriving with a clear causal story isn't necessary." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can I work on specific feared situations — like public speaking or job interviews?", a: "Yes. EMDR uses a technique called future template installation that specifically targets anticipated feared situations. Once we've processed the underlying memories, we can also work on rewiring your nervous system's response to the specific situations that trigger you most." },
    ],
  },
  "emdr-for-phobias": {
    isForYou: [
      "You have a fear that is out of proportion to the actual danger and you know it",
      "The phobia is affecting your life — what you can do, where you can go, how you feel",
      "Telling yourself it's irrational hasn't made it go away",
      "You've tried exposure and it helped somewhat, but the fear is still there underneath",
      "You want to address what's driving the fear, not just learn to tolerate it",
      "You're ready for something more efficient than years of gradual exposure",
    ],
    faqs: [
      { q: "How does EMDR work for phobias specifically?", a: "EMDR targets the memory network underlying the phobia — often a specific experience that taught your nervous system to associate the feared object or situation with danger. By processing that network, the threat response diminishes. Unlike exposure therapy, EMDR doesn't require you to repeatedly face the feared thing — it works with the memory of the experience." },
      { q: "Can EMDR work for any type of phobia?", a: "EMDR has been applied effectively to a wide range of phobias — flying, needles, heights, animals, driving, and more. Phobias that can be traced to a specific originating experience tend to respond particularly well. Even phobias without a clear origin often respond, because EMDR can target the general memory network associated with the fear." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How quickly do phobias resolve with EMDR?", a: "Specific phobias are among the issues that respond most efficiently to EMDR. Many clients see significant or complete resolution in 3–8 sessions when the phobia is linked to identifiable experiences. Results vary, but phobias are generally one of the more tractable presentations in EMDR work." },
    ],
  },
  "emdr-for-health-anxiety": {
    isForYou: [
      "You're frequently worried that something is seriously wrong with your body",
      "You seek reassurance — from doctors, from Google, from people around you — and it only helps briefly",
      "The fear ramps up when you notice a new symptom or hear about someone else's illness",
      "You have a history of illness, a difficult medical experience, or a loss that may be driving the fear",
      "You understand intellectually that you're probably fine, but the fear doesn't respond to logic",
      "You want to address the root of the anxiety, not just reassure yourself through it over and over",
    ],
    faqs: [
      { q: "What's the connection between health anxiety and past experiences?", a: "Health anxiety often has roots in specific experiences — a serious illness of your own or a loved one, a frightening medical event, a loss, or an environment where illness was a frequent source of stress or unpredictability. EMDR identifies and processes those experiences rather than just targeting the anxious thoughts they produce." },
      { q: "Will EMDR help me stop seeking reassurance?", a: "That's the goal, yes — but we approach it differently than traditional CBT. Rather than working directly on the reassurance-seeking behavior, EMDR works on the underlying fear that drives it. When the fear loses its charge, the need to seek reassurance typically diminishes on its own." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What if my health anxiety is partly realistic — I do have a health condition?", a: "EMDR can help even when there is a genuine health concern. We can work on the anxiety component — the disproportionate fear, the hypervigilance, the difficulty tolerating uncertainty — without dismissing the real aspects of your situation. The goal is a calibrated response to your health, not toxic positivity." },
    ],
  },
  "emdr-for-perfectionism": {
    isForYou: [
      "You set extremely high standards for yourself and feel devastated when you don't meet them",
      "Procrastination, avoidance, or all-or-nothing thinking are getting in your way",
      "The drive to perform is exhausting and it doesn't feel like a choice",
      "Underneath the perfectionism is a fear — of failure, judgment, or not being enough",
      "You've achieved a lot, but it doesn't feel like enough and you can't explain why",
      "You want to understand where this came from and actually change it, not just manage it",
    ],
    faqs: [
      { q: "Is perfectionism really something EMDR can address?", a: "Yes. Perfectionism is often rooted in specific early experiences — environments where approval was conditional, mistakes were punished, or worth was tied to achievement. EMDR targets those root experiences, which shifts the underlying belief system rather than just the behaviors it produces. Many clients are surprised by how much changes when the roots are addressed." },
      { q: "What if my perfectionism is also driving my success — I don't want to lose that?", a: "This is a real concern and worth addressing directly. The goal of EMDR isn't to make you stop caring about quality or achievement — it's to free you from the fear that drives perfectionism. Most clients find that when the anxiety underneath settles, their work actually improves because it's no longer contaminated by dread." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How is EMDR different from coaching or CBT for perfectionism?", a: "Coaching works on behavior and strategy. CBT works on thought patterns. EMDR works on the memories and experiences that installed the core beliefs driving the perfectionism. For many people, the beliefs are the hardest thing to shift — and EMDR reaches them at a level that surface-level interventions often can't." },
    ],
  },
  "emdr-for-depression": {
    isForYou: [
      "The heaviness isn't just sadness — it's a disconnection from yourself, your relationships, your sense of possibility",
      "Medication has helped somewhat but something is still underneath it",
      "You can function but everything costs more than it should",
      "You suspect there are specific experiences — losses, wounds, or long-held beliefs — driving the depression",
      "Talk therapy has provided insight but the depression hasn't lifted",
      "You're ready to try something that goes deeper than what you've already done",
    ],
    faqs: [
      { q: "How does EMDR address depression — isn't it mainly for trauma?", a: "EMDR was originally developed for trauma, but research has expanded its application significantly. Depression is often maintained by unprocessed grief, negative core beliefs, and painful memories — all of which EMDR addresses directly. For many people, especially those with trauma histories, EMDR reaches a layer of the depression that talk therapy and medication alone couldn't touch." },
      { q: "Can I do EMDR if I'm on antidepressants?", a: "Yes. Medication and EMDR are compatible and often used together. Some clinicians believe that medication can actually support EMDR work by providing a degree of stabilization. We'll discuss your current treatment and what makes sense in your particular situation." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What if my depression doesn't seem connected to any specific event?", a: "Depression often doesn't have one clear origin — it can develop from an accumulation of experiences, a pervasive early environment, or losses that were never fully grieved. EMDR works with whatever is available: the beliefs, the body sensations, the emotional memories. A clear causal story isn't required." },
    ],
  },
  "emdr-for-persistent-depression": {
    isForYou: [
      "The depression isn't acute — it's a low-level constant that's been there so long it feels like personality",
      "You've tried antidepressants, talk therapy, lifestyle changes — and nothing has fully lifted it",
      "You've normalized the heaviness because you don't remember feeling any other way",
      "There's a part of you that suspects something deeper is maintaining it",
      "You want to address the roots, not just manage symptoms indefinitely",
      "You're ready to try something that goes further than what you've already done",
    ],
    faqs: [
      { q: "Why might EMDR work when other treatments haven't?", a: "Persistent depressive disorder often has deep roots — early relational experiences, long-held negative beliefs about the self, or accumulated losses that were never fully processed. These roots don't always respond to medication or cognitive approaches because they're held at a level below conscious thought. EMDR addresses them directly." },
      { q: "Is it too late to try EMDR if I've had depression for decades?", a: "No. The nervous system retains the capacity for change regardless of how long a pattern has been in place. Some of the most significant shifts I've seen in this work have come in people who had been depressed for 20 years or more. Duration doesn't determine outcome." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How long does EMDR take for persistent depression?", a: "This is honest work that takes real time. We're not treating a single event but a pervasive condition with deep roots. Treatment is often measured in months rather than weeks, and progress tends to be gradual — but meaningful and cumulative. I'll be transparent with you about what I'm seeing as we go." },
    ],
  },
  "emdr-for-postpartum-depression": {
    isForYou: [
      "You're in the postpartum period and something is wrong — more than baby blues, more than tiredness",
      "You feel disconnected from your baby, your partner, or yourself",
      "The gap between what you expected to feel and what you actually feel is painful",
      "You feel guilty about how you're feeling, which makes everything worse",
      "You may have a difficult birth experience that's still affecting you",
      "You want support that takes what you're going through seriously without judgment",
    ],
    faqs: [
      { q: "Is EMDR safe in the postpartum period?", a: "Yes. EMDR is considered safe for postpartum depression and anxiety. We take particular care with pacing and stabilization — the postpartum period already carries a lot, and we don't add to the burden. The work is adapted to where you are physically, emotionally, and logistically as a new parent." },
      { q: "What if my postpartum depression is connected to a difficult birth experience?", a: "Birth trauma is a specific and real form of trauma that EMDR addresses effectively. Many cases of postpartum depression have a birth trauma component — fear, loss of control, medical complications, or the gap between what you hoped for and what happened. We can work with both the depression and the birth experience." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can I do EMDR if I'm breastfeeding or on postpartum medication?", a: "Yes. EMDR is a non-pharmacological intervention and has no interaction with breastfeeding or postpartum medications. If you're taking medication, that's fine — EMDR and medication are compatible and often complement each other well." },
    ],
  },
  "emdr-for-grief": {
    isForYou: [
      "You've lost someone important and the grief isn't moving — it's stuck",
      "The loss was complicated by circumstances, relationship history, or things left unsaid",
      "You feel pressure to be 'over it' by now, and you're not",
      "Grief is bleeding into everything — your work, your relationships, your sense of self",
      "You've tried talking about it and it helps, but something deeper hasn't shifted",
      "You want to process the loss in a way that allows you to carry it differently",
    ],
    faqs: [
      { q: "How does EMDR work with grief specifically?", a: "EMDR isn't about eliminating grief — it's about removing the traumatic charge from grief so you can mourn naturally. When grief is stuck, it's often because specific memories are frozen in a state of acute pain. EMDR helps process those memories so they can be held with sadness rather than ongoing trauma." },
      { q: "What if my grief is complicated — I had a difficult relationship with who I lost?", a: "Complicated grief often involves ambivalence, guilt, or anger alongside the loss — and EMDR can hold all of that. In fact, complicated grief often responds particularly well to EMDR because it addresses the specific memories and beliefs that are tangled up with the loss, not just the grief itself." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Is there a right time to start EMDR after a loss?", a: "There's no universal answer. In the acute phase of grief, stabilization and support are often more appropriate than active processing. Once you have some basic stability — weeks to months after the loss, depending on the circumstances — EMDR can be very effective. We'll assess this together in the consultation." },
    ],
  },
  "emdr-for-complicated-grief": {
    isForYou: [
      "The grief is not fading with time — it's as acute now as it was in the beginning",
      "You're having trouble accepting the reality of the loss",
      "Guilt, anger, or regret are tangled up with the sadness in ways you can't separate",
      "The loss was sudden, violent, or traumatic in some way",
      "You feel like part of you is frozen at the moment of the loss",
      "Standard grief support hasn't reached what needs to be reached",
    ],
    faqs: [
      { q: "What is complicated grief and how do I know if I have it?", a: "Complicated grief — also called prolonged grief disorder — is grief that has become stuck rather than evolving over time. Signs include intense longing and sorrow that doesn't diminish, difficulty accepting the loss, feeling like life is meaningless without the person, and significant functional impairment. If grief is still as acute 6–12 months after the loss as it was in the beginning, that's worth addressing directly." },
      { q: "Why is EMDR particularly suited for complicated grief?", a: "Complicated grief often has a traumatic component — the memories of the loss, or the circumstances around it, carry an acute charge that interferes with natural mourning. EMDR addresses that traumatic charge directly, which is often what allows grief to begin moving again after it has been stuck." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Does EMDR help with the specific memories of the loss — like being present at a death?", a: "Yes. Specific traumatic memories — being present at a death, receiving a devastating phone call, witnessing suffering — are exactly what EMDR is designed to process. These memories, when frozen in a state of acute distress, can be processed so that they can be remembered with sadness rather than ongoing trauma." },
    ],
  },
  "emdr-for-anticipatory-grief": {
    isForYou: [
      "Someone you love is dying or seriously ill, and you're already grieving",
      "You're trying to be present for them while also managing your own fear and pain",
      "You're aware of the loss coming and don't know how to prepare for it",
      "The anticipatory grief is interfering with your ability to be with them now",
      "You feel guilty for grieving someone who is still alive",
      "You want support that helps you hold the complexity of what you're experiencing",
    ],
    faqs: [
      { q: "Is anticipatory grief a real clinical concern?", a: "Absolutely. Anticipatory grief — the grief that begins before a loss — is well-documented and can be as intense as grief after a death. The difference is that you're grieving while still trying to be present for someone you love, which creates a particular kind of strain. It deserves real support, not just reassurance." },
      { q: "How can EMDR help when the loss hasn't happened yet?", a: "EMDR can help with the fear, helplessness, and distress of the anticipated loss — including past experiences with loss or death that may be intensifying the current fear. We can also work on building your capacity to be present for what's coming rather than being overwhelmed by it." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can I continue working with you after the loss occurs?", a: "Yes. Many clients begin working with me during anticipatory grief and continue into the bereavement period. Continuity of the therapeutic relationship during this transition can be very meaningful, and I'm committed to supporting clients through the full arc of what they're experiencing." },
    ],
  },
  "emdr-for-pet-loss": {
    isForYou: [
      "You've lost a pet and the grief is real — more than people around you seem to understand",
      "You feel embarrassed by the intensity of what you're feeling, but you can't talk yourself out of it",
      "Your pet was a primary source of comfort, companionship, or routine, and that's gone",
      "The circumstances of the loss — a difficult euthanasia decision, an accident, or a sudden death — are haunting you",
      "You want to grieve fully without being told it was 'just an animal'",
      "You're ready to process this with someone who takes it seriously",
    ],
    faqs: [
      { q: "Is pet loss grief something therapy can actually help with?", a: "Yes — and I take it seriously. Pet loss can be one of the most significant losses a person experiences. Animals are family, and their absence disrupts daily rhythms, sources of comfort, and sometimes an entire sense of home. EMDR processes this grief with the same care and thoroughness I bring to any other loss." },
      { q: "What if the circumstances of the loss — like a euthanasia decision — are what I'm struggling with most?", a: "That's very common. Decisions about euthanasia carry enormous weight — the responsibility, the uncertainty, the guilt. EMDR can target the specific memories and beliefs around that decision, processing the guilt and distress so you can hold the decision with peace rather than ongoing anguish." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Do I need to justify why this loss was so significant?", a: "No. You don't need to explain or defend the depth of your grief to me. The relationship you had with your pet was real. The loss is real. That's enough." },
    ],
  },
  "emdr-for-life-transitions": {
    isForYou: [
      "You're in the middle of a significant change — chosen or not — and you feel unmoored",
      "The transition is bringing up more than just practical challenges",
      "Your sense of identity, purpose, or belonging is in question",
      "You're grieving what was, even if what's coming is better",
      "The anxiety or grief feels disproportionate to what's happening on the surface",
      "You want support that addresses the emotional depth of the change, not just strategies for adapting",
    ],
    faqs: [
      { q: "How does EMDR help with life transitions — isn't it mainly for trauma?", a: "EMDR addresses any experience that the nervous system has processed incompletely — and major transitions often carry more weight than their surface appearance suggests. The grief of an ending, the fear of the unknown, the disruption of identity — these can all be processed through EMDR, often more effectively than through talk therapy alone." },
      { q: "What if the transition is positive — like a promotion or a new relationship?", a: "Positive transitions can be just as destabilizing as difficult ones. A new relationship may activate old attachment wounds. A promotion may surface deep-seated fears of failure or exposure. EMDR works with whatever the transition is activating, regardless of whether the change itself is objectively good." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How many sessions does this kind of work typically take?", a: "Transition work varies considerably. Some people come for 8–12 sessions focused on a specific transition and feel significantly better. Others use the transition as an entry point into deeper work on longstanding patterns. We'll assess what makes sense for you as we go." },
    ],
  },
  "emdr-for-burnout": {
    isForYou: [
      "You're not just tired — you're depleted in a way that rest doesn't fix",
      "The work that used to matter doesn't anymore — or you can't access why it did",
      "You've been running on empty for longer than you can remember",
      "Setting limits has always felt hard, and you don't fully understand why",
      "There are beliefs underneath the burnout — about worth, about what you owe others — that you haven't examined",
      "You want to recover, but you also want to understand how you got here so it doesn't happen again",
    ],
    faqs: [
      { q: "How is EMDR relevant to burnout — isn't it for trauma?", a: "Burnout and trauma are often more connected than people realize. Many people who burn out have deep-seated beliefs about worth, obligation, and self-sacrifice that were formed early in life. EMDR addresses those beliefs at their roots rather than just teaching coping strategies for the current state of depletion." },
      { q: "Can EMDR help me figure out why I can't set limits?", a: "Yes — this is some of the most meaningful work I do. The inability to set limits is rarely a skills deficit. It's usually rooted in beliefs and early experiences: that your worth depends on what you give, that saying no is dangerous, that your needs matter less than others'. EMDR targets those roots." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Do I need to take time off work to do this kind of therapy?", a: "Not necessarily. We work around your schedule via telehealth, and the processing happens in sessions. Many clients do this work while continuing to work — though if you're in severe burnout, reducing your load where possible is usually worth discussing. That's a conversation we can have." },
    ],
  },
  "emdr-for-career-transitions": {
    isForYou: [
      "You're in a career transition — voluntary or forced — and it's bringing up more than just practical concerns",
      "Your identity was tied to your work, and without it you're not sure who you are",
      "The transition is activating fear, shame, or grief that feels disproportionate",
      "You want to move forward clearly, not from anxiety or scarcity",
      "There are deeper questions about worth, purpose, and belonging underneath the career question",
      "You want support that addresses the emotional dimension of the change, not just the strategic one",
    ],
    faqs: [
      { q: "How is EMDR relevant to a career transition?", a: "Career transitions activate some of the deepest fears and beliefs people carry — about worth, about failure, about whether they deserve good things. EMDR targets those underlying beliefs rather than just the surface-level anxiety about the transition itself. Many clients find that what they thought was a career question was actually a deeper question about identity and self-worth." },
      { q: "What if I was laid off or fired — can EMDR help with that?", a: "Yes. Involuntary job loss can be genuinely traumatic — sudden, disorienting, and often accompanied by shame. EMDR can process the specific experience of the loss as well as the beliefs it activated. The goal is to help you approach what's next from a grounded place rather than from the wound." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can EMDR help me figure out what I actually want to do next?", a: "EMDR isn't career coaching, but it frequently unlocks clarity. When the fear, shame, and old beliefs are processed, many clients find they can hear themselves more clearly — what they actually value, what they've been avoiding, what kind of work would actually fit who they are. The clarity often follows the processing." },
    ],
  },
  "emdr-for-self-worth": {
    isForYou: [
      "The belief that you're not enough — not smart enough, not good enough, not lovable enough — feels fundamental",
      "You can list your accomplishments but they don't touch the feeling",
      "The belief shows up in your body, not just your thoughts",
      "You've tried affirmations, journaling, and cognitive work — and the core belief is still there",
      "You suspect this goes back a long way",
      "You want to shift the belief at its root, not just manage it",
    ],
    faqs: [
      { q: "Why doesn't positive thinking fix negative self-beliefs?", a: "Because negative core beliefs aren't primarily cognitive — they're held in the body and the nervous system, encoded through experiences that happened before language or logic were fully developed. Positive thinking operates at the level of the rational mind. EMDR operates at the level where the beliefs are actually stored." },
      { q: "How does EMDR change a belief like 'I'm not enough'?", a: "We identify the specific experiences that installed and reinforced the belief — often going back to childhood. EMDR processes those experiences so they no longer carry the charge that maintains the belief. A more accurate positive belief is then explicitly strengthened. Most people are surprised by how much can shift." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How long does it take to shift a core belief with EMDR?", a: "It depends on how deeply the belief is rooted and how many experiences are feeding it. Some people experience meaningful shifts in a handful of sessions targeting the key memories. Others with more complex histories take longer. But core beliefs are not fixed — they change through EMDR in ways that other approaches often can't reach." },
    ],
  },
  "emdr-for-midlife-transitions": {
    isForYou: [
      "You're somewhere in midlife and something has shifted — a reckoning you didn't fully see coming",
      "You're questioning choices you made, paths you didn't take, or whether the life you've built is really yours",
      "Grief, restlessness, or a loss of meaning are present in a way that's hard to name",
      "The usual ways of pushing through aren't working the way they used to",
      "You want support that takes midlife seriously as its own distinct challenge",
      "You're ready to do the inner work, not just the outer reorganization",
    ],
    faqs: [
      { q: "Is midlife crisis a real clinical phenomenon?", a: "The term 'midlife crisis' is often mocked, but the underlying experience is real and clinically significant. Midlife frequently brings a confrontation with mortality, regret, unfulfilled longings, and a changed relationship to time — all of which can produce genuine distress. EMDR helps process the grief and reassessment that this life stage often surfaces." },
      { q: "What if I can't identify anything specific to work on — it's more of a general malaise?", a: "That's common in midlife work. We start with what you're experiencing — the restlessness, the grief, the questions — and the specific memories and beliefs that are fueling them often emerge through the process. You don't need to arrive with a clear target." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can EMDR help with regret specifically?", a: "Yes. Regret — when it's acute or persistent — often has a traumatic quality: a frozen moment, a belief about what you deserve, a narrative about the self that closes off possibility. EMDR can process the specific memories and beliefs that sustain regret, which often opens up a different relationship to the past and the future." },
    ],
  },
  "emdr-for-aging": {
    isForYou: [
      "You're in a later chapter of life and grappling with questions that deserve real engagement, not platitudes",
      "Grief, fear of death, regret, or a sense of unfinished business is present",
      "You're watching your body change in ways that are confronting your sense of self",
      "There are things from your past that you haven't fully processed and don't want to carry into the end of your life",
      "You want to find genuine meaning in what has been and what remains",
      "You're ready to do this work with honesty and courage",
    ],
    faqs: [
      { q: "Is EMDR appropriate for older adults?", a: "Yes. EMDR has been used effectively with adults across the full lifespan, including older adults. The approach is adapted to the individual, and there is no age at which the nervous system loses its capacity for processing and healing. In fact, many older adults find EMDR particularly valuable because of the accumulated experiences that can be addressed." },
      { q: "Can EMDR help with fear of death?", a: "Fear of death, and the existential anxiety that comes with aging, are areas where EMDR can be genuinely helpful. We work with the specific fears, memories, and beliefs that carry the most charge — often including past experiences with loss or death that are intensifying the current fear. The goal is not to eliminate the awareness of mortality but to hold it with more equanimity." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What about grief for losses that have accumulated over a lifetime?", a: "EMDR is well-suited for this kind of accumulated grief — the losses of people, capacities, roles, and possibilities that gather over a lifetime. We work with what carries the most charge rather than trying to process everything. Many clients find that addressing a few key losses creates movement across a broader landscape of grief." },
    ],
  },
  "emdr-for-relationship-trauma": {
    isForYou: [
      "A relationship — past or present — has left marks that are showing up in your current life",
      "You recognize patterns you can't seem to break, even when you understand them intellectually",
      "You find it hard to trust, to be close, or to feel safe with people who matter to you",
      "The relationship involved emotional abuse, control, or chronic invalidation",
      "What happened doesn't feel like trauma in the dramatic sense, but it's had a lasting effect",
      "You want to process what happened at a depth that talking about it alone hasn't reached",
    ],
    faqs: [
      { q: "Does relationship trauma 'count' as trauma in the EMDR sense?", a: "Absolutely. Emotional abuse, coercive control, chronic invalidation, and the slower wound of a relationship that consistently communicated that you weren't enough — these all meet the clinical threshold for trauma. The fact that it was relational rather than event-based doesn't make it less real or less treatable." },
      { q: "Can EMDR help me stop repeating relationship patterns?", a: "This is one of EMDR's most powerful applications. Relationship patterns are driven by beliefs and memories, not just habits. When we process the experiences that formed the pattern — often going back to early attachment relationships — the pattern loses its automatic quality. Change becomes genuinely possible, not just intellectually understood." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What if I'm still in the relationship or recently left it?", a: "Both are workable. If you're still in a difficult relationship, we can build the internal resources and clarity that support better decision-making. If you've recently left, we can address both the acute distress and the deeper patterns the relationship activated. Where you are in the process shapes how we approach the work." },
    ],
  },
  "emdr-for-attachment-issues": {
    isForYou: [
      "Closeness in relationships feels either suffocating or desperately needed — sometimes both",
      "You find yourself either avoiding intimacy or becoming anxious when it's threatened",
      "The patterns in your relationships feel out of your control, even when you can see them clearly",
      "Your early experiences with caregivers were inconsistent, neglectful, or frightening",
      "You understand attachment theory but understanding hasn't changed how you react",
      "You want to change not just your behavior but your nervous system's response to closeness",
    ],
    faqs: [
      { q: "Can EMDR change attachment patterns formed in childhood?", a: "Yes — this is some of the most transformative work EMDR can do. Attachment patterns are learned responses, formed through repeated experiences with early caregivers. EMDR targets the specific memories and experiences that formed the pattern. When those are processed, the nervous system's automatic response to closeness and threat genuinely changes." },
      { q: "Do I need to remember specific childhood events for this to work?", a: "No. We work with whatever is available — emotional memories, body sensations, patterns you notice in current relationships. The processing doesn't require a clear autobiographical narrative. EMDR often surfaces relevant material during the process itself." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How is EMDR different from attachment-focused talk therapy?", a: "Attachment-focused talk therapy works through the therapeutic relationship itself — using the consistent, attuned experience of therapy to provide corrective emotional experiences. EMDR does this too, but adds a processing component that directly targets the memories and experiences that formed the insecure attachment. For many people, the combination is more powerful than either approach alone." },
    ],
  },
  "emdr-for-divorce": {
    isForYou: [
      "You're going through or recovering from a divorce or separation and it's harder than you expected",
      "Your sense of identity, your daily life, and your sense of the future have all been disrupted",
      "There's grief, anger, or shame that you haven't been able to fully process",
      "The divorce is activating older wounds — about worth, love, or whether you're enough",
      "You're trying to function, parent, or work while also holding a tremendous amount of pain",
      "You want support that goes deeper than practical adjustment",
    ],
    faqs: [
      { q: "How does EMDR help with divorce specifically?", a: "Divorce involves multiple layers of loss — the relationship itself, the shared life, the future you imagined, sometimes a shared identity. EMDR can process the specific memories and losses that carry the most acute charge, as well as the older beliefs the divorce may have activated — about your worth, your lovability, your capacity to make good decisions." },
      { q: "What if the divorce was the right decision but I'm still grieving?", a: "That's completely normal and worth addressing directly. Knowing a decision was right doesn't eliminate grief. EMDR isn't about convincing you that things are fine — it's about processing the genuine loss, the specific memories, and the grief that comes with the ending of a significant chapter, regardless of whether the ending was necessary." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can EMDR help me co-parent more effectively?", a: "Indirectly, yes. When the acute distress, reactivity, and grief are processed, most people find they have more access to their own judgment and regulation in difficult co-parenting situations. The goal isn't to eliminate all conflict but to allow you to show up with more clarity and less reactivity." },
    ],
  },
  "emdr-for-betrayal-trauma": {
    isForYou: [
      "Someone you trusted deeply violated that trust — through infidelity, deception, or a significant betrayal",
      "The discovery shattered your sense of reality and what you thought you knew",
      "You're cycling between disbelief, rage, grief, and numbness",
      "The intrusive thoughts, hypervigilance, and inability to trust won't let up",
      "You want to process what happened without it defining the rest of your life",
      "You're ready to address this at a depth that talking about it over and over hasn't reached",
    ],
    faqs: [
      { q: "Is betrayal trauma actually trauma in the clinical sense?", a: "Yes. Betrayal trauma — especially from a primary attachment figure — meets the clinical criteria for trauma and can produce PTSD-like symptoms: intrusive thoughts, hypervigilance, emotional dysregulation, and avoidance. The shattering of trust and reality that comes with betrayal is a genuine traumatic injury." },
      { q: "Can EMDR help even if I'm still in the relationship?", a: "Yes. EMDR isn't a verdict on the relationship — it addresses the traumatic injury regardless of the relational outcome. Whether you're working to rebuild the relationship or leave it, processing the betrayal itself is valuable. EMDR helps you access your own clarity rather than react from the wound." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How long does betrayal trauma take to process?", a: "It varies considerably depending on the nature and duration of the betrayal, your history, and what else the betrayal activated. Many clients notice meaningful shifts within 10–16 sessions. For betrayals that connect to older attachment wounds, the work may take longer. I'll be honest with you about what I'm seeing as we go." },
    ],
  },
  "emdr-for-codependency": {
    isForYou: [
      "Your sense of okay-ness depends heavily on how others around you are doing",
      "You find it extremely difficult to set limits or prioritize your own needs",
      "You've been described as a caretaker, a fixer, or someone who gives too much",
      "Underneath the caretaking is anxiety — about what happens if you stop",
      "You can see the pattern but you can't seem to stop it",
      "You want to understand where it came from and change it at the root",
    ],
    faqs: [
      { q: "Where does codependency come from?", a: "Codependency is typically a learned adaptation — it developed in an environment where attuning to others' needs was necessary for safety, approval, or love. Often it developed in childhood, in families with addiction, emotional instability, or chronic unpredictability. EMDR identifies and processes the specific experiences that made this pattern necessary." },
      { q: "Can EMDR really change a pattern this ingrained?", a: "Yes — and this is one of EMDR's strongest applications. Patterns that feel like personality are often adaptive responses that were learned and can be unlearned, when the underlying experiences that made them necessary are processed. The pattern doesn't have to be permanent." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What does change actually look like — will I become less caring?", a: "No. The goal isn't to make you indifferent to others — it's to give you the ability to care from a place of genuine choice rather than anxiety. Most clients find that when the fear underneath the caretaking is processed, they actually become more effective and present in relationships, not less." },
    ],
  },
  "emdr-for-negative-beliefs": {
    isForYou: [
      "There are things you believe about yourself that feel true at a bone-deep level — and that you can't think your way out of",
      "Beliefs like 'I'm not enough,' 'I'm fundamentally flawed,' or 'I'm not safe' feel more real than any evidence to the contrary",
      "You've tried journaling, affirmations, and cognitive work — the belief is still there",
      "The belief shows up in your body, not just your thoughts",
      "You want to change what you feel about yourself, not just what you think",
      "You're ready to go to where these beliefs actually live",
    ],
    faqs: [
      { q: "Why can't I just think my way out of a negative belief?", a: "Because negative core beliefs aren't stored primarily in the rational mind — they're held in the body and nervous system, encoded through experiences that predate sophisticated cognitive processing. Affirmations and logical reframes operate at the wrong level. EMDR works at the level where the beliefs are actually stored and maintained." },
      { q: "How does EMDR change a core belief?", a: "We identify the specific experiences that installed and reinforced the belief. EMDR processes those experiences so they no longer carry the charge that maintains the belief. A more accurate positive belief is then explicitly strengthened during the session. Most people are surprised that they can feel different in a way they didn't after years of trying to think differently." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What if I don't know where the belief came from?", a: "You don't need to know. We can begin with the belief itself — how it feels in your body, when it shows up most strongly, what memories it's connected to — and the EMDR process often surfaces the relevant experiences. A clear origin story isn't required for the work to be effective." },
    ],
  },
  "emdr-for-shame": {
    isForYou: [
      "There's something about you — or something that happened — that carries a particular weight of shame",
      "The shame isn't just embarrassment — it's a deep sense that something is fundamentally wrong with you",
      "You've been carrying this alone, often for a long time",
      "Talking about it in detail feels impossible or too exposing",
      "The shame is affecting your relationships, your self-expression, or your capacity to be seen",
      "You want to heal it without having to fully disclose it",
    ],
    faqs: [
      { q: "Do I have to fully disclose what I'm ashamed of?", a: "No — and for many people working with shame, this is the most important thing to know. EMDR does not require detailed verbal disclosure. You hold the experience in mind during the bilateral stimulation; you don't need to narrate it. Many people find this is what makes EMDR bearable for shame work when other approaches weren't." },
      { q: "Where does shame come from?", a: "Shame is typically relational in origin — it develops through experiences of being rejected, humiliated, exposed, or made to feel fundamentally flawed by people who mattered. EMDR identifies and processes those experiences, which shifts shame at its roots rather than just addressing the surface-level feelings." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What does it feel like when shame is processed?", a: "Most clients describe it as a shift in the felt sense of the experience — it can still be remembered, but it no longer carries the same charge. The sense of being fundamentally wrong or exposed diminishes. Many people describe feeling lighter, or being able to hold the experience with more compassion for themselves." },
    ],
  },
  "emdr-for-imposter-syndrome": {
    isForYou: [
      "You're accomplished by most measures, but you live with a persistent fear of being found out",
      "You attribute your success to luck, timing, or other people — rarely to yourself",
      "Praise and recognition don't land — they create more anxiety about living up to expectations",
      "The fear of exposure is affecting your willingness to take on new challenges",
      "You've analyzed the pattern intellectually and understand it, but it hasn't changed",
      "You want to actually feel like you belong in the rooms you're in",
    ],
    faqs: [
      { q: "Where does imposter syndrome come from?", a: "Imposter syndrome typically has roots in early experiences of conditional approval — environments where love or acceptance depended on performance, where nothing was ever quite good enough, or where standing out felt dangerous. EMDR targets those root experiences rather than just the thought patterns they produce." },
      { q: "Can EMDR help when the stakes are high — like for executives or high performers?", a: "Yes — and I work with this population specifically. High performers often carry the most acute imposter syndrome precisely because the stakes are higher and the scrutiny is greater. EMDR provides an efficient, structured approach to addressing the underlying beliefs without requiring extensive verbal processing or time away from demanding professional lives." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What's the difference between healthy humility and imposter syndrome?", a: "Healthy humility is an accurate assessment of what you know and don't know. Imposter syndrome is a pervasive, distorted fear of exposure that operates regardless of evidence. The difference shows up in the body — healthy humility doesn't produce the same visceral fear of discovery that imposter syndrome does. EMDR targets the fear, not the humility." },
    ],
  },
  "emdr-for-first-responders-therapy": {
    isForYou: [
      "You've seen things that most people never will, and you carry that weight",
      "The job has changed you in ways you didn't choose",
      "You're noticing hypervigilance, emotional numbing, or difficulty being present off-duty",
      "Talking about it to someone who doesn't understand the work feels pointless",
      "You're not looking for sympathy — you're looking for something that actually works",
      "You're ready to address what you've accumulated before it costs you more",
    ],
    faqs: [
      { q: "Do you understand first responder culture?", a: "I do — and I know that trust is earned, not assumed. I work with firefighters, paramedics, law enforcement, and ER clinicians who need a therapist who won't flinch, won't pathologize the work, and won't push them to process in ways that feel incompatible with who they are. EMDR is well-suited for this population precisely because it doesn't require you to verbally process at length." },
      { q: "Is EMDR effective for the kind of repeated, cumulative trauma first responders experience?", a: "Yes. EMDR addresses both specific critical incidents and the underlying nervous system state that develops over a career of repeated exposure. The approach adapts to the layered, occupational nature of first responder trauma rather than treating it like a single event." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Is telehealth appropriate for this kind of work?", a: "For many first responders, telehealth is actually preferable — you don't have to be seen walking into a therapist's office, you can schedule around shifts, and you can be in your own space. The clinical work is the same. I've found that some clients are more open in a telehealth format precisely because of the privacy it affords." },
    ],
  },
  "emdr-for-executives": {
    isForYou: [
      "You perform at the highest level professionally, but something beneath the surface is costing you",
      "The pressure, isolation, or stakes of your role are taking a toll you haven't fully addressed",
      "You're carrying something from your past — or from the work — that's affecting you more than you let on",
      "You want an efficient, structured approach that respects your time and intelligence",
      "You need absolute confidentiality and a therapist who understands high-performance environments",
      "You're ready to do the inner work that your outer success has made easier to avoid",
    ],
    faqs: [
      { q: "How is EMDR suited for executives specifically?", a: "EMDR is structured, evidence-based, and efficient — qualities that resonate with high performers who don't have patience for open-ended process. It addresses specific targets rather than wandering through general discussion. Many executives find it more compatible with how they approach problems in other domains: identify the issue, apply an effective method, measure the change." },
      { q: "What kinds of things do executives typically bring to this work?", a: "The range is broad: imposter syndrome and fear of exposure, burnout and the beliefs that drive it, leadership-related trauma (being in charge during a crisis, a significant professional failure, managing others' suffering), family-of-origin patterns showing up in leadership style, and the relational cost of sustained high performance. Often what brings someone in is one thing, and what we work on is something deeper." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How do you handle confidentiality?", a: "With absolute seriousness. Everything shared in our sessions is protected by HIPAA and California confidentiality law. I do not disclose who my clients are. For executives who are concerned about privacy, telehealth actually offers additional protection — no waiting room, no chance of being seen." },
    ],
  },
  "emdr-for-bipoc-clients": {
    isForYou: [
      "You're navigating multiple cultural identities and the specific stressors that come with that",
      "Intergenerational trauma, systemic racism, or cultural displacement is part of what you're carrying",
      "You want a therapist who doesn't require you to educate them about your experience",
      "You've had experiences with providers who were well-meaning but didn't really get it",
      "The cultural dimension of your experience is inseparable from your mental health",
      "You want affirming, culturally grounded care that sees you in full context",
    ],
    faqs: [
      { q: "What does culturally affirming EMDR care actually look like?", a: "It means your cultural context, intergenerational history, and the systemic forces you navigate are understood as real and relevant — not pathologized, not minimized, not treated as background. As a second-generation Persian American, I bring my own experience of navigating multiple cultural identities to this work. I don't require you to explain your experience before we can get to it." },
      { q: "Can EMDR address racial trauma?", a: "Yes. Racial trauma — including experiences of discrimination, microaggressions, systemic injustice, and the cumulative effect of navigating a world not built for you — meets the clinical criteria for trauma and responds to EMDR. We address it with the same seriousness as any other form of trauma." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What about intergenerational trauma — can EMDR help with that?", a: "Yes. Intergenerational trauma — the transmission of unprocessed pain, adaptive patterns, and nervous system responses across generations — is increasingly well-understood clinically. EMDR addresses both the experiences you carry from your own life and the older wounds that were passed down. Many BIPOC clients find this framing resonates with what they've always known intuitively." },
    ],
  },
  "lgbtq-affirming-emdr-therapy": {
    isForYou: [
      "You want a therapist where you don't have to manage their comfort with your identity",
      "Minority stress, family rejection, or identity-based trauma is part of what you're carrying",
      "Coming out, identity formation, or navigating a world that isn't always safe has left marks",
      "You've had experiences with providers who were technically accepting but not truly affirming",
      "Your identity is inseparable from your mental health, and you want a therapist who understands that",
      "You want fully knowledgeable, genuinely affirming care",
    ],
    faqs: [
      { q: "What does fully affirming EMDR care actually mean?", a: "It means your identity is not treated as a problem to be explored or a variable to be bracketed — it's understood as a real and valid aspect of who you are. I'm knowledgeable about LGBTQ+ specific stressors, the research on minority stress, and the ways that navigating heteronormative and cisnormative environments creates real psychological burden. You don't have to explain yourself before we can get to the work." },
      { q: "Can EMDR address identity-based trauma specifically?", a: "Yes. Experiences of rejection, violence, harassment, or discrimination based on identity meet the clinical criteria for trauma and respond to EMDR. The cumulative effect of minority stress — the ongoing experience of navigating a world that isn't built for you — can also be addressed, not just individual incidents." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What about family rejection — can EMDR help with that?", a: "Yes. Family rejection is one of the most significant risk factors for mental health challenges in LGBTQ+ individuals, and it can leave deep wounds around worth, belonging, and lovability. EMDR addresses those wounds at their roots — the specific experiences and the beliefs they installed — rather than just supporting you to cope with the loss." },
    ],
  },
  "emdr-for-new-parents": {
    isForYou: [
      "The transition to parenthood has been harder than you expected or than people around you seem to find it",
      "You're experiencing postpartum depression, anxiety, or a disconnection you can't explain",
      "The birth experience was frightening, traumatic, or not what you hoped for",
      "Your sense of identity has shifted in ways that feel disorienting or frightening",
      "You're trying to care for a new person while not being able to care for yourself",
      "You want support that takes what you're going through seriously without judgment",
    ],
    faqs: [
      { q: "Is EMDR safe in the postpartum period?", a: "Yes. EMDR is considered safe and effective for postpartum depression, anxiety, and birth trauma. We take particular care with pacing and stabilization — the postpartum period carries a lot, and we don't add to the burden. The work is adapted to where you are physically, emotionally, and logistically." },
      { q: "What if my main struggle is birth trauma, not depression?", a: "Birth trauma is a specific and real form of trauma that EMDR addresses very effectively. Fear during delivery, loss of control, medical complications, or the gap between what you hoped for and what happened — these are all treatable with EMDR. Many clients find significant relief in just a few sessions targeting the birth experience." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can I do telehealth sessions with a baby at home?", a: "Yes — and telehealth is often the only practical option for new parents. We can be flexible about scheduling, and you don't have to arrange childcare or leave the house. The clinical work is the same. You just need a private space for the session itself, even if that's a bedroom or a parked car." },
    ],
  },
  "emdr-for-prenatal-mental-health": {
    isForYou: [
      "You're pregnant and experiencing anxiety, depression, or fear that feels like more than normal nerves",
      "Past trauma, loss, or difficult pregnancy experiences are affecting this pregnancy",
      "You're worried about your capacity to parent or about repeating patterns from your own childhood",
      "The enormity of what's coming is activating things you haven't fully dealt with",
      "You want support during pregnancy that takes your mental health as seriously as your physical health",
      "You're ready to address this now rather than waiting until after the birth",
    ],
    faqs: [
      { q: "Is EMDR safe during pregnancy?", a: "Yes. EMDR is a non-pharmacological intervention with no known risks during pregnancy. Many pregnant clients find it particularly valuable precisely because it doesn't involve medication. We adapt the approach as needed — including modifications to the bilateral stimulation — to ensure you're comfortable throughout." },
      { q: "Can EMDR help with fear of childbirth?", a: "Yes — this is called tokophobia in clinical terms, and EMDR addresses it effectively. Whether the fear is rooted in a previous birth experience, a specific fear of pain or loss of control, or older experiences, EMDR targets the specific memories and beliefs driving the fear and can significantly reduce it before delivery." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What if I had a previous pregnancy loss — can EMDR help with that?", a: "Yes. Pregnancy loss — miscarriage, stillbirth, or termination — can be profoundly traumatic, and the grief and fear it produces often intensifies in subsequent pregnancies. EMDR can process the loss itself as well as the anxiety it generates in the current pregnancy, helping you be more present for what's happening now." },
    ],
  },
  "emdr-therapy-for-men": {
    isForYou: [
      "You've been carrying something for a long time and you're tired of it",
      "Talking about feelings in an open-ended way sounds unappealing — you want something structured and direct",
      "You're high-functioning but something is affecting you more than you let on",
      "You've resisted therapy because it seemed designed for a different kind of person",
      "You don't need someone to tell you your feelings are valid — you need something that actually works",
      "You're ready to deal with this efficiently and get on with your life",
    ],
    faqs: [
      { q: "Why does EMDR resonate with men who haven't benefited from talk therapy?", a: "EMDR is structured and target-focused — you're not expected to free-associate or process out loud for an hour. The bilateral stimulation does much of the work internally. Many men find this more compatible with how they approach problems in other areas of their lives: identify what needs to be addressed, apply an effective method, assess the result. Less talking, more processing." },
      { q: "Do I have to talk about my feelings extensively?", a: "No. EMDR doesn't require extended verbal processing of emotions. You hold the target in mind during the bilateral stimulation — the processing is largely internal. You share what's useful for the work, but there's no requirement to narrate your emotional experience at length." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "What do men typically bring to EMDR?", a: "The range is broad: trauma (combat, accidents, childhood, first responder work), anxiety and anger that feels out of proportion to situations, relationship difficulties, burnout, depression that's been masked by overwork, and the particular weight of feeling like you're not allowed to struggle. Many men come in with one presenting concern and discover that what's underneath it is something they've been carrying for decades." },
    ],
  },
  "emdr-therapy-for-adults": {
    isForYou: [
      "You're an adult carrying the weight of experiences — past or present — that are affecting your life",
      "You've considered therapy but weren't sure what approach would actually help",
      "Something has shifted recently that made you realize you don't want to keep going the way you've been going",
      "You're ready for an evidence-based approach that goes deeper than coping strategies",
      "You want to work with a therapist who takes your time seriously and knows what they're doing",
      "You're ready to actually address what's getting in the way",
    ],
    faqs: [
      { q: "What kinds of issues does EMDR address?", a: "EMDR was originally developed for trauma and PTSD, but its applications have expanded significantly. I use EMDR to address trauma of all kinds, anxiety, depression, grief, burnout, negative core beliefs, phobias, relationship patterns, shame, and the aftermath of difficult life experiences. If something from the past is affecting your present, EMDR is likely relevant." },
      { q: "How is EMDR different from regular therapy?", a: "Regular talk therapy works primarily through insight, narrative, and the therapeutic relationship. EMDR adds a processing component — bilateral stimulation — that directly targets how memories and beliefs are stored in the nervous system. For many people, EMDR reaches things that years of talk therapy couldn't, because it operates at a different level." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How do I know if EMDR is right for me?", a: "The free 15-minute consultation is designed to answer exactly this question. We talk about what's going on and whether EMDR is a good fit. I'll be honest with you if I think a different approach would serve you better. There's no pressure and no obligation." },
    ],
  },
  "emdr-vs-talk-therapy": {
    isForYou: [
      "You've done talk therapy and found it helpful but incomplete — something still feels stuck",
      "You want to understand what EMDR actually does differently before committing to it",
      "You've heard that EMDR is more efficient and want to know if that's true",
      "You have something specific — a trauma, a belief, a pattern — that talk therapy hasn't resolved",
      "You're not opposed to talk therapy, you just want to know if there's something better for your situation",
      "You're ready to make an informed decision about what kind of help to seek",
    ],
    faqs: [
      { q: "Does EMDR replace talk therapy or complement it?", a: "Both, depending on the situation. EMDR integrates talking — history-taking, case conceptualization, processing what comes up. But it adds a processing component that talk therapy doesn't have. For some people, EMDR is their primary modality. For others, it's used in combination with ongoing talk therapy. I integrate EMDR within a broader therapeutic relationship, not as a standalone protocol." },
      { q: "Is EMDR better than talk therapy?", a: "For trauma, the evidence strongly favors EMDR — it's consistently faster and produces comparable or superior outcomes. For other presentations, the comparison is more nuanced. EMDR reaches certain things that talk therapy can't, but talk therapy reaches things that EMDR doesn't. The right approach depends on what you're working on and what your history is." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How long does EMDR take compared to talk therapy?", a: "For specific traumas or phobias, EMDR is typically significantly faster — weeks to months rather than years. For more complex presentations, the timelines are more comparable. The efficiency of EMDR comes from its ability to produce change at the level of memory storage rather than just insight and understanding." },
    ],
  },
  "emdr-vs-cbt": {
    isForYou: [
      "You've tried CBT and found it helpful but incomplete — the thoughts changed but something else didn't",
      "You want to understand what EMDR does that CBT doesn't before deciding",
      "You've heard that EMDR works at a deeper level and want to know if that's true",
      "Something specific — a trauma, a phobia, a core belief — hasn't responded to cognitive approaches",
      "You're not opposed to CBT, you just want to know if there's something more appropriate for your situation",
      "You're ready to make an informed decision about your care",
    ],
    faqs: [
      { q: "What does EMDR do that CBT can't?", a: "CBT works at the level of cognition — it identifies distorted thoughts and replaces them with more accurate ones. EMDR works at the level of memory storage — it targets how experiences are encoded in the nervous system. For many people, changing the thought isn't enough because the belief isn't primarily cognitive. EMDR reaches the body-level encoding that CBT doesn't address." },
      { q: "Is EMDR evidence-based like CBT?", a: "Yes. EMDR has a robust evidence base — it's recognized by the WHO, APA, VA, and American Psychiatric Association. For PTSD specifically, EMDR has comparable or superior outcomes to trauma-focused CBT in the research literature, and typically in fewer sessions." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "Can I do EMDR if I've already done a lot of CBT?", a: "Absolutely — and many clients come to EMDR after significant CBT work. The cognitive understanding they've developed through CBT often enhances the EMDR work. They arrive knowing their patterns and beliefs; EMDR addresses the level underneath that CBT didn't reach." },
    ],
  },
  "what-to-expect-in-emdr": {
    isForYou: [
      "You're curious about EMDR but don't know enough about it to decide if it's right for you",
      "You've heard it's effective but the description sounds strange and you want it demystified",
      "You want to know what actually happens in a session before committing to one",
      "You're worried it will feel overwhelming or out of control",
      "You want honest information, not marketing language",
      "You're ready to make an informed decision",
    ],
    faqs: [
      { q: "What actually happens during an EMDR session?", a: "After history-taking and preparation in early sessions, an active EMDR session involves: identifying a specific memory or target; noticing the associated image, belief, emotion, and body sensation; and then engaging in bilateral stimulation — typically following a moving dot on the screen with your eyes — while holding the target in mind. The processing happens during the sets of bilateral stimulation. Between sets, you briefly report what's coming up. The therapist guides the direction based on what you share." },
      { q: "Is EMDR like hypnosis?", a: "No. You are fully conscious and in control throughout. You're not in a trance, you're not told what to think or feel, and you can stop at any point. The bilateral stimulation facilitates the brain's natural processing mechanism — it doesn't put you under or make you suggestible. Many people are surprised by how present and aware they feel during EMDR." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How will I know if EMDR is working?", a: "The most common sign is that the memory loses its charge — it can still be recalled, but it no longer produces the same emotional or physical intensity. Negative beliefs shift: 'I am not safe' becomes genuinely less true-feeling, not just intellectually challenged. Most people notice this shift happening during sessions, not just in retrospect." },
    ],
  },
};

// Inject condition-specific data
SEO_CONDITIONS.forEach(p => {
  const data = CONDITION_DATA[p.slug];
  if (data) {
    p.isForYou = data.isForYou;
    p.faqs = data.faqs;
  } else {
    // Fallback for any missing
    p.isForYou = [
      "You've tried other approaches and something is still stuck",
      "It's showing up in your body, your relationships, or your ability to be present",
      "You're ready for an evidence-based approach that goes deeper than coping strategies",
      "You don't want to spend years in therapy to feel meaningfully different",
      "You want to work with someone who knows what they're doing",
      "You're ready to actually address what's getting in the way",
    ];
    p.faqs = [
      { q: "Do I have to describe everything in detail?", a: "No. EMDR does not require you to narrate or retell your experiences at length. The processing happens internally during the bilateral stimulation. You share what's useful for the work — nothing more." },
      { q: "How is EMDR different from talk therapy?", a: "Talk therapy works through insight and narrative. EMDR adds bilateral stimulation that directly targets how memories and beliefs are stored in the nervous system. For many people, EMDR reaches things that talk therapy couldn't, because it operates at a different level." },
      { q: "Will EMDR make me feel worse before I feel better?", a: "Sometimes, briefly — and it's worth being honest about that. Processing difficult memories can stir things up between sessions. Most people describe it as feeling tired or emotionally tender for a day or two. This is normal and typically settles quickly. We build stabilization skills before any processing begins specifically so you have tools to manage this." },
      { q: "How long does it take to see results?", a: "It depends on what we're working on. Some focused issues resolve in 6–12 sessions. Complex or longstanding patterns take longer. I'll be honest with you about what I'm seeing as we go and won't keep you in therapy longer than you need to be." },
    ];
  }
});

const SEO_STYLES = `
  .seo-page { min-height:100vh; background:var(--ink); color:var(--text); font-family:'Jost',sans-serif; }
  .seo-nav { position:sticky; top:0; z-index:50; padding:18px 60px; display:flex; justify-content:space-between; align-items:center; background:var(--nav-bg); border-bottom:1px solid var(--border); backdrop-filter:blur(8px); }
  .seo-logo { text-decoration:none; }
  .seo-logo-name { font-family:'Playfair Display',serif; font-size:15px; color:var(--gold); letter-spacing:0.02em; }
  .seo-logo-sub { font-size:10px; color:var(--muted); letter-spacing:0.12em; text-transform:uppercase; margin-top:2px; font-weight:300; }
  .seo-hero { padding:80px 60px 72px; max-width:900px; margin:0 auto; border-bottom:1px solid var(--border); }
  .seo-eyebrow { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:var(--gold); margin-bottom:20px; display:flex; align-items:center; gap:14px; }
  .seo-eyebrow::before { content:''; display:inline-block; width:32px; height:1px; background:var(--gold); flex-shrink:0; }
  .seo-h1 { font-family:'Playfair Display',serif; font-size:52px; font-weight:400; line-height:1.07; color:var(--text); margin-bottom:24px; }
  .seo-h1 em { font-style:italic; color:var(--gold); }
  .seo-hero-sub { font-size:17px; line-height:1.78; color:var(--muted); font-weight:300; max-width:640px; margin-bottom:16px; }
  .seo-hero-meta { font-size:12px; color:var(--gold); letter-spacing:0.05em; margin-bottom:36px; display:flex; gap:20px; flex-wrap:wrap; opacity:0.85; }
  .seo-section { padding:72px 60px; max-width:900px; margin:0 auto; border-bottom:1px solid var(--border); }
  .seo-section.alt { background:var(--ink2); }
  .seo-h2 { font-family:'Playfair Display',serif; font-size:38px; font-weight:400; line-height:1.1; color:var(--text); margin-bottom:40px; }
  .seo-h2 em { font-style:italic; color:var(--gold); }
  .seo-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; }
  .seo-grid-item { padding:24px 28px; border-top:1px solid var(--border); display:flex; gap:16px; align-items:flex-start; }
  .seo-grid-item:nth-child(odd) { border-right:1px solid var(--border); }
  .seo-arrow { color:var(--gold); font-size:15px; margin-top:2px; flex-shrink:0; }
  .seo-grid-text { font-size:15px; line-height:1.7; color:var(--text); font-weight:300; margin:0; }
  .seo-cta-inline { margin-top:40px; padding-top:32px; border-top:1px solid var(--border); display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
  .seo-cta-note { font-size:12px; color:var(--muted); font-weight:300; }
  .seo-steps { display:flex; flex-direction:column; }
  .seo-step { display:grid; grid-template-columns:80px 1fr; border-top:1px solid var(--border); padding:32px 0; }
  .seo-step-num { font-family:'Playfair Display',serif; font-size:32px; color:var(--gold); opacity:0.35; line-height:1; }
  .seo-step-title { font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:var(--text); margin-bottom:10px; }
  .seo-step-body { font-size:15px; line-height:1.75; color:var(--muted); font-weight:300; margin:0; }
  .seo-about-grid { display:grid; grid-template-columns:300px 1fr; gap:56px; align-items:start; }
  .seo-about-img { width:100%; display:block; object-fit:cover; object-position:center 15%; min-height:360px; }
  .seo-about-body p { font-size:15px; line-height:1.8; color:var(--muted); font-weight:300; margin-bottom:14px; }
  .seo-about-body p strong { color:var(--text); font-weight:500; }
  .seo-pills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
  .seo-pill { font-size:11px; padding:5px 12px; border:1px solid var(--border); color:var(--muted); letter-spacing:0.04em; }
  .seo-rates { border:1px solid var(--border); padding:20px 24px; margin-bottom:24px; }
  .seo-rates-row { display:flex; justify-content:space-between; align-items:baseline; padding:10px 0; border-bottom:1px solid var(--border); }
  .seo-rates-row:last-of-type { border-bottom:none; }
  .seo-rates-label { font-size:13px; color:var(--muted); font-weight:300; }
  .seo-rates-price { font-family:'Playfair Display',serif; font-size:20px; color:var(--text); }
  .seo-rates-note { font-size:11px; color:var(--muted); line-height:1.6; margin:12px 0 0; font-weight:300; }
  .seo-faq-item { border-top:1px solid var(--border); }
  .seo-faq-btn { width:100%; text-align:left; padding:22px 0; display:flex; justify-content:space-between; align-items:center; background:none; border:none; cursor:pointer; }
  .seo-faq-q { font-size:16px; font-weight:400; color:var(--text); line-height:1.4; padding-right:24px; font-family:'Jost',sans-serif; }
  .seo-faq-icon { color:var(--gold); font-size:20px; flex-shrink:0; font-weight:300; transition:transform 0.2s; }
  .seo-faq-a { padding-bottom:24px; font-size:15px; line-height:1.8; color:var(--muted); font-weight:300; max-width:640px; }
  .seo-booking { padding:80px 60px; background:#3D2D26; text-align:center; }
  .seo-booking h2 { font-family:'Playfair Display',serif; font-size:42px; font-weight:400; color:#FAF7F4; margin-bottom:16px; line-height:1.1; }
  .seo-booking h2 em { color:#C9967E; font-style:italic; }
  .seo-booking p { font-size:16px; color:rgba(250,247,244,0.65); font-weight:300; margin:0 auto 36px; max-width:480px; line-height:1.7; }
  .seo-booking-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:28px; }
  .seo-booking-contacts { display:flex; gap:28px; justify-content:center; flex-wrap:wrap; }
  .seo-booking-contact { font-size:13px; color:rgba(250,247,244,0.45); text-decoration:none; letter-spacing:0.04em; }
  .seo-booking-contact:hover { color:rgba(250,247,244,0.7); }
  .seo-footer { padding:32px 60px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
  .seo-footer-note { font-size:11px; color:var(--muted); max-width:400px; line-height:1.6; margin:0; }
  .seo-footer-back { font-size:12px; color:var(--gold); text-decoration:none; }
  .seo-crisis { background:var(--ink2); border-top:1px solid var(--border); padding:12px 60px; text-align:center; font-size:11px; color:var(--muted); }
  .seo-crisis strong { color:var(--text); }
  .btn-seo-gold { background:var(--gold); color:white; padding:14px 36px; font-family:'Jost',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none; display:inline-block; border:none; cursor:pointer; transition:background 0.2s; }
  .btn-seo-gold:hover { background:var(--gold-light); }
  .btn-seo-gold-lg { padding:16px 44px; font-size:13px; }
  @media(max-width:768px){
    .seo-nav{padding:16px 24px;}
    .seo-hero{padding:60px 24px 56px;}
    .seo-h1{font-size:36px;}
    .seo-section{padding:56px 24px;}
    .seo-grid{grid-template-columns:1fr;}
    .seo-grid-item:nth-child(odd){border-right:none;}
    .seo-about-grid{grid-template-columns:1fr;}
    .seo-booking{padding:56px 24px;}
    .seo-footer{padding:28px 24px;flex-direction:column;align-items:flex-start;}
    .seo-crisis{padding:12px 24px;}
  }
`;

const SEO_STEPS = [
  { num: "01", title: "Free 15-min consultation", body: "We talk briefly about what's going on and whether EMDR is a good fit. No forms, no intake paperwork yet — just a real conversation. You can ask anything." },
  { num: "02", title: "History & preparation", body: "The first full sessions are about understanding your history and building the stabilization skills you'll need. No processing happens until you feel ready and grounded." },
  { num: "03", title: "Active processing", body: "We target specific memories and beliefs using bilateral stimulation. Sessions are 45 or 60 minutes, via video. Most people notice real shifts within a handful of sessions." },
];

function SEONav({ bookingUrl }) {
  return (
    <nav className="seo-nav">
      <a href="/" className="seo-logo">
        <div className="seo-logo-name">EMDR Therapy Bay Area</div>
        <div className="seo-logo-sub">Marcus Ghiasi, LMFT</div>
      </a>
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Book a free consult</a>
    </nav>
  );
}

function SEOIsItRight({ items }) {
  return (
    <section className="seo-section">
      <div className="seo-eyebrow">Is this right for you?</div>
      <h2 className="seo-h2">You might be a good fit <em>if...</em></h2>
      <div className="seo-grid">
        {items.map((item, i) => (
          <div className="seo-grid-item" key={i}>
            <span className="seo-arrow">→</span>
            <p className="seo-grid-text">{item}</p>
          </div>
        ))}
      </div>
      <div className="seo-cta-inline">
        <a href="https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1" target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Schedule a free 15-min consultation</a>
        <span className="seo-cta-note">No obligation. Takes 2 minutes to book.</span>
      </div>
    </section>
  );
}

function SEOWhatToExpect() {
  return (
    <section className="seo-section alt">
      <div className="seo-eyebrow">What to expect</div>
      <h2 className="seo-h2">Three steps, <em>no surprises.</em></h2>
      <div className="seo-steps">
        {SEO_STEPS.map(s => (
          <div className="seo-step" key={s.num}>
            <div className="seo-step-num">{s.num}</div>
            <div>
              <div className="seo-step-title">{s.title}</div>
              <p className="seo-step-body">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SEOAbout({ locationPhrase }) {
  useEffect(() => {
    const existing = document.getElementById("pt-badge-script-seo");
    if (existing) return;
    const script = document.createElement("script");
    script.id = "pt-badge-script-seo";
    script.src = "https://member.psychologytoday.com/verified-seal.js";
    script.setAttribute("data-badge", "13");
    script.setAttribute("data-id", "1134128");
    script.setAttribute("data-code", "aHR0cHM6Ly93d3cucHN5Y2hvbG9neXRvZGF5LmNvbS9hcGkvdmVyaWZpZWQtc2VhbC9zZWFscy8xMy9wcm9maWxlLzExMzQxMjg/Y2FsbGJhY2s9c3hjYWxsYmFjaw==");
    document.body.appendChild(script);
    return () => {
      const s = document.getElementById("pt-badge-script-seo");
      if (s) document.body.removeChild(s);
    };
  }, []);

  return (
    <section className="seo-section">
      <div className="seo-eyebrow">About</div>
      <h2 className="seo-h2">Marcus <em>Ghiasi,</em> LMFT</h2>
      <div className="seo-about-grid">
        <div>
          <img src="/marcus.jpg" alt="Marcus Ghiasi, LMFT" width="400" height="533" loading="lazy" className="seo-about-img" />
        </div>
        <div className="seo-about-body">
          <p>I&apos;m a licensed Marriage and Family Therapist (LMFT #158475) and the founder of <strong>Bayside Wellness &amp; Counseling</strong>, based in Oakland. I&apos;ve been doing this work for over 10 years.</p>
          <p>I specialize in EMDR because I&apos;ve seen it create change that talk therapy alone couldn&apos;t reach — and I work entirely via telehealth so I can see clients {locationPhrase || "throughout California"}.</p>
          <div className="seo-pills">
            {["LMFT #158475","EMDRIA Trained","MA — USF","BA — SF State","10+ Years","Telehealth CA"].map(c => (
              <span key={c} className="seo-pill">{c}</span>
            ))}
          </div>
          <div className="seo-rates">
            <div className="seo-rates-row"><span className="seo-rates-label">45-minute session</span><span className="seo-rates-price">$240</span></div>
            <div className="seo-rates-row"><span className="seo-rates-label">60-minute session</span><span className="seo-rates-price">$320</span></div>
            <p className="seo-rates-note">Private pay. Superbill provided — many PPO clients recoup a portion through out-of-network benefits. HSA/FSA accepted.</p>
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", marginTop: "24px" }}>
            <a href="https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1" target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Book a free consultation</a>
            <div className="sxc-profile" data-badge="13" data-id="1134128" style={{ display: "inline-block" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SEOFaq({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="seo-section">
      <div className="seo-eyebrow">Common questions</div>
      <h2 className="seo-h2">Before you <em>reach out.</em></h2>
      <div>
        {faqs.map((faq, i) => (
          <div className="seo-faq-item" key={i}>
            <button className="seo-faq-btn" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <span className="seo-faq-q">{faq.q}</span>
              <span className="seo-faq-icon" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {open === i && <div className="seo-faq-a">{faq.a}</div>}
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}

function SEOBooking() {
  return (
    <div className="seo-booking">
      <h2>Ready to <em>begin?</em></h2>
      <p>The first step is a free 15-minute consultation. No forms, no pressure — just a real conversation about whether this is the right fit.</p>
      <div className="seo-booking-btns">
        <a href="https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1" target="_blank" rel="noopener noreferrer" className="btn-seo-gold btn-seo-gold-lg">Book your free consultation</a>
      </div>
      <div className="seo-booking-contacts">
        <a href="tel:4158575799" className="seo-booking-contact">(415) 857-5799</a>
        <span style={{ color: "rgba(250,247,244,0.2)" }}>·</span>
        <a href="mailto:hello@baysidewellnessandcounseling.com" className="seo-booking-contact">hello@baysidewellnessandcounseling.com</a>
      </div>
    </div>
  );
}

function SEOFooter({ locationPhrase }) {
  return (
    <>
      <footer className="seo-footer">
        <a href="/" className="seo-logo">
          <div className="seo-logo-name">EMDR Therapy Bay Area</div>
          <div className="seo-logo-sub">Marcus Ghiasi, LMFT · (415) 857-5799</div>
        </a>
        <p className="seo-footer-note">Licensed LMFT in California (#158475). Telehealth practice{locationPhrase ? ` serving clients ${locationPhrase}` : " serving clients throughout California"}. Part of Bayside Wellness &amp; Counseling, 2323 Broadway, Oakland CA 94612.</p>
        <a href="/" className="seo-footer-back">← Main site</a>
      </footer>
      <div className="seo-crisis">
        <strong>In crisis?</strong> Call or text <strong>988</strong> — Suicide &amp; Crisis Lifeline, free &amp; confidential, 24/7.
      </div>
    </>
  );
}

function SEOLocationPage({ data, bookingUrl }) {
  const { city, region, isOnline, isForYou, faqs, slug } = data;
  const locationPhrase = isOnline ? "throughout California" : `in ${city} and ${region}`;
  const locationPhraseShort = isOnline ? "California" : `${city}, CA`;

  const pageTitle = `EMDR Therapy ${isOnline ? "Online" : `in ${city}`} | Marcus Ghiasi, LMFT`;
  const pageDesc = `EMDR therapy ${locationPhrase}. Marcus Ghiasi, LMFT #158475 — trauma, anxiety, depression, grief. Telehealth. Free 15-min consultation.`;
  const pageUrl = `https://emdrtherapybayarea.com/${slug}`;
  const robotsContent = data.noindex ? "noindex, nofollow" : "index, follow";

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": `EMDR Therapy ${locationPhraseShort} — Marcus Ghiasi, LMFT`,
    "url": pageUrl,
    "telephone": "(415) 857-5799",
    "areaServed": locationPhraseShort,
    "medicalSpecialty": "EMDR Therapy"
  };

  return (
    <div className="seo-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content={robotsContent} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <SEONav bookingUrl={bookingUrl} />
      <div className="seo-hero">
        <div className="seo-eyebrow">EMDR Therapy · {locationPhraseShort} · Telehealth</div>
        <h1 className="seo-h1">
          EMDR Therapy<br />
          {isOnline ? <em>Online in California</em> : <><em>in {city}</em> — via telehealth</>}
        </h1>
        <p className="seo-hero-sub">I&apos;m Marcus Ghiasi, a licensed Marriage and Family Therapist specializing in EMDR for trauma, anxiety, depression, and grief. I work entirely via telehealth — which means I can see clients {locationPhrase} without anyone having to drive to an office.</p>
        <div className="seo-hero-meta">
          <span>LMFT #158475</span><span>·</span>
          <span>EMDR Trained</span><span>·</span>
          <span>10+ years experience</span><span>·</span>
          <span>Free 15-min consult</span>
        </div>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Book a free consultation →</a>
      </div>
      <SEOIsItRight items={isForYou || []} />
      <SEOWhatToExpect />
      <SEOAbout locationPhrase={locationPhrase} />
      <SEOFaq faqs={faqs || []} />
      <section className="seo-section">
        <div className="seo-eyebrow">What I treat</div>
        <h2 className="seo-h2">EMDR for a range of <em>concerns.</em></h2>
        <p style={{ fontSize: "15px", lineHeight: "1.8", color: "var(--muted)", fontWeight: 300, marginBottom: "28px" }}>
          EMDR is effective for trauma, anxiety, depression, grief, and much more. All sessions via telehealth.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[
            ["Trauma & PTSD", "emdr-for-trauma"],
            ["Anxiety", "emdr-for-anxiety"],
            ["Depression", "emdr-for-depression"],
            ["Grief & Loss", "emdr-for-grief"],
            ["Burnout", "emdr-for-burnout"],
            ["Relationship Trauma", "emdr-for-relationship-trauma"],
            ["Shame", "emdr-for-shame"],
            ["Life Transitions", "emdr-for-life-transitions"],
          ].map(([label, condSlug]) => (
            <a key={condSlug} href={`/${condSlug}`} style={{ fontSize: "12px", padding: "6px 14px", border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.04em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
              {label}
            </a>
          ))}
        </div>
      </section>
      <SEOBooking />
      <SEOFooter locationPhrase={locationPhrase} />
    </div>
  );
}

function SEOConditionPage({ data, bookingUrl }) {
  const { title, condition, category, intro, isForYou, faqs, slug } = data;

  const pageTitle = `${title} | Marcus Ghiasi, LMFT — Bay Area`;
  const pageDesc = `${title} via telehealth throughout California. Marcus Ghiasi, LMFT #158475 — evidence-based EMDR therapy. Free 15-min consultation.`;
  const pageUrl = `https://emdrtherapybayarea.com/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": title,
    "url": pageUrl,
    "provider": {
      "@type": "Person",
      "name": "Marcus Ghiasi",
      "jobTitle": "Licensed Marriage and Family Therapist"
    }
  };

  return (
    <div className="seo-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <SEONav bookingUrl={bookingUrl} />
      <div className="seo-hero">
        <div className="seo-eyebrow">{category} · Telehealth · California-wide</div>
        <h1 className="seo-h1">{title}</h1>
        <p className="seo-hero-sub">{intro}</p>
        <div className="seo-hero-meta">
          <span>LMFT #158475</span><span>·</span>
          <span>EMDR Trained</span><span>·</span>
          <span>10+ years experience</span><span>·</span>
          <span>Free 15-min consult</span>
        </div>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Book a free consultation →</a>
      </div>
      <SEOIsItRight items={isForYou || []} />
      <SEOWhatToExpect />
      <SEOAbout locationPhrase="throughout California" />
      <SEOFaq faqs={faqs || []} />
      <section className="seo-section">
        <div className="seo-eyebrow">Service areas</div>
        <h2 className="seo-h2">Serving clients <em>throughout the Bay Area.</em></h2>
        <p style={{ fontSize: "15px", lineHeight: "1.8", color: "var(--muted)", fontWeight: 300, marginBottom: "28px" }}>
          All sessions via telehealth. Available to clients throughout California, with a concentration in the Bay Area.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[
            ["Oakland", "emdr-therapy-oakland"],
            ["San Francisco", "emdr-therapy-san-francisco"],
            ["Berkeley", "emdr-therapy-berkeley"],
            ["Marin County", "emdr-therapy-marin-county"],
            ["San Jose", "emdr-therapy-san-jose"],
            ["Palo Alto", "emdr-therapy-palo-alto"],
            ["Walnut Creek", "emdr-therapy-walnut-creek"],
            ["Pleasanton", "emdr-therapy-pleasanton"],
          ].map(([city, slug]) => (
            <a key={slug} href={`/${slug}`} style={{ fontSize: "12px", padding: "6px 14px", border: "1px solid var(--border)", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.04em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
              {city}
            </a>
          ))}
        </div>
      </section>
      <SEOBooking />
      <SEOFooter />
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

const fonts = ``; // Fonts loaded via index.html for better performance

const styles = `
  :root {
    --ink: #FAF7F4;
    --ink2: #F3EDE6;
    --gold: #B8826A;
    --gold-light: #C9967E;
    --text: #3D2D26;
    --muted: #6B5448;
    --border: rgba(184,130,106,0.22);
    --nav-bg: rgba(250,247,244,0.97);
    --form-bg: rgba(255,255,255,0.8);
    --transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  [data-theme="dark"] {
    --ink: #1A1614;
    --ink2: #221E1B;
    --gold: #C9967E;
    --gold-light: #D9AA96;
    --text: #EDE8E3;
    --muted: #A89080;
    --border: rgba(201,150,126,0.18);
    --nav-bg: rgba(26,22,20,0.97);
    --form-bg: rgba(255,255,255,0.06);
  }

  .skip-link {
    position: absolute;
    top: -100px;
    left: 24px;
    background: var(--gold);
    color: white;
    padding: 12px 24px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-decoration: none;
    z-index: 999;
    transition: top 0.2s;
  }
  .skip-link:focus { top: 24px; }

  *:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--ink); color: var(--text); font-family: 'Jost', sans-serif; transition: var(--transition); }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    padding: 24px 60px;
    display: flex; justify-content: space-between; align-items: center;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border);
    transition: var(--transition);
  }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 400; color: var(--gold); letter-spacing: 0.03em; line-height: 1.2; text-decoration: none; display: block; }
  .nav-logo span { display: block; font-size: 11px; letter-spacing: 0.12em; opacity: 0.7; margin-top: 2px; font-family: 'Jost', sans-serif; font-weight: 300; color: var(--text); }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-links { display: flex; gap: 36px; }
  .nav-links a { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text); opacity: 0.6; text-decoration: none; transition: opacity 0.2s; }
  .nav-links a:hover { opacity: 1; }
  .nav-cta { background: none; border: 1px solid var(--gold); color: var(--gold); padding: 10px 24px; font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .nav-cta:hover { background: var(--gold); color: white; }

  .dark-toggle {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    flex-shrink: 0;
  }
  .toggle-label {
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
    user-select: none;
  }
  .toggle-track {
    width: 22px;
    height: 40px;
    border-radius: 11px;
    background: #d9c4b8;
    border: 1px solid var(--border);
    position: relative;
    transition: background 0.3s ease;
    flex-shrink: 0;
  }
  [data-theme="dark"] .toggle-track {
    background: var(--gold);
    border-color: var(--gold);
  }
  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.18);
    transition: transform 0.25s ease;
  }
  [data-theme="dark"] .toggle-thumb {
    transform: translateY(18px);
  }

  .hero { min-height: 100vh; display: flex; align-items: center; padding: 120px 60px 80px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(184,130,106,0.07) 0%, transparent 60%); }
  .hero-content { max-width: 580px; position: relative; z-index: 1; }
  .hero-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 28px; display: flex; align-items: center; gap: 14px; }
  .hero-eyebrow::before { content: ''; display: block; width: 40px; height: 1px; background: var(--gold); }
  h1 { font-family: 'Playfair Display', serif; font-size: 76px; font-weight: 400; line-height: 1.05; color: var(--text); margin-bottom: 28px; }
  h1 em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 17px; line-height: 1.75; color: var(--muted); font-weight: 300; max-width: 500px; margin-bottom: 52px; }
  .hero-actions { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; }
  .btn-gold { background: var(--gold); color: white; padding: 18px 40px; border: none; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; text-decoration: none; display: inline-block; }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-outline { background: none; border: 1px solid var(--border); color: var(--text); padding: 18px 40px; font-family: 'Jost', sans-serif; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
  .hero-right { position: absolute; right: 80px; top: 50%; transform: translateY(-50%); opacity: 0.2; }

  section { padding: 100px 60px; max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
  .section-label::before { content: ''; width: 28px; height: 1px; background: var(--gold); }
  h2 { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 400; line-height: 1.1; color: var(--text); margin-bottom: 24px; }
  h2 em { font-style: italic; color: var(--gold); }

  .emdr-grid { display: flex; flex-direction: column; gap: 60px; margin-top: 60px; }
  .emdr-text { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .emdr-text p { font-size: 16px; line-height: 1.85; color: var(--muted); font-weight: 300; margin-bottom: 16px; }
  .emdr-text p:last-child { margin-bottom: 0; }
  .emdr-text p strong { color: var(--text); font-weight: 500; }
  .emdr-phases { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
  .phase { padding: 28px 24px; border: 1px solid var(--border); background: rgba(184,130,106,0.03); transition: background 0.2s; }
  .phase:hover { background: rgba(184,130,106,0.08); }
  .phase-num { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--gold); opacity: 0.5; font-weight: 400; margin-bottom: 12px; }
  .phase-title { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text); margin-bottom: 8px; }
  .phase-desc { font-size: 12px; color: var(--muted); line-height: 1.6; font-weight: 300; }

  .right-for-me { background: var(--ink2); padding: 100px 0; transition: var(--transition); }
  .right-for-me > div { max-width: 1100px; margin: 0 auto; padding: 0 60px; }
  .conditions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 60px; }
  .condition-card { background: rgba(184,130,106,0.04); border: 1px solid var(--border); padding: 36px 32px; transition: all 0.25s; }
  .condition-card:hover { background: rgba(184,130,106,0.09); border-color: rgba(184,130,106,0.4); }
  .condition-marker { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); opacity: 0.6; margin-bottom: 20px; display: block; }
  .condition-name { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text); margin-bottom: 10px; }
  .condition-desc { font-size: 13px; color: var(--muted); line-height: 1.65; font-weight: 300; }

  .about-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 72px; align-items: stretch; }
  .about-left { display: flex; flex-direction: column; }
  .about-left img { width: 100%; flex: 1; object-fit: cover; object-position: center 20%; display: block; min-height: 0; }
  .credentials { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .credentials-mobile { display: none; }
  .cred-tag { font-size: 11px; color: var(--muted); padding: 5px 11px; border: 1px solid var(--border); letter-spacing: 0.03em; font-weight: 300; white-space: nowrap; }
  .about-content { display: flex; flex-direction: column; }
  .about-content h2 { margin-bottom: 32px; }
  .about-content p { font-size: 16px; line-height: 1.85; color: var(--muted); font-weight: 300; margin-bottom: 20px; }
  .about-content p:last-of-type { margin-bottom: 0; }
  .about-content p strong { color: var(--text); font-weight: 500; }
  .about-left-bottom { display: flex; flex-direction: column; }
  .pt-button-wrap { margin-top: 24px; }
  .pt-button-link { display: inline-flex; align-items: center; gap: 12px; border: 1px solid var(--border); padding: 16px 24px; color: var(--text); text-decoration: none; font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; transition: all 0.2s; }
  .pt-button-link:hover { border-color: var(--gold); color: var(--gold); }
  .pt-logo { width: 20px; height: 20px; opacity: 0.6; }

  .faq-list { margin-top: 60px; display: flex; flex-direction: column; }
  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-item:first-child { border-top: 1px solid var(--border); }
  .faq-q { width: 100%; background: none; border: none; padding: 28px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text); text-align: left; transition: color 0.2s; }
  .faq-q:hover { color: var(--gold); }
  .faq-icon { width: 28px; height: 28px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 16px; color: var(--gold); flex-shrink: 0; transition: transform 0.3s; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-a { padding: 0 0 28px; font-size: 15px; color: var(--muted); line-height: 1.8; font-weight: 300; max-width: 700px; }

  .contact-section { background: var(--ink2); padding: 100px 0; transition: var(--transition); }
  .contact-section > div { max-width: 1100px; margin: 0 auto; padding: 0 60px; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; margin-top: 60px; align-items: start; }
  .contact-info p { font-size: 15px; color: var(--muted); line-height: 1.8; font-weight: 300; margin-bottom: 28px; }
  .contact-detail { display: flex; flex-direction: column; gap: 16px; }
  .contact-detail-item { display: flex; flex-direction: column; gap: 4px; }
  .contact-detail-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); }
  .contact-detail-value { font-size: 14px; color: var(--text); }
  .form { display: flex; flex-direction: column; gap: 20px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-field { display: flex; flex-direction: column; gap: 8px; }
  .form-label { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
  .form-input, .form-textarea, .form-select { background: var(--form-bg); border: 1px solid var(--border); color: var(--text); padding: 16px 20px; font-family: 'Jost', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; width: 100%; }
  .form-input::placeholder, .form-textarea::placeholder { color: rgba(138,112,96,0.5); }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--gold); }
  .form-select { appearance: none; cursor: pointer; }
  .form-textarea { resize: vertical; min-height: 120px; }
  ._honeypot-field { opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1; }
  .form-error { font-size: 11px; color: #c0392b; margin-top: 4px; letter-spacing: 0.04em; }
  .form-input.error, .form-textarea.error { border-color: #c0392b; }
  .form-submit { background: var(--gold); color: white; padding: 18px 40px; border: none; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; align-self: flex-start; }
  .form-submit:hover { background: var(--gold-light); }
  .form-success { padding: 24px; border: 1px solid var(--gold); color: var(--gold); font-size: 15px; line-height: 1.6; font-weight: 300; }

  footer { padding: 48px 60px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; background: var(--ink); transition: var(--transition); }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--gold); line-height: 1.3; text-decoration: none; display: block; }
  .footer-logo span { display: block; font-size: 12px; opacity: 0.65; margin-top: 3px; font-family: 'Jost', sans-serif; font-weight: 300; color: var(--muted); }
  .footer-note { font-size: 12px; color: var(--muted); max-width: 400px; line-height: 1.6; }
  .crisis-bar { background: var(--ink2); border-top: 1px solid var(--border); padding: 16px 60px; text-align: center; font-size: 13px; color: var(--muted); transition: var(--transition); }
  .crisis-bar strong { color: var(--text); }

  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    z-index: 60;
  }
  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--text);
    transition: all 0.3s ease;
    transform-origin: center;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .mobile-menu {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--ink);
    z-index: 55;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    transition: var(--transition);
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 400;
    color: var(--text);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }
  .mobile-menu a:hover { color: var(--gold); }
  .mobile-menu .mobile-cta {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 14px 32px;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    nav { padding: 20px 24px; }
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
    .hero { padding: 100px 24px 60px; }
    h1 { font-size: 44px; }
    .hero-right { display: none; }
    section { padding: 70px 24px; }
    .emdr-text { grid-template-columns: 1fr; }
    .emdr-phases { grid-template-columns: 1fr 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .about-left-bottom { display: none; }
    .credentials-mobile { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
    .conditions-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 40px 24px; flex-direction: column; align-items: flex-start; }
    .right-for-me > div, .contact-section > div { padding: 0 24px; }
    .crisis-bar { padding: 16px 24px; }
  }
`;

const BOOKING_URL = "https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1";

const BLOG_POSTS = [
  {
    slug: "emdr-for-anxiety-how-it-works",
    title: "EMDR for Anxiety: How It Works and What to Expect",
    category: "Anxiety & EMDR",
    date: "May 4, 2026",
    image: "/blog-emdr-anxiety.jpg",
    excerpt: "Anxiety is not just a thought problem — it is a nervous system problem. That is why EMDR often reaches anxiety that CBT and other cognitive approaches could not. Here is how it works and what treatment actually looks like.",
    metaTitle: "EMDR for Anxiety: How It Works | EMDR Therapy Bay Area",
    metaDescription: "EMDR therapy for anxiety targets the root memories keeping your nervous system on alert — not just the thoughts they produce. Learn how it works and what to expect in treatment.",
    content: [
      { type: "p", text: "If you have been managing anxiety for a long time, you already know what the standard advice sounds like. Breathe. Challenge the thought. Notice the feeling without judgment. These tools are not useless — but for many people, they are not enough. The anxiety comes back. The body keeps bracing. The relief is temporary." },
      { type: "p", text: "The reason is not that you are doing it wrong. It is that most anxiety treatments are working at the level of the symptom rather than the source. EMDR therapy works differently. It goes to where anxiety actually lives — not in your thoughts, but in your nervous system — and addresses what is maintaining it at that level." },
      { type: "p", text: "This is why people who have done years of talk therapy or CBT for anxiety often experience something different with EMDR. Not just relief in the moment, but a shift in the underlying state. The alarm that has been running in the background of their lives begins, finally, to quiet." },
      { type: "h2", text: "Anxiety Is a Nervous System Problem, Not a Thinking Problem" },
      { type: "p", text: "Anxiety originates in the parts of the brain that govern survival — the limbic system and brainstem. These structures operate faster than conscious thought. They assess threat, mobilize the body, and fire the alarm before the rational mind has processed what is happening." },
      { type: "p", text: "When anxiety is chronic, it is usually because something taught the nervous system that danger was likely and that it needed to stay ready. The original experiences that set that threshold are stored in the body in a way that keeps them active — not as memories of things that happened, but as ongoing threat signals that have never fully resolved." },
      { type: "p", text: "Cognitive approaches work by changing how you think about the alarm. This is useful and genuinely helps many people. But changing the thought does not always change the alarm itself. The nervous system has its own logic, and it does not respond reliably to argument. EMDR works upstream — at the level of the stored experiences that are keeping the system on high alert." },
      { type: "h2", text: "What EMDR Targets in Anxiety Treatment" },
      { type: "p", text: "In EMDR therapy for anxiety, the work begins by identifying what is actually maintaining the anxious state. This means finding the specific memories, experiences, and accumulated moments that trained your nervous system to respond the way it does. Sometimes the connection is obvious. A specific humiliation, a period of chronic stress, an early environment where threat was real and unpredictable. Sometimes the connection only becomes clear through the processing itself." },
      { type: "p", text: "Once targets are identified, bilateral stimulation — alternating eye movements, tapping, or sound — creates the conditions for the nervous system to reprocess what it is holding. The goal is not to erase the memory or deny what happened. The goal is to change the charge the memory carries, so the nervous system can update its threat assessment and stop running a survival program that is no longer needed." },
      { type: "p", text: "For anxiety specifically, we often also use a technique called future template installation — working directly with the anticipated situations that trigger the most dread, so the nervous system begins to build a different response to them before they happen. This is one of the ways EMDR reaches not just the past but the anticipated future that anxiety is always catastrophizing about." },
      { type: "h2", text: "How EMDR for Anxiety Is Different from CBT" },
      { type: "p", text: "Cognitive behavioral therapy is the most widely studied treatment for anxiety, and for good reason — it works for a significant portion of people. It targets the thought patterns that anxiety produces and teaches skills for managing the physiological response. For many people, this is sufficient." },
      { type: "p", text: "EMDR and CBT are not opposites. They work at different levels. CBT works primarily at the level of cognition — identifying and restructuring the thoughts that anxiety generates. EMDR works at the level of memory storage — targeting the experiences that generated the thought patterns in the first place. For people whose anxiety has roots in specific experiences, or whose nervous system has not responded fully to cognitive approaches, EMDR often reaches what CBT could not." },
      { type: "p", text: "Many clients come to EMDR after significant CBT work. The insight they developed through CBT — the pattern recognition, the understanding of their triggers — often makes the EMDR more efficient. They arrive knowing the landscape. EMDR helps them change it." },
      { type: "h2", text: "What EMDR Treatment for Anxiety Actually Looks Like" },
      { type: "p", text: "EMDR follows an eight-phase protocol regardless of the presenting concern. For anxiety, the early phases focus on history-taking and preparation — mapping the specific experiences that are contributing to the anxiety and building the stabilization resources you will need to stay regulated during processing." },
      { type: "p", text: "The preparation phase is not waiting. It is the foundation that makes the deeper work safe enough to do. We do not move into active processing until you have the internal resources to stay grounded when difficult material surfaces." },
      { type: "p", text: "Active processing sessions involve identifying a specific memory or trigger, noticing what it activates in your body and your beliefs about yourself, and then engaging in bilateral stimulation while holding it in awareness. The processing happens internally — you do not need to narrate what happened in detail. Sessions are 45 or 60 minutes via telehealth." },
      { type: "h2", text: "How Long Does EMDR Take for Anxiety" },
      { type: "p", text: "For anxiety that is linked to specific experiences or a relatively defined set of memories, significant improvement often happens within 8 to 12 sessions. For anxiety that is more pervasive, rooted in a complex history, or connected to deeply held negative beliefs about the self, treatment takes longer." },
      { type: "p", text: "What tends to happen is that clients begin noticing shifts early — situations that were triggering a full stress response start to feel more manageable — and the changes accumulate over time. I am honest with clients about what I am seeing as we go and do not keep people in therapy longer than they need to be." },
      { type: "h2", text: "Is EMDR Right for Your Anxiety" },
      { type: "p", text: "EMDR for anxiety is most likely to be a good fit if your anxiety spikes in specific situations that you cannot fully control through cognitive tools alone, if it shows up as much in your body as in your thoughts, if there are experiences from your past that seem connected to how your nervous system responds today, or if you have done meaningful cognitive work and still feel like something underneath has not shifted." },
      { type: "p", text: "The free 15-minute consultation is designed to answer this question directly. We talk about what you are experiencing and whether EMDR is likely to be effective for your specific situation. If you are based in the Bay Area or anywhere in California, telehealth sessions are available on a schedule that works around your life." },
      { type: "p", text: "Anxiety does not have to be permanent. The nervous system can change. EMDR is one of the most direct paths to making that change happen." },
    ]
  },
  {
    slug: "what-is-complex-ptsd",
    title: "What Is Complex PTSD and How Is It Different from PTSD",
    category: "Trauma & PTSD",
    date: "April 27, 2026",
    image: "/blog-complex-ptsd.jpg",
    excerpt: "Complex PTSD develops from prolonged, repeated trauma — not a single event. It affects identity, relationships, and emotional regulation in ways that standard PTSD frameworks often miss. Here is what it actually is and what treatment looks like.",
    metaTitle: "What Is Complex PTSD and How Is It Different from PTSD | EMDR Therapy Bay Area",
    metaDescription: "Complex PTSD develops from chronic trauma and affects identity, self-worth, and relationships in ways PTSD doesn't fully capture. Learn the difference and what effective treatment looks like.",
    content: [
      { type: "p", text: "Many people who have experienced prolonged trauma find that the standard PTSD framework does not quite fit their experience. The flashbacks and hypervigilance are there, but so is something harder to name — a fractured sense of self, chronic shame, a difficulty trusting others that feels bone-deep, a relationship with their own emotions that swings between flooding and complete shutdown." },
      { type: "p", text: "What they are describing is often Complex PTSD, or C-PTSD. It is not a new discovery — clinicians have been observing this pattern for decades — but it has only recently received formal recognition as a distinct diagnosis. Understanding the difference between PTSD and C-PTSD matters because the two conditions, while related, require meaningfully different treatment approaches." },
      { type: "h2", text: "What Makes Trauma Complex" },
      { type: "p", text: "Standard PTSD typically develops in response to a specific traumatic event or a discrete series of events — a car accident, a combat experience, a sexual assault. The nervous system is overwhelmed by something sudden and devastating and fails to complete its normal processing cycle. The result is a set of symptoms: flashbacks, avoidance, hypervigilance, emotional numbing." },
      { type: "p", text: "Complex PTSD develops differently. It arises from prolonged, repeated trauma — often occurring over months or years, often in childhood, and often within relationships that the person depended on for survival or love. Abuse by a caregiver. Chronic emotional neglect. Growing up in a home where threat or unpredictability was the constant backdrop. Being trapped in a controlling or abusive relationship with no clear exit." },
      { type: "p", text: "The difference is not just in the severity of the trauma but in its nature. When trauma is relational, repeated, and inescapable, it does not just overwhelm the nervous system in a moment — it shapes it over time. The effects go deeper than the symptom picture of standard PTSD because the trauma occurred during the developmental periods when identity, attachment patterns, and emotional regulation were being formed." },
      { type: "h2", text: "How C-PTSD Presents Differently" },
      { type: "p", text: "People with C-PTSD often do experience the classic PTSD symptoms — intrusive memories, hypervigilance, avoidance. But they also contend with a broader set of effects that standard PTSD frameworks do not fully account for." },
      { type: "p", text: "Emotional dysregulation is one of the most defining features. The capacity to tolerate strong emotions without either being overwhelmed by them or shutting down completely is one of the things that gets disrupted by chronic early trauma. Many people with C-PTSD oscillate between emotional flooding — rage, terror, grief that feels uncontrollable — and a kind of emotional flatness or dissociation that protects against feeling anything at all." },
      { type: "p", text: "Distorted self-perception is another central feature. Chronic trauma, especially when it occurs in childhood at the hands of caregivers, installs beliefs about the self that are not conclusions the person reached — they are the water the person grew up swimming in. Beliefs like I am fundamentally flawed, I am unworthy of love, something is wrong with me that cannot be fixed. These beliefs are not primarily cognitive. They are felt in the body as a kind of bedrock reality." },
      { type: "p", text: "Relational difficulties are nearly universal in C-PTSD. When the earliest relationships were sources of threat rather than safety, the nervous system learns to anticipate danger in closeness. The result is attachment patterns that create suffering — chronic distrust, difficulty letting people in, the sense that intimacy inevitably leads to pain, or alternatively a pull toward people who recreate the familiar dynamics of early harm." },
      { type: "h2", text: "Why Standard PTSD Treatment Is Often Insufficient" },
      { type: "p", text: "Evidence-based treatments for PTSD — including EMDR and trauma-focused CBT — were originally developed and validated primarily for single-incident trauma. They work very well for what they were designed for. But applied without modification to complex trauma, they can move too fast, activate too much, and destabilize clients who do not yet have the internal resources to process what surfaces." },
      { type: "p", text: "This is one of the most common sources of disappointment in trauma treatment. Someone with C-PTSD begins a trauma-focused therapy, gets into processing before adequate stabilization has occurred, is overwhelmed by what comes up, and concludes that therapy made things worse or that they are beyond help. Neither is true. What happened is that the approach was not adapted to the complexity of what they were carrying." },
      { type: "h2", text: "How EMDR Approaches Complex Trauma" },
      { type: "p", text: "EMDR for C-PTSD is not the same as EMDR for single-incident trauma. The eight-phase protocol is the same, but the pacing is fundamentally different. With complex trauma, the preparation phase — building stabilization resources, developing the capacity to stay regulated during difficult material, establishing genuine safety in the therapeutic relationship — takes significantly longer. This is not delay. It is the treatment." },
      { type: "p", text: "Many people with C-PTSD find that the preparation work alone produces meaningful change. Learning to recognize and regulate their nervous system states, developing internal resources for managing overwhelming emotion, beginning to experience a therapeutic relationship that is consistent and safe — these are not preliminary steps toward the real work. They are the real work, and they build the foundation for what comes next." },
      { type: "p", text: "Active processing in C-PTSD treatment tends to begin with less activating material and move gradually toward the more charged experiences. The goal at every stage is to process within the window of tolerance — staying connected to what happened without being overwhelmed by it. A skilled EMDR therapist tracks this carefully and adjusts the pace in real time based on what the client's nervous system can hold." },
      { type: "h2", text: "How Long Does Treatment for C-PTSD Take" },
      { type: "p", text: "Longer than single-incident trauma, and it is worth being honest about that upfront. Treating C-PTSD is not a matter of resolving a discrete set of memories — it is a broader process of reorganizing the nervous system, updating deep beliefs about the self, and building new relational patterns. This takes time measured in months, not weeks." },
      { type: "p", text: "Progress tends to be cumulative and meaningful throughout. People notice shifts in how they relate to themselves and others, reductions in the intensity of emotional dysregulation, a growing capacity to tolerate intimacy and trust. The changes accumulate even before the deeper processing work is complete." },
      { type: "h2", text: "You Are Not Beyond Help" },
      { type: "p", text: "One of the most common things I hear from people with C-PTSD histories is that they have given up on treatment — that they tried therapy and it did not work, or that they believe their damage is too deep or too old to change. This belief is itself a product of the trauma. It is not accurate." },
      { type: "p", text: "The nervous system retains the capacity for change regardless of how long the patterns have been in place or how early they formed. What C-PTSD requires is not a more powerful intervention but a more carefully calibrated one — one that respects the complexity of what happened and builds the foundation before beginning to process it." },
      { type: "p", text: "If you are in the Bay Area or anywhere in California and recognize your experience in what is described here, a free 15-minute consultation is the right first step. We can talk about your history and what an approach adapted to complex trauma would actually look like for you." },
    ]
  },
  {
    slug: "emdr-vs-cbt-which-is-right",
    title: "EMDR vs CBT: Which Is Right for You",
    category: "EMDR Education",
    date: "April 20, 2026",
    image: "/blog-emdr-vs-cbt.jpg",
    excerpt: "Both EMDR and CBT are evidence-based and effective. But they work at different levels and are better suited to different presentations. Here is an honest comparison to help you figure out which one fits where you are.",
    metaTitle: "EMDR vs CBT: Which Is Right for You | EMDR Therapy Bay Area",
    metaDescription: "EMDR and CBT are both evidence-based therapies — but they work differently and suit different people. Here is an honest comparison to help you decide which approach fits your situation.",
    content: [
      { type: "p", text: "When people start researching therapy options, two names come up more than any others: CBT and EMDR. Both are described as evidence-based. Both have strong track records. Both are recommended by major health organizations. So which one is right for you?" },
      { type: "p", text: "The honest answer is that it depends on what you are dealing with and how you process. CBT and EMDR are not competing approaches — they operate at different levels of the psyche, and each is better suited to certain presentations than the other. Understanding the difference is one of the most useful things you can do before committing to a treatment approach." },
      { type: "h2", text: "How CBT Works" },
      { type: "p", text: "Cognitive behavioral therapy is built on the insight that thoughts, feelings, and behaviors are interconnected — and that changing how you think about a situation changes how you feel about it and how you respond to it. CBT teaches you to identify the thought patterns that are generating distress, examine whether they are accurate, and replace them with more balanced and realistic appraisals." },
      { type: "p", text: "CBT also includes behavioral components — exposure work for anxiety and phobias, behavioral activation for depression, skills training for emotional regulation and interpersonal effectiveness. It is structured, goal-oriented, and typically involves homework between sessions." },
      { type: "p", text: "The evidence base for CBT is extensive. It is the most researched form of psychotherapy in existence and has demonstrated effectiveness across a wide range of conditions including depression, anxiety disorders, OCD, and eating disorders. For many people, it is exactly the right tool." },
      { type: "h2", text: "How EMDR Works" },
      { type: "p", text: "EMDR — Eye Movement Desensitization and Reprocessing — works differently. Rather than targeting thought patterns directly, it targets the memories and experiences that generated those patterns in the first place. Using bilateral stimulation — alternating eye movements, tapping, or sound — EMDR engages the brain's natural processing mechanism to help stored memories complete the processing cycle they could not finish at the time of the original experience." },
      { type: "p", text: "The result is not that the memory disappears or that you stop being able to recall what happened. The result is that the memory loses its charge. It can be held as something that happened rather than something that is still happening. The beliefs it installed — I am not safe, I am not enough, I cannot trust anyone — shift at a felt level, not just an intellectual one." },
      { type: "p", text: "EMDR is recognized as a first-line treatment for PTSD by the World Health Organization, the American Psychological Association, and the VA. Its applications have expanded significantly beyond trauma to include anxiety, depression, phobias, grief, and negative core beliefs." },
      { type: "h2", text: "The Core Difference Between EMDR and CBT" },
      { type: "p", text: "CBT works at the level of cognition. It changes what you think. EMDR works at the level of memory storage. It changes how a stored experience is held in the nervous system." },
      { type: "p", text: "For many presentations, these differences do not matter much — both approaches produce meaningful change and the pathway is less important than the destination. But for presentations where the problem is rooted in how specific experiences are stored — trauma, deep negative beliefs, anxiety with clear experiential roots — the difference can be significant." },
      { type: "p", text: "The classic sign that EMDR may reach what CBT has not is when insight does not produce change. When you understand your patterns, can name your triggers, know where they come from — and the nervous system keeps responding in the old way anyway. This is because the beliefs are not primarily stored in the thinking mind. They are held in the body. CBT works with the thinking mind. EMDR works where the beliefs actually live." },
      { type: "h2", text: "When CBT Is the Better Choice" },
      { type: "p", text: "CBT tends to be the stronger choice when the primary concern is a specific behavioral pattern or skill deficit — when you need to build coping tools, learn to tolerate distress, or develop interpersonal skills you have not had the opportunity to develop. It is also particularly well-suited for OCD, where the treatment involves specific behavioral protocols that differ from general trauma work." },
      { type: "p", text: "CBT is also a good fit for people who prefer a structured, psychoeducational approach — who want to understand the theory of what is happening and learn a framework they can apply independently. Many people find the skills-based nature of CBT genuinely empowering." },
      { type: "h2", text: "When EMDR Is the Better Choice" },
      { type: "p", text: "EMDR tends to be the stronger choice when the problem is rooted in specific experiences — when there are memories, periods, or events that seem connected to the current symptoms. When anxiety, depression, or relationship difficulties seem to have a history behind them, not just a present-tense pattern." },
      { type: "p", text: "EMDR is particularly well-suited for trauma of any kind — single-incident or complex, recent or historical. It is also often the better choice when cognitive work has produced insight but not relief, when the body keeps responding in ways the mind cannot override, or when shame and negative self-beliefs are central to the presenting concern." },
      { type: "h2", text: "Can You Do Both" },
      { type: "p", text: "Yes — and many people do. EMDR and CBT are compatible and often complementary. The cognitive understanding developed through CBT frequently enhances EMDR work — clients arrive knowing their patterns and beliefs, which makes it easier to identify the targets for processing. Some therapists integrate both approaches within a single treatment." },
      { type: "p", text: "If you have done substantial CBT work and feel like something is still underneath it, EMDR is often the natural next step rather than a replacement for what you have already done. The work you did in CBT is not wasted — it becomes the foundation for a different kind of change." },
      { type: "h2", text: "How to Decide" },
      { type: "p", text: "The most reliable way to decide is to talk to a therapist who knows both approaches and can give you an honest assessment of what is likely to serve you best given your specific history and goals. A good clinician is not attached to their preferred modality — they are attached to what actually works for the person in front of them." },
      { type: "p", text: "If you are in the Bay Area or anywhere in California and want a direct, honest conversation about whether EMDR or another approach is the right fit for where you are, a free 15-minute consultation is the place to start. No obligation, no sales pitch — just a real assessment of what is likely to help." },
    ]
  },
  {
    slug: "how-many-emdr-sessions-will-i-need",
    title: "How Many EMDR Sessions Will I Need",
    category: "EMDR Education",
    date: "April 13, 2026",
    image: "/blog-emdr-sessions.jpg",
    excerpt: "One of the most common questions people ask before starting EMDR is how long it will take. The honest answer depends on several factors. Here is a realistic breakdown of what determines treatment length and what to expect.",
    metaTitle: "How Many EMDR Sessions Will I Need | EMDR Therapy Bay Area",
    metaDescription: "How long does EMDR therapy take? The answer depends on what you are treating, your history, and how you process. Here is an honest, realistic breakdown of EMDR treatment length.",
    content: [
      { type: "p", text: "Before starting any form of therapy, most people want to know the same thing: how long is this going to take? It is a reasonable question. Therapy is an investment of time, money, and emotional energy. Knowing what you are signing up for matters." },
      { type: "p", text: "With EMDR, the honest answer is that treatment length varies considerably depending on what you are working on, how complex your history is, and how your particular nervous system processes. But there are patterns and ranges that can give you a realistic picture of what to expect." },
      { type: "h2", text: "The Short Answer" },
      { type: "p", text: "For a focused, single-incident trauma — one specific event that is causing ongoing distress — EMDR often produces significant improvement in 6 to 12 sessions. Many people are surprised by how quickly things shift when the target is clear and the history is relatively uncomplicated." },
      { type: "p", text: "For anxiety, depression, phobias, or grief with identifiable experiential roots, significant improvement often comes within 8 to 16 sessions, though the full course of treatment may be longer depending on how many contributing experiences need to be addressed." },
      { type: "p", text: "For complex trauma — prolonged, repeated experiences often beginning in childhood — treatment is measured in months rather than weeks. The preparation phase alone takes longer, and the processing work proceeds more gradually. A realistic range for complex trauma treatment is anywhere from 6 months to 2 years of consistent work." },
      { type: "h2", text: "What Determines Treatment Length" },
      { type: "p", text: "The single biggest factor in treatment length is the complexity of what is being treated. Single-incident trauma is fundamentally different from developmental trauma. A phobia linked to one identifiable experience is different from anxiety that has accumulated over a lifetime of chronic stress. The more experiences that need to be addressed, the longer treatment takes." },
      { type: "p", text: "Your window of tolerance — the capacity to stay present with difficult material without becoming overwhelmed or shutting down — also significantly affects how quickly processing can proceed. For people with a narrow window of tolerance, the early phases of EMDR focus on expanding that window before active processing begins. This takes time, but it is not lost time. Stabilization work is itself therapeutic and produces real changes in daily functioning." },
      { type: "p", text: "Frequency of sessions matters too. Weekly sessions tend to produce more consistent progress than biweekly or monthly ones, because the processing work builds on itself and regular sessions maintain momentum. For some presentations — particularly complex trauma — twice weekly sessions can accelerate progress meaningfully." },
      { type: "h2", text: "The Eight Phases of EMDR and What Takes Time" },
      { type: "p", text: "EMDR follows a structured eight-phase protocol. The first two phases — history-taking and preparation — are not billable hours being spent before the real work begins. They are the real work. Getting a thorough picture of your history, identifying the specific targets for processing, and building the stabilization resources you will need to stay regulated during active processing — this foundation is what makes the rest of the work possible and effective." },
      { type: "p", text: "For straightforward presentations, history and preparation may take two to four sessions. For complex presentations, it may take considerably longer. A therapist who rushes past this phase to get to processing faster is not serving you well — they are creating conditions for destabilization rather than healing." },
      { type: "p", text: "Active processing sessions — phases three through six — are where the bilateral stimulation work happens. A single session may partially or fully resolve one memory or target, or it may open up related material that requires additional sessions to address. Processing does not always proceed linearly." },
      { type: "h2", text: "EMDR Is Faster Than Most People Expect for Trauma" },
      { type: "p", text: "One thing that genuinely distinguishes EMDR from many other therapy approaches is its efficiency for trauma specifically. The research consistently shows that EMDR produces outcomes for PTSD comparable to or better than other evidence-based treatments, typically in fewer sessions. Studies have found that 8 to 12 sessions of EMDR produce significant PTSD symptom reduction in the majority of participants." },
      { type: "p", text: "This does not mean EMDR is a shortcut. It means that when the approach is well-matched to the presentation, it tends to produce change more directly than approaches that work primarily through insight and narrative. You do not need to spend years talking about what happened to process it. The bilateral stimulation works at a level that verbal processing alone does not reach." },
      { type: "h2", text: "How Will I Know When I Am Done" },
      { type: "p", text: "The clearest sign that EMDR processing is complete is that the target memory no longer produces distress. It can be recalled, thought about, even discussed — but it no longer activates the nervous system in the way it did. The negative beliefs associated with it have shifted. The body is not bracing when the memory comes to mind." },
      { type: "p", text: "More broadly, the signs that treatment is approaching completion include sustained improvement in daily functioning, the ability to engage with previously avoided situations without significant activation, and a stable and grounded relationship with your own history. Many clients describe a sense of the past finally feeling like the past." },
      { type: "h2", text: "A Note on Honesty" },
      { type: "p", text: "I do not keep people in therapy longer than they need to be. As we work together I give you direct, honest assessments of what I am seeing — what is shifting, what still needs attention, and what a realistic timeline looks like for your specific situation. The goal is not ongoing dependency on therapy but genuine, durable change that holds outside of sessions." },
      { type: "p", text: "If you are in the Bay Area or anywhere in California and want a realistic sense of what EMDR treatment would look like for your particular history and goals, a free 15-minute consultation is the right place to start. We can talk directly about what you are dealing with and what a reasonable treatment course would look like." },
    ]
  },
  {
    slug: "what-is-bilateral-stimulation",
    title: "What Is Bilateral Stimulation and Why Does It Work",
    category: "EMDR Education",
    date: "April 6, 2026",
    image: "/blog-bilateral-stimulation.jpg",
    excerpt: "Bilateral stimulation is the defining feature of EMDR therapy — and also the most misunderstood. Here is a clear, honest explanation of what it is, what it does to the brain, and why it produces changes that talking alone often cannot.",
    metaTitle: "What Is Bilateral Stimulation and Why Does It Work | EMDR Therapy Bay Area",
    metaDescription: "Bilateral stimulation is the core of EMDR therapy. Here is what it actually is, what the research says about why it works, and what it feels like during a session.",
    content: [
      { type: "p", text: "When people hear about EMDR for the first time, the bilateral stimulation is usually what gives them pause. Following a moving dot with your eyes while thinking about a traumatic memory sounds either too simple to work or too strange to take seriously. Neither reaction is unreasonable. It is genuinely counterintuitive." },
      { type: "p", text: "But bilateral stimulation is not a gimmick. It is the mechanism through which EMDR produces changes that decades of research have consistently documented. Understanding what it is and why it appears to work is one of the most useful things you can do before starting EMDR therapy — both to set realistic expectations and to make sense of what you experience during sessions." },
      { type: "h2", text: "What Bilateral Stimulation Actually Is" },
      { type: "p", text: "Bilateral stimulation refers to any form of alternating, rhythmic left-right activation. In EMDR, this most commonly takes the form of eye movements — following a therapist's moving fingers or a moving dot on a screen with your eyes as they move back and forth across your visual field. But eye movements are not the only form. Bilateral tapping — alternating taps on the knees, hands, or shoulders — and bilateral auditory stimulation, alternating sounds through headphones, are equally valid and produce comparable effects." },
      { type: "p", text: "The alternating, rhythmic quality is what matters. The stimulation moves back and forth — left, right, left, right — at a pace the therapist controls. During sets of bilateral stimulation, you hold a target in mind: a memory, an image, a belief, a body sensation. The processing happens during the stimulation, not before or after it." },
      { type: "h2", text: "The Leading Theory: Why It Works" },
      { type: "p", text: "The most widely accepted explanation for why bilateral stimulation produces the effects it does draws a parallel to REM sleep. During rapid eye movement sleep — the stage of sleep most associated with dreaming — the eyes move rapidly from side to side while the brain processes and integrates the experiences of the day. Emotionally significant events are consolidated. Distressing material is processed. Things that happened are filed as things that happened." },
      { type: "p", text: "Trauma disrupts this process. When an experience is too overwhelming for the nervous system to process in real time, the normal integration cycle gets interrupted. The memory is stored in a fragmented, dysregulated state — not as something that happened, but as something ongoing. The emotional charge, the physical sensations, the beliefs formed in the moment of overwhelm all remain active and accessible, ready to be triggered by anything that resembles the original experience." },
      { type: "p", text: "The theory is that bilateral stimulation reactivates the brain's natural processing mechanism — similar to what happens during REM sleep — and allows the interrupted cycle to complete. The frozen material begins to move. The nervous system is given the conditions to do what it was trying to do at the time and could not finish." },
      { type: "h2", text: "What the Research Shows" },
      { type: "p", text: "EMDR is one of the most researched psychotherapies in existence. It is recognized as an evidence-based treatment for PTSD by the World Health Organization, the American Psychological Association, the American Psychiatric Association, and the VA. The evidence base is extensive and consistent across populations — combat veterans, survivors of sexual trauma, accident victims, first responders, and people with complex developmental trauma histories." },
      { type: "p", text: "Research comparing EMDR to trauma-focused CBT — the other leading evidence-based trauma treatment — consistently finds comparable outcomes, with EMDR typically producing those outcomes in fewer sessions. Studies specifically examining the role of bilateral stimulation have found that it does add a meaningful effect beyond what exposure alone produces, though the precise mechanism is still being studied." },
      { type: "p", text: "The honest answer is that we do not have complete certainty about exactly why bilateral stimulation works at a neurological level. What we do have is extensive evidence that it does work, consistent results across diverse populations and presenting concerns, and a compelling theoretical framework that aligns with what we know about how the brain processes memory during sleep." },
      { type: "h2", text: "What Bilateral Stimulation Feels Like During a Session" },
      { type: "p", text: "Most people find bilateral stimulation more ordinary than they expected. You follow the movement — a dot on a screen, a therapist's hand, a sound alternating through headphones — while holding something in mind. It does not feel strange or dissociative. You remain fully present and aware throughout. You can stop at any point." },
      { type: "p", text: "What happens during the stimulation is harder to predict and more individual. For many people, associations surface — images, memories, body sensations, fragments of experience that seem connected to the target. Emotions may arise and then shift. The charge on the memory often begins to decrease during the processing itself, sometimes noticeably within a single set of bilateral stimulation." },
      { type: "p", text: "Some people feel tired after processing sessions — a bone-deep tiredness that is different from ordinary fatigue. Some feel lighter. Some feel stirred for a day or two as processing continues between sessions. All of these responses are normal. The nervous system is doing real work, and that work has a physical dimension." },
      { type: "h2", text: "Bilateral Stimulation in Telehealth EMDR" },
      { type: "p", text: "One of the most common questions about EMDR via telehealth is whether bilateral stimulation works through a screen. The answer is yes. Specialized tools deliver the alternating stimulation through your device — a moving dot you follow with your eyes, bilateral audio through your headphones, or self-administered tapping that the therapist guides you through. The research on telehealth EMDR consistently shows outcomes comparable to in-person treatment." },
      { type: "p", text: "For many clients, telehealth actually enhances the processing. Being in your own environment — a space that is familiar and safe — can make it easier to stay grounded during difficult material. The commute to an office adds logistical friction that telehealth removes. Many of the clients I work with throughout the Bay Area and California find the telehealth format preferable once they have experienced it." },
      { type: "h2", text: "The Bottom Line" },
      { type: "p", text: "Bilateral stimulation is strange-sounding but not mysterious. It is a specific, well-researched intervention that creates the conditions for the brain to do something it is already built to do — process and integrate experience. When that capacity has been disrupted by trauma or overwhelming stress, bilateral stimulation helps restart it." },
      { type: "p", text: "If you are curious about whether EMDR is right for what you are dealing with, a free 15-minute consultation is the place to start. We can talk directly about your situation, what EMDR would target, and what you might reasonably expect from treatment." },
    ]
  },
  {
    slug: "what-happens-in-an-emdr-session",
    title: "What Actually Happens in an EMDR Session",
    category: "EMDR Education",
    date: "April 2, 2026",
    image: "/emdr-session-blog.jpg",
    excerpt: "Most people walk into their first EMDR session with a mental image somewhere between hypnosis and something they saw in a movie. Here is what actually happens, from preparation through processing to how the hour ends.",
    metaTitle: "What Actually Happens in an EMDR Session | EMDR Therapy Bay Area",
    metaDescription: "A clear, honest breakdown of what an EMDR session looks like from start to finish. What bilateral stimulation feels like, how processing works, and what to expect when you leave.",
    content: [
      { type: "p", text: "The first thing most people feel walking into an EMDR session is a specific kind of uncertainty. Not fear exactly. More like the feeling of being about to do something that does not have a clear script yet." },
      { type: "p", text: "That feeling is worth addressing directly. Because EMDR therapy is one of the most misunderstood treatments in mental health, not because it is complicated, but because nothing in our cultural vocabulary prepares us for what it actually is. It is not hypnosis. It is not talk therapy with eye movements added. It is something genuinely different, and the people who benefit most from it are usually the ones who understood what they were walking into before they arrived." },
      { type: "p", text: "This is that explanation." },
      { type: "h2", text: "The Preparation Phase Is Not Waiting. It Is Working." },
      { type: "p", text: "A skilled EMDR therapist does not begin processing in the first session. Before any trauma work starts, there is a preparation phase that is easy to undervalue and essential not to skip. This is where the therapeutic relationship forms, where your history gets mapped, where the specific experiences you want to address get identified, and where you build the internal resources you will need to stay regulated when difficult material surfaces." },
      { type: "p", text: "People sometimes experience this phase as slow. It is not. It is the difference between processing trauma in a container that holds and processing it in a way that destabilizes you. The preparation is what makes the deeper work safe enough to do and effective enough to matter." },
      { type: "h2", text: "The Moment the Session Turns" },
      { type: "p", text: "When processing begins, your therapist will ask you to identify a specific target. Usually this is a memory or image that still carries a charge when you bring it to mind. You will name the belief it planted in you, something like \"I am not safe\" or \"I should have stopped it.\" You will locate where you feel it in your body. You will rate how distressing it feels on a scale of zero to ten." },
      { type: "p", text: "This sounds more structured than it feels. In practice it is a quiet, focused conversation. You are not being asked to perform or produce. You are being asked to notice what is already living inside you. Most people find that part easier than they expected." },
      { type: "h2", text: "What Bilateral Stimulation Actually Does to a Memory" },
      { type: "p", text: "Bilateral stimulation is the technical term for the alternating left-right activation at the center of every EMDR session. In practice this usually means following your therapist's fingers with your eyes as they move back and forth across your field of vision, though some therapists use tapping or alternating sounds through headphones." },
      { type: "p", text: "You hold the target memory loosely in awareness while the stimulation continues. Your therapist checks in every thirty seconds or so. What are you noticing? The answer might be an image, a body sensation, an emotion, a color, a fragment of something you had forgotten. There is no correct response. You simply report what arises and the processing continues." },
      { type: "p", text: "What tends to happen next is the part that surprises people most. The memory begins to shift on its own. Not because the therapist directed it somewhere. Because the brain, given the right conditions, moves toward resolution the way a wound moves toward healing. Associations surface. The emotional intensity decreases. Something that felt immovable begins, quietly, to move." },
      { type: "h2", text: "How the Hour Ends" },
      { type: "p", text: "Not every EMDR session reaches resolution and a skilled therapist does not chase completion at the cost of your stability. Every session ends with closure. You leave grounded, contained, and resourced regardless of where the processing stopped." },
      { type: "p", text: "Some people walk out lighter. Others leave with a bone-deep tiredness that feels different from exhaustion. Some feel stirred for a day or two before things settle and integrate. All of it is normal. Processing continues between sessions in ways that are quieter and harder to name, and often what shifts most happens not in the room but in the days that follow." },
      { type: "h2", text: "The Thing EMDR Is Not" },
      { type: "p", text: "It is not hypnosis. You are present, aware, and in complete control throughout. Nothing is implanted. Nothing is suggested. You can stop at any moment. Your therapist is not steering you toward a particular memory or a particular conclusion. The work goes where your nervous system needs it to go, which is rarely where anyone predicted it would." },
      { type: "p", text: "It is also not a shortcut. EMDR is evidence-based and often moves faster than talk therapy alone, but speed is a byproduct of depth, not a replacement for it. The work still asks something real of you. Honesty. Presence. A willingness to stay with discomfort long enough to let it change." },
      { type: "h2", text: "The Only Question That Matters" },
      { type: "p", text: "If you have been carrying something that has not shifted despite genuine effort, if certain memories or triggers still feel immediate no matter how much you understand them, if you are ready to work at a level that talking alone cannot reach, then you already know why you are reading this." },
      { type: "p", text: "The next step is a conversation. Schedule a free consultation and we will figure out together whether EMDR therapy is what you have been looking for." },
    ]
  },
  {
    slug: "why-talk-therapy-wasnt-enough",
    title: "Why Talk Therapy Wasn't Enough and What to Try Instead",
    category: "Trauma & Healing",
    date: "March 23, 2026",
    image: "/talk-therapy-blog.jpg",
    excerpt: "You did everything right in therapy and something still has not moved. This is more common than the mental health conversation acknowledges, and it points to something important about what talk therapy can and cannot do for trauma.",
    metaTitle: "Why Talk Therapy Wasn't Enough and What to Try Instead | EMDR Therapy Bay Area",
    metaDescription: "If you have done real work in therapy and still feel stuck, the problem is not your effort. It is a structural limitation of the tool. Here is what EMDR therapy reaches that talking alone cannot.",
    content: [
      { type: "p", text: "There is a particular kind of exhaustion that comes from doing everything right in therapy and still feeling stuck." },
      { type: "p", text: "You found a good therapist. You showed up. You did the uncomfortable work of looking honestly at your past, your patterns, the ways you move through the world and the reasons why. You built real understanding of yourself. And something, some specific thing, has still not moved." },
      { type: "p", text: "This is more common than the mental health conversation acknowledges. And it points to something important about what talk therapy can and cannot do." },
      { type: "h2", text: "What Talk Therapy Was Built For and Where It Ends" },
      { type: "p", text: "Talk therapy works through language. It engages the prefrontal cortex, the part of the brain responsible for reflection, narrative, analysis, and meaning-making. Done well, this is profound work. Understanding your patterns changes how you see yourself. Naming what happened to you changes your relationship to it. The therapeutic relationship itself is healing in ways that go beyond anything discussed in the room." },
      { type: "p", text: "But trauma does not live in the prefrontal cortex." },
      { type: "p", text: "Trauma lives in the limbic system and the brainstem. In the parts of the brain that govern survival and operate faster than conscious thought. These are the structures that activate when a particular smell sends you somewhere you did not choose to go, when a tone of voice lands in your chest before your mind has processed a single word, when your body responds to something your thinking brain has already cleared as safe." },
      { type: "p", text: "When those deeper structures are running a survival program, the reasoning brain often goes offline. You can narrate the trauma with precision and eloquence and the nervous system will keep running its original code. The words reach one part of the brain. The wound lives somewhere older and faster and far less interested in your analysis of it." },
      { type: "p", text: "This is not a failure of your therapist or your effort or your intelligence. It is a structural limitation of the tool. And recognizing it is the first step toward finding what actually works." },
      { type: "h2", text: "What EMDR Reaches That Talking Cannot" },
      { type: "p", text: "EMDR therapy does not ask you to narrate your trauma. It asks you to hold it, lightly and briefly, while bilateral stimulation activates both hemispheres of the brain in an alternating left-right rhythm. Eye movements. Tapping. Sound. The specific method matters less than the bilateral alternation itself." },
      { type: "p", text: "What this appears to do is engage the deeper structures of the brain where traumatic memory is held and create the conditions for that frozen material to begin moving. The leading theory draws a parallel to REM sleep, the stage during which the brain naturally processes and integrates experience. Trauma disrupts that process. EMDR therapy restarts it." },
      { type: "p", text: "In practice this means that memories which have felt raw and present for years begin to lose their charge. The images soften. The body quiets. The beliefs that formed in the worst moments of your life, the ones that have been running quietly in the background of everything since, begin to loosen. The past starts to feel like the past." },
      { type: "p", text: "People describe this in ways that are strikingly similar across very different histories. Smaller. Further away. Like watching something through glass instead of living inside it. Like finally being able to put something down that you did not realize you were still carrying." },
      { type: "h2", text: "The Signs That EMDR Therapy Might Be the Right Next Step" },
      { type: "p", text: "Talk therapy is the right tool for much of what brings people into a therapist's office. EMDR is not for everyone. But if any of this is familiar, it deserves a closer look." },
      { type: "p", text: "You have done genuine work in therapy and specific things have not shifted. You understand your triggers but cannot change how your body responds to them. Your anxiety, hypervigilance, or emotional reactivity feels more physical than cognitive. You have a trauma history that feels locked in the body rather than processed through the mind. You want something with structure and direction rather than open-ended exploration with no clear horizon." },
      { type: "p", text: "EMDR therapy requires real engagement. Honesty. Presence. A willingness to stay with difficult material long enough to let it move. But for people whose nervous systems are holding experiences that words alone have not released, it offers something qualitatively different from anything they have tried before." },
      { type: "h2", text: "Nothing You Did Was Wasted" },
      { type: "p", text: "Choosing EMDR after years of talk therapy is not an admission that the previous work failed. The self-awareness you built, the patterns you named, the relationships you repaired, the capacity for reflection you developed, all of it matters. And it tends to make EMDR more effective. You are not starting over. You are adding a tool that can reach what the previous ones were not built to reach." },
      { type: "p", text: "If you are ready for that, schedule a free consultation. We will look at your history together and figure out whether EMDR therapy is the right next step for where you are now." },
    ]
  },
  {
    slug: "why-your-nervous-system-gets-stuck",
    title: "Why Your Nervous System Gets Stuck and How EMDR Helps",
    category: "Trauma & Neuroscience",
    date: "March 30, 2026",
    image: "/nervous-system-blog.jpg",
    excerpt: "The symptoms that bring most people to trauma therapy are not evidence of a nervous system that failed. They are evidence of one that succeeded completely and then never received permission to stand down.",
    metaTitle: "Why Your Nervous System Gets Stuck and How EMDR Helps | EMDR Therapy Bay Area",
    metaDescription: "Trauma is not a character flaw. It is an incomplete biological process. Here is what happens to the nervous system during trauma, why it stays stuck, and how EMDR therapy helps it finally finish.",
    content: [
      { type: "p", text: "The symptoms that bring most people to trauma therapy are not evidence of a nervous system that failed. They are evidence of one that succeeded completely and then never received permission to stand down." },
      { type: "p", text: "That single reframe changes what healing requires. And it changes, in a way that matters, how you understand yourself." },
      { type: "h2", text: "The System That Was Built to Save You" },
      { type: "p", text: "Your nervous system is not interested in your comfort or your productivity or your sense of peace. It has one job. Keep you alive. It has been doing that job since before you drew your first breath and it is, by any measure, extraordinarily good at it." },
      { type: "p", text: "When it detects a threat, it mobilizes without waiting for your input. Adrenaline floods the body. The heart accelerates. Attention narrows to the source of danger. Muscles prepare for action. This happens faster than language, faster than conscious thought, faster than any decision you could deliberately make. The system is designed that way on purpose. In the moment when survival is at stake, thinking is a liability." },
      { type: "p", text: "Under ordinary circumstances, once the threat passes, the activation discharges. You breathe. The chemicals clear. The body returns to baseline. The brain files the experience as something that happened and is now finished." },
      { type: "p", text: "But sometimes the cycle does not complete. The threat is too sudden, too sustained, or too overwhelming for the nervous system to process in real time. The activation has nowhere to go. And so it stays, held in the body, with the brain keeping the memory flagged not as something that happened but as something that is still unfolding." },
      { type: "p", text: "This is what trauma is. Not weakness. Not fragility. An incomplete biological process that the body has been trying to finish ever since." },
      { type: "h2", text: "Why the Past Keeps Arriving in the Present" },
      { type: "p", text: "A nervous system holding an unprocessed experience begins to function like a security system with a damaged sensor. Any signal that resembles the original threat, a sound, a smell, a quality of light, a posture, a particular silence, triggers the alarm. The body mobilizes. The protective response fires. All of this happens before the thinking brain has processed a single detail of what is actually in front of you." },
      { type: "p", text: "From the outside, this looks like overreacting. From the inside, it feels like survival. Because for the nervous system, it is survival. It is not responding to what is present. It is responding to a pattern it has learned, through experience, to treat as dangerous. It is doing precisely what it was built to do." },
      { type: "p", text: "This is why understanding your trauma intellectually does not always change how you respond to it. Insight lives in the prefrontal cortex. The alarm system lives somewhere older and faster and entirely unimpressed by your analysis of the situation. You can know, with complete clarity, that you are safe. And your body can refuse to believe it." },
      { type: "h2", text: "What EMDR Does at the Level Where Trauma Lives" },
      { type: "p", text: "EMDR therapy works directly with the frozen activation that talk therapy alone cannot always reach. The bilateral stimulation at the center of every EMDR session, alternating eye movements, tapping, or sound in a left-right rhythm, engages both hemispheres of the brain simultaneously in a way that allows stuck material to begin moving again." },
      { type: "p", text: "The leading theory draws a parallel to REM sleep, the stage during which the brain naturally processes and integrates the day's experiences, filing what matters and releasing what does not. Trauma disrupts this process. EMDR therapy creates the conditions that allow it to resume, giving the nervous system the opportunity to do what it has been trying to do since the moment the experience overwhelmed it." },
      { type: "p", text: "In practice, memories that have been running as present-tense emergencies begin to shift into the past tense where they belong. The charge decreases. The body stops bracing for something that is not coming. The alarm that has been firing for months or years, sometimes decades, gradually quiets." },
      { type: "p", text: "The memory does not disappear. What disappears is its authority over the present moment." },
      { type: "h2", text: "What It Feels Like When the System Finally Rests" },
      { type: "p", text: "People who move through trauma with EMDR therapy tend to describe the change in strikingly similar terms, regardless of what they carried or how long they carried it. A quieting. A sense of space where there used to be noise. Situations that once triggered a full survival response become things they can notice, navigate, and move through. They find themselves somewhere that would previously have sent them completely offline and realize, sometimes with genuine surprise, that they are steady." },
      { type: "p", text: "This is not the erasure of memory. It is the restoration of choice. The nervous system that has been running a survival program in the background of every moment, that has been working without rest for longer than anyone should have to endure, finally receives the update it has been waiting for." },
      { type: "p", text: "That was then. This is now. You made it through." },
      { type: "p", text: "If you recognize your experience in what is described here, schedule a free consultation. We can talk about where you are and what EMDR therapy might make possible for you." },
    ]
  }
];

const PHASES = [
  { num: "01", title: "History & Planning", desc: "We explore your history and identify targets for processing." },
  { num: "02", title: "Preparation", desc: "You learn stabilization techniques and what to expect from EMDR." },
  { num: "03", title: "Assessment", desc: "We identify specific memories, beliefs, and body sensations to target." },
  { num: "04", title: "Desensitization", desc: "Using bilateral stimulation, the memory is processed and its charge reduced." },
  { num: "05", title: "Installation", desc: "A positive belief is strengthened to replace the old, limiting one." },
  { num: "06", title: "Body Scan", desc: "We check for residual tension and close each session safely." },
  { num: "07", title: "Reevaluation", desc: "We review progress and adjust our approach as you grow." },
  { num: "08", title: "Integration", desc: "Processing is complete; new insights and relief become part of daily life." },
];

const CONDITIONS = [
  { name: "Trauma & PTSD", desc: "Single-incident trauma, complex PTSD, childhood wounds, and the effects of prolonged stress or abuse." },
  { name: "Anxiety", desc: "Panic attacks, persistent worry, phobias, and the nervous system dysregulation that keeps you stuck in fear." },
  { name: "Depression", desc: "Low mood, loss of motivation, and the dark weight that disconnects you from yourself and others." },
  { name: "Grief & Loss", desc: "Complicated grief, loss of a loved one, or the quiet grief of a life that did not go as planned." },
  { name: "Life Transitions", desc: "Major changes — career shifts, relationship endings, identity questions — that leave you feeling unmoored." },
  { name: "Negative Beliefs", desc: "Deep-seated beliefs like 'I am not enough' that drive patterns you cannot seem to break." },
];

const FAQS = [
  {
    q: "Are you currently accepting new clients?",
    a: "Yes — I am currently accepting new clients for telehealth therapy throughout California. The best way to get started is to book a free 15-minute consultation so we can see if we are a good fit before committing to anything."
  },
  {
    q: "Do you accept insurance?",
    a: "My practice is private pay, which means I do not bill insurance directly. I can provide a superbill — a detailed receipt — that you can submit to your insurance company for potential out-of-network reimbursement. Many clients with PPO plans recoup a meaningful portion of the cost this way. I recommend checking with your insurer about your out-of-network mental health benefits before we begin."
  },
  {
    q: "What are your session rates?",
    a: "$240 for a 45-minute session, $320 for a 60-minute session. I am private pay and do not bill insurance directly. I provide a superbill after each session — many clients with PPO plans recoup a portion of the cost through out-of-network benefits. I recommend checking with your insurer before we begin."
  },
  {
    q: "What does an EMDR session actually feel like?",
    a: "EMDR is not a passive process — it asks you to stay present with difficult material, and sessions can bring up real emotion. Most people find it more manageable than they expected, but it is not always comfortable either. What stands out for clients who stick with it is how much ground gets covered: breakthroughs that felt out of reach become possible when the work is done consistently and with good guidance. It is challenging in the way that meaningful things usually are."
  },
  {
    q: "How is EMDR different from regular talk therapy?",
    a: "Talk therapy works primarily through insight and narrative. EMDR works more directly with how the nervous system stores memory. You do not need to describe traumatic events in detail — the process is less verbal and more experiential, which many people find easier and more effective for trauma work."
  },
  {
    q: "How many sessions will I need?",
    a: "Most clients meet weekly for 8-16 sessions, though this varies depending on what we are working on. For more complex or layered trauma, it can be beneficial to meet twice a week to maintain momentum and deepen the work. We will have a clearer picture of what makes sense for you after our first few sessions together."
  },
  {
    q: "Do I have to talk about my trauma in detail?",
    a: "No — and this is one of the things people appreciate most about EMDR. You hold a general awareness of a memory while we do the processing work. You are not required to narrate or relive events in detail. The method works even when language falls short."
  },
  {
    q: "Can we do EMDR over telehealth?",
    a: "Yes. I work exclusively via telehealth and EMDR translates very well online. I use a specialized tool for bilateral stimulation that works through your screen. All you need is a private, comfortable space and a reliable internet connection."
  },
];

function BlogIndex() {
  return (
    <>
      <Helmet>
        <title>Blog | EMDR Therapy Bay Area</title>
        <meta name="description" content="Articles on EMDR therapy, trauma, anxiety, and healing from Marcus Ghiasi, LMFT." />
        <link rel="canonical" href="https://emdrtherapybayarea.com/blog" />
      </Helmet>
      <div style={{ minHeight: "100vh", background: "var(--ink)", color: "var(--text)", fontFamily: "'Jost', sans-serif" }}>
        <nav style={{ position: "sticky", top: 0, zIndex: 50, padding: "18px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--nav-bg)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "var(--gold)", letterSpacing: "0.02em" }}>EMDR Therapy Bay Area</div>
            <div style={{ fontSize: "10px", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "2px", fontWeight: 300 }}>Marcus Ghiasi, LMFT</div>
          </a>
          <a href="https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1" target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Book a free consult</a>
        </nav>
        <div style={{ padding: "80px 60px 40px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--gold)", flexShrink: 0 }}></span>
            From the practice
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "52px", fontWeight: 400, lineHeight: 1.07, color: "var(--text)", marginBottom: "16px" }}>Writing on <em style={{ fontStyle: "italic", color: "var(--gold)" }}>EMDR & Healing</em></h1>
          <p style={{ fontSize: "17px", lineHeight: 1.78, color: "var(--muted)", fontWeight: 300, maxWidth: "600px", marginBottom: "64px" }}>Evidence-based perspectives on trauma, anxiety, and what actually helps. Written by Marcus Ghiasi, LMFT.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
{BLOG_POSTS.map(post => (
<a key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "280px 1fr", alignItems: "stretch", border: "1px solid var(--border)", background: "rgba(184,130,106,0.03)", transition: "background 0.2s" }}    onMouseEnter={e => e.currentTarget.style.background = "rgba(184,130,106,0.08)"}
    onMouseLeave={e => e.currentTarget.style.background = "rgba(184,130,106,0.03)"}>
<div style={{ overflow: "hidden", height: "100%", minHeight: "200px" }}>
  <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} loading="lazy" />
</div>
    <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "12px" }}>{post.category} · {post.date}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 400, color: "var(--text)", lineHeight: 1.2, marginBottom: "14px" }}>{post.title}</div>
        <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--muted)", fontWeight: 300, margin: 0 }}>{post.excerpt}</p>
      </div>
      <div style={{ fontSize: "12px", color: "var(--gold)", letterSpacing: "0.08em", marginTop: "24px" }}>Read more →</div>
    </div>
  </a>
))}
          </div>
        </div>
        <footer style={{ padding: "32px 60px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginTop: "80px" }}>
          <a href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "var(--gold)", textDecoration: "none" }}>EMDR Therapy Bay Area</a>
          <p style={{ fontSize: "11px", color: "var(--muted)", margin: 0 }}>Marcus Ghiasi, LMFT #158475 · Oakland, CA · Telehealth throughout California</p>
          <a href="/" style={{ fontSize: "12px", color: "var(--gold)", textDecoration: "none" }}>← Main site</a>
        </footer>
        <div style={{ background: "var(--ink2)", borderTop: "1px solid var(--border)", padding: "12px 60px", textAlign: "center", fontSize: "11px", color: "var(--muted)" }}>
          <strong style={{ color: "var(--text)" }}>In crisis?</strong> Call or text <strong style={{ color: "var(--text)" }}>988</strong> — Suicide &amp; Crisis Lifeline, free &amp; confidential, 24/7.
        </div>
      </div>
    </>
  );
}
function BlogPost({ post }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": "Marcus Ghiasi", "jobTitle": "Licensed Marriage and Family Therapist" },
    "publisher": { "@type": "Organization", "name": "EMDR Therapy Bay Area", "url": "https://emdrtherapybayarea.com" },
    "image": `https://emdrtherapybayarea.com${post.image}`,
    "url": `https://emdrtherapybayarea.com/blog/${post.slug}`
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)", color: "var(--text)", fontFamily: "'Jost', sans-serif" }}>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://emdrtherapybayarea.com/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, padding: "18px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--nav-bg)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "var(--gold)", letterSpacing: "0.02em" }}>EMDR Therapy Bay Area</div>
          <div style={{ fontSize: "10px", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "2px", fontWeight: 300 }}>Marcus Ghiasi, LMFT</div>
        </a>
        <a href="https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1" target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Book a free consult</a>
      </nav>
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "72px 60px 100px" }}>
        <a href="/blog" style={{ fontSize: "12px", color: "var(--gold)", textDecoration: "none", letterSpacing: "0.06em", display: "inline-block", marginBottom: "48px" }}>← All posts</a>
        <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>{post.category} · {post.date}</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", fontWeight: 400, lineHeight: 1.1, color: "var(--text)", marginBottom: "40px" }}>{post.title}</h1>
        <img src={post.image} alt={post.title} style={{ width: "100%", height: "360px", objectFit: "cover", display: "block", marginBottom: "56px" }} />
        <div style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "48px", paddingBottom: "28px", borderBottom: "1px solid var(--border)" }}>
          By Marcus Ghiasi, LMFT · EMDR Therapy Bay Area
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {post.content.map((block, i) => {
            if (block.type === "h2") return (
              <h2 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 400, color: "var(--text)", lineHeight: 1.25, marginTop: "48px", marginBottom: "20px" }}>{block.text}</h2>
            );
            return (
              <p key={i} style={{ fontSize: "17px", lineHeight: 1.85, color: "var(--muted)", fontWeight: 300, marginBottom: "22px" }}>{block.text}</p>
            );
          })}
        </div>
        <div style={{ marginTop: "72px", padding: "40px", border: "1px solid var(--border)", background: "rgba(184,130,106,0.04)" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "14px" }}>Ready to begin?</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 400, color: "var(--text)", lineHeight: 1.3, marginBottom: "20px" }}>Schedule a free 15-minute consultation.</p>
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--muted)", fontWeight: 300, marginBottom: "28px" }}>No forms, no pressure. Just a real conversation about whether EMDR therapy is the right fit for where you are.</p>
          <a href="https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1" target="_blank" rel="noopener noreferrer" className="btn-seo-gold">Book your free consultation</a>
        </div>
      </div>
      <footer style={{ padding: "32px 60px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <a href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "var(--gold)", textDecoration: "none" }}>EMDR Therapy Bay Area</a>
        <p style={{ fontSize: "11px", color: "var(--muted)", margin: 0 }}>Marcus Ghiasi, LMFT #158475 · Oakland, CA · Telehealth throughout California</p>
        <a href="/" style={{ fontSize: "12px", color: "var(--gold)", textDecoration: "none" }}>← Main site</a>
      </footer>
      <div style={{ background: "var(--ink2)", borderTop: "1px solid var(--border)", padding: "12px 60px", textAlign: "center", fontSize: "11px", color: "var(--muted)" }}>
        <strong style={{ color: "var(--text)" }}>In crisis?</strong> Call or text <strong style={{ color: "var(--text)" }}>988</strong> — Suicide &amp; Crisis Lifeline, free &amp; confidential, 24/7.
      </div>
    </div>
  );
}
        
export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", concern: "", message: "", _honeypot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSeoPage = !!SEO_PAGE_MAP[window.location.pathname];
const isBlogIndex = window.location.pathname === "/blog";
const blogPostMatch = BLOG_POSTS.find(p => window.location.pathname === `/blog/${p.slug}`);
  const isKnownRoute = isSeoPage || isBlogIndex || !!blogPostMatch || window.location.pathname === "/";

  // Dark mode toggle — persist preference
  useEffect(() => {
    const saved = localStorage.getItem("emdr-theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("emdr-theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    window.onCaptchaSuccess = (token) => setCaptchaToken(token);
    window.onCaptchaExpired = () => setCaptchaToken(null);
  }, []);

  const handleSubmit = async () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!captchaToken) errors.captcha = "Please complete the captcha.";
    if (formData._honeypot) return;
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    try {
      const res = await fetch("https://formspree.io/f/mlgwzaoq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, 'h-captcha-response': captchaToken }),
      });
      if (res.ok) setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    }
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const closeMobile = (id) => {
    setMobileOpen(false);
    setTimeout(() => scrollTo(id), 10);
  };

  useEffect(() => {
    const ptScript = document.createElement('script');
    ptScript.type = 'text/javascript';
    ptScript.src = 'https://member.psychologytoday.com/verified-seal.js';
    ptScript.setAttribute('data-badge', '13');
    ptScript.setAttribute('data-id', '1134128');
    ptScript.setAttribute('data-code', 'aHR0cHM6Ly93d3cucHN5Y2hvbG9neXRvZGF5LmNvbS9hcGkvdmVyaWZpZWQtc2VhbC9zZWFscy8xMy9wcm9maWxlLzExMzQxMjg/Y2FsbGJhY2s9c3hjYWxsYmFjaw==');
    document.body.appendChild(ptScript);
  }, []);

  // Inject JSON-LD structured data for SEO
 useEffect(() => {
  if (document.getElementById('schema-business')) return;

  const bizSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Bayside Wellness & Counseling - EMDR Therapy",
    "description": "EMDR therapy for trauma, anxiety, depression, grief, and life transitions. Telehealth sessions available throughout California.",
    "url": "https://emdrtherapybayarea.com",
    "telephone": "(415) 857-5799",
    "email": "hello@baysidewellnessandcounseling.com",
    "priceRange": "$$",
    "image": "https://emdrtherapybayarea.com/marcus.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2323 Broadway",
      "addressLocality": "Oakland",
      "addressRegion": "CA",
      "postalCode": "94612",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.8141,
      "longitude": -122.2635
    },
    "areaServed": [
      "Oakland, CA", "San Francisco, CA", "Berkeley, CA",
      "Bay Area, CA", "California"
    ],
    "medicalSpecialty": "EMDR Therapy",
    "availableService": [
      { "@type": "MedicalTherapy", "name": "EMDR Therapy" },
      { "@type": "MedicalTherapy", "name": "Trauma Therapy" },
      { "@type": "MedicalTherapy", "name": "Anxiety Treatment" },
      { "@type": "MedicalTherapy", "name": "Depression Therapy" },
      { "@type": "MedicalTherapy", "name": "Grief Counseling" },
      { "@type": "MedicalTherapy", "name": "Life Transitions Counseling" }
    ],
    "employee": {
      "@type": "Person",
      "name": "Marcus Ghiasi",
      "jobTitle": "Licensed Marriage and Family Therapist",
      "description": "LMFT specializing in EMDR therapy via telehealth throughout California."
    },
    "sameAs": [
      "https://www.baysidewellnessandcounseling.com",
      "https://www.psychologytoday.com/profile/1134128",
  "https://www.emdria.org/directory/people/marcus-ghiasi/"
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Marcus Ghiasi",
    "jobTitle": "Licensed Marriage and Family Therapist",
    "description": "LMFT and founder of Bayside Wellness & Counseling. Specializes in EMDR therapy for trauma, anxiety, depression, grief, and life transitions via telehealth throughout California.",
    "url": "https://emdrtherapybayarea.com",
    "image": "https://emdrtherapybayarea.com/marcus.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Oakland",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "Licensed Marriage and Family Therapist (LMFT #158475)",
        "recognizedBy": { "@type": "Organization", "name": "California Board of Behavioral Sciences" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "EMDR Trained Therapist",
        "recognizedBy": { "@type": "Organization", "name": "EMDR International Association (EMDRIA)" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Master of Arts in Counseling Psychology",
        "recognizedBy": { "@type": "Organization", "name": "University of San Francisco" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Bachelor of Arts in Psychology",
        "recognizedBy": { "@type": "Organization", "name": "San Francisco State University" }
      }
    ],
    "worksFor": {
      "@type": "MedicalBusiness",
      "name": "Bayside Wellness & Counseling",
      "url": "https://www.baysidewellnessandcounseling.com"
    },
    "sameAs": [
      "https://www.psychologytoday.com/profile/1134128",
      "https://www.baysidewellnessandcounseling.com",
      "https://www.emdria.org/directory/people/marcus-ghiasi/"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are you currently accepting new clients?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes — I am currently accepting new clients for telehealth therapy throughout California. The best way to get started is to book a free 15-minute consultation so we can see if we are a good fit before committing to anything." }
      },
      {
        "@type": "Question",
        "name": "Do you accept insurance?",
        "acceptedAnswer": { "@type": "Answer", "text": "My practice is private pay, which means I do not bill insurance directly. I can provide a superbill that you can submit to your insurance company for potential out-of-network reimbursement. Many clients with PPO plans recoup a meaningful portion of the cost this way." }
      },
      {
        "@type": "Question",
        "name": "What are your session rates?",
        "acceptedAnswer": { "@type": "Answer", "text": "$240 for a 45-minute session, $320 for a 60-minute session. I am private pay and provide a superbill after each session — many clients with PPO plans recoup a portion of the cost through out-of-network benefits." }
      },
      {
        "@type": "Question",
        "name": "What does an EMDR session actually feel like?",
        "acceptedAnswer": { "@type": "Answer", "text": "EMDR is not a passive process — it asks you to stay present with difficult material, and sessions can bring up real emotion. Most people find it more manageable than they expected, but it is not always comfortable. Clients who commit to the process consistently and with good guidance often experience meaningful breakthroughs." }
      },
      {
        "@type": "Question",
        "name": "How is EMDR different from regular talk therapy?",
        "acceptedAnswer": { "@type": "Answer", "text": "Talk therapy works primarily through insight and narrative. EMDR works more directly with how the nervous system stores memory. You do not need to describe traumatic events in detail — the process is less verbal and more experiential, which many people find easier and more effective for trauma work." }
      },
      {
        "@type": "Question",
        "name": "How many sessions will I need?",
        "acceptedAnswer": { "@type": "Answer", "text": "Most clients meet weekly for 8-16 sessions, though this varies. For more complex trauma, meeting twice a week can help maintain momentum. We will have a clearer picture after our first few sessions together." }
      },
      {
        "@type": "Question",
        "name": "Do I have to talk about my trauma in detail?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. You hold a general awareness of a memory while we do the processing work. You are not required to narrate or relive events in detail. The method works even when language falls short." }
      },
      {
        "@type": "Question",
        "name": "Can we do EMDR over telehealth?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. I work exclusively via telehealth and EMDR translates very well online. I use a specialized tool for bilateral stimulation that works through your screen. All you need is a private, comfortable space and a reliable internet connection." }
      }
    ]
  };

      const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EMDR Therapy Bay Area",
  "url": "https://emdrtherapybayarea.com",
  "description": "EMDR therapy for trauma, anxiety, depression, grief, and life transitions. Telehealth sessions available throughout California.",
  "publisher": {
    "@type": "Person",
    "name": "Marcus Ghiasi",
    "jobTitle": "Licensed Marriage and Family Therapist"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://emdrtherapybayarea.com/{search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const schemas = [
  { id: 'schema-business', data: bizSchema },
  { id: 'schema-person', data: personSchema },
  { id: 'schema-faq', data: faqSchema },
  { id: 'schema-website', data: websiteSchema },
];

  schemas.forEach(({ id, data }) => {
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  });
}, []);
  
  if (!isKnownRoute) {
  return (
    <>
      <style>{`
        :root { --ink:#FAF7F4; --ink2:#F3EDE6; --gold:#B8826A; --text:#3D2D26; --muted:#6B5448; --border:rgba(184,130,106,0.22); }
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:var(--ink); font-family:'Jost',sans-serif; }
      `}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px" }}>404</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", fontWeight: 400, color: "var(--text)", marginBottom: "24px", lineHeight: 1.1 }}>Page not found</h1>
          <p style={{ fontSize: "16px", color: "var(--muted)", fontWeight: 300, marginBottom: "36px", lineHeight: 1.7 }}>The page you're looking for doesn't exist.</p>
          <a href="/" style={{ background: "var(--gold)", color: "white", padding: "14px 36px", fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>← Back to home</a>
        </div>
      </div>
    </>
  );
}
  
  if (isBlogIndex) {
    return (
      <>
        <style>{`
          :root { --ink:#FAF7F4; --ink2:#F3EDE6; --gold:#B8826A; --gold-light:#C9967E; --text:#3D2D26; --muted:#6B5448; --border:rgba(184,130,106,0.22); --nav-bg:rgba(250,247,244,0.97); }
          [data-theme="dark"] { --ink:#1A1614; --ink2:#221E1B; --gold:#C9967E; --gold-light:#D9AA96; --text:#EDE8E3; --muted:#A89080; --border:rgba(201,150,126,0.18); --nav-bg:rgba(26,22,20,0.97); }
          * { box-sizing:border-box; margin:0; padding:0; }
          body { background:var(--ink); color:var(--text); font-family:'Jost',sans-serif; }
          .btn-seo-gold { background:var(--gold); color:white; padding:14px 36px; font-family:'Jost',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none; display:inline-block; border:none; cursor:pointer; }
          .btn-seo-gold:hover { background:var(--gold-light); }
          @media(max-width:768px){ nav { padding:16px 24px !important; } div[style*="padding: 80px 60px"] { padding:60px 24px 40px !important; } a[style*="gridTemplateColumns"] { grid-template-columns:1fr !important; } }
        `}</style>
        <BlogIndex />
      </>
    );
  }

  if (blogPostMatch) {
    return (
      <>
        <style>{`
          :root { --ink:#FAF7F4; --ink2:#F3EDE6; --gold:#B8826A; --gold-light:#C9967E; --text:#3D2D26; --muted:#6B5448; --border:rgba(184,130,106,0.22); --nav-bg:rgba(250,247,244,0.97); }
          [data-theme="dark"] { --ink:#1A1614; --ink2:#221E1B; --gold:#C9967E; --gold-light:#D9AA96; --text:#EDE8E3; --muted:#A89080; --border:rgba(201,150,126,0.18); --nav-bg:rgba(26,22,20,0.97); }
          * { box-sizing:border-box; margin:0; padding:0; }
          body { background:var(--ink); color:var(--text); font-family:'Jost',sans-serif; }
          .btn-seo-gold { background:var(--gold); color:white; padding:14px 36px; font-family:'Jost',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none; display:inline-block; border:none; cursor:pointer; }
          .btn-seo-gold:hover { background:var(--gold-light); }
          @media(max-width:768px){ nav { padding:16px 24px !important; } div[style*="padding: 72px 60px"] { padding:48px 24px 80px !important; } h1[style*="font-size: 48px"] { font-size:32px !important; } img[style*="height: 360px"] { height:220px !important; } }
        `}</style>
        <BlogPost post={blogPostMatch} />
      </>
    );
  }
  
  if (isSeoPage) {
    const seoMatch = SEO_PAGE_MAP[window.location.pathname];
    return (
      <>
        <style>{`
          :root { --ink:#FAF7F4; --ink2:#F3EDE6; --gold:#B8826A; --gold-light:#C9967E; --text:#3D2D26; --muted:#6B5448; --border:rgba(184,130,106,0.22); --nav-bg:rgba(250,247,244,0.97); --transition:background 0.3s ease,color 0.3s ease,border-color 0.3s ease; }
          [data-theme="dark"] { --ink:#1A1614; --ink2:#221E1B; --gold:#C9967E; --gold-light:#D9AA96; --text:#EDE8E3; --muted:#A89080; --border:rgba(201,150,126,0.18); --nav-bg:rgba(26,22,20,0.97); }
          * { box-sizing:border-box; margin:0; padding:0; }
          html { scroll-behavior:smooth; }
          body { background:var(--ink); color:var(--text); font-family:'Jost',sans-serif; }
          *:focus-visible { outline:2px solid var(--gold); outline-offset:3px; }
          .btn-gold { background:var(--gold); color:white; padding:16px 36px; border:none; font-family:'Jost',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.25s; text-decoration:none; display:inline-block; }
          .btn-gold:hover { background:var(--gold-light); transform:translateY(-2px); }
          .btn-outline { background:none; border:1px solid var(--border); color:var(--text); padding:16px 36px; font-family:'Jost',sans-serif; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; text-decoration:none; display:inline-block; }
          .btn-outline:hover { border-color:var(--gold); color:var(--gold); }
          .nav-cta { background:none; border:1px solid var(--gold); color:var(--gold); padding:10px 24px; font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; text-decoration:none; display:inline-block; }
          .nav-cta:hover { background:var(--gold); color:white; }
        `}{SEO_STYLES}</style>
        {seoMatch.type === "location"
          ? <SEOLocationPage data={seoMatch.data} bookingUrl={BOOKING_URL} />
          : <SEOConditionPage data={seoMatch.data} bookingUrl={BOOKING_URL} />
        }
      </>
    );
  }

  return (
    <>
      <style>{fonts + styles}</style>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <nav>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="nav-logo">
          EMDR Therapy Bay Area
          <span>Marcus Ghiasi, LMFT</span>
        </a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#emdr" onClick={(e) => { e.preventDefault(); scrollTo("emdr"); }}>What is EMDR</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
            <a href="/blog">Blog</a>
          </div>
          <button className="dark-toggle" onClick={toggleDark} aria-label="Toggle dark mode" aria-pressed={darkMode}>
            <div className="toggle-track">
              <div className="toggle-thumb" />
            </div>
          </button>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">Book a consult</a>
          <button className={mobileOpen ? "nav-hamburger open" : "nav-hamburger"} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={mobileOpen ? "mobile-menu open" : "mobile-menu"} role="dialog" aria-modal="true" aria-label="Navigation menu">
       <a href="#emdr" onClick={(e) => { e.preventDefault(); closeMobile("emdr"); }}>What is EMDR</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); closeMobile("about"); }}>About</a>
        <a href="#faq" onClick={(e) => { e.preventDefault(); closeMobile("faq"); }}>FAQ</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); closeMobile("contact"); }}>Contact</a>
        <a href="/blog" onClick={() => setMobileOpen(false)}>Blog</a>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mobile-cta" onClick={() => setMobileOpen(false)}>Book a consult</a>
      </div>

      <div className="hero" id="main-content">
        <div className="hero-content">
          <div className="hero-eyebrow">EMDR Therapy · Oakland, CA · Telehealth</div>
          <h1>Heal what<br />words <em>alone</em><br />cannot reach.</h1>
          <p className="hero-sub">
            EMDR therapy for trauma, anxiety, depression, grief, and life transitions.
            Telehealth sessions available throughout California.
          </p>
          <div className="hero-actions">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">Schedule a free consultation</a>
            <a href="#emdr" className="btn-outline" onClick={(e) => { e.preventDefault(); scrollTo("emdr"); }}>Learn about EMDR</a>
          </div>
        </div>
        <div className="hero-right">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            {[40,80,120,160,200,240,280,320,360].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} stroke="#B8826A" strokeWidth="0.8" fill="none" opacity="0.3" />
            ))}
            <line x1="200" y1="0" x2="200" y2="400" stroke="#B8826A" strokeWidth="0.5" opacity="0.2" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#B8826A" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>
      </div>

      <section id="emdr">
        <div className="section-label">What is EMDR</div>
        <h2>A therapy that works<br /><em>below the surface.</em></h2>
        <div className="emdr-grid">
          <div className="emdr-text">
            <p>
              <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong> is an evidence-based therapy recognized by the WHO, APA, and VA as a gold-standard treatment for trauma. It works through bilateral stimulation — guided eye movements or tapping — to help your brain reprocess stuck memories and release their emotional charge.
            </p>
            <p>
              When something traumatic happens, the brain can store the memory in a fragmented, dysregulated way. EMDR helps <strong>complete the natural processing cycle</strong> it could not finish at the time — so the past loses its grip on your present life. No detailed retelling required.
            </p>
          </div>
          <div className="emdr-phases">
            {PHASES.map((p) => (
              <div className="phase" key={p.num}>
                <div className="phase-num">{p.num}</div>
                <div className="phase-title">{p.title}</div>
                <div className="phase-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="right-for-me">
        <div>
          <div className="section-label">Is EMDR right for me</div>
          <h2>You do not have to keep<br /><em>carrying this.</em></h2>
          <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: "1.8", fontWeight: "300", maxWidth: "600px", marginTop: "16px" }}>
            EMDR has a strong track record with a wide range of concerns. If any of these feel familiar, we should talk.
          </p>
          <div className="conditions-grid">
            {CONDITIONS.map((c) => (
              <div className="condition-card" key={c.name}>
                <div className="condition-name">{c.name}</div>
                <p className="condition-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="about">
        <div className="section-label">About</div>
        <div className="about-grid">
          <div className="about-left">
            <img src="/marcus.jpg" alt="Marcus Ghiasi, LMFT" width="600" height="800" />
            <div className="about-left-bottom">
              <div className="credentials">
                <span className="cred-tag">LMFT #158475</span>
                <span className="cred-tag">EMDR Trained</span>
                <span className="cred-tag">10+ years experience</span>
                <span className="cred-tag">MA Counseling Psychology</span>
                <span className="cred-tag">Telehealth · CA-wide</span>
                <span className="cred-tag">Free 15-min consult</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <h2>Marcus<br /><em>Ghiasi,</em> LMFT</h2>
            <p>
              I am a licensed Marriage and Family Therapist and the founder of Bayside Wellness &amp; Counseling, based in Oakland, California. With over <strong>10 years of experience</strong> working with adults navigating trauma, anxiety, depression, grief, and the weight of lives that have been harder than they should have been, I built Bayside around the belief that people deserve care that actually gets to the root of things.
            </p>
            <p>
              I specialize in <strong>EMDR therapy</strong> because I have seen it create change that talk therapy alone could not reach. There is something profound about watching a person's relationship to their own past shift — not through willpower or insight alone, but through the brain's own healing capacity.
            </p>
            <p>
              My practice is fully virtual. I work with clients across California, and I bring the same care and attentiveness to a telehealth session that I would to an in-person one. If you are ready to do real work, I am ready to meet you there.
            </p>

            <div className="pt-button-wrap">
              <p style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "300", marginBottom: "20px" }}>
                This practice is part of{" "}
                <a href="https://www.baysidewellnessandcounseling.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
                  Bayside Wellness &amp; Counseling
                </a>
                , a virtual therapy practice serving clients throughout California.
              </p>
              <a
                href="https://www.psychologytoday.com/profile/1134128"
                target="_blank"
                rel="noopener noreferrer"
                className="pt-button-link"
              >
                <svg className="pt-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="4" fill="#0e5e6e"/>
                  <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontFamily="serif" fontWeight="bold">PT</text>
                </svg>
                Verified on Psychology Today
              </a>
            </div>
            <div className="credentials-mobile">
              <span className="cred-tag">LMFT #158475</span>
              <span className="cred-tag">EMDR Trained</span>
              <span className="cred-tag">10+ years experience</span>
              <span className="cred-tag">MA Counseling Psychology</span>
              <span className="cred-tag">Telehealth · CA-wide</span>
              <span className="cred-tag">Free 15-min consult</span>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-label">FAQ</div>
        <h2>Common<br /><em>questions.</em></h2>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                {faq.q}
                <span className={openFaq === i ? "faq-icon open" : "faq-icon"}>+</span>
              </button>
              {openFaq === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <div className="contact-section" id="contact">
        <div>
          <div className="section-label">Get in touch</div>
          <h2>Ready to<br /><em>begin?</em></h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p>
                The first step is a free 15-minute consultation — a chance to ask questions, share what you are going through, and see if we are a good fit. There is no obligation and no pressure.
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ marginBottom: "32px" }}>
                Book directly online
                <span style={{ marginLeft: "10px", fontSize: "11px", opacity: "0.75", letterSpacing: "0.05em" }}>↗</span>
              </a>
              <div className="contact-detail" style={{ marginTop: "32px" }}>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Phone</span>
                  <span className="contact-detail-value">(415) 857-5799</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Email</span>
                  <span className="contact-detail-value">hello@baysidewellnessandcounseling.com</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">Telehealth — California-wide</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Mailing Address</span>
                  <span className="contact-detail-value">2323 Broadway, Oakland CA 94612</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Session Rate</span>
                  <span className="contact-detail-value">$240 / 45 min · $320 / 60 min</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Insurance</span>
                  <span className="contact-detail-value">Private pay · Superbill provided</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Free Consultation</span>
                  <span className="contact-detail-value">15 minutes · No obligation</span>
                </div>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="form-success">
                  Thank you, {formData.name}. I will be in touch within one business day to schedule your consultation. I look forward to connecting.
                </div>
              ) : (
                <div className="form">
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label" htmlFor="form-name">Your name</label>
                      <input id="form-name" className={`form-input${formErrors.name ? " error" : ""}`} placeholder="First Last" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} aria-required="true" aria-describedby={formErrors.name ? "error-name" : undefined} />
                      {formErrors.name && <span id="error-name" className="form-error" role="alert">{formErrors.name}</span>}
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="form-email">Email</label>
                      <input id="form-email" className={`form-input${formErrors.email ? " error" : ""}`} type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} aria-required="true" aria-describedby={formErrors.email ? "error-email" : undefined} />
                      {formErrors.email && <span id="error-email" className="form-error" role="alert">{formErrors.email}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Phone (optional)</label>
                      <input className="form-input" placeholder="(510) 000-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Primary concern</label>
                      <select className="form-select form-input" value={formData.concern} onChange={(e) => setFormData({ ...formData, concern: e.target.value })}>
                        <option value="">Select one</option>
                        <option value="Trauma and PTSD">Trauma and PTSD</option>
                        <option value="Anxiety">Anxiety</option>
                        <option value="Depression">Depression</option>
                        <option value="Grief and Loss">Grief and Loss</option>
                        <option value="Life Transitions">Life Transitions</option>
                        <option value="Something else">Something else</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Anything you would like me to know</label>
                    <textarea className="form-textarea" placeholder="Share as much or as little as you would like..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <div style={{ position: "relative" }}>
                    <input className="_honeypot-field" type="text" name="_honeypot" value={formData._honeypot} onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })} tabIndex="-1" autoComplete="off" />
                  </div>
                  <div className="h-captcha" data-sitekey="4feca060-ae00-4ba2-ad54-7e82c9988e46" data-callback="onCaptchaSuccess" data-expired-callback="onCaptchaExpired" style={{ marginBottom: "4px" }}></div>
                  {formErrors.captcha && <span className="form-error" role="alert" style={{ marginBottom: "12px", display: "block" }}>{formErrors.captcha}</span>}
                  <div>
                    <button className="form-submit" onClick={handleSubmit}>Send message</button>
                    <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "12px" }}>I typically respond within one business day.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer>
        <a href="https://www.baysidewellnessandcounseling.com" target="_blank" rel="noopener noreferrer" className="footer-logo">
          Bayside Wellness &amp; Counseling
          <span>Marcus Ghiasi, LMFT</span>
          <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "'Jost', sans-serif", fontWeight: "300", letterSpacing: "0.04em", marginTop: "6px", opacity: "1" }}>(415) 857-5799</span>
          <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "'Jost', sans-serif", fontWeight: "300", letterSpacing: "0.04em", marginTop: "2px", opacity: "1" }}>hello@baysidewellnessandcounseling.com</span>
        </a>
        <p className="footer-note">A Bayside Wellness &amp; Counseling practice. Licensed Marriage &amp; Family Therapist in California. 2323 Broadway, Oakland CA 94612. This website is for informational purposes only and does not constitute a therapeutic relationship.</p>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>emdrtherapybayarea.com</p>
      </footer>
      <div className="crisis-bar">
        <strong>In crisis?</strong> Call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) — free, confidential, 24/7.
      </div>
    </>
  );
}
