import { useState, useEffect, useCallback, useRef } from "react";
import Icon from "@/components/ui/icon";

type Stage = "idle" | "connecting" | "download" | "upload" | "done";

interface TestResult {
  download: number;
  upload: number;
  ping: number;
  server: string;
  date: string;
}

const HISTORY: TestResult[] = [
  {
    download: 312,
    upload: 156,
    ping: 14,
    server: "Amsterdam NL-01",
    date: "05 апр 2025, 18:42",
  },
  {
    download: 278,
    upload: 134,
    ping: 18,
    server: "Frankfurt DE-02",
    date: "03 апр 2025, 11:15",
  },
  {
    download: 295,
    upload: 148,
    ping: 11,
    server: "Amsterdam NL-01",
    date: "01 апр 2025, 09:33",
  },
];

const STAGE_LABELS: Record<Stage, string> = {
  idle: "Готов к тестированию",
  connecting: "Подключение к серверу...",
  download: "Тест загрузки...",
  upload: "Тест отдачи...",
  done: "Тест завершён",
};

const GAUGE_RADIUS = 90;
const GAUGE_STROKE = 10;
const GAUGE_CIRCUMFERENCE = Math.PI * GAUGE_RADIUS;

export default function SpeedTest() {
  const [stage, setStage] = useState<Stage>("idle");
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);
  const [gaugeValue, setGaugeValue] = useState(0);
  const animFrameRef = useRef<number>(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cleanup = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const animateValue = useCallback(
    (
      target: number,
      duration: number,
      onUpdate: (v: number) => void,
      onComplete?: () => void
    ) => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        onUpdate(current);
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          onComplete?.();
        }
      };
      animFrameRef.current = requestAnimationFrame(step);
    },
    []
  );

  const runTest = useCallback(() => {
    cleanup();
    setDownload(0);
    setUpload(0);
    setPing(0);
    setGaugeValue(0);
    setStage("connecting");

    const t1 = setTimeout(() => {
      setPing(12);
      setStage("download");

      animateValue(
        285,
        2000,
        (v) => {
          setDownload(v);
          setGaugeValue(v);
        },
        () => {
          setStage("upload");
          animateValue(
            142,
            1500,
            (v) => {
              setUpload(v);
              setGaugeValue(v);
            },
            () => {
              setGaugeValue(285);
              setStage("done");
            }
          );
        }
      );
    }, 1200);

    timerRefs.current.push(t1);
  }, [animateValue, cleanup]);

  const gaugePercent = Math.min(gaugeValue / 500, 1);
  const dashOffset = GAUGE_CIRCUMFERENCE * (1 - gaugePercent);
  const isRunning = stage !== "idle" && stage !== "done";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
          Speed Test
        </h1>
        <p className="text-sm text-gray-400">
          Измерьте скорость вашего VPN-подключения
        </p>
      </div>

      {/* Gauge + metrics */}
      <div
        className="animate-fade-up bg-white border border-v-100 rounded-2xl p-6 md:p-10"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex flex-col items-center">
          {/* SVG gauge */}
          <div className="relative w-56 h-32 mb-6">
            <svg
              viewBox="0 0 200 110"
              className="w-full h-full"
              style={{ overflow: "visible" }}
            >
              {/* Background arc */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="#D1FAE5"
                strokeWidth={GAUGE_STROKE}
                strokeLinecap="round"
              />
              {/* Value arc */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="#22956A"
                strokeWidth={GAUGE_STROKE}
                strokeLinecap="round"
                strokeDasharray={GAUGE_CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                className="transition-all duration-200 ease-out"
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-4xl font-bold text-foreground tracking-tight font-mono">
                {stage === "idle" ? "---" : gaugeValue}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {stage === "upload" ? "Мбит/с (Upload)" : "Мбит/с"}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            {isRunning && (
              <Icon
                name="Loader2"
                size={14}
                className="animate-spin text-v-500"
              />
            )}
            {stage === "done" && (
              <Icon name="CheckCircle2" size={14} className="text-v-500" />
            )}
            <span>{STAGE_LABELS[stage]}</span>
          </div>

          {/* Three metric cards */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
            {[
              {
                label: "Download",
                value: download,
                unit: "Мбит/с",
                icon: "ArrowDown",
                color: "text-v-500",
                bg: "bg-v-50",
              },
              {
                label: "Upload",
                value: upload,
                unit: "Мбит/с",
                icon: "ArrowUp",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Ping",
                value: ping,
                unit: "мс",
                icon: "Activity",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mx-auto mb-2`}
                >
                  <Icon name={m.icon} size={15} className={m.color} />
                </div>
                <div className={`text-xl font-bold ${m.color} font-mono`}>
                  {stage === "idle" ? "--" : m.value}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  {m.unit}
                </div>
                <div className="text-[11px] font-medium text-gray-500 mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Server info + button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Icon name="Server" size={14} className="text-gray-400" />
              <span>
                Сервер: <span className="font-medium text-foreground">{"\u{1F1F3}\u{1F1F1}"} Amsterdam NL-01</span>
              </span>
            </div>
            <button
              onClick={runTest}
              disabled={isRunning}
              className="inline-flex items-center gap-2 bg-v-500 hover:bg-v-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              {isRunning ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Тестирование...
                </>
              ) : (
                <>
                  <Icon name="Gauge" size={16} />
                  Запустить тест
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* History */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          История тестов
        </h2>
        <div className="bg-white border border-v-100 rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-5 py-3 bg-gray-50 text-xs font-medium text-gray-400 uppercase tracking-wide">
            <span>Дата</span>
            <span>Сервер</span>
            <span className="text-right">Download</span>
            <span className="text-right">Upload</span>
            <span className="text-right">Ping</span>
          </div>
          {HISTORY.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 px-5 py-4 items-center ${
                i < HISTORY.length - 1 ? "border-b border-gray-100" : ""
              } hover:bg-v-50/40 transition-colors`}
            >
              <div className="text-sm text-gray-500">{row.date}</div>
              <div className="text-sm font-medium text-foreground md:col-span-1 text-right md:text-left">
                {row.server}
              </div>
              <div className="text-sm font-semibold text-v-500 md:text-right">
                <span className="md:hidden text-xs text-gray-400 font-normal mr-1">
                  DL:
                </span>
                {row.download} Мбит/с
              </div>
              <div className="text-sm font-semibold text-blue-600 md:text-right">
                <span className="md:hidden text-xs text-gray-400 font-normal mr-1">
                  UL:
                </span>
                {row.upload} Мбит/с
              </div>
              <div className="text-sm font-semibold text-amber-600 md:text-right col-span-2 md:col-span-1">
                <span className="md:hidden text-xs text-gray-400 font-normal mr-1">
                  Ping:
                </span>
                {row.ping} мс
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
