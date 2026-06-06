import { useState, useEffect } from "react";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "254757356989";
const MESSAGE = encodeURIComponent("Hi! I'm looking for a car. Could you help me find one?");

const WhatsAppFloat = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pulse, setPulse] = useState(true);

  // Show bubble after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      if (!dismissed) setShow(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [dismissed]);

  // Stop pulse after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`, "_blank");
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(false);
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat bubble */}
      {show && (
        <div
          className="relative bg-white dark:bg-zinc-900 border border-border rounded-2xl rounded-br-sm shadow-large px-4 py-3 max-w-[220px] cursor-pointer animate-in fade-in slide-in-from-bottom-3 duration-300"
          onClick={handleOpen}
          role="button"
          aria-label="Chat on WhatsApp"
        >
          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-2.5 w-2.5" />
          </button>

          {/* Avatar row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.524 5.855L.057 23.885a.5.5 0 0 0 .609.61l6.101-1.498A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 0 1-5.031-1.375l-.36-.214-3.733.916.95-3.642-.235-.374A9.865 9.865 0 0 1 2.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground leading-none">XploreCars</p>
              <p className="text-[10px] text-emerald-500 font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Online now
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="bg-[#dcf8c6] dark:bg-emerald-900/40 rounded-xl rounded-tl-sm px-3 py-2">
            <p className="text-xs text-zinc-800 dark:text-zinc-100 leading-snug font-medium">
              👋 We respond fast on WhatsApp!
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-snug mt-1">
              Tell us what car you need and we'll source it from Japan for you.
            </p>
            <p className="text-[10px] text-zinc-400 text-right mt-1">now</p>
          </div>

          {/* CTA hint */}
          <p className="text-[10px] text-center text-muted-foreground mt-2 font-medium">
            Tap to chat →
          </p>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={handleOpen}
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full shadow-large flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Pulse rings */}
        {pulse && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
            <span className="absolute inset-[-6px] rounded-full animate-ping opacity-20 animation-delay-300" style={{ backgroundColor: "#25D366" }} />
          </>
        )}
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.524 5.855L.057 23.885a.5.5 0 0 0 .609.61l6.101-1.498A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 0 1-5.031-1.375l-.36-.214-3.733.916.95-3.642-.235-.374A9.865 9.865 0 0 1 2.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z"/>
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppFloat;