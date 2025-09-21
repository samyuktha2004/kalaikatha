import React, { useState } from 'react';

const PricingAssistantPage = () => {
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    materials: '',
    laborHours: '',
    materialCost: '',
    marketplace: 'etsy',
    location: '',
    artStyle: ''
  });

  const [pricingAnalysis, setPricingAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const marketplaces = [
    { value: 'etsy', label: 'Etsy' },
    { value: 'amazon', label: 'Amazon Handmade' },
    { value: 'shopify', label: 'Shopify Store' },
    { value: 'instagram', label: 'Instagram Shop' },
    { value: 'facebook', label: 'Facebook Marketplace' },
    { value: 'local', label: 'Local Markets' }
  ];

  const categories = [
    'Paintings & Drawings',
    'Sculptures',
    'Jewelry & Accessories',
    'Home Decor',
    'Textiles & Fiber Arts',
    'Pottery & Ceramics',
    'Digital Art & Prints',
    'Photography',
    'Crafts & DIY',
    'Vintage & Antiques'
  ];

  const artStyles = [
    'Traditional',
    'Contemporary',
    'Abstract',
    'Realistic',
    'Folk Art',
    'Minimalist',
    'Vintage',
    'Bohemian',
    'Modern',
    'Rustic'
  ];

  const handleInputChange = (field, value) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzePricing = async () => {
    setLoading(true);
    
    // Simulate AI pricing analysis
    setTimeout(() => {
      const basePrice = parseFloat(productData.materialCost) || 50;
      const laborValue = (parseFloat(productData.laborHours) || 5) * 25; // $25/hour
      const marketMultiplier = getMarketMultiplier(productData.marketplace);
      const categoryMultiplier = getCategoryMultiplier(productData.category);
      
      const recommendedPrice = Math.round((basePrice + laborValue) * marketMultiplier * categoryMultiplier);
      const minPrice = Math.round(recommendedPrice * 0.8);
      const maxPrice = Math.round(recommendedPrice * 1.3);

      const analysis = {
        recommendedPrice,
        priceRange: { min: minPrice, max: maxPrice },
        breakdown: {
          materials: basePrice,
          labor: laborValue,
          profit: recommendedPrice - basePrice - laborValue,
          profitMargin: Math.round(((recommendedPrice - basePrice - laborValue) / recommendedPrice) * 100)
        },
        marketInsights: generateMarketInsights(productData),
        competitorAnalysis: generateCompetitorAnalysis(productData.category, productData.marketplace),
        recommendations: generateRecommendations(productData)
      };

      setPricingAnalysis(analysis);
      setLoading(false);
    }, 2500);
  };

  const getMarketMultiplier = (marketplace) => {
    const multipliers = {
      'etsy': 2.2,
      'amazon': 1.8,
      'shopify': 2.5,
      'instagram': 2.0,
      'facebook': 1.6,
      'local': 3.0
    };
    return multipliers[marketplace] || 2.0;
  };

  const getCategoryMultiplier = (category) => {
    const multipliers = {
      'Paintings & Drawings': 1.3,
      'Sculptures': 1.5,
      'Jewelry & Accessories': 1.2,
      'Home Decor': 1.1,
      'Textiles & Fiber Arts': 1.2,
      'Pottery & Ceramics': 1.3,
      'Digital Art & Prints': 0.9,
      'Photography': 1.0,
      'Crafts & DIY': 1.0,
      'Vintage & Antiques': 1.4
    };
    return multipliers[category] || 1.0;
  };

  const generateMarketInsights = (data) => {
    return [
      `${data.marketplace.charAt(0).toUpperCase() + data.marketplace.slice(1)} buyers typically spend 15-30% more on handmade items`,
      `${data.category} products perform best with premium pricing strategies`,
      `${data.artStyle} style is trending 23% above average in current market`,
      `Peak selling seasons: November-December (+40%) and Mother's Day (+25%)`
    ];
  };

  const generateCompetitorAnalysis = (category, marketplace) => {
    return {
      averagePrice: Math.round(Math.random() * 100 + 50),
      priceRange: { low: 25, high: 300 },
      topCompetitors: 3,
      marketShare: '12%',
      trends: [
        'Prices increased 8% in last 6 months',
        'Bundle deals are gaining popularity',
        'Personalization adds 25% premium'
      ]
    };
  };

  const generateRecommendations = (data) => {
    return [
      'Consider offering small-medium-large size options with tiered pricing',
      'Bundle with complementary items to increase average order value',
      'Offer seasonal discounts during slow periods (January-March)',
      'Create limited edition variants for premium pricing',
      'Add personalization options to justify higher prices'
    ];
  };

  const resetForm = () => {
    setProductData({
      title: '',
      category: '',
      materials: '',
      laborHours: '',
      materialCost: '',
      marketplace: 'etsy',
      location: '',
      artStyle: ''
    });
    setPricingAnalysis(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#ff6b6b', marginBottom: '10px' }}>💰 AI Pricing Assistant</h2>
        <p style={{ color: '#666' }}>Get intelligent pricing recommendations based on market analysis and competitor research</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '30px' }}>
        {/* Input Form */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: 0, color: '#333', marginBottom: '20px' }}>Product Information</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Product Title
            </label>
            <input
              type="text"
              value={productData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Handwoven Cotton Wall Hanging"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Category
            </label>
            <select
              value={productData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <option value="">Select category...</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Art Style
            </label>
            <select
              value={productData.artStyle}
              onChange={(e) => handleInputChange('artStyle', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <option value="">Select style...</option>
              {artStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Materials Used
            </label>
            <textarea
              value={productData.materials}
              onChange={(e) => handleInputChange('materials', e.target.value)}
              placeholder="e.g., Organic cotton yarn, wooden frame, natural dyes"
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                Labor Hours
              </label>
              <input
                type="number"
                value={productData.laborHours}
                onChange={(e) => handleInputChange('laborHours', e.target.value)}
                placeholder="8"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                Material Cost ($)
              </label>
              <input
                type="number"
                value={productData.materialCost}
                onChange={(e) => handleInputChange('materialCost', e.target.value)}
                placeholder="45"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Target Marketplace
            </label>
            <select
              value={productData.marketplace}
              onChange={(e) => handleInputChange('marketplace', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              {marketplaces.map(marketplace => (
                <option key={marketplace.value} value={marketplace.value}>
                  {marketplace.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Your Location
            </label>
            <input
              type="text"
              value={productData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., California, USA"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={analyzePricing}
              disabled={!productData.title || !productData.category || loading}
              style={{
                padding: '12px 20px',
                backgroundColor: (!productData.title || !productData.category || loading) ? '#ccc' : '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: (!productData.title || !productData.category || loading) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '🤖 Analyzing Market...' : '📊 Analyze Pricing'}
            </button>

            <button
              onClick={resetForm}
              style={{
                padding: '12px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔄 Reset Form
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)', marginBottom: '20px' }}>Pricing Analysis</h3>
          
          {!pricingAnalysis ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              border: '2px dashed #ddd',
              borderRadius: '12px',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💰</div>
              <h4>Fill out the form to get pricing recommendations</h4>
              <p>Our AI will analyze market trends, competitor pricing, and your costs to suggest optimal pricing</p>
            </div>
          ) : (
            <div>
              {/* Price Recommendation */}
              <div style={{
                backgroundColor: '#fff5f5',
                border: '2px solid #ff6b6b',
                borderRadius: '12px',
                padding: '25px',
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                <h2 style={{ color: '#ff6b6b', margin: '0 0 10px 0' }}>
                  Recommended Price: ${pricingAnalysis.recommendedPrice}
                </h2>
                <p style={{ color: '#666', margin: 0 }}>
                  Optimal range: ${pricingAnalysis.priceRange.min} - ${pricingAnalysis.priceRange.max}
                </p>
              </div>

              {/* Cost Breakdown */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ color: '#ff6b6b', marginBottom: '15px' }}>💡 Cost Breakdown</h4>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <strong>Materials:</strong> ${pricingAnalysis.breakdown.materials}
                    </div>
                    <div>
                      <strong>Labor:</strong> ${pricingAnalysis.breakdown.labor}
                    </div>
                    <div>
                      <strong>Profit:</strong> ${pricingAnalysis.breakdown.profit}
                    </div>
                    <div>
                      <strong>Profit Margin:</strong> {pricingAnalysis.breakdown.profitMargin}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Insights */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ color: '#ff6b6b', marginBottom: '15px' }}>📈 Market Insights</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)' }}>
                  {pricingAnalysis.marketInsights.map((insight, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>{insight}</li>
                  ))}
                </ul>
              </div>

              {/* Competitor Analysis */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ color: '#ff6b6b', marginBottom: '15px' }}>🎯 Competitor Analysis</h4>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <p><strong>Average competitor price:</strong> ${pricingAnalysis.competitorAnalysis.averagePrice}</p>
                  <p><strong>Market price range:</strong> ${pricingAnalysis.competitorAnalysis.priceRange.low} - ${pricingAnalysis.competitorAnalysis.priceRange.high}</p>
                  <div style={{ marginTop: '15px' }}>
                    <strong>Market Trends:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                      {pricingAnalysis.competitorAnalysis.trends.map((trend, index) => (
                        <li key={index}>{trend}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 style={{ color: '#ff6b6b', marginBottom: '15px' }}>🚀 Pricing Strategies</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)' }}>
                  {pricingAnalysis.recommendations.map((rec, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingAssistantPage;