import { useState } from 'react';
import about from '../data/about.json';

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
      setStatus({ ok: true, text: 'Thanks, your message was sent. I will get back to you soon.' });
      setForm(EMPTY);
    } catch (err) {
      setStatus({
        ok: false,
        text:
          err.status === 429
            ? 'Too many messages from this connection. Please try again in an hour, or email me directly.'
            : `That didn't go through. You can email me directly at ${contact.email}.`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="page-title wrap">
        <div className="grid">
          <h1>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </h1>
          <p>{connect}</p>
          <div className="contact-links">
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={mainInfo.resume}>Resume (PDF)</a>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>Or write here</h2>
        </div>
        <div className="grid">
          <form className="form" onSubmit={onSubmit}>
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

            <button className="button" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send'}
            </button>

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
