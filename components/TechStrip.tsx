/**
 * Bandeau des technologies du cabinet — liste statique et lisible
 * (l'ancien défilement infini gênait la lecture et violait WCAG 2.2.2).
 */
export default function TechStrip({ techs }: { techs: readonly string[] }) {
  return (
    <div className="tech-strip">
      <ul className="tech-list">
        {techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );
}
