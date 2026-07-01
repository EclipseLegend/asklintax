import Layout from '../components/Layout'
import { loadTranslations, useTranslation } from '../lib/i18n'
import styles from './about.module.css'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

export default function AboutPage({ translations }) {
  const { t } = useTranslation(translations.common)

  return (
    <Layout t={t} meta={{ title: 'About AskLinTax | Our Mission & Story', description: 'AskLinTax is built on the belief that everyone deserves to understand their taxes — not just hand them off and hope for the best.' }}>

      {/* PAGE HERO */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <span className={styles.pageHeroEyebrow}>About AskLinTax</span>
          <h1 className={styles.pageHeroTitle}>
            We believe understanding<br />is the foundation of <em>trust.</em>
          </h1>
          <p className={styles.pageHeroSub}>
            AskLinTax was built for Chinese families and small businesses who deserve more than jargon and confusing forms — they deserve to actually understand what's happening with their taxes.
          </p>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <div className={styles.twoColText}>
              <span className="section-label">Why We Exist</span>
              <h2 className="section-title">Most tax resources weren't built for you.</h2>
              <p className={styles.bodyText}>
                If you're a Chinese immigrant family or small business owner navigating the U.S. tax system, you've probably experienced this: you search for an answer, and what you find is either too technical to understand, in English that doesn't quite make sense, or written for a different kind of taxpayer entirely.
              </p>
              <p className={styles.bodyText}>
                The problem isn't that you don't want to understand. The problem is that no one has built a resource that meets you where you are.
              </p>
              <p className={styles.bodyText}>
                That's what AskLinTax is trying to be. Not a translation of existing tax resources — a genuinely different approach to tax knowledge, built from the ground up for this community.
              </p>
            </div>
            <div className={styles.twoColVisual}>
              <div className={styles.beliefCard}>
                <div className={styles.beliefChar}>明</div>
                <div>
                  <h3 className={styles.beliefTitle}>Clarity above all</h3>
                  <p className={styles.beliefDesc}>Every concept is explained in plain language first. The technical term comes after — never before.</p>
                </div>
              </div>
              <div className={styles.beliefCard}>
                <div className={styles.beliefChar}>信</div>
                <div>
                  <h3 className={styles.beliefTitle}>Trust through understanding</h3>
                  <p className={styles.beliefDesc}>We want you to understand your taxes — not stay confused so you keep needing us. An informed user is a success, not a failure.</p>
                </div>
              </div>
              <div className={styles.beliefCard}>
                <div className={styles.beliefChar}>懂</div>
                <div>
                  <h3 className={styles.beliefTitle}>We know your situation</h3>
                  <p className={styles.beliefDesc}>Immigrant families, Airbnb hosts, crypto investors, cross-border accounts — the specific questions you face, answered directly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER'S PHILOSOPHY */}
      <section className={styles.philosophySection}>
        <div className="container">
          <div className={styles.philosophyInner}>
            <span className="section-label">Our Philosophy</span>
            <h2 className={`section-title ${styles.philosophyTitle}`}>We're not building a website. We're building a company.</h2>

            <div className={styles.philosophyBody}>
              <p>
                AskLinTax exists because of a belief that complex information can be organized into a system that anyone can find, learn from, and use — regardless of their background, language comfort, or prior knowledge.
              </p>
              <p>
                Tax was chosen as the first domain not because taxes are particularly interesting, but because the gap is real and the need is urgent. Chinese-American families and small businesses lack a trustworthy, accessible entry point to U.S. tax knowledge. Not because they're unwilling to learn — but because no one has built the right system yet.
              </p>
              <p>
                Every decision at AskLinTax comes back to two questions:
              </p>
              <div className={styles.coreQuestions}>
                <div className={styles.coreQuestion}>
                  <span className={styles.coreQNumber}>1</span>
                  <span>Does this help the user understand more?</span>
                </div>
                <div className={styles.coreQuestion}>
                  <span className={styles.coreQNumber}>2</span>
                  <span>Does this help the user feel more at ease?</span>
                </div>
              </div>
              <p>
                If the answer to both is no — even if something would bring more traffic, more inquiries, or more revenue — we don't do it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className={styles.principlesSection}>
        <div className="container">
          <span className="section-label">What We Believe</span>
          <h2 className="section-title">The principles we won't compromise on.</h2>
          <div className={styles.principlesGrid}>
            {[
              { title: 'Explain before you sell.', desc: 'We don\'t push services on users who haven\'t yet had a chance to understand their situation. Trust must come before the transaction — every time.' },
              { title: 'Real expertise is making complex things simple.', desc: 'Using more jargon doesn\'t make you sound more professional. Explaining a complex tax concept in a way a first-time filer can understand — that\'s the real skill.' },
              { title: 'Users becoming self-sufficient is a success.', desc: 'If someone learns enough from AskLinTax that they no longer need to pay for help — we consider that a win. Dependency is not our business model.' },
              { title: 'Important judgments always have a human behind them.', desc: 'Automation and AI can improve efficiency. But every significant tax judgment on AskLinTax is reviewed by a licensed CPA. That\'s not a promise we\'ll ever walk back.' },
              { title: 'Transparency reduces anxiety.', desc: 'Most people\'s tax anxiety comes not from the complexity of taxes, but from not knowing what\'s happening next. We always tell users what step they\'re on and what comes after.' },
              { title: 'The brand is bigger than any individual.', desc: 'AskLinTax is built to outlast any one person. Trust is built through systems, knowledge quality, and user experience — not personal reputation.' },
            ].map((p, i) => (
              <div key={i} className={styles.principleCard}>
                <div className={styles.principleNumber}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONAL STANDARDS */}
      <section className={styles.standardsSection}>
        <div className="container">
          <div className={styles.standardsInner}>
            <div>
              <span className="section-label">Professional Standards</span>
              <h2 className={`section-title ${styles.standardsTitle}`}>CPA-reviewed. Always.</h2>
              <p className={styles.bodyText}>
                AskLinTax is a knowledge platform, not a substitute for professional tax advice. Every article on this site is reviewed for factual accuracy by a licensed CPA before publication, and updated whenever tax laws change.
              </p>
              <p className={styles.bodyText}>
                Our professional backbone is provided by a licensed Certified Public Accountant who serves as the final reviewer for all tax judgments and professional assessments on the platform. The AskLinTax brand represents a system and a standard — not any single individual.
              </p>
              <p className={styles.bodyText}>
                When you read something on AskLinTax, you're reading content that has been built with the same rigor as professional advice — made accessible to everyone.
              </p>
            </div>
            <div className={styles.standardsBadges}>
              {[
                { icon: '✓', label: 'CPA-Reviewed Content', sub: 'All articles reviewed by a licensed CPA' },
                { icon: '📅', label: 'Regularly Updated', sub: 'Reviewed annually and after major tax law changes' },
                { icon: '🔒', label: 'No Hidden Agenda', sub: 'We do not accept advertising or sponsored content' },
                { icon: '📖', label: 'Plain Language Standard', sub: 'Every concept explained before any technical term' },
              ].map((b, i) => (
                <div key={i} className={styles.standardsBadge}>
                  <div className={styles.badgeIcon}>{b.icon}</div>
                  <div>
                    <div className={styles.badgeLabel}>{b.label}</div>
                    <div className={styles.badgeSub}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING */}
      <section className={styles.roadmapSection}>
        <div className="container">
          <span className="section-label">Where We're Going</span>
          <h2 className="section-title">Phase 1: Knowledge first.</h2>
          <p className={styles.bodyText} style={{ maxWidth: 640, marginBottom: 40 }}>
            AskLinTax is currently in Phase 1 — focused entirely on building the most complete, accurate, and accessible U.S. tax knowledge platform for Chinese families and small businesses. We are not currently offering professional tax services.
          </p>
          <div className={styles.phaseGrid}>
            {[
              { phase: 'Phase 1', status: 'Now', title: 'Knowledge Platform', desc: 'Building 30–40 core knowledge articles, Tax Library, YouTube content, and the bilingual foundation.', active: true },
              { phase: 'Phase 2', status: 'Coming', title: 'Content Platform', desc: 'Expanding YouTube, 小紅書, and social content channels.', active: false },
              { phase: 'Phase 3', status: 'Coming', title: 'Trust Building', desc: 'Community, testimonials, professional network.', active: false },
              { phase: 'Phase 4', status: 'Coming', title: 'Professional Services', desc: 'Client portal, appointment booking, and full tax workflow — once the knowledge platform is established and the brand has earned trust.', active: false },
            ].map((p, i) => (
              <div key={i} className={`${styles.phaseCard} ${p.active ? styles.phaseCardActive : ''}`}>
                <div className={styles.phaseHeader}>
                  <span className={styles.phaseLabel}>{p.phase}</span>
                  <span className={`${styles.phaseStatus} ${p.active ? styles.phaseStatusActive : ''}`}>{p.status}</span>
                </div>
                <h3 className={styles.phaseTitle}>{p.title}</h3>
                <p className={styles.phaseDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className={styles.bottomCta}>
        <div className="container">
          <h2 className={styles.bottomCtaTitle}>Start exploring</h2>
          <p className={styles.bottomCtaSub}>The knowledge library is free. No sign-up required. Start with whatever question is on your mind.</p>
          <div className={styles.bottomCtaBtns}>
            <a href="/start" className="btn-gold">Find your starting point →</a>
            <a href="/library" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}>Browse Knowledge Library</a>
          </div>
        </div>
      </section>

    </Layout>
  )
}
