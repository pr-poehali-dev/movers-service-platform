import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const reviews = [
  {
    id: 1,
    name: "Андрей К.",
    date: "10 февраля 2026",
    rating: 5,
    service: "Переезд квартиры",
    text: "Отличная работа! Переехали быстро, всё аккуратно упаковали и перевезли без единого повреждения. Грузчики вежливые, работали слаженно. Очень доволен, буду рекомендовать друзьям.",
  },
  {
    id: 2,
    name: "Марина С.",
    date: "22 января 2026",
    rating: 5,
    service: "Разгрузка контейнера",
    text: "Грузчики приехали вовремя, работали быстро и аккуратно. Цена честная, без скрытых доплат. Всё сделали за 2 часа, хотя я думала займёт дольше. Спасибо большое!",
  },
  {
    id: 3,
    name: "Дмитрий В.",
    date: "5 марта 2026",
    rating: 5,
    service: "Вывоз строительного мусора",
    text: "Вывезли строительный мусор после ремонта. Быстро и без лишних вопросов. Уложились в смету, ничего лишнего не насчитали. Буду обращаться ещё.",
  },
  {
    id: 4,
    name: "Ольга Н.",
    date: "14 декабря 2025",
    rating: 5,
    service: "Переезд офиса",
    text: "Переезжали офис в новое помещение. Всё организовали чётко: упаковали технику, мебель разобрали и собрали на месте. Ни одной царапины, ни одной задержки. Молодцы!",
  },
  {
    id: 6,
    name: "Татьяна М.",
    date: "28 октября 2025",
    rating: 4,
    service: "Переезд квартиры",
    text: "В целом остались довольны. Немного задержались с приездом, но предупредили заранее. Работали аккуратно, крупную мебель перенесли без повреждений. За цену — всё честно.",
  },
  {
    id: 7,
    name: "Иван Л.",
    date: "15 сентября 2025",
    rating: 5,
    service: "Разгрузка фуры",
    text: "Разгружали фуру с оборудованием. Ребята справились за 3 часа, хотя объём был большой. Работали без перекуров, всё аккуратно сложили на склад. Очень профессионально.",
  },
  {
    id: 8,
    name: "Наталья Р.",
    date: "2 августа 2025",
    rating: 5,
    service: "Переезд квартиры",
    text: "Переезжала с 3-комнатной квартиры. Всё прошло отлично! Грузчики аккуратные, вежливые. Даже помогли расставить мебель на новом месте. Буду обращаться снова.",
  },
  {
    id: 8,
    name: "Данил",
    date: "31 января 2026",
    rating: 5,
    service: "Услуги грузчиков",
    text: "Пришли вовремя. Подняли быстро и аккуратно. Всё было сделано как и договорились.",
  },
  {
    id: 9,
    name: "Оксана",
    date: "22 января 2026",
    rating: 5,
    service: "Услуги грузчиков",
    text: "Рекомендую.",
  },
  {
    id: 10,
    name: "Анастасия",
    date: "6 января 2026",
    rating: 5,
    service: "Грузоперевозка на Ларгусе",
    text: "Покупала стиральную машинку, заказала 2 грузчиков и машину Ларгус. Приехали вовремя, доставили сами — моё присутствие на адресе покупки даже не потребовалось. Молодцы, отлично справились!",
  },
];

const totalReviews = reviews.length;
const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-[#FF6B00]" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-golos">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-[#FF6B00] rounded-sm flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-xl tracking-wide uppercase">Помощник</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-[#FF6B00] transition-colors text-sm font-medium tracking-wide uppercase"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </button>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="font-oswald text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            Отзывы клиентов
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Нам важно ваше мнение. Вот что говорят люди, которые уже воспользовались нашими услугами.
          </p>
        </div>

        {/* STATS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-14 p-8 bg-white/5 rounded-sm border border-white/10">
          <div className="text-center">
            <div className="font-oswald text-6xl font-bold text-[#FF6B00]">{avgRating}</div>
            <div className="flex justify-center mt-2 mb-1">
              <StarRating rating={5} />
            </div>
            <div className="text-white/40 text-sm">средняя оценка</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/10" />
          <div className="text-center">
            <div className="font-oswald text-6xl font-bold text-white">{totalReviews}</div>
            <div className="text-white/40 text-sm mt-2">отзывов</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-white/10" />
          <div className="text-center">
            <div className="font-oswald text-6xl font-bold text-white">100%</div>
            <div className="text-white/40 text-sm mt-2">рекомендуют нас</div>
          </div>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/5 border border-white/10 rounded-sm p-6 flex flex-col gap-4 hover:border-[#FF6B00]/30 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] font-bold font-oswald text-lg uppercase">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{review.name}</div>
                    <div className="text-white/40 text-xs">{review.date}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium px-2.5 py-1 rounded-sm w-fit">
                <Icon name="Package" size={11} />
                {review.service}
              </div>

              <p className="text-white/70 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-10 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-sm">
          <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide mb-2">
            Воспользуйтесь услугами
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Присоединяйтесь к нашим довольным клиентам — вызовите грузчиков прямо сейчас
          </p>
          <button
            onClick={() => navigate("/#contact")}
            className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8C33] text-white px-8 py-3 rounded-sm font-semibold text-sm transition-all duration-200 hover:scale-105 uppercase tracking-wide"
          >
            <Icon name="Phone" size={16} />
            Вызвать грузчиков
          </button>
        </div>
      </div>
    </div>
  );
}