import about from '../data/about.json';

export default function Footer() {
  const { contact, mainInfo } = about;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <span>Thomas Avice, San Francisco</span>
          <nav aria-label="Elsewhere">
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={mainInfo.resume}>Resume</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
