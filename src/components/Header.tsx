import React from 'react';
import { Shield, Zap, Search, Eye } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WebAudit Pro
              </h1>
              <p className="text-sm text-gray-600">Comprehensive Website Analysis</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Performance</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Security</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Search className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">SEO</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Eye className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};