import { Link } from "react-router-dom";
import heroImage from "./assets/hero.png";

export default function SiteLayout({ eyebrow, title, description, children, backTo = "/" }) {
  return (
    <div className="page-shell">
      <img className="page-backdrop" src={heroImage} alt="" />
      <div className="page-scrim" />
      <div className="page-content">
        <header className="page-header">
          <Link className="ghost-button" to={backTo}>
            Return
          </Link>
          <div className="page-heading">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
