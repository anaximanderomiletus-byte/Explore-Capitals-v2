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
    import("./images/images_a"),
    import("./images/images_b"),
    import("./images/images_c"),
    import("./images/images_d"),
    import("./images/images_e"),
    import("./images/images_f"),
    import("./images/images_g"),
    import("./images/images_h"),
    import("./images/images_i"),
    import("./images/images_j"),
    import("./images/images_k"),
    import("./images/images_l"),
    import("./images/images_m"),
    import("./images/images_n"),
    import("./images/images_o"),
    import("./images/images_p"),
    import("./images/images_q_r"),
    import("./images/images_s"),
    import("./images/images_t"),
    import("./images/images_u"),
    import("./images/images_v"),
    import("./images/images_y"),
    import("./images/images_z"),
    import("./images/images_territories"),
    import("./images/images_defacto"),
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