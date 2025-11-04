interface TimerProps {
  timeLeft: number;
}

const Timer = ({ timeLeft }: TimerProps) => {
  const isLowTime = timeLeft <= 10;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`text-3xl font-bold tabular-nums transition-colors ${
          isLowTime ? 'text-warning animate-pulse-success' : 'text-foreground'
        }`}
      >
        {timeLeft}s
      </div>
    </div>
  );
};

export default Timer;
