'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Code2, LineChart, Zap } from 'lucide-react';
import { BarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Topic {
  name: string;
  description: string;
  code: string;
  fullDescription: string;
}

interface Module {
  id: number;
  title: string;
  docNumber: string;
  description: string;
  topics: Topic[];
  chartData: any[];
  keyPoints: string[];
}

export default function Home() {
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('/api/docs');
        const data = await response.json();
        setModules(data.modules);
      } catch (error) {
        console.error('Error fetching docs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const renderChart = (module: Module) => {
    if (module.id === 1) {
      // Train-Test Split
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={module.chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {module.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (module.id === 2) {
      // Preparation comparison
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={module.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      // Pipeline stages
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={module.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="stage" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
          </RechartsLineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm border-b border-slate-700/50 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-xl font-bold text-white">DataDocs</span>
          </div>
          <div className="text-sm text-slate-400">Documentación de Módulos de Data Science</div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Documentación de Data Science
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explora tres módulos esenciales: División de Datasets, Preparación de Datos, y Construcción de Pipelines.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-6">
          {loading ? (
            <div className="text-center text-slate-400">Cargando documentación...</div>
          ) : (
            modules.map((module) => (
              <div key={module.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition">
                {/* Module Header */}
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full px-6 py-6 flex items-center justify-between hover:bg-slate-700/30 transition"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{module.id}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{module.title}</h2>
                      <p className="text-slate-400">{module.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-400 transition-transform ${
                      expandedModule === module.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Module Content */}
                {expandedModule === module.id && (
                  <div className="border-t border-slate-700 px-6 py-8 bg-slate-900/50">
                    {/* Chart */}
                    <div className="mb-12 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                      <h3 className="text-lg font-semibold text-white mb-6">Visualización</h3>
                      {renderChart(module)}
                    </div>

                    {/* Topics */}
                    <div className="mb-12">
                      <h3 className="text-lg font-semibold text-white mb-6">Temas Principales</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {module.topics.map((topic, idx) => (
                          <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-blue-400/50 transition">
                            <h4 className="font-semibold text-blue-400 mb-2">{topic.name}</h4>
                            <p className="text-slate-400 text-sm mb-3 leading-relaxed">{topic.description}</p>
                            <div className="text-slate-300 text-xs mb-4 whitespace-pre-wrap max-h-24 overflow-y-auto">
                              {topic.fullDescription}
                            </div>
                            <details className="mt-3">
                              <summary className="text-xs text-cyan-400 cursor-pointer hover:text-cyan-300 font-mono">
                                {'>'} Ver código
                              </summary>
                              <div className="bg-slate-900 rounded p-3 text-xs text-slate-300 font-mono overflow-x-auto mt-2">
                                <pre>{topic.code}</pre>
                              </div>
                            </details>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Puntos Clave</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {module.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 bg-slate-800/30 rounded p-3 border border-slate-700">
                            <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>Documentación Completa de Data Science - Módulos 07, 08 y 09</p>
          <p className="text-xs mt-2">División de Datasets | Preparación de Datos | Transformadores y Pipelines</p>
        </div>
      </footer>
    </main>
  );
}
