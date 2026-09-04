import Image from 'next/image';
import styles from './PlaceholderAvatar.module.css';

export function PlaceholderAvatar({
  src,
  alt,
  size = 96,
}: {
  src: string | null;
  alt: string;
  size?: number;
}) {
  const finalSrc = src ?? '/images/placeholders/avatar-placeholder.svg';
  return (
    <span className={styles.wrap} style={{ width: size, height: size }}>
      <Image src={finalSrc} alt={alt} width={size} height={size} className={styles.img} />
    </span>
  );
}
