import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b7854c58-7224-4692-ae4f-c943ba6fd785/files/a7b2cf6e-ea87-4df9-8750-c506d3c889e5.jpg";

const services = [
  {
    icon: "ArrowDownToLine",
    title: "Разгрузка/погрузка",
    desc: "Разгрузим машину, поднимем на любой этаж. Работаем быстро — платите только за результат.",
    price: "от 800 ₽",
    tag: "Популярное",
  },
  {
    icon: "Sofa",
    title: "Сборка мебели",
    desc: "Соберём мебель любой сложности на новом месте. Шкафы, кровати, кухни — опыт 7+ лет.",
    price: "от 500 ₽",
    tag: null,
  },
];

const reviews = [
  {
    name: "Анастасия К.",
    rating: 5,
    text: "Переезжала с двушки на трёшку. Ребята приехали вовремя, работали быстро и аккуратно. Ни одной царапины на мебели! Очень рекомендую.",
    date: "12 марта 2026",
    avatar: "А",
  },
  {
    name: "Дмитрий В.",
    rating: 5,
    text: "Заказывал офисный переезд. Сложный переезд за один день — это реально с этими парнями. Всё разобрали, перевезли и собрали обратно.",
    date: "5 марта 2026",
    avatar: "Д",
  },
  {
    name: "Марина О.",
    rating: 5,
    text: "Помогли вывезти строительный мусор после ремонта. Быстро, без лишних разговоров. Цена адекватная. Буду обращаться снова.",
    date: "28 февраля 2026",
    avatar: "М",
  },
  {
    name: "Игорь С.",
    rating: 4,
    text: "Хорошие ребята, работают профессионально. Немного задержались на 20 минут, но предупредили. В целом доволен — рекомендую.",
    date: "18 февраля 2026",
    avatar: "И",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="Star" size={14} className={i < count ? "text-[#FF6B00] fill-[#FF6B00]" : "text-gray-600"} />
      ))}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const heroSection = useInView(0.1);
  const servicesSection = useInView(0.1);
  const reviewsSection = useInView(0.1);
  const contactSection = useInView(0.1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-golos overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-sm flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-xl tracking-wide uppercase">Помощник</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[["hero", "Главная"], ["services", "Услуги"], ["reviews", "Отзывы"], ["contact", "Контакты"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-white/60 hover:text-[#FF6B00] transition-colors duration-200 font-medium tracking-wide uppercase"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8C33] text-white px-5 py-2.5 rounded-sm font-semibold text-sm transition-all duration-200 hover:scale-105 uppercase tracking-wide"
          >
            <Icon name="Phone" size={14} />
            Вызвать
          </button>

          <button
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/5 py-4 px-4 flex flex-col gap-4">
            {[["hero", "Главная"], ["services", "Услуги"], ["reviews", "Отзывы"], ["contact", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-white/80 hover:text-[#FF6B00] font-medium tracking-wide uppercase text-sm py-1">
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="bg-[#FF6B00] text-white py-3 rounded-sm font-semibold text-sm uppercase tracking-wide">
              Вызвать грузчиков
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Грузчики"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
        </div>

        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#FF6B00]/5 rounded-full blur-[80px] pointer-events-none" />

        <div ref={heroSection.ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className={`max-w-2xl transition-all duration-1000 ${heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
              <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-pulse" />
              Профессиональные грузчики
            </div>

            <h1 className="font-oswald font-bold text-4xl sm:text-6xl uppercase" style={{ lineHeight: "0.95" }}>
              Услуги грузчиков
              <br />
              и <span className="text-[#FF6B00]">разнорабочих</span>
              <br />
              <span className="relative">
                по г.Артемовский
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 400 6" fill="none">
                  <path d="M0 3 Q100 0 200 3 Q300 6 400 3" stroke="#FF6B00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-white/60 text-lg mt-8 mb-10 max-w-md leading-relaxed">
              Команда из 2–4 человек приедет в течение 2 часов. Работаем без перекуров и задержек
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="group flex items-center gap-3 bg-[#FF6B00] hover:bg-[#FF8C33] text-white px-8 py-4 rounded-sm font-bold text-base transition-all duration-200 hover:scale-105 uppercase tracking-wide"
              >
                <Icon name="Phone" size={18} />
                Вызвать грузчиков
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="flex items-center gap-2 border border-white/20 hover:border-[#FF6B00]/50 text-white/80 hover:text-white px-8 py-4 rounded-sm font-semibold text-base transition-all duration-200 uppercase tracking-wide"
              >
                Наши услуги
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-white/10">
              {[["30 мин", "Ответим"], ["24/7", "Доступны"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-oswald text-3xl font-bold text-[#FF6B00]">{num}</div>
                  <div className="text-white/50 text-sm mt-0.5 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <button onClick={() => scrollTo("services")} className="text-white/30 hover:text-[#FF6B00] transition-colors">
            <Icon name="ChevronDown" size={28} />
          </button>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 bg-[#FF6B00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "Clock", text: "Приедем за 2 часа" },
              { icon: "ThumbsUp", text: "Опытная команда" },
              { icon: "CreditCard", text: "Честная цена" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Icon name={icon} size={20} className="text-white" />
                </div>
                <span className="font-bold text-white text-sm uppercase tracking-wide leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#0D0D0D]">
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`mb-16 transition-all duration-700 ${servicesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#FF6B00]" />
              Что мы делаем
            </div>
            <h2 className="font-oswald text-4xl sm:text-6xl font-bold uppercase">
              Наши <span className="text-[#FF6B00]">услуги</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group relative bg-[#161616] border border-white/5 hover:border-[#FF6B00]/40 rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1A1A1A] ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {service.tag && (
                  <div className="absolute top-4 right-4 bg-[#FF6B00] text-white text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                    {service.tag}
                  </div>
                )}
                <div className="w-12 h-12 bg-[#FF6B00]/10 group-hover:bg-[#FF6B00]/20 rounded-sm flex items-center justify-center mb-5 transition-colors">
                  <Icon name={service.icon} size={22} className="text-[#FF6B00]" />
                </div>
                <h3 className="font-oswald text-xl font-semibold uppercase tracking-wide mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FF6B00] font-bold text-lg">{service.price}</span>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="text-white/40 hover:text-[#FF6B00] text-xs font-semibold uppercase tracking-wide transition-colors flex items-center gap-1"
                  >
                    Заказать <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-oswald text-3xl sm:text-4xl font-bold uppercase">
              Нужна <span className="text-[#FF6B00]">срочная помощь?</span>
            </h3>
            <p className="text-white/50 mt-2">Ответим в течение 30 минут, приедем за 2 часа</p>
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="group flex items-center gap-3 bg-[#FF6B00] hover:bg-[#FF8C33] text-white px-8 py-4 rounded-sm font-bold text-base transition-all duration-200 hover:scale-105 uppercase tracking-wide whitespace-nowrap"
          >
            <Icon name="PhoneCall" size={18} />
            Позвоните мне
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-[#0D0D0D]">
        <div ref={reviewsSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`mb-16 transition-all duration-700 ${reviewsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#FF6B00]" />
              Клиенты о нас
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <h2 className="font-oswald text-4xl sm:text-6xl font-bold uppercase">
                Отзывы <span className="text-[#FF6B00]">клиентов</span>
              </h2>
              <div className="flex items-center gap-2 pb-1 sm:pb-2">
                <Stars count={5} />
                <span className="text-white/50 text-sm">4.9 из 5 на основе 200+ отзывов</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div
                key={review.name}
                className={`bg-[#161616] border border-white/5 rounded-sm p-6 transition-all duration-300 hover:border-white/10 ${reviewsSection.inView ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 bg-[#FF6B00] rounded-sm flex items-center justify-center font-bold text-white font-oswald text-lg flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{review.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Stars count={review.rating} />
                      <span className="text-white/30 text-xs">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#111]">
        <div ref={contactSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className={`transition-all duration-700 ${contactSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="inline-flex items-center gap-2 text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-4">
                <div className="w-8 h-px bg-[#FF6B00]" />
                Свяжитесь с нами
              </div>
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase mb-6">
                Оставьте <span className="text-[#FF6B00]">заявку</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
                Заполните форму — перезвоним за 30 минут, обсудим детали и рассчитаем точную стоимость. Без скрытых доплат.
              </p>

              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (963) 44-55-826" },
                  { icon: "MapPin", label: "Работаем", value: "По всему городу" },
                  { icon: "Clock", label: "Режим работы", value: "Ежедневно 7:00 — 23:00" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#FF6B00]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={18} className="text-[#FF6B00]" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs uppercase tracking-wide">{label}</div>
                      <div className="text-white font-semibold">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${contactSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {submitted ? (
                <div className="bg-[#161616] border border-[#FF6B00]/30 rounded-sm p-10 text-center">
                  <div className="w-16 h-16 bg-[#FF6B00] rounded-sm flex items-center justify-center mx-auto mb-5">
                    <Icon name="CheckCheck" size={28} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-2xl font-bold uppercase mb-3">Заявка принята!</h3>
                  <p className="text-white/50">Перезвоним вам в течение 30 минут</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#161616] border border-white/5 rounded-sm p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#0D0D0D] border border-white/10 focus:border-[#FF6B00]/50 text-white placeholder-white/20 px-4 py-3 rounded-sm outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Телефон *</label>
                      <input
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#0D0D0D] border border-white/10 focus:border-[#FF6B00]/50 text-white placeholder-white/20 px-4 py-3 rounded-sm outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Услуга</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#0D0D0D] border border-white/10 focus:border-[#FF6B00]/50 text-white px-4 py-3 rounded-sm outline-none transition-colors text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0D0D0D]">Выберите услугу...</option>
                      {services.map((s) => (
                        <option key={s.title} value={s.title} className="bg-[#0D0D0D]">{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Комментарий</label>
                    <textarea
                      placeholder="Опишите задачу: этаж, объём, дата переезда..."
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full bg-[#0D0D0D] border border-white/10 focus:border-[#FF6B00]/50 text-white placeholder-white/20 px-4 py-3 rounded-sm outline-none transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group flex items-center justify-center gap-3 bg-[#FF6B00] hover:bg-[#FF8C33] text-white py-4 rounded-sm font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] mt-2"
                  >
                    <Icon name="Send" size={16} />
                    Отправить заявку
                    <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-white/25 text-xs text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FF6B00] rounded-sm flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-base uppercase tracking-wide">Помощник</span>
          </div>
          <p className="text-white/25 text-sm">© 2026 Помощник. Все права защищены.</p>
          <div className="flex gap-3">
            {["Phone", "MessageCircle", "Instagram"].map((icon) => (
              <button key={icon} className="w-8 h-8 bg-white/5 hover:bg-[#FF6B00]/20 border border-white/5 hover:border-[#FF6B00]/30 rounded-sm flex items-center justify-center transition-all">
                <Icon name={icon} size={14} className="text-white/50" />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}