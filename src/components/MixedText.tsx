interface Props {
  text: string;
}

export function MixedText({ text }: Props) {
  return text.split(/([A-Za-z0-9]+)/).map((part, index) => (
    <span key={index} className={/^[A-Za-z0-9]+$/.test(part) ? 'mixed-latin' : undefined}>{part}</span>
  ));
}
