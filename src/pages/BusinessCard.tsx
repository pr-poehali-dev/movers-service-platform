import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";

const CARD_W = 900;
const CARD_H = 500;
const QR_URL = "https://gruz66.ru";
const PHONE = "+7 (963) 44-55-826";

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

    {/* Top: QR + название */}
    <div style={{ paddingLeft: 8, display: "flex", gap: 40, alignItems: "flex-start" }}>
      {/* QR код */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 10,
            boxShadow: "0 4px 24px rgba(255,107,0,0.2)",
          }}
        >
          <QRCodeSVG
            value={QR_URL}
            size={120}
            bgColor="#ffffff"
            fgColor="#0D0D0D"
            level="M"
          />
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 0.5 }}>
          gruz66.ru
        </div>
      </div>

      {/* Название и описание */}
      <div style={{ paddingTop: 8 }}>
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
    </div>

    {/* Bottom: телефон + режим работы */}
    <div style={{ paddingLeft: 8, display: "flex", gap: 56, alignItems: "flex-end" }}>
      <div>
        <div style={{ color: "#FF6B00", fontSize: 13, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          Телефон
        </div>
        <div style={{ color: "#fff", fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>
          {PHONE}
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

    {/* Decorative circles */}
    <div style={{ position: "absolute", right: -80, top: -80, width: 320, height: 320, borderRadius: "50%", border: "2px solid rgba(255,107,0,0.12)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", right: -20, top: -20, width: 180, height: 180, borderRadius: "50%", border: "2px solid rgba(255,107,0,0.08)", pointerEvents: "none" }} />
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
    {/* Заголовок */}
    <div
      style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: 26,
        fontWeight: 700,
        color: "#0D0D0D",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 28,
      }}
    >
      Наши услуги
    </div>

    {/* Услуги */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        { label: "Разгрузка / погрузка", desc: "Профессиональные грузчики, быстро и аккуратно" },
        { label: "Малогабаритные грузоперевозки на Ларгусе", desc: "Квартирные переезды, доставка мебели и вещей" },
      ].map((s) => (
        <div
          key={s.label}
          style={{
            background: "rgba(0,0,0,0.08)",
            borderRadius: 14,
            padding: "16px 20px",
          }}
        >
          <div style={{ color: "#0D0D0D", fontSize: 18, fontWeight: 700 }}>{s.label}</div>
          <div style={{ color: "rgba(0,0,0,0.55)", fontSize: 14, marginTop: 4 }}>{s.desc}</div>
        </div>
      ))}
    </div>

    {/* Bottom */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
      <div
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#0D0D0D",
          opacity: 0.15,
          letterSpacing: 3,
        }}
      >
        ПОМОЩНИК
      </div>
      <div style={{ color: "#0D0D0D", fontSize: 20, fontWeight: 700 }}>
        {PHONE}
      </div>
    </div>

    {/* Decorative */}
    <div style={{ position: "absolute", left: -60, bottom: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(0,0,0,0.07)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", right: -40, top: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(0,0,0,0.05)", pointerEvents: "none" }} />
  </div>
);

const BusinessCard = () => {
  const [side, setSide] = useState<"front" | "back">("front");
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const downloadSide = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadAll = async () => {
    setDownloading(true);
    await downloadSide(frontRef, "vizitka-licevaya.png");
    await new Promise((r) => setTimeout(r, 300));
    await downloadSide(backRef, "vizitka-oborotnaya.png");
    setDownloading(false);
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

      {/* Both sides preview thumbnails */}
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

      {/* Hidden full-res refs for download */}
      <div style={{ position: "fixed", left: -9999, top: -9999, pointerEvents: "none" }}>
        <div ref={frontRef}><FrontSide /></div>
        <div ref={backRef}><BackSide /></div>
      </div>

      {/* Actions */}
      <div className="no-print flex gap-4 mt-4 flex-wrap justify-center">
        <button
          onClick={handleDownloadAll}
          disabled={downloading}
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
            cursor: downloading ? "wait" : "pointer",
            opacity: downloading ? 0.7 : 1,
          }}
        >
          <Icon name={downloading ? "Loader" : "Download"} size={18} />
          {downloading ? "Скачивание..." : "Скачать PNG (обе стороны)"}
        </button>
        <button
          onClick={handlePrint}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 32px",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
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
            color: "rgba(255,255,255,0.3)",
            border: "1px solid rgba(255,255,255,0.08)",
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
        PNG в высоком качестве (3×) · для передачи в типографию
      </p>
    </div>
  );
};

export default BusinessCard;