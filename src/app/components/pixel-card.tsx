import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import "./pixel-card.css";

type PixelCardVariant = "default" | "green" | "blue" | "warm";

type PixelCardProps = {
  variant?: PixelCardVariant;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

type PixelMode = "appear" | "disappear";

const VARIANTS: Record<
  PixelCardVariant,
  { gap: number; speed: number; colors: string; noFocus: boolean }
> = {
  default: {
    gap: 8,
    speed: 22,
    colors: "#eef4ea,#dfe4d6,#b8c5ad",
    noFocus: false,
  },
  green: {
    gap: 7,
    speed: 20,
    colors: "#eef4ea,#dfe4d6,#6f7d63",
    noFocus: false,
  },
  blue: {
    gap: 9,
    speed: 18,
    colors: "#eef4ea,#dde3ea,#7c8ea3",
    noFocus: false,
  },
  warm: {
    gap: 7,
    speed: 24,
    colors: "#f5f2ea,#e6dbc7,#c89d6c",
    noFocus: false,
  },
};

function getNow() {
  return typeof performance === "undefined" ? Date.now() : performance.now();
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  if (value <= 0 || reducedMotion) return 0;
  return Math.min(value, 100) * 0.001;
}

class Pixel {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string;
  private speed: number;
  private size = 0;
  private sizeStep = Math.random() * 0.38 + 0.04;
  private minSize = 0.45;
  private maxSizeInteger = 2;
  private maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
  private delay: number;
  private counter = 0;
  private counterStep: number;
  private isReverse = false;
  private isShimmer = false;
  isIdle = false;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.delay = delay;
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01;
  }

  private getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) this.isShimmer = true;

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }

    this.size -= 0.12;
    this.draw();
  }

  private shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    if (this.size <= this.minSize) this.isReverse = false;

    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

export function PixelCard({
  variant = "default",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  style,
  children,
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef(getNow());

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const variantConfig = VARIANTS[variant] ?? VARIANTS.default;
  const finalGap = gap ?? variantConfig.gap;
  const finalSpeed = speed ?? variantConfig.speed;
  const finalColors = colors ?? variantConfig.colors;
  const finalNoFocus = noFocus ?? variantConfig.noFocus;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || reducedMotion) return;

    const initPixels = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const colorsArray = finalColors.split(",").map((color) => color.trim()).filter(Boolean);
      const nextPixels: Pixel[] = [];

      for (let x = 0; x < width; x += finalGap) {
        for (let y = 0; y < height; y += finalGap) {
          const color = colorsArray[Math.floor(Math.random() * colorsArray.length)] ?? "#dfe4d6";
          const dx = x - width / 2;
          const dy = y - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);

          nextPixels.push(
            new Pixel(
              canvas,
              context,
              x,
              y,
              color,
              getEffectiveSpeed(finalSpeed, reducedMotion),
              distance,
            ),
          );
        }
      }

      pixelsRef.current = nextPixels;
    };

    initPixels();
    const observer = new ResizeObserver(initPixels);
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [finalColors, finalGap, finalSpeed, reducedMotion]);

  const doAnimate = (mode: PixelMode) => {
    animationRef.current = requestAnimationFrame(() => doAnimate(mode));
    const timeNow = getNow();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let allIdle = true;
    for (const pixel of pixelsRef.current) {
      pixel[mode]();
      if (!pixel.isIdle) allIdle = false;
    }

    if (allIdle && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const handleAnimation = (mode: PixelMode) => {
    if (reducedMotion) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => doAnimate(mode));
  };

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className}`}
      style={style}
      onMouseEnter={() => handleAnimation("appear")}
      onMouseLeave={() => handleAnimation("disappear")}
      onFocus={finalNoFocus ? undefined : (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        handleAnimation("appear");
      }}
      onBlur={finalNoFocus ? undefined : (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        handleAnimation("disappear");
      }}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas ref={canvasRef} className="pixel-canvas" />
      {children}
    </div>
  );
}
