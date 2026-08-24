export default function Logo({
  variant = 'light',
  as: Title = 'p',
  compactOnMobile = false,
  header = false,
}: {
  variant?: 'light' | 'dark'
  as?: 'h1' | 'p'
  compactOnMobile?: boolean
  header?: boolean
}) {
  const titleColor = variant === 'dark' ? '#f5efe4' : '#1f3d2f'
  const taglineColor = variant === 'dark' ? '#f5efe4' : '#6f6a5e'
  const dividerColor = variant === 'dark' ? 'rgba(245,239,228,0.4)' : 'rgba(111,106,94,0.4)'
  const detailsClassName = compactOnMobile ? 'hidden sm:block' : undefined

  return (
    <div className={compactOnMobile ? 'text-center' : undefined}>
      <div className="inline-block">
        <Title
          className={header ? 'font-display text-[28px] leading-[28px] sm:text-[23px] sm:leading-[23px]' : 'font-display'}
          style={
            header
              ? { fontWeight: 500, color: titleColor, whiteSpace: 'nowrap' }
              : { fontSize: '22px', fontWeight: 500, lineHeight: '22px', color: titleColor, whiteSpace: 'nowrap' }
          }
        >
          Casa Ania
        </Title>
        <div
          className={header ? 'my-[2px] sm:my-1' : detailsClassName}
          style={
            header
              ? { height: '0.5px', width: '100%', backgroundColor: dividerColor }
              : { height: '0.5px', width: '100%', backgroundColor: dividerColor, margin: '4px 0' }
          }
        />
      </div>
      <p
        className={
          header
            ? 'text-[9px] font-medium tracking-[0.18em] leading-[1.2] text-[#777777] sm:text-[10.5px] sm:tracking-[0.22em] sm:leading-[12px] sm:text-[#6f6a5e]'
            : detailsClassName
        }
        style={
          header
            ? { whiteSpace: 'nowrap' }
            : { fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.22em', lineHeight: '12px', color: taglineColor, whiteSpace: 'nowrap' }
        }
      >
        AFFITTACAMERE · ROZZANO
      </p>
    </div>
  )
}
