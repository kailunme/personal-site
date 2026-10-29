// Only for trusted locale HTML already rendered with set:html. Preserve markup
// and entities while applying the same letter/digit correction as plain text.
export function formatMixedTypographyHtml(html: string): string {
  return html.replace(
    /(<[^>]*>|&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]*);)|([A-Za-z0-9]+)/gi,
    (match: string, markup: string | undefined) => markup
      ? match
      : `<span class="mixed-latin">${match}</span>`,
  );
}
