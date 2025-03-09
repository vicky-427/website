// client/src/components/Dashboard.jsx
import React, { useState } from 'react';
import FileManager from "./filemanager";

const Dashboard = () => {
  const [projectDetails, setProjectDetails] = useState({
    type: '',
    size: '',
    complexity: ''
  });

  const calculateQuote = () => {
    let basePrice = projectDetails.type === 'residential' ? 100000 : 500000;
    const complexityMultiplier = {
      'simple': 1,
      'moderate': 1.5,
      'complex': 2
    }[projectDetails.complexity] || 1;
    
    return (basePrice * complexityMultiplier + (parseInt(projectDetails.size) || 0) * 500)
      .toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="min-h-screen bg-white-50">
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Project Management Dashboard</h2>
          
          {/* Quote Generator */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-6">Generate Quote</h3>
            <div className="space-y-4">
              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setProjectDetails({...projectDetails, type: e.target.value})}
                value={projectDetails.type}
              >
                <option value="">Select Project Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>

              <input
                type="number"
                placeholder="Project Size (sq ft)"
                className="w-full p-3 border rounded-lg"
                value={projectDetails.size}
                onChange={(e) => setProjectDetails({...projectDetails, size: e.target.value})}
              />

              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setProjectDetails({...projectDetails, complexity: e.target.value})}
                value={projectDetails.complexity}
              >
                <option value="">Select Complexity</option>
                <option value="simple">Simple</option>
                <option value="moderate">Moderate</option>
                <option value="complex">Complex</option>
              </select>

              <button
                onClick={() => alert(`Estimated Quote: ${calculateQuote()}`)}
                className="w-full px-8 py-4 bg-green-600 text-white font-bold rounded-full uppercase tracking-wide hover:scale-105 transition-transform"
              >
                Generate Quote
              </button>
            </div>
          </div>

          {/* File Manager Component */}
          <FileManager />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;