import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext';
import { firestore } from '../../services/firestore';
import AnalyticsPage from './AnalyticsPage';

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const products = await firestore.getProducts();
        setUserProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProducts();
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'products', name: 'My Products' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'profile', name: 'Profile' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c5aa0' }}>{userProducts.length}</h3>
                <p style={{ margin: 0, color: '#666' }}>Total Products</p>
              </div>
              <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>$0</h3>
                <p style={{ margin: 0, color: '#666' }}>Total Revenue</p>
              </div>
              <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>0</h3>
                <p style={{ margin: 0, color: '#666' }}>Orders</p>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <h3>Recent Activity</h3>
              <p>Welcome to your dashboard! Here you can manage your products, view analytics, and update your profile.</p>
            </div>
          </div>
        );
        
      case 'products':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>My Products</h3>
              <button 
                onClick={() => window.location.href = '/add-product'}
                style={{
                  backgroundColor: '#2c5aa0',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add New Product
              </button>
            </div>
            
            {loading ? (
              <p>Loading products...</p>
            ) : userProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', border: '2px dashed #ddd', borderRadius: '8px' }}>
                <h4>No products yet</h4>
                <p>Start by adding your first product!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {userProducts.map(product => (
                  <div key={product.id} style={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: 'white'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{product.description}</p>
                    <p style={{ fontWeight: 'bold', color: '#2c5aa0', marginBottom: '15px' }}>${product.price}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'analytics':
        return <AnalyticsPage />;
        
      case 'profile':
        return (
          <div style={{ maxWidth: '600px' }}>
            <h3>Profile Information</h3>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Display Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your display name"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Bio</label>
                <textarea 
                  placeholder="Tell us about yourself"
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <button style={{
                backgroundColor: '#2c5aa0',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Update Profile
              </button>
            </div>
          </div>
        );
        
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2>Dashboard</h2>
        <p>Welcome back, {user?.email}!</p>
      </div>
      
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #ddd',
        marginBottom: '30px',
        gap: '0'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '15px 20px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#2c5aa0' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#666',
              cursor: 'pointer',
              borderBottom: activeTab === tab.id ? '3px solid #2c5aa0' : '3px solid transparent',
              fontSize: '16px'
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
