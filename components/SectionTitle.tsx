/**
 * Titre de section conforme à la charte « TOOLBOX » :
 *   - 1er mot (lead) en BLEU GRAS (#255EE1, le carré/bleu de marque)
 *   - reste du titre en NOIR (ou blanc sur fond sombre), poids normal
 *   - ponctuation forte finale (le « carré ») en BLEU
 *   - le tout en MAJUSCULES
 *
 * `tone` adapte les couleurs au fond :
 *   - light : fond clair  -> lead bleu / reste noir / point bleu
 *   - dark  : fond sombre -> lead bleu / reste blanc / point bleu
 *   - blue  : boîte bleue -> lead blanc / reste blanc / point blanc
 *
 * Le bleu est codé en dur (#255EE1) car le token `secondary` rend gris
 * sur la home (.theme-index) — voir globals.css.
 */
type Tone = 'light' | 'dark' | 'blue';

export default function SectionTitle({
  lead,
  rest,
  end = '.',
  tone = 'light',
  as: Tag = 'h2',
  className = 'text-headline-lg',
}: {
  lead: string;
  rest?: string;
  end?: string;
  tone?: Tone;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}) {
  const leadColor = tone === 'blue' ? 'text-white' : 'text-accent-blue';
  const restColor = tone === 'light' ? 'text-[#12100B]' : 'text-white';
  const endColor = tone === 'blue' ? 'text-white' : 'text-accent-blue';

  return (
    <Tag className={`font-headline-lg uppercase tracking-tight ${className}`}>
      <span className={`font-black ${leadColor}`}>{lead}</span>
      {rest ? <span className={`font-normal ${restColor}`}> {rest}</span> : null}
      <span className={`font-black ${endColor}`}>{end}</span>
    </Tag>
  );
}
