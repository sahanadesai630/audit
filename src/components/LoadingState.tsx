import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  const steps = [
    'Connecting to website...',
    'Analyzing performance metrics...',
    'Checking security headers...',
    'Scanning SEO elements...',
    'Testing accessibility...',
    'Compiling results...'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-6">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Running Comprehensive Audit</h3>
        <p className="text-gray-600 mb-8">This may take a few moments as we analyze your website thoroughly</p>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center justify-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                index < 3 ? 'bg-blue-500' : 
                index === 3 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
              }`} />
              <span className={`text-sm font-medium ${
                index < 3 ? 'text-blue-600' : 
                index === 3 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};