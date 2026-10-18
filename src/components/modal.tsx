'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
export function Modal({open, close, title, children, drawer = false}: {open: boolean; close: () => void; title: string; children: ReactNode; drawer?: boolean}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    const previous = document.activeElement as HTMLElement | null;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { el.close(); document.body.style.overflow = old; previous?.focus(); };
  }, [open]);
  return <dialog ref={ref} className={`modal ${drawer ? 'drawer' : ''}`} aria-label={title} onCancel={close} onClick={event => {if(event.target === event.currentTarget) close();}}><div className="modal-inner"><div className="modal-heading"><h2>{title}</h2><button className="icon-button" aria-label={`Close ${title}`} onClick={close}><X size={22}/></button></div>{open && children}</div></dialog>;
}
