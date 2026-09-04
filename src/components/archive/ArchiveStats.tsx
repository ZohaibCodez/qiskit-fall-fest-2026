import { schedule, speakers, siteConfig } from '@/lib/content';
import styles from './ArchiveStats.module.css';

export function ArchiveStats() {
  const confirmedSessions = schedule.filter((s) => s.status === 'confirmed').length;
  const confirmedSpeakers = speakers.filter((s) => s.status === 'confirmed').length;
  const { attendeesCount } = siteConfig.archive;

  const stats: Array<[string, string]> = [
    ['Sessions', String(confirmedSessions || schedule.length)],
    ['Speakers', String(confirmedSpeakers || speakers.length)],
    ['Attendees', attendeesCount != null ? String(attendeesCount) : 'TBA'],
  ];

  return (
    <div className={styles.grid}>
      {stats.map(([label, value]) => (
        <div className={styles.stat} key={label}>
          <span className={styles.value}>{value}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}
