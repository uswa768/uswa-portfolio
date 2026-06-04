import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiArrowRight } from 'react-icons/fi';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: FiMail,     label: 'Email',    sub: personalInfo.email,                                         href: `mailto:${personalInfo.email}` },
    { icon: FiGithub,   label: 'GitHub',   sub: personalInfo.github.replace('https://', ''),                href: personalInfo.github,   target: '_blank' },
    { icon: FiLinkedin, label: 'LinkedIn', sub: personalInfo.linkedin.replace('https://', ''),              href: personalInfo.linkedin, target: '_blank' },
  ];

  return (
    <section id="contact" style={{ position: 'relative', padding: 'clamp(80px, 12vw, 140px) clamp(20px, 8%, 100px)', backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>

      {/* Ambient glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--accent-purple)', opacity: 0.04, filter: 'blur(120px)', top: '-10%', left: '-5%' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--accent-cyan)', opacity: 0.05, filter: 'blur(100px)', bottom: '-10%', right: '0%' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: '72px', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent-cyan)', marginBottom: '16px' }}>
            Contact
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Let's work{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              together
            </span>
          </h2>
          <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '16px auto 0', lineHeight: 1.7 }}>
            Have a project in mind or want to say hi? Fill out the form and I'll get back to you within 24 hours.
          </p>
        </div>

        {/* ── Grid: left info + right form ── */}
        <div className="contact-grid">

          {/* Left — info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '8px' }}>
              I'm currently open to freelance work and exciting collaborations. Whether it's a new website, a UI revamp, or a full-stack project — let's build something great.
            </p>

            {socials.map(({ icon: Icon, label, sub, href, target }) => (
              <a
                key={label}
                href={href}
                target={target}
                rel={target ? 'noopener noreferrer' : undefined}
                data-cursor="link"
                className="contact-social-card"
              >
                <div className="contact-social-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="contact-social-label">{label}</p>
                  <p className="contact-social-sub">{sub}</p>
                </div>
                <FiArrowRight className="contact-social-arrow" size={16} />
              </a>
            ))}
          </div>

          {/* Right — form */}
          <div className="contact-form-card">
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="contact-reset-btn">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-name-email-row">
                  <FormField label="Name">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required style={inputStyle} className="contact-input"
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.1)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </FormField>
                  <FormField label="Email">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required style={inputStyle} className="contact-input"
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.1)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </FormField>
                </div>

                <FormField label="Message">
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." required rows={5} style={{ ...inputStyle, resize: 'none' }} className="contact-input"
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.1)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </FormField>

                <button type="submit" disabled={status === 'sending'} className="contact-submit-btn" data-cursor="link">
                  {status === 'sending' ? (
                    <span className="contact-spinner" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1.2fr;
            gap: 60px;
          }
        }

        /* ── Social link cards ── */
        .contact-social-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          cursor: none;
        }
        .contact-social-card:hover {
          background: rgba(6,182,212,0.05);
          border-color: rgba(6,182,212,0.25);
          transform: translateX(4px);
        }
        .contact-social-card:hover .contact-social-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        .contact-social-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 11px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
        }
        .contact-social-label {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: #fff;
          margin: 0;
        }
        .contact-social-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 2px 0 0;
        }
        .contact-social-arrow {
          margin-left: auto;
          color: var(--accent-cyan);
          opacity: 0;
          transition: opacity 0.25s, transform 0.25s;
        }

        /* ── Form card ── */
        .contact-form-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        /* ── Inputs ── */
        .contact-input::placeholder {
          color: rgba(156,163,175,0.5);
        }

        /* ── Submit button ── */
        .contact-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 15px 24px;
          border-radius: 12px;
          border: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: #fff;
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-indigo) 100%);
          cursor: none;
          transition: opacity 0.25s, transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 20px rgba(6,182,212,0.2);
          min-height: 52px;
        }
        .contact-submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(6,182,212,0.3);
        }
        .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Loading spinner */
        .contact-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: contact-spin 0.7s linear infinite;
        }
        @keyframes contact-spin {
          to { transform: rotate(360deg); }
        }

        /* Reset button */
        .contact-reset-btn {
          padding: 10px 24px;
          border-radius: 9999px;
          border: 1px solid rgba(6,182,212,0.3);
          background: rgba(6,182,212,0.08);
          color: var(--accent-cyan);
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .contact-reset-btn:hover {
          background: rgba(6,182,212,0.15);
          border-color: var(--accent-cyan);
        }

        /* Responsive: stack name/email on mobile */
        @media (max-width: 520px) {
          .contact-name-email-row {
            grid-template-columns: 1fr !important;
          }
          .contact-form-card {
            padding: 24px 18px;
          }
        }
      `}</style>
    </section>
  );
};

/* ── Shared helpers ── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '12px 16px',
  color: '#ffffff',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
