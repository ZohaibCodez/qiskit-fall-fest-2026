import type { MDXComponents } from 'mdx/types';

// Required by @next/mdx for the App Router. No overrides needed yet —
// MDX content picks up the same base typography as the rest of the site.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
