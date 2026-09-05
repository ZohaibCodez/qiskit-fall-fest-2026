import type { Highlight } from '@/lib/types';
import { IconTile } from '@/components/shared/IconTile';
import { HIGHLIGHT_ICONS } from '@/components/shared/highlightIcons';
import styles from './HighlightsStrip.module.css';

export function HighlightsStrip({ highlights }: { highlights: Highlight[] }) {
  if (highlights.length === 0) return null;

  return (
    <div className={styles.strip}>
      {highlights.map((highlight) => {
        const icon = HIGHLIGHT_ICONS[highlight.icon] ?? HIGHLIGHT_ICONS.sparkles;
        return (
          <div className={styles.item} key={highlight.id}>
            <IconTile tone={icon.tone} size="sm">
              {icon.node}
            </IconTile>
            <div>
              <p className={styles.title}>{highlight.title}</p>
              <p className={styles.description}>{highlight.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
