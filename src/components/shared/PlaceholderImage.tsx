import Image from 'next/image';
import styles from './PlaceholderImage.module.css';

export function PlaceholderImage({
  src,
  alt,
  fallbackLabel,
}: {
  src: string | null;
  alt: string;
  fallbackLabel?: string;
}) {
  if (!src) {
    return (
      <div className={styles.wrap}>
        <Image
          src="/images/placeholders/photo-placeholder.svg"
          alt={alt}
          fill
          className={styles.img}
        />
        {fallbackLabel && <span className={styles.label}>{fallbackLabel}</span>}
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <Image src={src} alt={alt} fill className={styles.img} />
    </div>
  );
}
