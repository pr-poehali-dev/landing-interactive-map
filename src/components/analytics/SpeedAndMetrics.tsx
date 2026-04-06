import Icon from "@/components/ui/icon";

const PRIMARY = "#22956A";

/* ───── key metrics ───── */

const METRICS = [
  {
    icon: "Zap",
    label: "Пропускная способность",
    value: "847",
    unit: "Мбит/с",
    change: "+3.2%",
    up: true,
  },
  {
    icon: "Activity",
    label: "Средний пинг",
    value: "28",
    unit: "мс",
    change: "-1.4%",
    up: true,
  },
  {
    icon: "ShieldCheck",
    label: "Packet Loss",
    value: "0.02",
    unit: "%",
    change: "-0.01%",
    up: true,
  },
  {
    icon: "Users",
    label: "Активных подключений",
    value: "12 480",
    unit: "",
    change: "+128",
    up: true,
  },
];

/* ───── speed gauge component ───── */

function SpeedGauge({
  value,
  max,
  label,
  unit,
  animated,
}: {
  value: number;
  max: number;
  label: string;
  unit: string;
  animated: boolean;
}) {
  const radius = 58;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const halfCirc = circumference * 0.75;
  const progress = animated ? (value / max) * halfCirc : 0;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="120" viewBox="0 0 140 130" className="overflow-visible">
        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={stroke}
          strokeDasharray={`${halfCirc} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(135 70 70)"
        />
        {/* Progress arc */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={PRIMARY}
          strokeWidth={stroke}
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(135 70 70)"
          style={{
            transition: "stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Value text */}
        <text
          x="70"
          y="64"
          textAnchor="middle"
          className="fill-foreground"
          style={{ fontSize: "26px", fontWeight: 800 }}
        >
          {animated ? value : 0}
        </text>
        <text
          x="70"
          y="84"
          textAnchor="middle"
          className="fill-gray-400"
          style={{ fontSize: "11px", fontWeight: 500 }}
        >
          {unit}
        </text>
      </svg>
      <span className="text-xs font-semibold text-gray-500 mt-1">{label}</span>
    </div>
  );
}

/* ───── live dot ───── */

export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-v-600 bg-v-50 border border-v-100 rounded-full px-3 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Live
    </span>
  );
}

/* ───── props ───── */

interface SpeedAndMetricsProps {
  gaugeAnimated: boolean;
}

/* ───── component ───── */

export default function SpeedAndMetrics({ gaugeAnimated }: SpeedAndMetricsProps) {
  return (
    <>
      {/* Key metrics */}
      <section className="px-5 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up"
            style={{ animationDelay: ".35s", opacity: 0 }}
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-v-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-v-50 group-hover:bg-v-500 flex items-center justify-center transition-colors">
                    <Icon
                      name={m.icon}
                      size={18}
                      className="text-v-500 group-hover:text-white transition-colors"
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      m.up ? "text-v-500" : "text-red-400"
                    }`}
                  >
                    {m.change}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-foreground">{m.value}</span>
                  {m.unit && (
                    <span className="text-sm text-gray-400 font-medium">{m.unit}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed Test Gauge */}
      <section className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground animate-fade-up">
                Speed Test
              </h2>
              <p
                className="text-sm text-gray-500 mt-1 animate-fade-up"
                style={{ animationDelay: ".05s", opacity: 0 }}
              >
                Текущая производительность ближайшего сервера (Amsterdam NL-01)
              </p>
            </div>
            <LiveBadge />
          </div>

          <div
            className="rounded-2xl border border-gray-100 bg-white p-8 md:p-10 shadow-sm animate-fade-up"
            style={{ animationDelay: ".1s", opacity: 0 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <SpeedGauge
                value={285}
                max={500}
                label="Download"
                unit="Мбит/с"
                animated={gaugeAnimated}
              />
              <SpeedGauge
                value={142}
                max={500}
                label="Upload"
                unit="Мбит/с"
                animated={gaugeAnimated}
              />
              <SpeedGauge
                value={12}
                max={200}
                label="Ping"
                unit="мс"
                animated={gaugeAnimated}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-gray-50">
              {[
                { icon: "MapPin", text: "Amsterdam, NL" },
                { icon: "Server", text: "NL-01" },
                { icon: "Shield", text: "VLESS" },
                { icon: "Lock", text: "AES-256" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <Icon name={item.icon} size={13} className="text-gray-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
