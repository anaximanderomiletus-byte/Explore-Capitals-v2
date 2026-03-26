// Lazy-loaded image data — the 1.5MB merged object is only built when first accessed.
// This prevents blocking the main thread on startup (critical for iOS performance).
let _cache: Record<string, string> | null = null;

async function _loadAll(): Promise<Record<string, string>> {
  if (_cache) return _cache;
  const [
    { imagesA }, { imagesB }, { imagesC }, { imagesD }, { imagesE },
    { imagesF }, { imagesG }, { imagesH }, { imagesI }, { imagesJ },
    { imagesK }, { imagesL }, { imagesM }, { imagesN }, { imagesO },
    { imagesP }, { imagesQR }, { imagesS }, { imagesT }, { imagesU },
    { imagesV }, { imagesY }, { imagesZ },
    { imagesTerritories }, { imagesDeFacto },
  ] = await Promise.all([
    // Countries (A-Z)
    import("./images/countries/images_a"),
    import("./images/countries/images_b"),
    import("./images/countries/images_c"),
    import("./images/countries/images_d"),
    import("./images/countries/images_e"),
    import("./images/countries/images_f"),
    import("./images/countries/images_g"),
    import("./images/countries/images_h"),
    import("./images/countries/images_i"),
    import("./images/countries/images_j"),
    import("./images/countries/images_k"),
    import("./images/countries/images_l"),
    import("./images/countries/images_m"),
    import("./images/countries/images_n"),
    import("./images/countries/images_o"),
    import("./images/countries/images_p"),
    import("./images/countries/images_q_r"),
    import("./images/countries/images_s"),
    import("./images/countries/images_t"),
    import("./images/countries/images_u"),
    import("./images/countries/images_v"),
    import("./images/countries/images_y"),
    import("./images/countries/images_z"),
    // Territories & De facto
    import("./images/territories/images_territories"),
    import("./images/defacto/images_defacto"),
  ]);
  _cache = {
    ...imagesA, ...imagesB, ...imagesC, ...imagesD, ...imagesE,
    ...imagesF, ...imagesG, ...imagesH, ...imagesI, ...imagesJ,
    ...imagesK, ...imagesL, ...imagesM, ...imagesN, ...imagesO,
    ...imagesP, ...imagesQR, ...imagesS, ...imagesT, ...imagesU,
    ...imagesV, ...imagesY, ...imagesZ,
    ...imagesTerritories, ...imagesDeFacto,
  };
  return _cache;
}

/** Load and return the full STATIC_IMAGES map. Call once, cache the result. */
export const getStaticImages = _loadAll;

/**
 * @deprecated Prefer `getStaticImages()` for async access.
 * Synchronous proxy — returns empty string for keys not yet loaded.
 * Starts loading in the background on first access.
 */
export const STATIC_IMAGES: Record<string, string> = new Proxy({} as Record<string, string>, {
  get(_target, prop: string) {
    if (_cache) return _cache[prop] ?? '';
    // Kick off load in background
    _loadAll();
    return '';
  },
});
