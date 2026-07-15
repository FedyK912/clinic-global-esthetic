/** Bandeau défilant des technologies du cabinet. */
export default function TechStrip({ techs }: { techs: readonly string[] }) {
  return (
    <div className="tech-strip" aria-hidden="true">
      <div className="tech-track">
        {[0, 1].map((copy) => (
          <div className="tech-group" key={copy}>
            {techs.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
