export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Determines whether the floating sticky WhatsApp / Call Now bar should be visible.
 * - Hidden on initial load (scrollY === 0) so duplicate CTAs never appear over the Hero.
 * - On pages with a Hero section, reveals only after scrolling past ~72% of the Hero height.
 * - On inner pages without a Hero section, reveals after scrolling past 180px.
 */
export function shouldShowFloatingBar(
  scrollY: number,
  heroHeight: number,
  hasHero: boolean
): boolean {
  if (!Number.isFinite(scrollY) || scrollY <= 0) {
    return false;
  }

  if (hasHero) {
    const safeHeroHeight = Number.isFinite(heroHeight) && heroHeight > 0 ? heroHeight : 680;
    const threshold = Math.max(240, Math.round(safeHeroHeight * 0.72));
    return scrollY >= threshold;
  }

  return scrollY >= 180;
}

/**
 * Computes a gentle, clamped magnetic offset (in px) toward the cursor for desktop fine pointers.
 */
export function computeMagneticOffset(
  clientX: number,
  clientY: number,
  rect: RectLike,
  maxShift = 10
): { x: number; y: number } {
  if (rect.width <= 0 || rect.height <= 0 || maxShift <= 0) {
    return { x: 0, y: 0 };
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const normX = Math.max(-1, Math.min(1, (clientX - centerX) / (rect.width / 2)));
  const normY = Math.max(-1, Math.min(1, (clientY - centerY) / (rect.height / 2)));

  return {
    x: Number((normX * maxShift).toFixed(2)),
    y: Number((normY * maxShift).toFixed(2)),
  };
}
