import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b7854c58-7224-4692-ae4f-c943ba6fd785/files/a7b2cf6e-ea87-4df9-8750-c506d3c889e5.jpg";

const services = [
  {
    icon: "ArrowDownToLine",
    title: "Разгрузка/погрузка",
    desc: "Разгрузим машину, поднимем на любой этаж. Работаем быстро — платите только за результат.",
    price: "от 500 ₽",
    tag: "Популярное",
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
  const [sending, setSending] = useState(false);

  const heroSection = useInView(0.1);
  const servicesSection = useInView(0.1);
  const reviewsSection = useInView(0.1);
  const vacanciesSection = useInView(0.1);
  const contactSection = useInView(0.1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://functions.poehali.dev/c6273952-1177-468d-8fd2-510f28e8265b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error(err);
    }
    setSending(false);
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
            {[["hero", "Главная"], ["services", "Услуги"], ["reviews", "Отзывы"], ["vacancies", "Вакансии"], ["contact", "Контакты"]].map(([id, label]) => (
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
            {[["hero", "Главная"], ["services", "Услуги"], ["reviews", "Отзывы"], ["vacancies", "Вакансии"], ["contact", "Контакты"]].map(([id, label]) => (
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


      {/* VACANCIES */}
      <section id="vacancies" className="py-24 bg-[#0D0D0D]">
        <div ref={vacanciesSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 ${vacanciesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#FF6B00]" />
              Вакансии
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase mb-4">
              Работа в <span className="text-[#FF6B00]">команде</span>
            </h2>
            <p className="text-white/50 text-lg mb-12 max-w-xl">Ищем ответственных и физически крепких ребят. Официальное оформление, стабильные выплаты, дружный коллектив.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: "Водитель с личной Газелью или грузовиком",
                  type: "График обсуждается",
                  pay: "Сдельная з/п",
                  perks: ["Личный транспорт", "Сдельная оплата", "График обсуждается"],
                },
              ].map((v) => (
                <div key={v.title} className="bg-[#111] border border-white/5 rounded-sm p-8 hover:border-[#FF6B00]/30 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-oswald text-2xl font-bold uppercase tracking-wide mb-1">{v.title}</h3>
                      <span className="text-white/40 text-sm">{v.type}</span>
                    </div>
                    <span className="text-[#FF6B00] font-bold text-lg whitespace-nowrap">{v.pay}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {v.perks.map((p) => (
                      <span key={p} className="bg-white/5 text-white/60 text-xs px-3 py-1 rounded-sm font-medium uppercase tracking-wide">{p}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="flex items-center gap-2 text-[#FF6B00] hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors"
                  >
                    Откликнуться <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#111] border border-[#FF6B00]/20 rounded-sm p-6 flex flex-col sm:flex-row items-center gap-4">
              <Icon name="Users" size={32} className="text-[#FF6B00] shrink-0" />
              <div>
                <p className="font-semibold text-white mb-1">Не нашли подходящую вакансию?</p>
                <p className="text-white/50 text-sm">Оставьте заявку — свяжемся и расскажем об открытых позициях.</p>
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="ml-auto shrink-0 bg-[#FF6B00] hover:bg-[#FF8C33] text-white px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wide transition-all hover:scale-105 whitespace-nowrap"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contact" className="py-24 bg-[#111]">
        <div ref={contactSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-[#FF6B00]" />
              Контакты
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase mb-12">
              Свяжитесь <span className="text-[#FF6B00]">с нами</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (963) 44-55-826", href: "tel:+79634455826" },
                { icon: "MapPin", label: "Работаем", value: "По всему городу", href: null },
                { icon: "Clock", label: "Режим работы", value: "Ежедневно 7:00 — 23:00", href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="bg-[#161616] border border-white/5 rounded-sm p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon name={icon} size={20} className="text-[#FF6B00]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wide mb-1">{label}</div>
                    {href ? (
                      <a href={href} className="text-white font-semibold hover:text-[#FF6B00] transition-colors">{value}</a>
                    ) : (
                      <div className="text-white font-semibold">{value}</div>
                    )}
                  </div>
                </div>
              ))}
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