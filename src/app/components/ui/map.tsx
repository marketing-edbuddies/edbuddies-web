import { useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

interface Market {
  lat: number;
  lng: number;
  label: string;
}

// Bounding box tuned to frame Malaysia, Singapore, Vietnam and the Philippines
// at a 16:9 output ratio (249x140 at height: 140).
const REGION = { lat: { min: -3, max: 24 }, lng: { min: 87, max: 136 } };

const HQ: Market = { lat: 3.139, lng: 101.6869, label: "Malaysia" };
const MARKETS: Market[] = [
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 21.0278, lng: 105.8342, label: "Vietnam" },
  { lat: 14.5995, lng: 120.9842, label: "Philippines" },
];

const LINE_COLOR = "#FF8000";
const DOT_COLOR = "#09244B33";
const HQ_COLOR = "#09244B";

function createCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  height: number
) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - height * 0.14;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export function SEAMap() {
  const { svgMap, width, height, hqPoint, marketPoints } = useMemo(() => {
    const map = new DottedMap({ height: 140, grid: "diagonal", region: REGION });
    const hq = map.addPin({ lat: HQ.lat, lng: HQ.lng, svgOptions: { radius: 0 } });
    const markets = MARKETS.map((m) => ({
      ...m,
      point: map.addPin({ lat: m.lat, lng: m.lng, svgOptions: { radius: 0 } }),
    }));
    const svg = map.getSVG({
      radius: 0.4,
      color: DOT_COLOR,
      shape: "circle",
      backgroundColor: "#FFFFFF",
    });
    return {
      svgMap: svg,
      width: map.image.width,
      height: map.image.height,
      hqPoint: hq,
      marketPoints: markets,
    };
  }, []);

  const staggerDelay = 0.35;
  const pathDuration = 1.6;
  const totalDraw = marketPoints.length * staggerDelay + pathDuration;
  const pauseTime = 2;
  const cycle = totalDraw + pauseTime;
  const markerRadius = height * 0.012;
  const labelSize = height * 0.032;

  return (
    <div
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl relative overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="Map of Southeast Asia"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
        draggable={false}
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="sea-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={LINE_COLOR} stopOpacity="0" />
            <stop offset="15%" stopColor={LINE_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor={LINE_COLOR} stopOpacity="1" />
          </linearGradient>
        </defs>

        {marketPoints.map((m, i) => {
          const startTime = (i * staggerDelay) / cycle;
          const endTime = (i * staggerDelay + pathDuration) / cycle;
          const resetTime = totalDraw / cycle;
          return (
            <motion.path
              key={`path-${m.label}`}
              d={createCurvedPath(hqPoint, m.point, height)}
              fill="none"
              stroke="url(#sea-path-gradient)"
              strokeWidth={height * 0.006}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 1, 1, 0] }}
              transition={{
                duration: cycle,
                times: [0, startTime, endTime, resetTime, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          );
        })}

        {/* HQ marker */}
        <g>
          <circle cx={hqPoint.x} cy={hqPoint.y} r={markerRadius} fill={HQ_COLOR} />
          <text
            x={hqPoint.x}
            y={hqPoint.y - markerRadius * 2.5}
            textAnchor="middle"
            fontSize={labelSize}
            fontWeight={700}
            fill={HQ_COLOR}
            stroke="white"
            strokeWidth={labelSize * 0.28}
            paintOrder="stroke"
          >
            {HQ.label}
          </text>
        </g>

        {marketPoints.map((m) => (
          <g key={m.label}>
            <circle cx={m.point.x} cy={m.point.y} r={markerRadius} fill={LINE_COLOR} />
            <circle cx={m.point.x} cy={m.point.y} r={markerRadius} fill={LINE_COLOR} opacity="0.5">
              <animate
                attributeName="r"
                values={`${markerRadius};${markerRadius * 4}`}
                dur="2s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <text
              x={m.point.x}
              y={m.point.y - markerRadius * 2.5}
              textAnchor="middle"
              fontSize={labelSize}
              fontWeight={600}
              fill={HQ_COLOR}
              stroke="white"
              strokeWidth={labelSize * 0.28}
              paintOrder="stroke"
            >
              {m.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
