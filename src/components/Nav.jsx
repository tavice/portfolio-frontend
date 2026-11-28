import { NavLink, Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link to="/" className="site-name">
          Thomas Avice <span>· Construction PM, San Francisco</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <NavLink to="/projects">Work</NavLink>
          <a href="/#about">About</a>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
