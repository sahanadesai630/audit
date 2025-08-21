import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  rating: string;
  description: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, rating, description }) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return '✅';
      case 'needs-improvement':
        return '⚠️';
      case 'poor':
        return '❌';
      default:
        return '❓';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 leading-tight">{label}</h4>
        <span className="text-lg">{getRatingIcon(rating)}</span>
      </div>
      
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getRatingColor(rating)}`}>
          {rating.replace('-', ' ').toUpperCase()}
        </div>
      </div>
      
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};