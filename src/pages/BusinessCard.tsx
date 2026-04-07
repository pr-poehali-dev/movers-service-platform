import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const CARD_W = 900;
const CARD_H = 500;

const FrontSide = () => (
  <div
    className="relative overflow-hidden flex flex-col justify-between"
    style={{
      width: CARD_W,
      height: CARD_H,
      background: "#0D0D0D",
      borderRadius: 24,
      padding: "48px 56px",
      fontFamily: "'Golos Text', sans-serif",
    }}
  >
    {/* Accent bar */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 8,
        height: "100%",
        background: "#FF6B00",
        borderRadius: "24px 0 0 24px",
      }}
    />

    {/* Top: logo + tagline */}
    <div style={{ paddingLeft: 8 }}>
      <div
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 52,
          fontWeight: 700,
          color: "#FF6B00",
          letterSpacing: 2,
          lineHeight: 1,
        }}
      >
        ПОМОЩНИК
      </div>
      <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 18, marginTop: 10, letterSpacing: 0.5 }}>
        Услуги грузчиков и разнорабочих
      </div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, marginTop: 4 }}>
        г. Артёмовский
      </div>
    </div>

    {/* Bottom: contacts */}
    <div style={{ paddingLeft: 8, display: "flex", gap: 56, alignItems: "flex-end" }}>
      <div>
        <div style={{ color: "#FF6B00", fontSize: 13, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          Телефон
        </div>
        <div style={{ color: "#fff", fontSize: 28, fontWeight: 600, letterSpacing: 1 }}>
          +7 (963) 44-55-826
        </div>
      </div>
      <div>
        <div style={{ color: "#FF6B00", fontSize: 13, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          Режим работы
        </div>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>
          Ежедневно 7:00 — 23:00
        </div>
      </div>
    </div>

    {/* Decorative circle */}
    <div
      style={{
        position: "absolute",
        right: -80,
        top: -80,
        width: 320,
        height: 320,
        borderRadius: "50%",
        border: "2px solid rgba(255,107,0,0.15)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: -20,
        top: -20,
        width: 180,
        height: 180,
        borderRadius: "50%",
        border: "2px solid rgba(255,107,0,0.1)",
        pointerEvents: "none",
      }}
    />
  </div>
);

const BackSide = () => (
  <div
    className="relative overflow-hidden flex flex-col justify-between"
    style={{
      width: CARD_W,
      height: CARD_H,
      background: "#FF6B00",
      borderRadius: 24,
      padding: "48px 56px",
      fontFamily: "'Golos Text', sans-serif",
    }}
  >
    {/* Top title */}
    <div>
      <div
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#0D0D0D",
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 28,
        }}
      >
        Наши услуги
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 48px" }}>
        {[
          { label: "Погрузка / разгрузка", price: "от 500 ₽" },
          { label: "Грузоперевозки на Ларгусе", price: "от 600 ₽" },
          { label: "Разнорабочие", price: "по договору" },
          { label: "Вывоз мусора", price: "по договору" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, borderBottom: "1px solid rgba(0,0,0,0.15)", paddingBottom: 10 }}>
            <span style={{ color: "#0D0D0D", fontSize: 17, fontWeight: 500 }}>{s.label}</span>
            <span style={{ color: "rgba(0,0,0,0.6)", fontSize: 15, whiteSpace: "nowrap" }}>{s.price}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 36,
          fontWeight: 700,
          color: "#0D0D0D",
          opacity: 0.15,
          letterSpacing: 3,
        }}
      >
        ПОМОЩНИК
      </div>
      <div style={{ color: "#0D0D0D", fontSize: 17, fontWeight: 600, opacity: 0.8 }}>
        +7 (963) 44-55-826
      </div>
    </div>

    {/* Decorative */}
    <div
      style={{
        position: "absolute",
        left: -60,
        bottom: -60,
        width: 260,
        height: 260,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.07)",
        pointerEvents: "none",
      }}
    />
  </div>
);

const BusinessCard = () => {
  const [side, setSide] = useState<"front" | "back">("front");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 p-8"
      style={{ background: "#1a1a1a", fontFamily: "'Golos Text', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Golos+Text:wght@400;500;600;700&display=swap');
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: fixed; top: 0; left: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <div className="no-print text-center">
        <h1 style={{ color: "#FF6B00", fontFamily: "'Oswald', sans-serif", fontSize: 28, letterSpacing: 1, marginBottom: 6 }}>
          МАКЕТ ВИЗИТКИ
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>
          Стандартный размер 90 × 50 мм
        </p>
      </div>

      {/* Toggle */}
      <div className="no-print flex gap-2" style={{ background: "#111", borderRadius: 12, padding: 4 }}>
        {(["front", "back"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            style={{
              padding: "8px 28px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
              background: side === s ? "#FF6B00" : "transparent",
              color: side === s ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all 0.2s",
            }}
          >
            {s === "front" ? "Лицевая" : "Оборотная"}
          </button>
        ))}
      </div>

      {/* Card preview */}
      <div
        id="print-area"
        ref={printRef}
        style={{ transform: "scale(0.75)", transformOrigin: "top center", marginBottom: -CARD_H * 0.25 }}
      >
        {side === "front" ? <FrontSide /> : <BackSide />}
      </div>

      {/* Both sides for print */}
      <div className="no-print" style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginTop: 16 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 8 }}>Лицевая</div>
          <div style={{ transform: "scale(0.38)", transformOrigin: "top left", width: CARD_W * 0.38, height: CARD_H * 0.38, overflow: "hidden" }}>
            <FrontSide />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 8 }}>Оборотная</div>
          <div style={{ transform: "scale(0.38)", transformOrigin: "top left", width: CARD_W * 0.38, height: CARD_H * 0.38, overflow: "hidden" }}>
            <BackSide />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="no-print flex gap-4 mt-4">
        <button
          onClick={handlePrint}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 32px",
            background: "#FF6B00",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Icon name="Printer" size={18} />
          Распечатать
        </button>
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 32px",
            background: "transparent",
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            fontSize: 16,
            textDecoration: "none",
          }}
        >
          <Icon name="ArrowLeft" size={18} />
          На сайт
        </a>
      </div>

      <p className="no-print" style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, marginTop: 8, textAlign: "center" }}>
        Для печати используйте альбомную ориентацию · Масштаб 100%
      </p>
    </div>
  );
};

export default BusinessCard;
