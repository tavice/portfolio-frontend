import about from '../data/about.json';

export default function Footer() {
  const { contact, mainInfo } = about;
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span className="mono">© {new Date().getFullYear()} Thomas Avice · San Francisco</span>
        <div className="footer-links">
          <a href={`mailto:${contact.email}`}>Email</a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={mainInfo.resume}>Resume</a>
        </div>
      </div>
    </footer>
  );
}
