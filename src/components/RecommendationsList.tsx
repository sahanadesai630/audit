import React from 'react';
import { Lightbulb, ExternalLink } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: string[];
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-blue-600" />
        <h4 className="text-lg font-semibold text-gray-900">Recommendations</h4>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
            </div>
            <div className="flex-1">
              <p className="text-blue-800 font-medium">{recommendation}</p>
            </div>
            <button className="flex-shrink-0 text-blue-600 hover:text-blue-800 transition-colors">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">💡</div>
          <div>
            <h5 className="font-semibold text-blue-900 mb-1">Pro Tip</h5>
            <p className="text-blue-800 text-sm">
              Implementing these recommendations can significantly improve your website's performance and user experience. 
              Start with the highest-impact changes first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};