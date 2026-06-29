import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const HERO_IMAGES = [
  'https://cdn.poehali.dev/projects/925c4837-751a-472a-a0dd-bb72c705ac50/files/a69368f9-64d4-4082-9cb0-f41c7a319cba.jpg',
];

const PORTRAIT =
  'https://cdn.poehali.dev/projects/925c4837-751a-472a-a0dd-bb72c705ac50/files/021c41ee-450d-4ea5-b067-b04962fb5024.jpg';

const NAV = [
  { label: 'Об авторе', href: '#about' },
  { label: 'Программы', href: '#pricing' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

const FORMULA = [
  {
    icon: 'Guitar',
    title: 'Техника',
    text: 'Ставим руки правильно с первого дня. Никаких зажатых пальцев и боли — только чистый звук и свобода движения.',
  },
  {
    icon: 'Music',
    title: 'Гармония',
    text: 'Ты понимаешь, почему аккорды звучат вместе. Это и есть «Логика» — играешь осознанно, а не зубришь схемы.',
  },
  {
    icon: 'Activity',
    title: 'Ритм',
    text: 'Чувство ритма ставится через тело, а не метроном. Уже через пару недель ты держишь грув уверенно.',
  },
];

const PLANS = [
  {
    name: 'Старт',
    price: '99$',
    tagline: 'Первый аккорд уже сегодня',
    features: ['4 онлайн-урока', 'Разбор любимой песни', 'Чат поддержки', 'Доступ к базе разборов'],
    highlight: false,
  },
  {
    name: 'Система',
    price: '249$',
    tagline: 'Тот самый «Струны+Логика»',
    features: ['12 уроков онлайн/офлайн', 'Личная программа', 'Методика «Струны+Логика»', 'Гарантия 14 дней', 'Обратная связь по видео'],
    highlight: true,
  },
  {
    name: 'Мастер',
    price: '499$',
    tagline: 'От нуля до сцены',
    features: ['Безлимит уроков 3 месяца', 'Индивидуальный наставник', 'Запись в студии', 'Импровизация и сочинение', 'Выступление в финале'],
    highlight: false,
  },
];

const REVIEWS = [
  {
    name: 'Артём, 19 лет',
    text: 'Думал, что без слуха — никак. Через 12 дней сыграл другу песню целиком. Система реально работает, а не просто слова.',
  },
  {
    name: 'Марина, 34 года',
    text: 'Мечтала о гитаре с детства. Здесь не давят, объясняют по-человечески. Теперь играю по вечерам вместо сериалов.',
  },
  {
    name: 'Денис, 27 лет',
    text: 'Перепробовал кучу самоучителей — бросал. Тут понял логику грифа за неделю. Дерзко, по делу, без воды.',
  },
];

const FAQ = [
  {
    q: 'У меня нет слуха. Получится?',
    a: 'Слух — это навык, а не дар. Методика «Струны+Логика» строит игру через понимание, поэтому стартуют даже те, кто «не попадает в ноты». 150+ учеников это уже доказали.',
  },
  {
    q: 'Мне 40+. Не поздно?',
    a: 'Гитара не спрашивает возраст. Среди учеников есть и подростки, и взрослые до 45. Музыка не ждёт — начинают в любом возрасте и играют уже через 14 дней.',
  },
  {
    q: 'Пальцы будут болеть?',
    a: 'Мы ставим технику так, чтобы минимизировать дискомфорт. Правильная постановка рук с первого урока — это и про звук, и про комфорт.',
  },
  {
    q: 'А если не получится?',
    a: 'Сыграешь за 14 дней или вернём деньги. Это не маркетинг — это уверенность в системе. Рискуем мы, а не ты.',
  },
];

function useCountUp(target: number, start: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setValue(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
}

export default function GuitarSchool() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [counterStart, setCounterStart] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  const count = useCountUp(152, counterStart);

  useEffect(() => {
    const node = counterRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounterStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const openModal = () => {
    setSubmitted(false);
    setModalOpen(true);
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 z-40 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <a href="#hero" className="flex items-center gap-2">
            <Icon name="Guitar" size={26} className="text-primary" />
            <span className="font-['Raleway'] text-lg font-extrabold tracking-tight">
              Школа <span className="text-primary">[Имя]</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95 md:block"
            >
              Записаться
            </button>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={26} className="text-primary" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-primary/20 bg-background px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-foreground/80"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={openModal}
                className="rounded-full bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
              >
                Записаться
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGES[0]} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-24 md:px-8">
          <div className="max-w-2xl">
            <p className="animate-fade-up mb-4 inline-block rounded-full border border-primary/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary md:text-sm">
              Сыграй за 14 дней или вернём деньги
            </p>
            <h1 className="animate-fade-up font-['Raleway'] text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
              Музыка не ждёт.
              <br />
              <span className="text-primary">Начни сегодня.</span>
            </h1>
            <p className="animate-fade-up mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
              Авторская система для тех, кому от 15 до 45. Учим играть даже без слуха —
              через понимание, а не зубрёжку. Это и есть «Струны+Логика».
            </p>
            <div className="animate-fade-up mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={openModal}
                className="animate-pulse-gold rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
              >
                Записаться на пробный урок
              </button>
              <span className="flex items-center gap-2 text-sm text-foreground/60">
                <Icon name="ShieldCheck" size={18} className="text-primary" />
                Гарантия результата за 14 дней
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Обо мне
            </p>
            <h2 className="font-['Raleway'] text-3xl font-extrabold md:text-4xl">
              7 лет, 150+ учеников и один принцип
            </h2>
            <p className="mt-6 text-foreground/70">
              Я прошёл путь от «не попадаю ни в одну ноту» до сцены и преподавания.
              И понял главное: гитара — это не про талант, а про систему. Большинство
              бросают, потому что им дают схемы без объяснений.
            </p>
            <p className="mt-4 text-foreground/70">
              Моя философия проста: <span className="text-primary font-medium">ты должен
              понимать, что делаешь</span>. Когда логика грифа становится своей —
              музыка перестаёт быть случайностью. Так появилась методика «Струны+Логика».
            </p>
            <div className="mt-8 flex gap-8">
              <div ref={counterRef}>
                <p className="font-['Raleway'] text-4xl font-black text-primary">{count}+</p>
                <p className="text-sm text-foreground/60">учеников выпущено</p>
              </div>
              <div>
                <p className="font-['Raleway'] text-4xl font-black text-primary">7</p>
                <p className="text-sm text-foreground/60">лет практики</p>
              </div>
              <div>
                <p className="font-['Raleway'] text-4xl font-black text-primary">30</p>
                <p className="text-sm text-foreground/60">учеников в группах</p>
              </div>
            </div>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-primary/20 blur-2xl" />
              <img
                src={PORTRAIT}
                alt="Основатель школы"
                className="relative h-[360px] w-[320px] rounded-2xl border border-primary/30 object-cover shadow-2xl md:h-[440px] md:w-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORMULA */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Формула «Струны + Логика»
            </p>
            <h2 className="font-['Raleway'] text-3xl font-extrabold md:text-4xl">
              Три кита, на которых стоит твоя игра
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {FORMULA.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-primary/15 bg-card p-8 transition-all hover:-translate-y-2 hover:border-primary/50"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={item.icon} size={28} />
                </div>
                <h3 className="font-['Raleway'] text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm text-foreground/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Программы
            </p>
            <h2 className="font-['Raleway'] text-3xl font-extrabold md:text-4xl">
              Выбери свой темп
            </h2>
            <p className="mt-4 text-foreground/70">
              Онлайн или офлайн — результат гарантирован на любом тарифе.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-8 transition-all hover:-translate-y-2',
                  plan.highlight
                    ? 'border-primary bg-card shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)] md:scale-105'
                    : 'border-primary/15 bg-card'
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase text-primary-foreground">
                    Выбор учеников
                  </span>
                )}
                <h3 className="font-['Raleway'] text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-foreground/60">{plan.tagline}</p>
                <p className="mt-5 font-['Raleway'] text-4xl font-black text-primary">
                  {plan.price}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openModal}
                  className={cn(
                    'mt-8 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 active:scale-95',
                    plan.highlight
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  )}
                >
                  Выбрать тариф
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-secondary/40 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Отзывы
            </p>
            <h2 className="font-['Raleway'] text-3xl font-extrabold md:text-4xl">
              Они уже играют
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col rounded-2xl border border-primary/15 bg-card p-8"
              >
                <div className="mb-4 flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-primary" />
                  ))}
                </div>
                <p className="flex-1 text-foreground/80">«{r.text}»</p>
                <p className="mt-6 font-['Raleway'] font-bold text-primary">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Вопросы и страхи
            </p>
            <h2 className="font-['Raleway'] text-3xl font-extrabold md:text-4xl">
              Развеем сомнения
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {FAQ.map((item, i) => (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-primary/15 bg-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-['Raleway'] font-semibold">{item.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className={cn(
                      'shrink-0 text-primary transition-transform',
                      openFaq === i && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300',
                    openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-foreground/70">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 text-center md:p-16">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <h2 className="relative font-['Raleway'] text-3xl font-black md:text-4xl">
              Твоя первая песня — на этой неделе
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-foreground/70">
              Бери гитару в руки сегодня. Если не сыграешь за 14 дней — вернём деньги.
              Терять нечего, кроме отговорок.
            </p>
            <button
              onClick={openModal}
              className="relative mt-8 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              Записаться сейчас
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="border-t border-primary/15 py-12">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3 md:px-8">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="Guitar" size={24} className="text-primary" />
              <span className="font-['Raleway'] text-lg font-extrabold">
                Школа <span className="text-primary">[Имя]</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-foreground/60">
              Игра на гитаре через понимание. Онлайн и офлайн. Сыграй за 14 дней.
            </p>
          </div>
          <div>
            <p className="font-['Raleway'] font-semibold">Контакты</p>
            <a
              href="mailto:hello@guitar-school.ru"
              className="mt-4 flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
            >
              <Icon name="Mail" size={18} className="text-primary" />
              hello@guitar-school.ru
            </a>
            <a
              href="tel:+79991234567"
              className="mt-3 flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
            >
              <Icon name="Phone" size={18} className="text-primary" />
              +7 (999) 123-45-67
            </a>
          </div>
          <div>
            <p className="font-['Raleway'] font-semibold">Соцсети</p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: 'Send', href: 'https://t.me/' },
                { icon: 'Youtube', href: 'https://youtube.com/' },
                { icon: 'Instagram', href: 'https://instagram.com/' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-foreground/40">
          © 2026 Гитарная школа [Имя]. Все права защищены.
        </p>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="animate-fade-up relative w-full max-w-md rounded-2xl border border-primary/30 bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-foreground/50 transition-colors hover:text-primary"
              aria-label="Закрыть"
            >
              <Icon name="X" size={22} />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon name="Check" size={32} />
                </div>
                <h3 className="font-['Raleway'] text-2xl font-bold">Заявка принята!</h3>
                <p className="mt-2 text-foreground/70">
                  Я свяжусь с тобой и подберём удобное время. Гитара уже ждёт.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-['Raleway'] text-2xl font-bold">Запись на урок</h3>
                <p className="mt-1 text-sm text-foreground/60">
                  Оставь контакты — подберём время под тебя.
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <input
                    required
                    placeholder="Имя"
                    className="w-full rounded-lg border border-primary/20 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Телефон"
                    className="w-full rounded-lg border border-primary/20 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                  <input
                    required
                    type="number"
                    placeholder="Возраст"
                    className="w-full rounded-lg border border-primary/20 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                  <select
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-primary/20 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="" disabled>
                      Удобное время
                    </option>
                    <option>Утро (9:00–12:00)</option>
                    <option>День (12:00–17:00)</option>
                    <option>Вечер (17:00–22:00)</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                  >
                    Записаться
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
