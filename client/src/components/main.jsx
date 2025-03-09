import React, { useState, useEffect } from 'react';
import Logo from "../assets/logo.png";


const ConstructionCostCalculator = () => {
  // State variables for form inputs
  const [projectType, setProjectType] = useState('residential');
  const [bhk, setBhk] = useState('3');
  const [squareFootage, setSquareFootage] = useState('');
  const [quality, setQuality] = useState('standard');
  const [startDate, setStartDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [resultsContent, setResultsContent] = useState(null);
  const [squareFootageError, setSquareFootageError] = useState(false);

  // Set the default date to today
  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    setStartDate(formattedToday);
  }, []);

  // Average square footage by BHK
  const bhkSizes = {
    1: 550,
    2: 950,
    3: 1400,
    4: 2000,
    5: 3000
  };

  // Base construction costs per square foot (in INR)
  const baseCosts = {
    residential: 2200,
    commercial: 2800,
    industrial: 1800,
    renovation: 1500
  };

  // Quality multipliers
  const qualityMultipliers = {
    basic: 0.8,
    standard: 1.0,
    premium: 1.3,
    luxury: 1.8
  };

  // Cost breakdown percentages
  const costBreakdown = {
    foundation: 0.12,
    framing: 0.16,
    exterior: 0.14,
    majorSystems: 0.15,
    interior: 0.23,
    landscaping: 0.03,
    permits: 0.02,
    labor: 0.38,
    contingency: 0.10
  };

  // Get season multiplier based on start date
  const getSeasonMultiplier = (dateString) => {
    if (!dateString) return 1.0;

    const date = new Date(dateString);
    const month = date.getMonth(); // 0-11 (Jan-Dec)

    // Monsoon season (higher costs due to challenges)
    if (month >= 5 && month <= 8) { // June-September
      return 1.08; // 8% increase
    }
    // Winter season (typically lower costs)
    else if (month >= 10 || month <= 1) { // November-February
      return 0.95; // 5% decrease
    }
    // Rest of the year (spring, early summer, fall)
    else {
      return 1.0; // Standard rate
    }
  };

  // Get season name for display
  const getSeasonName = (dateString) => {
    if (!dateString) return "Standard";

    const date = new Date(dateString);
    const month = date.getMonth(); // 0-11 (Jan-Dec)

    if (month >= 5 && month <= 8) return "Monsoon Season";
    else if (month >= 10 || month <= 1) return "Winter Season";
    else return "Standard Season";
  };

  // Urgency multiplier (if project starts within 4 months)
  const getUrgencyMultiplier = (dateString) => {
    if (!dateString) return 1.0;

    const projectStartDate = new Date(dateString);
    const today = new Date();
    const fourMonthsLater = new Date(today);
    fourMonthsLater.setMonth(today.getMonth() + 4);

    // If project starts within 4 months, apply 10% increase
    if (projectStartDate <= fourMonthsLater) {
      return 1.10; // 10% increase
    } else {
      return 1.0; // No increase
    }
  };

  // Helper functions
  const getProjectTypeName = (type) => {
    const names = {
      residential: 'Residential Building',
      commercial: 'Commercial Building',
      industrial: 'Industrial Building',
      renovation: 'Renovation'
    };
    return names[type] || type;
  };

  const formatCategoryName = (category) => {
    if (category === 'majorSystems') return 'Major Systems (Plumbing, Electrical, HVAC)';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  };

  // Handle BHK toggle selection
  const handleBhkToggle = (selectedBhk) => {
    setBhk(selectedBhk);
  };

  // Calculate construction costs
  const calculateCosts = () => {
    let sqFootage = parseFloat(squareFootage);
    
    // If square footage is not provided, use BHK standard size
    if (isNaN(sqFootage) || sqFootage <= 0) {
      if (projectType === 'residential') {
        sqFootage = bhkSizes[bhk];
        setSquareFootageError(false);
      } else {
        setSquareFootageError(true);
        setShowResults(false);
        return;
      }
    } else {
      setSquareFootageError(false);
    }

    // Calculate base cost
    const baseCostPerSqFt = baseCosts[projectType];
    const qualityMultiplier = qualityMultipliers[quality];
    const seasonMultiplier = getSeasonMultiplier(startDate);
    const urgencyMultiplier = getUrgencyMultiplier(startDate);

    const adjustedCostPerSqFt = baseCostPerSqFt * qualityMultiplier * seasonMultiplier * urgencyMultiplier;
    const totalEstimatedCost = adjustedCostPerSqFt * sqFootage;

    // Generate results JSX
    const resultItems = [];

    // Project details
    resultItems.push(
      <div className="result-item" key="projectType">
        <span>Project Type:</span> <span>{getProjectTypeName(projectType)}</span>
      </div>
    );

    if (projectType === 'residential') {
      resultItems.push(
        <div className="result-item" key="bhk">
          <span>Configuration:</span> <span>{bhk} BHK</span>
        </div>
      );
    }

    resultItems.push(
      <div className="result-item" key="sqft">
        <span>Square Footage:</span> <span>{sqFootage.toLocaleString()} sq ft</span>
      </div>
    );

    resultItems.push(
      <div className="result-item" key="quality">
        <span>Quality Standard:</span> <span>{quality.charAt(0).toUpperCase() + quality.slice(1)}</span>
      </div>
    );

    resultItems.push(
      <div className="result-item" key="startDate">
        <span>Planned Start Date:</span> <span>{formatDate(startDate)}</span>
      </div>
    );

    resultItems.push(
      <div className="result-item" key="seasonAdjustment">
        <span>Season Adjustment:</span> 
        <span>
          {getSeasonName(startDate)} ({(seasonMultiplier > 1 ? "+" : "") + ((seasonMultiplier - 1) * 100).toFixed(0)}%)
        </span>
      </div>
    );

    resultItems.push(
      <div className="result-item" key="urgencyAdjustment">
        <span>Urgency Adjustment:</span> 
        <span>{urgencyMultiplier > 1 ? "10% increase (within 4 months)" : "No urgency adjustment"}</span>
      </div>
    );

    resultItems.push(
      <div className="result-item" key="baseCost">
        <span>Base Cost per sq ft:</span> <span>₹{baseCostPerSqFt.toFixed(2)}</span>
      </div>
    );

    resultItems.push(
      <div className="result-item" key="adjustedCost">
        <span>Adjusted Cost per sq ft:</span> <span>₹{adjustedCostPerSqFt.toFixed(2)}</span>
      </div>
    );

    // Cost breakdown
    resultItems.push(<h3 key="breakdownTitle">Cost Breakdown</h3>);

    for (const [category, percentage] of Object.entries(costBreakdown)) {
      if (category !== 'contingency') {  // Exclude contingency from initial breakdown
        const categoryAmount = totalEstimatedCost * percentage;
        const categoryName = formatCategoryName(category);
        resultItems.push(
          <div className="result-item" key={category}>
            <span>{categoryName}:</span> 
            <span>₹{categoryAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        );
      }
    }

    // Subtotal before contingency
    const subtotal = totalEstimatedCost * (1 - costBreakdown.contingency);
    resultItems.push(
      <div className="result-item" key="subtotal">
        <span>Subtotal:</span> 
        <span>₹{subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      </div>
    );

    // Contingency
    const contingencyAmount = totalEstimatedCost * costBreakdown.contingency;
    resultItems.push(
      <div className="result-item" key="contingency">
        <span>Contingency (10%):</span> 
        <span>₹{contingencyAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      </div>
    );

    // Total
    resultItems.push(
      <div className="result-item" key="total">
        <span>Total Estimated Cost:</span> 
        <span>₹{totalEstimatedCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      </div>
    );

    setResultsContent(resultItems);
    setShowResults(true);

    // Scroll to results (using DOM in React requires a ref in practice)
    setTimeout(() => {
      document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#000000'
    }}>
     
      <div className="h-40 w-40 rounded flex items-center justify-center mx-auto ">
                <img src={Logo} alt="logo"  className="h-full w-full object-contain " />
      </div>
       <h1 style={{ color: 'goldenrod', textAlign: 'center', marginBottom: '90px', fontSize:"30px",  fontStyle:"initial"}}>Construction Cost Calculator</h1>
      
      <div className="calculator-container" style={{
        backgroundColor: 'goldenrod',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="calculator-form">
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="projectType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Project Type:
            </label>
            <select 
              id="projectType" 
              value={projectType} 
              onChange={(e) => setProjectType(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '16px' 
              }}
            >
              <option value="residential">Residential Building</option>
              <option value="commercial">Commercial Building</option>
              <option value="industrial">Industrial Building</option>
              <option value="renovation">Restore</option>
            </select>
          </div>
          
          {projectType === 'residential' && (
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                BHK Configuration:
              </label>
              <div className="toggle-container" style={{ display: 'flex', marginBottom: '20px' }}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div 
                    key={value}
                    className={`toggle-btn ${bhk == value ? 'active' : ''}`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '10px',
                      backgroundColor: bhk == value ? '#3498db' : '#eee',
                      color: bhk == value ? 'white' : 'inherit',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      border: '1px solid #ddd',
                      borderRadius: value === 1 ? '4px 0 0 4px' : value === 5 ? '0 4px 4px 0' : '0'
                    }}
                    onClick={() => handleBhkToggle(value)}
                  >
                    {value} {value === 5 ? '+ ' : ''}BHK
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="squareFootage" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Square Footage (Optional):
            </label>
            <input 
              type="number" 
              id="squareFootage" 
              placeholder="Enter total square footage (Optional)" 
              min="1"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '16px' 
              }}
            />
            {squareFootageError && (
              <div className="error" style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                Please enter a valid square footage
              </div>
            )}
          </div>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="quality" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Quality Standard:
            </label>
            <select 
              id="quality" 
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '16px' 
              }}
            >
              <option value="basic">Basic (Economy)</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="startDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Planned Start Date:
            </label>
            <input 
              type="date" 
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '16px' 
              }}
            />
            <div className="date-info" style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Construction costs vary by season. Monsoon season (June-Sep) typically increases costs, while winter (Nov-Feb) may offer better rates.
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={calculateCosts}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%',
              marginTop: '10px',
              transition: 'background-color 0.3s'
            }}
          >
            Calculate Construction Costs
          </button>
        </div>
        
        <div 
          className="results" 
          id="results"
          style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            borderLeft: '5px solid #3498db',
            display: showResults ? 'block' : 'none'
          }}
        >
          <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Estimated Construction Costs</h2>
          <div id="resultsContent">
            {resultsContent}
          </div>
          <div 
            className="info-text"
            style={{
              backgroundColor: '#eaf7fb',
              padding: '10px',
              borderRadius: '5px',
              marginTop: '20px',
              fontSize: '14px'
            }}
          >
            Note: This is an estimate only. Actual costs may vary based on specific materials, labor rates in your location, and other factors not covered in this calculator.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCostCalculator;