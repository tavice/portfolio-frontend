import { useState } from 'react';
import about from '../data/about.json';
import SheetLabel from '../components/SheetLabel';
import { ArrowRight, ArrowUpRight, Download, Mail } from '../components/Icons';

const API_URL = import.meta.env.REACT_APP_RENDER_URL || 'http://localhost:10000';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };

export default function Contact() {
  const { contact, mainInfo, connect } = about;
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null); // { ok: boolean, text: string }
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }
      setStatus({ ok: true, text: 'Thanks, your message is on its way. I will get back to you soon.' });
      setForm(EMPTY);
    } catch (err) {
      setStatus({
        ok: false,
        text:
          err.status === 429
            ? 'Too many messages from this connection. Please try again in an hour, or email me directly.'
            : `Something went wrong sending that. You can email me directly at ${contact.email}.`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <SheetLabel no="A-400">Contact</SheetLabel>
          <h1 className="h-display">
            Let's <em>talk.</em>
          </h1>
          <p className="lead">{connect}</p>
        </div>
      </header>

      <section className="sheet" style={{ paddingTop: 0, borderBottom: 0 }}>
        <div className="wrap contact-grid" style={{ marginTop: 0 }}>
          <div>
            <ul className="direct">
              <li>
                <a href={`mailto:${contact.email}`}>
                  <span className="mono">Email</span>
                  <span className="val">{contact.email}</span>
                  <Mail />
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="mono">LinkedIn</span>
                  <span className="val">in/thomasavice</span>
                  <ArrowUpRight />
                </a>
              </li>
              <li>
                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                  <span className="mono">GitHub</span>
                  <span className="val">tavice</span>
                  <ArrowUpRight />
                </a>
              </li>
              <li>
                <a href={mainInfo.resume}>
                  <span className="mono">Resume</span>
                  <span className="val">PDF</span>
                  <Download />
                </a>
              </li>
            </ul>
            <p className="mono" style={{ color: 'var(--ink-3)', marginTop: 24 }}>
              Based in {mainInfo.location}
            </p>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <div className="form-head mono">
              <span>Transmittal</span>
              <span>To: T. Avice</span>
            </div>

            {/* Honeypot: hidden from people and screen readers, bots fill it in */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input
                type="text"
                id="website"
                name="website"
                value={form.website}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={onChange} required />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={onChange} required />
            </div>

            <div>
              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'} {!sending && <ArrowRight />}
              </button>
            </div>

            {status && (
              <p className={`form-status ${status.ok ? 'ok' : 'err'}`} role="status">
                {status.text}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
