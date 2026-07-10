export default function Logo({
  variant = 'light',
  as: Title = 'p',
  compactOnMobile = false,
}: {
  variant?: 'light' | 'dark'
  as?: 'h1' | 'p'
  compactOnMobile?: boolean
}) {
  const titleColor = variant === 'dark' ? '#f5efe4' : '#1f3d2f'
  const taglineColor = variant === 'dark' ? '#f5efe4' : '#6f6a5e'
  const dividerColor = variant === 'dark' ? 'rgba(245,239,228,0.4)' : 'rgba(111,106,94,0.4)'
  const detailsClassName = compactOnMobile ? 'hidden sm:block' : undefined

  return (
    <div className={compactOnMobile ? 'text-center' : undefined}>
      <div className="inline-block">
        <Title
          className="font-display"
          style={{ fontSize: '22px', fontWeight: 600, lineHeight: '22px', color: titleColor, whiteSpace: 'nowrap' }}
        >
          Casa Ania
        </Title>
        <div className={detailsClassName} style={{ height: '0.5px', width: '100%', backgroundColor: dividerColor, margin: '4px 0' }} />
      </div>
      <p
        className={detailsClassName}
        style={{ fontSize: '11px', letterSpacing: '2px', lineHeight: '12px', color: taglineColor, whiteSpace: 'nowrap' }}
      >
        AFFITTACAMERE · ROZZANO
      </p>
    </div>
  )
}
