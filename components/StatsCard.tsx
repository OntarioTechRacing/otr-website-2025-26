interface StatsCardProps {
  value: string | number;
  label: string;
}

export default function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="w-32 h-32 bg-[rgb(42,42,42)] border-2 border-[rgb(1,120,202)] rounded-lg flex flex-col items-center justify-center">
      <p className="text-white text-5xl font-bold">{value}</p>
      <p 
        className="text-white text-xs font-semibold text-center mt-2 leading-tight"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
}

