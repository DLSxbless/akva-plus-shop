function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h3 className="mb-2 text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm leading-6 text-neutral-600">{text}</p>
    </div>
  );
}

export default function PremiumInfoSection({
  eyebrow,
  title,
  subtitle,
  badges = [],
  cards = [],
  asideTitle,
  asideText,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 shadow-sm">
        <div className="grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              {eyebrow}
            </p>

            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
              {subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {cards.map((card) => (
                <InfoCard key={card.title} title={card.title} text={card.text} />
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-950">{asideTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">{asideText}</p>

            <div className="mt-8 rounded-2xl bg-neutral-950 p-5 text-white">
              <p className="text-sm font-medium text-white/70">Поддержка магазина</p>
              <p className="mt-2 text-lg font-semibold">
                Ответим на вопросы и поможем с выбором
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="tel:+79999999999"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                >
                  Позвонить
                </a>
                <a
                  href="mailto:info@shop.ru"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Написать
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}