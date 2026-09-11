/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MEDHA Cognitive Engine - Main Interactive Application
 */

import React, { useState, useMemo, useEffect } from 'react';
import { getDefaultCognitiveModel } from './modules/medha/ml';
import type { CognitiveTelemetry, DecisionTreeNode } from './modules/medha/types';
import { TreeVisualizer } from './components/TreeVisualizer';
import { TelemetrySimulator } from './components/TelemetrySimulator';
import { CaregiverAlertCard } from './components/CaregiverAlertCard';
import { PresetScenarios } from './components/PresetScenarios';
import { ArchitectureMap } from './components/ArchitectureMap';
import { CodeIntegrationGuide } from './components/CodeIntegrationGuide';
import { HistoricalTrendChart } from './components/HistoricalTrendChart';
import { GameHub } from './components/games/GameHub';
import { BrainGamesPortal } from './modules/brain-games/components/BrainGamesPortal';
import {
  Brain,
  Cpu,
  Layers,
  Code,
  Sparkles,
  Info,
  X,
  TrendingUp,
  Gamepad2,
} from 'lucide-react';

const DEFAULT_TELEMETRY: CognitiveTelemetry = {
  avgReactionTimeMs: 640,
  accuracy: 0.88,
  lapseRate: 0.05,
  fatigueDrift: 0.08,
  errorClustering: 0.08,
  baselineDeviation: 0.02,
};

export default function App() {
  const [telemetry, setTelemetry] = useState<CognitiveTelemetry>(DEFAULT_TELEMETRY);
  const [activeScenarioName, setActiveScenarioName] = useState<string>('Custom Simulation');
  const [activeTab, setActiveTab] = useState<'games' | 'brain-arcade' | 'simulator' | 'trends' | 'architecture' | 'integration'>('games');
  const [selectedNode, setSelectedNode] = useState<DecisionTreeNode | null>(null);

  // Initialize and memoize the ML Random Tree model
  const model = useMemo(() => getDefaultCognitiveModel(), []);

  // Run real-time inference on current telemetry
  const evaluation = useMemo(() => {
    return model.evaluate(telemetry);
  }, [model, telemetry]);

  const handleSelectScenario = (scenario: CognitiveTelemetry, name: string) => {
    setTelemetry(scenario);
    setActiveScenarioName(name);
  };

  const handleTelemetryChange = (updated: CognitiveTelemetry) => {
    setTelemetry(updated);
    setActiveScenarioName('Custom Simulation');
  };

  const handleReset = () => {
    setTelemetry(DEFAULT_TELEMETRY);
    setActiveScenarioName('Custom Simulation');
  };

  const handleInspectInTree = (customTelemetry: CognitiveTelemetry) => {
    setTelemetry(customTelemetry);
    setActiveScenarioName('Live Game Telemetry Inspection');
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Application Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Brain className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-white">
                  MEDHA Cognitive Engine
                </h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-semibold">
                  ML Random Tree v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Machine Learning Telemetry Classifier for Dementia &amp; Senior Cognitive Health
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              id="tab-games"
              onClick={() => setActiveTab('games')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'games'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Cognitive Games
            </button>
            <button
              id="tab-brain-arcade"
              onClick={() => setActiveTab('brain-arcade')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'brain-arcade'
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Brain Arcade (21)
            </button>
            <button
              id="tab-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Tree &amp; Telemetry
            </button>
            <button
              id="tab-trends"
              onClick={() => setActiveTab('trends')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'trends'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Progress &amp; Trends
            </button>
            <button
              id="tab-architecture"
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              MEDHA Pipeline
            </button>
            <button
              id="tab-integration"
              onClick={() => setActiveTab('integration')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'integration'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Module Guide
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tab 0: Senior-Friendly Cognitive Games Suite */}
        {activeTab === 'games' && (
          <GameHub
            onSessionComplete={(session) => {
              setTelemetry(session.normalizedTelemetry);
              setActiveScenarioName(`Live Game: ${session.game_id} (Lvl ${session.difficulty_level})`);
            }}
            onInspectInTree={handleInspectInTree}
          />
        )}

        {/* Tab 0.5: Brain Development Games Arcade (21 Games) */}
        {activeTab === 'brain-arcade' && (
          <BrainGamesPortal
            onSessionComplete={(session) => {
              setTelemetry(session.normalizedTelemetry);
              setActiveScenarioName(`Arcade: ${session.game_id} (Lvl ${session.difficulty_level})`);
            }}
            onInspectInTree={handleInspectInTree}
          />
        )}

        {/* Tab 1: Simulator & Tree Inspector */}
        {activeTab === 'simulator' && (
          <>
            {/* Quick Scenario Selector */}
            <PresetScenarios
              onSelectScenario={handleSelectScenario}
              activeScenarioName={activeScenarioName}
            />

            {/* Split Top Controls: Telemetry Sliders + Caregiver Output Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <TelemetrySimulator
                  telemetry={telemetry}
                  onChange={handleTelemetryChange}
                  onReset={handleReset}
                />
              </div>
              <div className="lg:col-span-6">
                <CaregiverAlertCard evaluation={evaluation} />
              </div>
            </div>

            {/* Decision Tree Visual Graph with Real-Time Inference Path */}
            <div className="relative">
              <TreeVisualizer
                root={model.root}
                activePathNodeIds={evaluation.activePathNodeIds}
                onSelectNode={(node) => setSelectedNode(node)}
                selectedNodeId={selectedNode?.id}
              />

              {/* Node Details Modal / Drawer */}
              {selectedNode && (
                <div className="absolute top-16 right-6 z-30 w-80 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-slate-200">
                        Node Details: {selectedNode.id}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Type:</span>
                      <span className="font-bold text-cyan-400">
                        {selectedNode.isLeaf ? 'Leaf Decision' : 'Split Test'}
                      </span>
                    </div>
                    {selectedNode.feature && (
                      <div className="flex justify-between text-slate-300">
                        <span>Feature Split:</span>
                        <span className="font-bold text-emerald-400">
                          {selectedNode.feature} ≤ {selectedNode.threshold}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-300">
                      <span>Gini Impurity:</span>
                      <span>{selectedNode.impurity.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Samples Handled:</span>
                      <span>{selectedNode.samplesCount}</span>
                    </div>
                    {selectedNode.prediction && (
                      <div className="flex justify-between text-slate-300">
                        <span>Leaf Class:</span>
                        <span className="font-bold text-emerald-300">
                          {selectedNode.prediction}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedNode.classDistribution && (
                    <div className="mt-3 pt-2 border-t border-slate-800">
                      <div className="text-[10px] text-slate-400 mb-1.5 uppercase font-mono">
                        Class Distribution (N):
                      </div>
                      <div className="space-y-1 text-[11px] font-mono">
                        {Object.entries(selectedNode.classDistribution).map(([cls, cnt]) => (
                          <div key={cls} className="flex justify-between text-slate-300">
                            <span className="truncate max-w-[160px]">{cls}:</span>
                            <span className="font-bold">{cnt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* In-view Historical Progress Section */}
            <div className="pt-2">
              <HistoricalTrendChart onInspectInTree={handleInspectInTree} />
            </div>
          </>
        )}

        {/* Tab 2: Historical Telemetry Trends */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <HistoricalTrendChart onInspectInTree={handleInspectInTree} />
          </div>
        )}

        {/* Tab 3: System Architecture */}
        {activeTab === 'architecture' && <ArchitectureMap />}

        {/* Tab 4: Module Integration Guide */}
        {activeTab === 'integration' && <CodeIntegrationGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 mt-8 text-center text-xs text-slate-400">
        <p>
          MEDHA Cognitive Health Engine • Evidence-Based Psychometric Telemetry &amp; Random Tree AI Classifier
        </p>
      </footer>
    </div>
  );
}
