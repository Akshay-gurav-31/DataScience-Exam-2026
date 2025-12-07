import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Filter, RotateCcw, Zap } from 'lucide-react';

const DataScienceTracker = () => {
  const [progress, setProgress] = useState(new Set());
  const [filter, setFilter] = useState('all');
  const [saveStatus, setSaveStatus] = useState('💾 Ready');
  const [expandedSection, setExpandedSection] = useState('common');

  const commonQuestions = [
    "Explain Arithmetic operators with example",
    "Explain Python List Methods",
    "Explain string methods",
    "What is a dictionary in Python? Explain its key features...",
    "Write a Python program to count character frequency...",
    "What are classes and objects in Python? Explain with examples",
    "What is a function in Python? Explain advantages with example",
    "What's Data Science Pipeline?",
    "Data Science Pipeline",
    "Explain Data Science Pipeline with neat diagram",
    "Explain applications of data science",
    "Explain data science and AI",
    "What Is Data Visualization? Explain plot types",
    "Explain Data Visualization? Explain plots",
    "Explain Data Visualization. Types of Plots",
    "What is data visualization? Importance?",
    "What Is Matplotlib? Explain box/pie plot",
    "Scatter plot example",
    "Explain scatter plot with program",
    "Explain Histogram with example?",
    "Short note: histogram, boxplot, directed/undirected graph",
    "Explain pie chart",
    "Difference between bar, line, pie chart?",
    "Explain central tendency & variance",
    "Mean, median, mode with example",
    "What is coefficient of correlation?",
    "Coefficient of correlation with example",
    "What is a Contingency Table?",
    "Explain EDA",
    "Exploratory Data Analysis",
    "EDA types & steps",
    "What is Data Wrangling?",
    "Wrangling of Data",
    "Data wrangling process",
    "Arithmetic operators"
  ];

  const uniqueQuestions = [
    "What is data science? What is Python? Features?",
    "Role of data types in Python. Explain list methods",
    "What is a string? slicing, concatenation, repetition",
    "Difference: list vs tuple",
    "Define tuple, immutability",
    "Program: Pass/Fail",
    "Program: set union, intersection, difference",
    "Difference: discard(), remove(), clear(), del",
    "Core skills for data scientist",
    "How data science, big data, AI work together?",
    "How programming improves data analysis?",
    "Python vs IPython",
    "Magic functions in IPython",
    "Program: arithmetic operators + magic",
    "What is IPython? Features?",
    "Short note: Magic, Jupyter, Checkpoint",
    "Magic methods & operator overloading",
    "Comparison operators using magic methods",
    "Attribute access methods",
    "What is kernel? Types? Why restart?",
    "Load Seaborn built-in dataset",
    "Program: line chart",
    "Factors for choosing a graph",
    "Program: pie chart",
    "Explain timeplot",
    "Role of hashing in wrangling",
    "What is benchmarking?",
    "Hashing trick program"
  ];

  useEffect(() => {
    setSaveStatus('✅ Synced');
    const timer = setTimeout(() => setSaveStatus('💾 Ready'), 2000);
    return () => clearTimeout(timer);
  }, [progress]);

  const toggleQuestion = (id) => {
    setProgress(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const resetAll = () => {
    if (window.confirm('🔄 Reset all progress? This cannot be undone.')) {
      setProgress(new Set());
    }
  };

  const total = commonQuestions.length + uniqueQuestions.length;
  const done = progress.size;
  const percent = Math.round((done / total) * 100);
  const commonDone = commonQuestions.filter((_, i) => progress.has(`c${i}`)).length;
  const uniqueDone = uniqueQuestions.filter((_, i) => progress.has(`u${i}`)).length;

  const renderQuestion = (text, id, category) => {
    const isCompleted = progress.has(id);
    const shouldShow = filter === 'all' || (filter === 'done' && isCompleted) || (filter === 'pending' && !isCompleted);

    if (!shouldShow) return null;

    return (
      <div
        key={id}
        onClick={() => toggleQuestion(id)}
        className={`group relative p-4 mb-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
          isCompleted
            ? 'border-emerald-500 bg-emerald-50 shadow-md hover:shadow-lg hover:scale-102'
            : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg hover:scale-101'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`mt-1 min-w-[24px] h-6 w-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-500 scale-110'
                : 'border-slate-400 group-hover:border-blue-500'
            }`}
          >
            {isCompleted && <Check size={16} className="text-white font-bold" />}
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium transition-colors ${isCompleted ? 'text-emerald-700 line-through' : 'text-slate-700'}`}>
              {text}
            </p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
              category === 'common'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
              {category === 'common' ? 'Both' : 'Units'}
            </span>
          </div>
        </div>
        {isCompleted && (
          <div className="absolute top-2 right-2 text-2xl animate-bounce">✨</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3">
                  <Zap size={40} className="text-blue-400" />
                  Data Science Tracker
                </h1>
                <p className="text-blue-100 text-lg">Master every concept with precision</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm transition-all ${
                saveStatus.includes('Synced') ? 'bg-emerald-500' : 'bg-blue-500'
              }`}>
                {saveStatus}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-blue-100 text-sm font-semibold">TOTAL</p>
                <p className="text-4xl font-black">{total}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-blue-100 text-sm font-semibold">COMPLETED</p>
                <p className="text-4xl font-black">{done}</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-blue-100 text-sm font-semibold">PROGRESS</p>
                <p className="text-4xl font-black">{percent}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-blue-900 bg-opacity-50 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-500 shadow-lg shadow-emerald-500/50"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="text-center text-blue-100 text-sm mt-3 font-semibold">
              {done} of {total} questions completed
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white text-slate-700 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:border-blue-500 transition-colors shadow-lg"
            >
              <option value="all">📋 All Questions</option>
              <option value="pending">⏳ Pending</option>
              <option value="done">✅ Done</option>
            </select>
            <Filter size={18} className="absolute left-3 top-3.5 text-slate-400" />
          </div>

        </div>

        {/* Common Questions Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          <button
            onClick={() => setExpandedSection(expandedSection === 'common' ? null : 'common')}
            className="w-full p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div className="text-left">
                <h2 className="text-xl font-black">Common Questions (Both Papers & Units)</h2>
                <p className="text-blue-100 text-sm">{commonDone}/36 completed</p>
              </div>
            </div>
            <ChevronDown
              size={24}
              className={`transition-transform ${expandedSection === 'common' ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSection === 'common' && (
            <div className="p-6 space-y-2 bg-slate-50">
              {commonQuestions.map((q, i) => renderQuestion(q, `c${i}`, 'common'))}
            </div>
          )}
        </div>

        {/* Unique Questions Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'unique' ? null : 'unique')}
            className="w-full p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div className="text-left">
                <h2 className="text-xl font-black">Unique Questions (Only Units)</h2>
                <p className="text-purple-100 text-sm">{uniqueDone}/28 completed</p>
              </div>
            </div>
            <ChevronDown
              size={24}
              className={`transition-transform ${expandedSection === 'unique' ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSection === 'unique' && (
            <div className="p-6 space-y-2 bg-slate-50">
              {uniqueQuestions.map((q, i) => renderQuestion(q, `u${i}`, 'unique'))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-blue-200 text-sm">
          <p>🎯 Keep grinding! Your consistency will pay off.</p>
        </div>
      </div>
    </div>
  );
};

export default DataScienceTracker;
