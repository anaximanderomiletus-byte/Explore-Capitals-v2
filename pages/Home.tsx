import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import SEO from "../components/SEO";
import { useLayout } from "../context/LayoutContext";
import { useTranslation } from "../context/LocaleContext";
import { GAMES } from "../constants";

const GAME_PATHS: Record<string, string> = {
  "1": "capital-quiz",
  "2": "map-dash",
  "3": "flag-frenzy",
  "4": "know-your-neighbor",
  "5": "population-pursuit",
  "6": "global-detective",
  "7": "capital-connection",
  "8": "region-roundup",
  "9": "landmark-legend",
  "10": "territory-titans",
  "11": "area-ace",
  "12": "currency-craze",
  "13": "language-legend",
  "14": "time-zone-trekker",
  "15": "driving-direction",
};

/** Shared content gutters — matches nav/footer */
const gutters = "px-4 sm:px-6 md:px-8 lg:px-10";
const shell = `w-full max-w-6xl mx-auto ${gutters}`;

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setPageLoading(false);
    (window as any).__dismissLoader?.();
  }, [setPageLoading]);

  const featuredGames = useMemo(
    () => GAMES.filter((g) => g.status === "active").slice(0, 6),
    [],
  );

  const playRandom = () => {
    const active = GAMES.filter((g) => g.status === "active");
    const game = active[Math.floor(Math.random() * active.length)];
    if (game) navigate(`/games/${GAME_PATHS[game.id] || "capital-quiz"}`);
  };

  const whyPoints = [
    {
      title: t("home.whyGeo.academic.title"),
      desc: t("home.whyGeo.academic.desc"),
    },
    {
      title: t("home.whyGeo.global.title"),
      desc: t("home.whyGeo.global.desc"),
    },
    {
      title: t("home.whyGeo.learn.title"),
      desc: t("home.whyGeo.learn.desc"),
    },
  ];

  const fade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.4, delay },
        };

  const heroFade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <>
      <SEO
        title="ExploreCapitals — Learn World Geography Through Games"
        description="Master world capitals, flags, and maps through fun geography games. Free quizzes, an interactive atlas, and a country database for 195+ nations."
      />

      <main className="relative w-full overflow-x-hidden">
        {/* Hero */}
        <section
          className="relative flex flex-col justify-end sm:justify-center overflow-hidden
            min-h-[100svh] min-h-[100dvh]"
        >
          <div className="absolute inset-0" aria-hidden>
            <img
              src="/png/STYLE/realistic-globe.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover
                object-[72%_40%] sm:object-[65%_38%] md:object-[58%_38%] lg:object-[center_38%]
                scale-[1.08] sm:scale-[1.04] md:scale-[1.02]"
              fetchPriority="high"
            />
            {/* Mobile: heavy left/bottom wash so type stays readable over the globe */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface/40 sm:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-surface/20 sm:hidden" />
            {/* Tablet+ */}
            <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-surface via-surface/80 to-transparent" />
            <div className="absolute inset-0 hidden sm:block bg-gradient-to-t from-surface via-transparent to-surface/25" />
          </div>

          <div
            className={`${shell} relative z-10
              pt-[max(6.5rem,calc(env(safe-area-inset-top,0px)+5.5rem))]
              pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+2rem))]
              sm:pt-32 sm:pb-20 md:pb-24`}
          >
            <motion.h1
              className="font-display italic font-normal tracking-tight text-text leading-[1.05]
                text-[clamp(2.5rem,11vw,3.5rem)]
                sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.75rem]
                max-w-[14ch] sm:max-w-none mb-4 sm:mb-5 md:mb-6"
              {...heroFade(0)}
            >
              Explore
              <span className="text-primary not-italic">Capitals</span>
            </motion.h1>

            <motion.p
              className="text-muted leading-relaxed
                text-[0.9375rem] sm:text-lg md:text-xl
                max-w-[34ch] sm:max-w-md md:max-w-lg
                mb-7 sm:mb-8 md:mb-10"
              {...heroFade(0.08)}
            >
              {t("home.hero.desc")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto max-w-md sm:max-w-none"
              {...heroFade(0.14)}
            >
              <Button
                onClick={playRandom}
                size="lg"
                className="gap-2 !text-text w-full sm:w-auto justify-center"
              >
                <Play size={18} fill="currentColor" />
                {t("home.hero.play")}
              </Button>
              <Button
                as={Link}
                to="/games"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                {t("home.games.allGames")}
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="relative">
          {/* Games — scroll on phone, grid from tablet up */}
          <section className="pt-14 sm:pt-20 md:pt-24 pb-14 sm:pb-20 md:pb-24">
            <div className={`${shell} mb-7 sm:mb-8 md:mb-10 flex items-end justify-between gap-4`}>
              <motion.div {...fade(0)}>
                <h2 className="font-display italic tracking-tight text-text
                  text-3xl sm:text-4xl md:text-5xl">
                  {t("home.games.title")}
                </h2>
                <p className="text-muted mt-2 max-w-md text-sm sm:text-base">
                  {t("home.games.subtitle")}
                </p>
              </motion.div>
              <Link
                to="/games"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors shrink-0 min-h-[44px] mb-0.5"
              >
                {t("home.games.allGames")}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden">
              <div
                className={`flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory
                  ${gutters} [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                  overscroll-x-contain`}
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {featuredGames.map((game) => (
                  <Link
                    key={game.id}
                    to={`/games/${GAME_PATHS[game.id]}`}
                    className="group snap-start shrink-0 w-[min(78vw,280px)]"
                  >
                    <div className="aspect-[4/3] overflow-hidden mb-3 bg-accent-soft">
                      <img
                        src={game.image.replace("./", "/")}
                        alt={game.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3 className="font-display text-lg text-text group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-muted text-sm mt-1 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </Link>
                ))}
              </div>
              <div className={`${gutters} mt-5`}>
                <Link
                  to="/games"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary min-h-[44px]"
                >
                  {t("home.games.allGames")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Tablet / desktop grid */}
            <div className={`hidden md:grid ${shell} grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`}>
              {featuredGames.map((game, i) => (
                <motion.div key={game.id} {...fade(i * 0.04)}>
                  <Link to={`/games/${GAME_PATHS[game.id]}`} className="group block h-full">
                    <div className="aspect-[4/3] overflow-hidden mb-3 bg-accent-soft">
                      <img
                        src={game.image.replace("./", "/")}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3 className="font-display text-xl text-text group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-muted text-sm mt-1.5 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why */}
          <section className={`${shell} py-14 sm:py-20 md:py-24 border-t border-border/60`}>
            <motion.div {...fade(0)} className="mb-8 sm:mb-10 md:mb-12 max-w-xl">
              <h2 className="font-display italic tracking-tight text-text
                text-3xl sm:text-4xl md:text-5xl">
                {t("home.whyGeo.title1")}{" "}
                <span className="text-primary not-italic">{t("home.whyGeo.title2")}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12">
              {whyPoints.map((item, i) => (
                <motion.div key={item.title} {...fade(i * 0.05)}>
                  <h3 className="font-display italic text-xl sm:text-2xl text-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm sm:text-[0.9375rem] leading-relaxed md:line-clamp-5 lg:line-clamp-none">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Explore */}
          <section className={`${shell} py-14 sm:py-20 md:py-24 border-t border-border/60`}>
            <motion.div {...fade(0)}>
              <h2 className="font-display italic tracking-tight text-text
                text-3xl sm:text-4xl md:text-5xl mb-2">
                {t("home.exploreSection.title")}
              </h2>
              <p className="text-muted text-sm sm:text-base mb-8 sm:mb-10 max-w-lg">
                {t("home.exploreSection.subtitle")}
              </p>

              <div className="border-t border-border">
                {[
                  {
                    to: "/map",
                    title: t("home.exploreSection.atlas"),
                    desc: t("home.exploreSection.atlasDesc"),
                  },
                  {
                    to: "/database",
                    title: t("home.exploreSection.database"),
                    desc: t("home.exploreSection.databaseDesc"),
                  },
                  {
                    to: "/blog",
                    title: t("nav.blog"),
                    desc: "Articles and insights to deepen your geographic literacy.",
                  },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group flex flex-col md:flex-row md:items-baseline md:justify-between
                      gap-1.5 md:gap-10 py-5 sm:py-6 md:py-7 border-b border-border
                      min-h-[4.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <span className="font-display italic text-text group-hover:text-primary transition-colors
                      text-2xl sm:text-[1.75rem] md:text-3xl inline-flex items-center gap-2">
                      {item.title}
                      <ArrowRight
                        size={18}
                        className="md:hidden text-primary shrink-0 opacity-70"
                        aria-hidden
                      />
                    </span>
                    <span className="text-muted text-sm leading-relaxed max-w-md md:text-right">
                      {item.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </>
  );
}
