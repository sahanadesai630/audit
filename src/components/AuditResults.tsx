import React, { useState } from 'react';
import { AuditData } from '../App';
import { ScoreCard } from './ScoreCard';
import { MetricCard } from './MetricCard';
import { RecommendationsList } from './RecommendationsList';
import { Download, Share2, RefreshCw, Calendar, Globe } from 'lucide-react';

interface AuditResultsProps {
  data: AuditData;
}

export const AuditResults: React.FC<AuditResultsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'security' | 'seo' | 'accessibility'>('performance');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'performance', label: 'Performance', icon: '⚡', score: data.performance.score },
    { id: 'security', label: 'Security', icon: '🔒', score: data.security.score },
    { id: 'seo', label: 'SEO', icon: '🔍', score: data.seo.score },
    { id: 'accessibility', label: 'Accessibility', icon: '♿', score: data.accessibility.score }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Overall Score */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Audit Complete</h2>
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{data.url}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate(data.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold">{data.overall.score}</div>
              <div className="text-xl font-semibold text-blue-100">Grade {data.overall.grade}</div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tabs.map((tab) => (
              <ScoreCard
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                score={tab.score}
                onClick={() => setActiveTab(tab.id as any)}
                isActive={activeTab === tab.id}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-gray-100">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Export Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="h-4 w-4" />
              <span className="text-sm font-medium">Share Results</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm font-medium">Re-audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(tab.score)}`}>
                  {tab.score}
                </span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-8">
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MetricCard
                    label="First Contentful Paint"
                    value={`${data.performance.metrics.fcp.value.toFixed(1)}s`}
                    rating={data.performance.metrics.fcp.rating}
                    description="Time until first content appears"
                  />
                  <MetricCard
                    label="Largest Contentful Paint"
                    value={`${data.performance.metrics.lcp.value.toFixed(1)}s`}
                    rating={data.performance.metrics.lcp.rating}
                    description="Time until largest content loads"
                  />
                  <MetricCard
                    label="Cumulative Layout Shift"
                    value={data.performance.metrics.cls.value.toFixed(3)}
                    rating={data.performance.metrics.cls.rating}
                    description="Visual stability metric"
                  />
                  <MetricCard
                    label="First Input Delay"
                    value={`${Math.round(data.performance.metrics.fid.value)}ms`}
                    rating={data.performance.metrics.fid.rating}
                    description="Time to first interaction"
                  />
                  <MetricCard
                    label="Time to First Byte"
                    value={`${Math.round(data.performance.metrics.ttfb.value)}ms`}
                    rating={data.performance.metrics.ttfb.rating}
                    description="Server response time"
                  />
                </div>
              </div>
              
              {data.performance.issues.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Issues Found</h4>
                  <div className="space-y-2">
                    {data.performance.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-red-800 font-medium">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <RecommendationsList recommendations={data.performance.recommendations} />
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Security Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">SSL Certificate</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold ${
                        data.security.ssl.status === 'Valid' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {data.security.ssl.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-semibold text-blue-600">{data.security.ssl.grade}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Security Headers</h4>
                    <div className="space-y-2">
                      {Object.entries(data.security.headers).map(([header, present]) => (
                        <div key={header} className="flex items-center justify-between">
                          <span className="text-gray-600 capitalize">
                            {header.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <span className={`font-semibold ${present ? 'text-green-600' : 'text-red-600'}`}>
                            {present ? '✓' : '✗'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {data.security.issues.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Security Issues</h4>
                  <div className="space-y-2">
                    {data.security.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-red-800 font-medium">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <RecommendationsList recommendations={data.security.recommendations} />
            </div>
          )}
          
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">SEO Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Meta Elements</h4>
                    <div className="space-y-2">
                      {Object.entries(data.seo.meta).map(([element, present]) => (
                        <div key={element} className="flex items-center justify-between">
                          <span className="text-gray-600 capitalize">{element}:</span>
                          <span className={`font-semibold ${present ? 'text-green-600' : 'text-red-600'}`}>
                            {present ? '✓' : '✗'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Page Structure</h4>
                    <div className="space-y-2">
                      {Object.entries(data.seo.structure).map(([element, present]) => (
                        <div key={element} className="flex items-center justify-between">
                          <span className="text-gray-600 capitalize">{element}:</span>
                          <span className={`font-semibold ${present ? 'text-green-600' : 'text-red-600'}`}>
                            {present ? '✓' : '✗'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {data.seo.issues.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">SEO Issues</h4>
                  <div className="space-y-2">
                    {data.seo.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-800 font-medium">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <RecommendationsList recommendations={data.seo.recommendations} />
            </div>
          )}
          
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Accessibility Analysis</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">WCAG Compliance</h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-semibold text-blue-600">{data.accessibility.wcag.level}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Compliance Score</h4>
                      <div className="flex items-center space-x-3">
                        <span className={`text-2xl font-bold ${getScoreColor(data.accessibility.wcag.compliance).split(' ')[0]}`}>
                          {data.accessibility.wcag.compliance}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {data.accessibility.issues.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Accessibility Issues</h4>
                  <div className="space-y-2">
                    {data.accessibility.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-purple-800 font-medium">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <RecommendationsList recommendations={data.accessibility.recommendations} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};