import "./BackgroundEffects.css";

/**
 * Decorative Hero backdrop.
 *
 * Deliberately restrained: a hairline technical grid, one flat brand tint
 * and a vertical rule. No gradients (the MPB logo contains none) and no
 * looping animations.
 */
export default function BackgroundEffects() {
  return (
    <div className="hero-background" aria-hidden="true">
      <div className="bg-grid"></div>
      <div className="bg-tint"></div>
    </div>
  );
}
