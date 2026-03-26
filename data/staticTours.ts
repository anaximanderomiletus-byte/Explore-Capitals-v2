import { TourData } from "../types";

let cache: Record<string, TourData> | null = null;

export async function loadTours(): Promise<Record<string, TourData>> {
  if (cache) return cache;

  const modules = await Promise.all([
    // Countries (A-Z)
    import("./tours/countries/tours_a"),
    import("./tours/countries/tours_b"),
    import("./tours/countries/tours_c"),
    import("./tours/countries/tours_d"),
    import("./tours/countries/tours_e"),
    import("./tours/countries/tours_f"),
    import("./tours/countries/tours_g"),
    import("./tours/countries/tours_h"),
    import("./tours/countries/tours_i"),
    import("./tours/countries/tours_j"),
    import("./tours/countries/tours_k"),
    import("./tours/countries/tours_l"),
    import("./tours/countries/tours_m"),
    import("./tours/countries/tours_n"),
    import("./tours/countries/tours_o"),
    import("./tours/countries/tours_p"),
    import("./tours/countries/tours_q_r"),
    import("./tours/countries/tours_s"),
    import("./tours/countries/tours_t"),
    import("./tours/countries/tours_u"),
    import("./tours/countries/tours_v"),
    import("./tours/countries/tours_y"),
    import("./tours/countries/tours_z"),
    // Territories
    import("./tours/territories/tours_territories_ag"),
    import("./tours/territories/tours_territories_hn"),
    import("./tours/territories/tours_territories_pz"),
    // De facto
    import("./tours/defacto/tours_defacto"),
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
