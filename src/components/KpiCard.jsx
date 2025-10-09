import React from 'react';

const KpiCard = ({ title, value, icon: Icon, color, bg, bgColor, border, borderColor, text }) => {
  // Usar as props corretas (text, bg, border são mais diretos)
  const finalColor = text || color || 'text-gray-600';
  const finalBg = bg || bgColor || 'bg-gray-50';
  const finalBorder = border || borderColor || 'border-gray-200';
  
  return (
    <div className={`p-4 rounded-lg border ${finalBg} ${finalBorder} hover:shadow-sm transition-shadow duration-200`}>
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${finalBg}`}>
          <Icon className={`h-5 w-5 ${finalColor}`} />
        </div>
        <div className="text-right flex-1 ml-3">
          <div className={`text-2xl font-bold ${finalColor}`}>
            {value}
          </div>
          <div className="text-xs text-gray-600 mt-0.5">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
