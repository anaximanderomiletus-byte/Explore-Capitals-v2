import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, Shuffle, LayoutGrid } from "lucide-react";
import { GAMES } from "../constants";
import Button from "./Button";
import TimeSelector from "./TimeSelector";

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
  title: string;
  description: string;
  image: string;
  gameDuration: number;
  setGameDuration: (val: number) => void;
  startGame: () => void;
};

const GameLobbyCard: React.FC<Props> = ({
  title,
  description,
  image,
  gameDuration,
  setGameDuration,
  startGame,
}) => {
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

  return (
    <div className="game-lobby-card w-full bg-elevated rounded-2xl p-6 sm:p-10 text-center border border-border overflow-hidden relative shadow-premium">
      <div className="w-24 h-24 rounded-xl mx-auto mb-8 border border-border shadow-sm relative overflow-hidden bg-accent-soft">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-display font-bold text-text mb-3 tracking-tight">
        {title}
      </h1>
      <p className="text-muted text-sm sm:text-base mb-8 leading-relaxed max-w-sm mx-auto">
        {description}
      </p>

      <div className="mb-10 max-w-xs mx-auto">
        <TimeSelector value={gameDuration} onChange={setGameDuration} />
      </div>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <Button
          onClick={startGame}
          variant="primary"
          size="lg"
          className="w-full text-lg sm:text-xl font-bold"
        >
          PLAY{" "}
          <Play className="ml-2 w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
        </Button>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => navigate("/games/all")}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-surface hover:bg-accent-soft border border-border hover:border-primary/25 rounded-xl text-muted hover:text-primary transition-all duration-200 group"
          >
            <LayoutGrid
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-semibold uppercase text-[10px] tracking-widest">
              ALL GAMES
            </span>
          </button>

          <button
            onClick={playRandomGame}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-surface hover:bg-accent-soft border border-border hover:border-primary/25 rounded-xl text-muted hover:text-primary transition-all duration-200 group"
          >
            <Shuffle
              size={16}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="font-semibold uppercase text-[10px] tracking-widest">
              RANDOM
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLobbyCard;
