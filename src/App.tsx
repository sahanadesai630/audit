import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuditForm } from './components/AuditForm';
import { AuditResults } from './components/AuditResults';
import { LoadingState } from './components/LoadingState';

export interface AuditData {
  url: string;
  timestamp: string;
  overall: {
    score: number;
    grade: string;
  };
  performance: {
    score: number;
    metrics: {
      fcp: { value: number; rating: string };
      lcp: { value: number; rating: string };
      cls: { value: number; rating: string };
      fid: { value: number; rating: string };
      ttfb: { value: number; rating: string };
    };
    issues: string[];
    recommendations: string[];
  };
  security: {
    score: number;
    ssl: { status: string; grade: string };
    headers: {
      hsts: boolean;
      csp: boolean;
      xframe: boolean;
      xss: boolean;
    };
    issues: string[];
    recommendations: string[];
  };
  seo: {
    score: number;
    meta: {
      title: boolean;
      description: boolean;
      keywords: boolean;
      canonical: boolean;
    };
    structure: {
      headings: boolean;
      sitemap: boolean;
      robots: boolean;
      schema: boolean;
    };
    issues: string[];
    recommendations: string[];
  };
  accessibility: {
    score: number;
    wcag: {
      level: string;
      compliance: number;
    };
    issues: string[];
    recommendations: string[];
  };
}

function App() {
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAudit = async (url: string) => {
    setIsLoading(true);
    setAuditData(null);

    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate realistic mock data
    const mockData: AuditData = {
      url,
      timestamp: new Date().toISOString(),
      overall: {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        grade: 'B+'
      },
      performance: {
        score: Math.floor(Math.random() * 25) + 75,
        metrics: {
          fcp: { value: Math.random() * 2 + 1, rating: Math.random() > 0.5 ? 'good' : 'needs-improvement' },
          lcp: { value: Math.random() * 3 + 1.5, rating: Math.random() > 0.3 ? 'good' : 'poor' },
          cls: { value: Math.random() * 0.25, rating: Math.random() > 0.4 ? 'good' : 'needs-improvement' },
          fid: { value: Math.random() * 150 + 50, rating: Math.random() > 0.6 ? 'good' : 'needs-improvement' },
          ttfb: { value: Math.random() * 400 + 200, rating: Math.random() > 0.5 ? 'good' : 'needs-improvement' }
        },
        issues: [
          'Large images not optimized',
          'Unused JavaScript detected',
          'Render-blocking resources found'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        recommendations: [
          'Optimize images and use next-gen formats',
          'Remove unused code and dependencies',
          'Implement lazy loading for images',
          'Use a CDN for static assets'
        ]
      },
      security: {
        score: Math.floor(Math.random() * 20) + 80,
        ssl: {
          status: Math.random() > 0.2 ? 'Valid' : 'Issues Found',
          grade: ['A+', 'A', 'B+', 'B'][Math.floor(Math.random() * 4)]
        },
        headers: {
          hsts: Math.random() > 0.3,
          csp: Math.random() > 0.5,
          xframe: Math.random() > 0.2,
          xss: Math.random() > 0.1
        },
        issues: [
          'Missing HSTS header',
          'Content Security Policy not configured',
          'X-Frame-Options header missing'
        ].filter(() => Math.random() > 0.6),
        recommendations: [
          'Implement HSTS with long max-age',
          'Configure Content Security Policy',
          'Add security headers to prevent clickjacking',
          'Regular security updates and patches'
        ]
      },
      seo: {
        score: Math.floor(Math.random() * 25) + 75,
        meta: {
          title: Math.random() > 0.1,
          description: Math.random() > 0.2,
          keywords: Math.random() > 0.7,
          canonical: Math.random() > 0.4
        },
        structure: {
          headings: Math.random() > 0.3,
          sitemap: Math.random() > 0.4,
          robots: Math.random() > 0.2,
          schema: Math.random() > 0.6
        },
        issues: [
          'Missing meta description',
          'Duplicate H1 tags found',
          'No structured data detected'
        ].filter(() => Math.random() > 0.5),
        recommendations: [
          'Add unique meta descriptions for all pages',
          'Implement proper heading hierarchy',
          'Add structured data markup',
          'Optimize page titles for search engines'
        ]
      },
      accessibility: {
        score: Math.floor(Math.random() * 30) + 70,
        wcag: {
          level: 'AA',
          compliance: Math.floor(Math.random() * 20) + 80
        },
        issues: [
          'Images missing alt text',
          'Low color contrast detected',
          'Focus indicators missing'
        ].filter(() => Math.random() > 0.6),
        recommendations: [
          'Add descriptive alt text to all images',
          'Improve color contrast ratios',
          'Ensure keyboard navigation support',
          'Use semantic HTML elements'
        ]
      }
    };

    mockData.overall.grade = mockData.overall.score >= 90 ? 'A+' : 
                           mockData.overall.score >= 85 ? 'A' :
                           mockData.overall.score >= 80 ? 'B+' :
                           mockData.overall.score >= 75 ? 'B' :
                           mockData.overall.score >= 70 ? 'C+' : 'C';

    setAuditData(mockData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AuditForm onSubmit={handleAudit} isLoading={isLoading} />
          
          {isLoading && <LoadingState />}
          
          {auditData && !isLoading && <AuditResults data={auditData} />}
          
          {!auditData && !isLoading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Ready to Analyze</h2>
              <p className="text-gray-600">Enter a website URL above to get started with your comprehensive audit</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;