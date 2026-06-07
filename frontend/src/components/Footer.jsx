export default function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-800 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Аква+
          </h3>
          <p className="mt-3 text-sm leading-7 text-neutral-400">
            Премиальная сантехника для дома, квартиры и современных интерьеров.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Контакты
          </h3>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p>Набережные Челны</p>
            <p>+7 918 764-45-23</p>
            <p>info@akvaplus.ru</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Оплата
          </h3>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p></p>
            <p></p>
            <p>Мир</p>
            <p>СБП</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
            Соцсети
          </h3>
          <div className="mt-3 space-y-2 text-sm text-neutral-400">
            <p>Telegram</p>
            <p>Вконтакте</p>
            <p>Дзен</p>
            <p>WhatsApp</p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 px-4 py-4 text-center text-sm text-neutral-500 sm:px-6 lg:px-8">
        © 2026 АКВА+. Все права защищены
      </div>
    </footer>
  );
}