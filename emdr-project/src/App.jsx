import { useState, useEffect } from "react";

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
  { slug: "emdr-therapy-los-angeles", city: "Los Angeles", region: "Los Angeles", state: "CA" },
  { slug: "emdr-therapy-santa-monica", city: "Santa Monica", region: "Los Angeles", state: "CA" },
  { slug: "emdr-therapy-beverly-hills", city: "Beverly Hills", region: "Los Angeles", state: "CA" },
  { slug: "emdr-therapy-brentwood", city: "Brentwood", region: "Los Angeles", state: "CA" },
  { slug: "emdr-therapy-pacific-palisades", city: "Pacific Palisades", region: "Los Angeles", state: "CA" },
  { slug: "emdr-therapy-pasadena", city: "Pasadena", region: "the Los Angeles area", state: "CA" },
  { slug: "emdr-therapy-manhattan-beach", city: "Manhattan Beach", region: "Los Angeles", state: "CA" },
  { slug: "emdr-therapy-newport-beach", city: "Newport Beach", region: "Orange County", state: "CA" },
  { slug: "emdr-therapy-laguna-beach", city: "Laguna Beach", region: "Orange County", state: "CA" },
  { slug: "emdr-therapy-san-diego", city: "San Diego", region: "San Diego", state: "CA" },
  { slug: "emdr-therapy-la-jolla", city: "La Jolla", region: "San Diego", state: "CA" },
  { slug: "emdr-therapy-del-mar", city: "Del Mar", region: "San Diego", state: "CA" },
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
    slug: "emdr-for-first-responders-therapy",
    condition: "First Responders",
    category: "Population",
    title: "EMDR Therapy for First Responders",
    intro: "First responders carry what others cannot imagine — the accumulated weight of crisis, loss, and exposure to human suffering at its most acute. Standard talk therapy often falls short for this population. EMDR works with the nervous system directly, in a way that matches the nature of the work and the weight it leaves behind."
  },
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

const SEO_STYLES = `
  .seo-page { min-height: 100vh; background: var(--ink); color: var(--text); font-family: 'Jost', sans-serif; }
  .seo-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; padding: 20px 60px; display: flex; justify-content: space-between; align-items: center; background: var(--nav-bg); border-bottom: 1px solid var(--border); }
  .seo-nav-logo { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 400; color: var(--gold); letter-spacing: 0.03em; line-height: 1.2; text-decoration: none; display: block; }
  .seo-nav-logo span { display: block; font-size: 11px; letter-spacing: 0.12em; opacity: 0.7; margin-top: 2px; font-family: 'Jost', sans-serif; font-weight: 300; color: var(--text); }
  .seo-hero { padding: 160px 60px 80px; max-width: 860px; margin: 0 auto; }
  .seo-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
  .seo-eyebrow::before { content: ''; display: block; width: 40px; height: 1px; background: var(--gold); }
  .seo-h1 { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 400; line-height: 1.08; color: var(--text); margin-bottom: 28px; }
  .seo-h1 em { font-style: italic; color: var(--gold); }
  .seo-intro { font-size: 18px; line-height: 1.8; color: var(--muted); font-weight: 300; max-width: 720px; margin-bottom: 48px; }
  .seo-cta-row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 80px; }
  .seo-divider { border: none; border-top: 1px solid var(--border); margin: 0 60px; }
  .seo-section { max-width: 860px; margin: 0 auto; padding: 72px 60px; }
  .seo-section-label { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
  .seo-section-label::before { content: ''; width: 28px; height: 1px; background: var(--gold); }
  .seo-h2 { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 400; line-height: 1.1; color: var(--text); margin-bottom: 24px; }
  .seo-h2 em { font-style: italic; color: var(--gold); }
  .seo-body { font-size: 16px; line-height: 1.85; color: var(--muted); font-weight: 300; margin-bottom: 20px; }
  .seo-body strong { color: var(--text); font-weight: 500; }
  .seo-phases { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-top: 40px; }
  .seo-phase { padding: 24px 20px; border: 1px solid var(--border); background: rgba(184,130,106,0.03); }
  .seo-phase-num { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--gold); opacity: 0.5; margin-bottom: 8px; }
  .seo-phase-title { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text); margin-bottom: 6px; }
  .seo-phase-desc { font-size: 11px; color: var(--muted); line-height: 1.6; font-weight: 300; }
  .seo-about { display: grid; grid-template-columns: 200px 1fr; gap: 48px; align-items: start; margin-top: 40px; }
  .seo-about img { width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: center top; }
  .seo-credentials { display: flex; flex-direction: column; gap: 0; margin-top: 16px; }
  .seo-credential { font-size: 12px; color: var(--muted); padding: 8px 0; border-bottom: 1px solid var(--border); }
  .seo-credential:first-child { border-top: 1px solid var(--border); }
  .seo-credential strong { color: var(--text); font-weight: 500; }
  .seo-about-text p { font-size: 15px; line-height: 1.85; color: var(--muted); font-weight: 300; margin-bottom: 16px; }
  .seo-about-text p strong { color: var(--text); font-weight: 500; }
  .seo-cta-section { background: var(--ink2); padding: 72px 60px; text-align: center; }
  .seo-cta-section h2 { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 400; color: var(--text); margin-bottom: 16px; }
  .seo-cta-section h2 em { font-style: italic; color: var(--gold); }
  .seo-cta-section p { font-size: 16px; color: var(--muted); font-weight: 300; margin-bottom: 40px; max-width: 520px; margin-left: auto; margin-right: auto; }
  .seo-footer { padding: 40px 60px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
  .seo-footer-logo { font-family: 'Playfair Display', serif; font-size: 15px; color: var(--gold); text-decoration: none; }
  .seo-footer-logo span { display: block; font-size: 11px; opacity: 0.6; margin-top: 2px; font-family: 'Jost', sans-serif; font-weight: 300; color: var(--muted); }
  .seo-footer-note { font-size: 11px; color: var(--muted); max-width: 400px; line-height: 1.6; }
  .seo-crisis { background: var(--ink2); border-top: 1px solid var(--border); padding: 14px 60px; text-align: center; font-size: 12px; color: var(--muted); }
  .seo-crisis strong { color: var(--text); }
  @media (max-width: 768px) {
    .seo-nav { padding: 18px 24px; }
    .seo-hero { padding: 120px 24px 60px; }
    .seo-h1 { font-size: 36px; }
    .seo-section { padding: 56px 24px; }
    .seo-divider { margin: 0 24px; }
    .seo-phases { grid-template-columns: 1fr 1fr; }
    .seo-about { grid-template-columns: 1fr; }
    .seo-cta-section { padding: 56px 24px; }
    .seo-footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
    .seo-crisis { padding: 14px 24px; }
  }
`;

const SEO_PHASES = [
  { num: "01", title: "History & Planning", desc: "We explore your history and identify targets for processing." },
  { num: "02", title: "Preparation", desc: "You learn stabilization techniques and what to expect." },
  { num: "03", title: "Assessment", desc: "We identify specific memories and beliefs to target." },
  { num: "04", title: "Desensitization", desc: "Bilateral stimulation processes the memory and reduces its charge." },
  { num: "05", title: "Installation", desc: "A positive belief is strengthened to replace the limiting one." },
  { num: "06", title: "Body Scan", desc: "We check for residual tension and close the session safely." },
  { num: "07", title: "Reevaluation", desc: "We review progress and adjust our approach as you grow." },
  { num: "08", title: "Integration", desc: "New insights and relief become part of daily life." },
];

function SEOLocationPage({ data, bookingUrl }) {
  const { city, region, isOnline } = data;
  const locationPhrase = isOnline ? `throughout California` : `in ${city} and ${region}`;
  const locationPhraseShort = isOnline ? `California` : `${city}, CA`;

  useEffect(() => {
    document.title = `EMDR Therapy ${isOnline ? "Online" : `in ${city}`} | Marcus Ghiasi, LMFT`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `EMDR therapy ${locationPhrase}. Marcus Ghiasi, LMFT — trauma, anxiety, depression, grief. Telehealth. Free 15-min consultation.`);
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": `EMDR Therapy ${locationPhraseShort} — Marcus Ghiasi, LMFT`,
      "url": `https://emdrtherapybayarea.com/${data.slug}`,
      "telephone": "(415) 857-5799",
      "areaServed": locationPhraseShort,
      "medicalSpecialty": "EMDR Therapy",
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(schema);
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  return (
    <div className="seo-page">
      <nav className="seo-nav">
        <a href="/" className="seo-nav-logo">
          EMDR Therapy Bay Area
          <span>Marcus Ghiasi, LMFT</span>
        </a>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">Book a consult</a>
      </nav>

      <div className="seo-hero">
        <div className="seo-eyebrow">EMDR Therapy · {locationPhraseShort} · Telehealth</div>
        <h1 className="seo-h1">
          EMDR Therapy {isOnline ? "Online" : `in ${city}`}<br />
          <em>{isOnline ? "Available Throughout California" : `Serving ${region}`}</em>
        </h1>
        <p className="seo-intro">
          If you are looking for EMDR therapy {locationPhrase}, you have found the right place. I am Marcus Ghiasi, a Licensed Marriage and Family Therapist (LMFT #158475) specializing in EMDR for trauma, anxiety, depression, grief, and life transitions. My practice is fully virtual — which means I can work with clients {locationPhrase} without anyone having to commute.
        </p>
        <div className="seo-cta-row">
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">Schedule a free consultation</a>
          <a href="/" className="btn-outline">Learn more about my practice</a>
        </div>
      </div>

      <hr className="seo-divider" />

      <div className="seo-section">
        <div className="seo-section-label">What is EMDR</div>
        <h2 className="seo-h2">A therapy that works<br /><em>below the surface.</em></h2>
        <p className="seo-body">
          <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong> is an evidence-based therapy recognized by the WHO, APA, and VA as a gold-standard treatment for trauma. It works through bilateral stimulation — guided eye movements or tapping — to help your brain reprocess stuck memories and release their emotional charge.
        </p>
        <p className="seo-body">
          When something traumatic happens, the brain can store the memory in a fragmented, dysregulated way. EMDR helps <strong>complete the natural processing cycle</strong> it could not finish at the time — so the past loses its grip on your present life. No detailed retelling required.
        </p>
        <p className="seo-body">
          Because my practice is fully telehealth, EMDR therapy {locationPhrase} is accessible wherever you are — your home, your office, anywhere private and comfortable. The bilateral stimulation tool I use works seamlessly through your screen.
        </p>
        <div className="seo-phases">
          {SEO_PHASES.map(p => (
            <div className="seo-phase" key={p.num}>
              <div className="seo-phase-num">{p.num}</div>
              <div className="seo-phase-title">{p.title}</div>
              <div className="seo-phase-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="seo-divider" />

      <div className="seo-section">
        <div className="seo-section-label">About</div>
        <h2 className="seo-h2">Marcus <em>Ghiasi,</em> LMFT</h2>
        <div className="seo-about">
          <div>
            <img src="/marcus.jpg" alt="Marcus Ghiasi, LMFT" width="400" height="533" loading="lazy" />
            <div className="seo-credentials">
              <div className="seo-credential"><strong>LMFT</strong> #158475 — California</div>
              <div className="seo-credential"><strong>EMDR Trained</strong> — EMDRIA</div>
              <div className="seo-credential"><strong>MA</strong> Counseling Psychology — USF</div>
              <div className="seo-credential"><strong>BA</strong> Psychology — SF State</div>
              <div className="seo-credential"><strong>10+ Years</strong> experience</div>
              <div className="seo-credential"><strong>Telehealth</strong> — California-wide</div>
            </div>
          </div>
          <div className="seo-about-text">
            <p>
              I am a licensed Marriage and Family Therapist and the founder of <strong>Bayside Wellness &amp; Counseling</strong>, based in Oakland, California. I have been working with adults navigating trauma, anxiety, depression, grief, and the weight of lives that have been harder than they should have been for over <strong>10 years</strong>.
            </p>
            <p>
              I specialize in EMDR because I have seen it create change that talk therapy alone could not reach. My practice is fully virtual — I work with clients {locationPhrase} and bring the same care and attentiveness to a telehealth session that I would to an in-person one.
            </p>
            <p>
              The first step is a free 15-minute consultation. No pressure, no obligation — just a chance to see if we are a good fit.
            </p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ marginTop: "8px", display: "inline-block" }}>Book your free consultation</a>
          </div>
        </div>
      </div>

      <div className="seo-cta-section">
        <h2>Ready to <em>begin?</em></h2>
        <p>The first step is a free 15-minute consultation — a chance to ask questions and see if we are a good fit. No obligation, no pressure.</p>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">Schedule a free consultation</a>
      </div>

      <footer className="seo-footer">
        <a href="/" className="seo-footer-logo">
          EMDR Therapy Bay Area
          <span>Marcus Ghiasi, LMFT · (415) 857-5799</span>
        </a>
        <p className="seo-footer-note">Licensed Marriage &amp; Family Therapist in California (LMFT #158475). Telehealth practice serving clients {locationPhrase}. Part of Bayside Wellness &amp; Counseling, 2323 Broadway, Oakland CA 94612.</p>
        <a href="/" style={{ fontSize: "12px", color: "var(--muted)" }}>← Back to main site</a>
      </footer>
      <div className="seo-crisis">
        <strong>In crisis?</strong> Call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) — free, confidential, 24/7.
      </div>
    </div>
  );
}

function SEOConditionPage({ data, bookingUrl }) {
  const { title, condition, category, intro, slug } = data;

  useEffect(() => {
    document.title = `${title} | Marcus Ghiasi, LMFT — Bay Area`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `${title} via telehealth throughout California. Marcus Ghiasi, LMFT #158475 — evidence-based EMDR therapy. Free 15-min consultation.`);
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalTherapy",
      "name": title,
      "url": `https://emdrtherapybayarea.com/${slug}`,
      "provider": { "@type": "Person", "name": "Marcus Ghiasi", "jobTitle": "Licensed Marriage and Family Therapist" },
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(schema);
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  return (
    <div className="seo-page">
      <nav className="seo-nav">
        <a href="/" className="seo-nav-logo">
          EMDR Therapy Bay Area
          <span>Marcus Ghiasi, LMFT</span>
        </a>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">Book a consult</a>
      </nav>

      <div className="seo-hero">
        <div className="seo-eyebrow">{category} · Telehealth · California-wide</div>
        <h1 className="seo-h1">
          {title.includes("—") || title.includes("?")
            ? <>{title.split(/[—?]/)[0]}<em>{title.includes("—") ? "—" : "?"}{title.split(/[—?]/)[1]}</em></>
            : <>{title}</>
          }
        </h1>
        <p className="seo-intro">{intro}</p>
        <div className="seo-cta-row">
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">Schedule a free consultation</a>
          <a href="/" className="btn-outline">Learn more about my practice</a>
        </div>
      </div>

      <hr className="seo-divider" />

      <div className="seo-section">
        <div className="seo-section-label">The approach</div>
        <h2 className="seo-h2">How EMDR works for<br /><em>{condition}</em></h2>
        <p className="seo-body">
          <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong> is an evidence-based therapy recognized by the WHO, APA, and VA. It works through bilateral stimulation — guided eye movements or tapping — to help the brain reprocess stuck memories and release their emotional charge. Unlike talk therapy, EMDR does not require you to describe difficult experiences in detail.
        </p>
        <p className="seo-body">
          For {condition.toLowerCase()}, EMDR works by identifying the specific memories, beliefs, and nervous system responses that are keeping you stuck — and processing them directly. The result is not just symptom relief, but a genuine shift in how the past lives in the present.
        </p>
        <p className="seo-body">
          My practice is <strong>fully telehealth</strong>, which means I work with clients throughout California. All you need is a private space and a reliable internet connection. The bilateral stimulation I use translates seamlessly to an online format.
        </p>
        <div className="seo-phases">
          {SEO_PHASES.map(p => (
            <div className="seo-phase" key={p.num}>
              <div className="seo-phase-num">{p.num}</div>
              <div className="seo-phase-title">{p.title}</div>
              <div className="seo-phase-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="seo-divider" />

      <div className="seo-section">
        <div className="seo-section-label">About</div>
        <h2 className="seo-h2">Marcus <em>Ghiasi,</em> LMFT</h2>
        <div className="seo-about">
          <div>
            <img src="/marcus.jpg" alt="Marcus Ghiasi, LMFT" width="400" height="533" loading="lazy" />
            <div className="seo-credentials">
              <div className="seo-credential"><strong>LMFT</strong> #158475 — California</div>
              <div className="seo-credential"><strong>EMDR Trained</strong> — EMDRIA</div>
              <div className="seo-credential"><strong>MA</strong> Counseling Psychology — USF</div>
              <div className="seo-credential"><strong>BA</strong> Psychology — SF State</div>
              <div className="seo-credential"><strong>10+ Years</strong> experience</div>
              <div className="seo-credential"><strong>Telehealth</strong> — California-wide</div>
            </div>
          </div>
          <div className="seo-about-text">
            <p>
              I am a licensed Marriage and Family Therapist and the founder of <strong>Bayside Wellness &amp; Counseling</strong>, based in Oakland, California. I have been working with adults navigating {condition.toLowerCase()}, trauma, and a range of other concerns for over <strong>10 years</strong>.
            </p>
            <p>
              I specialize in EMDR because I have seen it create change that talk therapy alone could not reach — especially for the kinds of concerns that feel stuck no matter how much insight or effort a person brings to them.
            </p>
            <p>
              The first step is a free 15-minute consultation. No pressure, no obligation.
            </p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ marginTop: "8px", display: "inline-block" }}>Book your free consultation</a>
          </div>
        </div>
      </div>

      <div className="seo-cta-section">
        <h2>Ready to <em>begin?</em></h2>
        <p>The first step is a free 15-minute consultation — a chance to ask questions and see if we are a good fit. No obligation, no pressure.</p>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">Schedule a free consultation</a>
      </div>

      <footer className="seo-footer">
        <a href="/" className="seo-footer-logo">
          EMDR Therapy Bay Area
          <span>Marcus Ghiasi, LMFT · (415) 857-5799</span>
        </a>
        <p className="seo-footer-note">Licensed Marriage &amp; Family Therapist in California (LMFT #158475). Telehealth practice serving clients throughout California. Part of Bayside Wellness &amp; Counseling, 2323 Broadway, Oakland CA 94612.</p>
        <a href="/" style={{ fontSize: "12px", color: "var(--muted)" }}>← Back to main site</a>
      </footer>
      <div className="seo-crisis">
        <strong>In crisis?</strong> Call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) — free, confidential, 24/7.
      </div>
    </div>
  );
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────

function Router({ bookingUrl }) {
  const path = window.location.pathname;
  const match = SEO_PAGE_MAP[path];
  if (!match) return null; // fall through to main App
  if (match.type === "location") return <SEOLocationPage data={match.data} bookingUrl={bookingUrl} />;
  if (match.type === "condition") return <SEOConditionPage data={match.data} bookingUrl={bookingUrl} />;
  return null;
}



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
  .hero-content { max-width: 680px; position: relative; z-index: 1; }
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
  .hero-right { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); opacity: 0.1; }

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

  .about-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 72px; align-items: start; }
  .about-left { display: flex; flex-direction: column; }
  .about-left img { width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: center top; display: block; }
  .credentials { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
  .credential { display: flex; align-items: center; gap: 14px; font-size: 13px; color: var(--muted); padding: 10px 0; border-bottom: 1px solid var(--border); }
  .credential:first-child { border-top: 1px solid var(--border); }
  .credential strong { color: var(--text); font-weight: 500; }
  .about-content { display: flex; flex-direction: column; }
  .about-content h2 { margin-bottom: 32px; }
  .about-content p { font-size: 16px; line-height: 1.85; color: var(--muted); font-weight: 300; margin-bottom: 20px; }
  .about-content p:last-of-type { margin-bottom: 0; }
  .about-content p strong { color: var(--text); font-weight: 500; }
  .pt-button-wrap { margin-top: 40px; padding-top: 40px; border-top: 1px solid var(--border); }
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
    .conditions-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 40px 24px; flex-direction: column; align-items: flex-start; }
    .right-for-me > div, .contact-section > div { padding: 0 24px; }
    .crisis-bar { padding: 16px 24px; }
  }
`;

const BOOKING_URL = "https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1";

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


export default function App() {
  const seoMatch = SEO_PAGE_MAP[window.location.pathname];
  if (seoMatch) {
    return (
      <>
        <style>{`
          :root { --ink:#FAF7F4; --ink2:#F3EDE6; --gold:#B8826A; --gold-light:#C9967E; --text:#3D2D26; --muted:#6B5448; --border:rgba(184,130,106,0.22); --nav-bg:rgba(250,247,244,0.97); --form-bg:rgba(255,255,255,0.8); --transition:background 0.3s ease,color 0.3s ease,border-color 0.3s ease; }
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
        <Router bookingUrl={BOOKING_URL} />
      </>
    );
  }
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", concern: "", message: "", _honeypot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    // MedicalBusiness schema
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
        "https://www.baysidewellnessandcounseling.com"
      ]
    };

    // Person schema — strengthens E-E-A-T signals
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
        "https://www.baysidewellnessandcounseling.com"
      ]
    };

    // FAQPage schema — enables rich results in Google search
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

    [bizSchema, personSchema, faqSchema].forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, []);

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
            <div className="credentials">
              <div className="credential"><strong>Licensed LMFT</strong> #158475 — California</div>
              <div className="credential"><strong>EMDR Trained</strong> — EMDRIA-approved</div>
              <div className="credential"><strong>10+ Years</strong> clinical experience</div>
              <div className="credential"><strong>MA</strong> Counseling Psychology — USF</div>
              <div className="credential"><strong>BA</strong> Psychology — SF State</div>
              <div className="credential"><strong>Telehealth</strong> — California-wide</div>
              <div className="credential"><strong>Free 15-min</strong> consultation</div>
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
              <p style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "300", marginBottom: "24px" }}>
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
