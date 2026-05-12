export const preloadImages = async (sources: Array<string | undefined | null>): Promise<void> => {
  const uniqueSources = Array.from(new Set(sources.filter(Boolean) as string[]));

  await Promise.all(uniqueSources.map((src) => new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  })));
};
