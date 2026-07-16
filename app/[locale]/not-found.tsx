import Link from "next/link";

// not-found n'a pas accès aux params : page volontairement bilingue.
export default function NotFound() {
  return (
    <section className="page-head" style={{ borderBottom: "none", padding: "110px 0 140px" }}>
      <div className="wrap">
        <div className="eyebrow">Erreur 404 · Error 404</div>
        <h1>Cette page n'existe pas.</h1>
        <p>
          Le lien que vous avez suivi ne mène nulle part. Nos soins, eux, sont
          bien là. / This page does not exist, but our treatments are very
          real.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
          <Link href="/fr" className="btn btn-laser">
            Retour à l'accueil
          </Link>
          <Link href="/en" className="btn btn-ghost">
            English home
          </Link>
        </div>
      </div>
    </section>
  );
}
