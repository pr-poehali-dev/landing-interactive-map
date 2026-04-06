import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import SetupGuides, { GUIDES } from "@/components/help/SetupGuides";
import FaqSection, { FAQ_ITEMS } from "@/components/help/FaqSection";
import ContactsAndArticles from "@/components/help/ContactsAndArticles";

export default function Help() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaq = useMemo(() => {
    const q = search.toLowerCase().trim();
    return FAQ_ITEMS.filter((item) => {
      const matchSearch =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      const matchCat = !activeCategory || item.cat === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const filteredGuides = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return GUIDES;
    return GUIDES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F1F1F8] via-[#F1F1F8] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-v-600 bg-v-50 border border-v-200 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
            <Icon name="LifeBuoy" size={14} />
            Поддержка 24/7
          </div>

          <h1
            className="text-4xl md:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight mb-5 animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            Центр <span className="text-v-500">помощи</span>
          </h1>

          <p
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: ".2s", opacity: 0 }}
          >
            Гайды по настройке, ответы на частые вопросы и прямая связь с
            поддержкой. Найдите решение за минуту.
          </p>

          {/* Search bar */}
          <div
            className="max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: ".3s", opacity: 0 }}
          >
            <div className="relative">
              <Icon
                name="Search"
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Поиск по вопросам, гайдам, статьям..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-sm rounded-2xl border border-gray-200 bg-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-v-300 focus:ring-2 focus:ring-v-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            {search && (
              <p className="text-xs text-gray-400 mt-3">
                Найдено: {filteredGuides.length} гайдов, {filteredFaq.length}{" "}
                вопросов
              </p>
            )}
          </div>
        </div>
      </section>

      <SetupGuides filteredGuides={filteredGuides} />
      <FaqSection
        filteredFaq={filteredFaq}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ContactsAndArticles />

      <Footer />
    </>
  );
}