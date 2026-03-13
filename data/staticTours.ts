import { TourData } from "../types";

let cache: Record<string, TourData> | null = null;

export async function loadTours(): Promise<Record<string, TourData>> {
  if (cache) return cache;

  const modules = await Promise.all([
    import("./tours/tours_a"),
    import("./tours/tours_b"),
    import("./tours/tours_c"),
    import("./tours/tours_d"),
    import("./tours/tours_e"),
    import("./tours/tours_f"),
    import("./tours/tours_g"),
    import("./tours/tours_h"),
    import("./tours/tours_i"),
    import("./tours/tours_j"),
    import("./tours/tours_k"),
    import("./tours/tours_l"),
    import("./tours/tours_m"),
    import("./tours/tours_n"),
    import("./tours/tours_o"),
    import("./tours/tours_p"),
    import("./tours/tours_q_r"),
    import("./tours/tours_s"),
    import("./tours/tours_t"),
    import("./tours/tours_u"),
    import("./tours/tours_v"),
    import("./tours/tours_y"),
    import("./tours/tours_z"),
    import("./tours/tours_territories_ag"),
    import("./tours/tours_territories_hn"),
    import("./tours/tours_territories_pz"),
    import("./tours/tours_defacto"),
  ]);

  cache = Object.assign(
    {},
    modules[0].toursA,
    modules[1].toursB,
    modules[2].toursC,
    modules[3].toursD,
    modules[4].toursE,
    modules[5].toursF,
    modules[6].toursG,
    modules[7].toursH,
    modules[8].toursI,
    modules[9].toursJ,
    modules[10].toursK,
    modules[11].toursL,
    modules[12].toursM,
    modules[13].toursN,
    modules[14].toursO,
    modules[15].toursP,
    modules[16].toursQR,
    modules[17].toursS,
    modules[18].toursT,
    modules[19].toursU,
    modules[20].toursV,
    modules[21].toursY,
    modules[22].toursZ,
    modules[23].toursTerritoriesAG,
    modules[24].toursTerritoriesHN,
    modules[25].toursTerritoriesPZ,
    modules[26].toursDeFacto,
  );

  return cache;
}
