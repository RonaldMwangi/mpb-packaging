// Native links preserve the existing homepage anchors on every page.
export const TALENT_POOL_PATH = "/careers/talent-pool";

export function homeHref(anchor: string) {
  return `${window.location.pathname === "/" ? "" : "/"}${anchor}`;
}
