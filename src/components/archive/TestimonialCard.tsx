import type { Testimonial } from '@/lib/types';
import { PlaceholderAvatar } from '@/components/shared/PlaceholderAvatar';
import styles from './TestimonialCard.module.css';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className={styles.card}>
      <PlaceholderAvatar src={testimonial.photo} alt={testimonial.name} size={48} />
      <div>
        <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
        <p className={styles.name}>{testimonial.name}</p>
        <p className={styles.role}>{testimonial.role}</p>
      </div>
    </article>
  );
}

export function TestimonialsEmptyState() {
  return <p className={styles.empty}>Testimonials coming soon.</p>;
}
