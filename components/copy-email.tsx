'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { profile } from '../data/profile';

export function CopyEmail() {
  const [status, setStatus] = useState('');
  return <><button className="icon-button" type="button" aria-label="Copy email address" onClick={async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('Email copied');
    } catch {
      setStatus('Copy unavailable. Select the email address to copy it.');
    }
  }}>{status === 'Email copied' ? <Check size={18} /> : <Copy size={18} />}</button><span className="copy-status" role="status">{status}</span></>;
}
