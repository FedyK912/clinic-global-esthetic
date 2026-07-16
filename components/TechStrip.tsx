/**
 * Bandeau des technologies du cabinet — défilement continu et doux.
 * En pause au survol, désactivé (liste statique) si l'utilisateur préfère
 * les animations réduites ; une liste cachée reste lisible par les lecteurs
 * d'écran (le ruban animé leur est masqué).
 */
export default function TechStrip({ techs }: { techs: readonly string[] }) {
  return (
    <div className="tech-strip">
      <ul className="sr-only">
        {techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="tech-track" aria-hidden="true">
        {[0, 1, 2, 3].map((copy) => (
          <ul className="tech-list" key={copy}>
            {techs.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
