import { Fragment } from 'react';
import styles from './CodeWindow.module.css';

/**
 * Minimal Python highlighter.
 *
 * Deliberately not a syntax-highlighting library: this renders one short,
 * fixed snippet, and shipping ~300KB of highlighter for it would cost far
 * more than it's worth. Tokens are emitted as React elements (never
 * dangerouslySetInnerHTML), so the code text is escaped by React as normal.
 */

const KEYWORDS = new Set(['from', 'import', 'as', 'def', 'return', 'for', 'in', 'if', 'else', 'with', 'class']);
const BUILTINS = new Set(['print', 'range', 'len', 'int', 'str', 'list', 'dict']);

// Order matters: comments and strings win over everything inside them.
const TOKEN_RE = /(#[^\n]*)|('[^']*'|"[^"]*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()|([A-Za-z_][A-Za-z0-9_]*)/g;

function highlightLine(line: string, lineKey: number) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(line)) !== null) {
    const [text, comment, str, num, call, word] = match;

    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`t${lineKey}-${i++}`}>{line.slice(lastIndex, match.index)}</Fragment>);
    }

    let className: string | undefined;
    if (comment) className = styles.comment;
    else if (str) className = styles.string;
    else if (num) className = styles.number;
    else if (call) className = BUILTINS.has(call) ? styles.builtin : styles.call;
    else if (word && KEYWORDS.has(word)) className = styles.keyword;

    nodes.push(
      className ? (
        <span className={className} key={`t${lineKey}-${i++}`}>
          {text}
        </span>
      ) : (
        <Fragment key={`t${lineKey}-${i++}`}>{text}</Fragment>
      ),
    );

    lastIndex = match.index + text.length;
  }

  if (lastIndex < line.length) {
    nodes.push(<Fragment key={`t${lineKey}-${i++}`}>{line.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}

export function CodeWindow({ code, label = 'Qiskit example' }: { code: string; label?: string }) {
  return (
    <div className={styles.window}>
      <div className={styles.bar} aria-hidden="true">
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
      </div>
      <pre className={styles.code} aria-label={label}>
        <code>
          {code.split('\n').map((line, index) => (
            <Fragment key={index}>
              {highlightLine(line, index)}
              {'\n'}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}
