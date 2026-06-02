import React from 'react';
import { cn } from '@/lib/utils';
import { type LucideIcon, PlusIcon } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

// ---------------------------------------------------------------------------
// ContactCard
// ---------------------------------------------------------------------------

export function ContactCard({
  title = 'Contact With Us',
  description =
  'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <>
      {/* Scoped styles — Tailwind classes translated to Vanilla CSS */}
      <style>{`
        /* ---- ContactCard root ---- */
        .cc-root {
          position: relative;
          display: grid;
          width: 100%;
          height: 100%;
          background: var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));
          border: 1px solid var(--glass-border);
          box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.6);
          grid-template-columns: 1fr;
        }

        @media (min-width: 768px) {
          .cc-root { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .cc-root { grid-template-columns: 2fr 1fr; }
        }

        /* ---- Corner plus icons ---- */
        .cc-plus {
          position: absolute;
          width: 24px;
          height: 24px;
          color: var(--accent-cyan);
          opacity: 0.7;
          z-index: 10;
        }
        .cc-plus--tl { top: -12px;  left: -12px;  }
        .cc-plus--tr { top: -12px;  right: -12px; }
        .cc-plus--bl { bottom: -12px; left: -12px;  }
        .cc-plus--br { bottom: -12px; right: -12px; }

        /* ---- Left info column ---- */
        .cc-info-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (min-width: 1024px) {
          .cc-info-col { grid-column: span 1; } /* stays within 2-col left side */
        }

        .cc-info-body {
          position: relative;
          height: 100%;
          padding: 32px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .cc-info-body { padding: 32px; }
        }

        .cc-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(1.75rem, 3vw, 3rem);
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .cc-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.65;
          max-width: 520px;
        }
        @media (min-width: 768px) { .cc-description { font-size: 1rem; } }
        @media (min-width: 1024px) { .cc-description { font-size: 1.05rem; } }

        /* ---- Contact info items grid ---- */
        .cc-items-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .cc-items-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .cc-items-grid { grid-template-columns: 1fr 1fr 1fr; }
        }

        /* ---- Single contact info item ---- */
        .cc-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
        }

        .cc-item-icon-wrap {
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          transition: background 0.3s, border-color 0.3s;
        }
        .cc-item:hover .cc-item-icon-wrap {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.25);
        }

        .cc-item-label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #ffffff;
        }
        .cc-item-value {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        /* ---- Right form column ---- */
        .cc-form-col {
          background: rgba(255, 255, 255, 0.015);
          border-top: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 20px;
        }
        @media (min-width: 768px) {
          .cc-form-col {
            grid-column: span 1;
            border-top: none;
            border-left: 1px solid var(--glass-border);
          }
        }
      `}</style>

      <div className={cn('cc-root', className)} {...props}>
        {/* Corner plus icons */}
        <PlusIcon className="cc-plus cc-plus--tl" />
        <PlusIcon className="cc-plus cc-plus--tr" />
        <PlusIcon className="cc-plus cc-plus--bl" />
        <PlusIcon className="cc-plus cc-plus--br" />

        {/* Left: title + description + contact info */}
        <div className="cc-info-col">
          <div className="cc-info-body">
            <h2 className="cc-title">{title}</h2>
            <p className="cc-description">{description}</p>
            {contactInfo && contactInfo.length > 0 && (
              <div className="cc-items-grid">
                {contactInfo.map((info, index) => (
                  <ContactInfo key={index} {...info} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: form slot */}
        <div className={cn('cc-form-col', formSectionClassName)}>
          {children}
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// ContactInfo (sub-component)
// ---------------------------------------------------------------------------

function ContactInfo({ icon: Icon, label, value, className, ...props }: ContactInfoProps) {
  return (
    <div className={cn('cc-item', className)} {...props}>
      <div className="cc-item-icon-wrap">
        <Icon size={20} />
      </div>
      <div>
        <p className="cc-item-label">{label}</p>
        <p className="cc-item-value">{value}</p>
      </div>
    </div>
  );
}
