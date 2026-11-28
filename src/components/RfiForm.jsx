import { useEffect, useState } from 'react';
import about from '../data/about.json';

const API_URL = import.meta.env.REACT_APP_RENDER_URL || 'http://localhost:10000';
const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };

// The contact form, laid out as an RFI: To / Date / From / Subject / Question.
export default function RfiForm() {
  const { contact } = about;
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null); // { ok, text }
  const [sending, setSending] = useState(false);
  const [today, setToday] = useState('');

  // Date is filled in on the client so the pre-rendered page never goes stale.
  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    const sentTo = form.email;
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
      setStatus({ ok: true, text: `Thanks. I'll reply to ${sentTo}.` });
      setForm(EMPTY);
    } catch (err) {
      setStatus({
        ok: false,
        text:
          err.status === 429
            ? 'RFI not sent: too many from this connection in the last hour. Try again later, or email me directly.'
            : `RFI not sent. Check your connection and try again, or email ${contact.email}.`,
      });
    } finally {
      setSending(false);
    }
  };

  if (status?.ok) {
    return (
      <div className="rfi rfi-done" role="status">
        <p className="rfi-done-title">RFI submitted</p>
        <p>{status.text}</p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus(null)}>
          Submit another RFI
        </button>
      </div>
    );
  }

  return (
    <form className="rfi" onSubmit={onSubmit} aria-describedby="rfi-req">
      {/* Honeypot: hidden from people and screen readers, bots fill it in */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="rfi-row">
        <div className="rfi-cell">
          <span className="rfi-k">To</span>
          <span className="rfi-v">Thomas Avice</span>
        </div>
        <div className="rfi-cell">
          <span className="rfi-k">Date</span>
          <span className="rfi-v">{today}</span>
        </div>
      </div>
      <div className="rfi-row">
        <label className="rfi-cell">
          <span className="rfi-k">From</span>
          <input name="name" value={form.name} onChange={onChange} autoComplete="name" required placeholder="Your name" />
        </label>
        <label className="rfi-cell">
          <span className="rfi-k">Email</span>
          <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" required placeholder="you@company.com" />
        </label>
      </div>
      <label className="rfi-cell">
        <span className="rfi-k">Subject</span>
        <input name="subject" value={form.subject} onChange={onChange} required />
      </label>
      <label className="rfi-cell">
        <span className="rfi-k">Question</span>
        <textarea name="message" value={form.message} onChange={onChange} required rows={6} />
      </label>
      <div className="rfi-foot">
        <button className="btn" type="submit" disabled={sending}>
          {sending ? 'Submitting…' : 'Submit RFI'}
        </button>
        <p className="muted rfi-req" id="rfi-req">
          All fields are required. Or email{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
        {status && (
          <p className={`rfi-status ${status.ok ? 'ok' : 'err'}`} role="status">
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
