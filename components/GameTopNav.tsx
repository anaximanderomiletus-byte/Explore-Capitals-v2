import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Shuffle } from "lucide-react";
import { GAMES } from "../constants";
import { useTranslation } from "../context/LocaleContext";

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

type Props = {
  tone?: "dim" | "default";
};

const GameTopNav: React.FC<Props> = ({ tone = "default" }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const playRandomGame = () => {
    const currentSlug = location.pathname.split("/games/")[1] || "";
    const activeGames = GAMES.filter((g) => g.status === "active");
    const candidates = activeGames.filter(
      (g) => GAME_PATHS[g.id] !== currentSlug,
    );
    const pool = candidates.length > 0 ? candidates : activeGames;
    const randomGame = pool[Math.floor(Math.random() * pool.length)];
    if (randomGame) {
      navigate(`/games/${GAME_PATHS[randomGame.id] || "capital-quiz"}`);
    }
  };

  const baseText = tone === "dim" ? "text-muted/70" : "text-muted";

  return (
    <div className="w-full flex items-center justify-between px-2 mb-2">
      <button
        onClick={() => navigate("/games/all")}
        className={`inline-flex items-center gap-1.5 ${baseText} hover:text-primary transition-all font-semibold uppercase tracking-[0.15em] text-[9px] sm:text-[10px] group/hub relative z-20 pointer-events-auto`}
      >
        <ArrowLeft
          size={14}
          className="group-hover/hub:-translate-x-1 transition-transform"
        />
        {t("game.viewOtherGames")}
      </button>
      <button
        onClick={playRandomGame}
        className={`inline-flex items-center gap-1.5 ${baseText} hover:text-primary transition-all font-semibold uppercase tracking-[0.15em] text-[9px] sm:text-[10px] group/shuffle relative z-20 pointer-events-auto`}
      >
        <Shuffle
          size={14}
          className="group-hover/shuffle:rotate-180 transition-transform"
        />
        {t("game.randomGame")}
      </button>
    </div>
  );
};

export default GameTopNav;
