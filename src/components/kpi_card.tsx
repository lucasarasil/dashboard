import React from "react";

interface KpiCardProps {
 title: string;
 value: string | number;
 icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
 color?: string;
 bgColor?: string;
 borderColor?: string;
 trend?: "up" | "down" | "neutral";
}

const KpiCard: React.FC<KpiCardProps> = ({
 title,
 value,
 icon: Icon,
 color = "text-mottu-500",
 bgColor = "bg-dark-tertiary",
 borderColor = "border-border-primary",
 trend = "neutral",
}) => {
 const getTrendColor = () => {
  switch (trend) {
   case "up":
    return "text-mottu-500";
   case "down":
    return "text-red-400";
   default:
    return "text-text-primary";
  }
 };

 return (
  <div
   className={`group p-4 rounded-xl border ${bgColor} ${borderColor} transition-all duration-300 hover:border-mottu-500/30 hover:shadow-dark-lg hover:shadow-mottu/20 relative overflow-hidden`}
  >
   {/* Efeito de brilho sutil no hover */}
   <div className="absolute inset-0 bg-gradient-to-br from-mottu-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

   <div className="flex items-center justify-between relative z-10">
    <div className="flex items-center gap-3 flex-1">
     <div
      className={`p-2 rounded-lg bg-dark-primary border border-border-primary group-hover:border-mottu-500/20 transition-colors duration-300`}
     >
      <Icon className={`h-5 w-5 ${color} transition-colors duration-300`} />
     </div>
     <div className="flex-1 min-w-0">
      <div
       className={`text-2xl font-bold ${getTrendColor()} transition-colors duration-300`}
      >
       {value}
      </div>
      <div className="text-xs text-text-secondary mt-0.5 group-hover:text-text-primary transition-colors duration-300">
       {title}
      </div>
     </div>
    </div>

    {/* Indicador de tendência sutil */}
    {trend !== "neutral" && (
     <div className={`w-2 h-2 rounded-full ${getTrendColor()} opacity-60`} />
    )}
   </div>
  </div>
 );
};

export default KpiCard;
