import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';

interface AuditFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid website URL');
      return;
    }

    setError('');
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    onSubmit(normalizedUrl);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4">
          <Globe className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Website Audit Tool</h2>
        <p className="text-gray-600 text-lg">
          Get comprehensive analysis of your website's performance, security, SEO, and accessibility
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-3">
            Website URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="example.com or https://example.com"
              className={`block w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
              }`}
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className={`w-full flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-200 ${
            isLoading || !url.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
              Analyzing Website...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-3" />
              Start Audit
            </>
          )}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
        {[
          { label: 'Performance', icon: '⚡', color: 'text-yellow-600' },
          { label: 'Security', icon: '🔒', color: 'text-green-600' },
          { label: 'SEO', icon: '🔍', color: 'text-blue-600' },
          { label: 'Accessibility', icon: '♿', color: 'text-purple-600' }
        ].map(({ label, icon, color }) => (
          <div key={label} className="text-center">
            <div className={`text-2xl ${color} mb-1`}>{icon}</div>
            <div className="text-sm font-medium text-gray-600">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};