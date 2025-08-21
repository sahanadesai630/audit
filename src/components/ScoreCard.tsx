import React from 'react';

interface ScoreCardProps {
  icon: string;
  label: string;
  score: number;
  onClick: () => void;
  isActive: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ icon, label, score, onClick, isActive }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 border-green-300 text-green-800';
    if (score >= 80) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-red-100 border-red-300 text-red-800';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 80) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-600';
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
        isActive 
          ? 'border-blue-300 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(score)}`}>
          {score}
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getScoreGradient(score)} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
};