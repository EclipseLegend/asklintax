import styles from './SocialLinks.module.css'

// Official AskLinTax social accounts. Platform names come from common.json (social.platforms).
export const SOCIAL_LINKS = [
  { id: 'youtube',     href: 'https://youtube.com/@AskLinTax' },
  { id: 'facebook',    href: 'https://www.facebook.com/profile.php?id=61595093760302' },
  { id: 'instagram',   href: 'https://www.instagram.com/asklintax/' },
  { id: 'xiaohongshu', href: 'https://xhslink.cn/m/7Pi24sEJnB2' },
  { id: 'x',           href: 'https://x.com/AskLinTax' },
]

// Simple inline line icons (no icon library), drawn in currentColor.
const ICONS = {
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8H17V4.5h-2.8A4.2 4.2 0 0 0 10 8.7V11H7.5v3.5H10V21h3.5v-6.5h2.6l.5-3.5h-3.1V9a1 1 0 0 1 1-1z" fill="currentColor" stroke="none" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  xiaohongshu: (
    <text x="12" y="19.5" textAnchor="middle" fontSize="20" fontWeight="600" fill="currentColor" stroke="none">書</text>
  ),
  x: (
    <>
      <path d="M4 4h4.6L20 20h-4.6z" />
      <path d="M19.6 4l-6.3 7.1M10.7 12.9L4.4 20" />
    </>
  ),
}

export function SocialIcon({ id }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONS[id]}
    </svg>
  )
}

// One external social link: opens in a new tab, accessible name includes the visible platform name.
export function SocialLink({ link, t, className }) {
  const name = t(`social.platforms.${link.id}`)
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}
      aria-label={t('social.ariaLabel').replace('{platform}', name)}>
      <SocialIcon id={link.id} />
      <span>{name}</span>
    </a>
  )
}

// Footer "Follow AskLinTax" block (dark footer background).
export default function SocialLinks({ t }) {
  return (
    <div className={styles.follow}>
      <div className={styles.followText}>
        <h4>{t('social.title')}</h4>
        <p>{t('social.sub')}</p>
      </div>
      <ul className={styles.list}>
        {SOCIAL_LINKS.map(link => (
          <li key={link.id}><SocialLink link={link} t={t} className={styles.link} /></li>
        ))}
      </ul>
    </div>
  )
}
