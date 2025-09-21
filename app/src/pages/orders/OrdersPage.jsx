import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext';
import StickyNavbar from '../../components/StickyNavbar';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock orders data for now (later integrate with Firebase)
  useEffect(() => {
    const mockOrders = [
      {
        id: 'order_1',
        date: '2025-09-10',
        total: 145.99,
        status: 'delivered',
        items: [
          { name: 'Handcrafted Ceramic Bowl', price: 45.99, quantity: 1 },
          { name: 'Traditional Wooden Sculpture', price: 89.99, quantity: 1 }
        ]
      },
      {
        id: 'order_2',
        date: '2025-09-12',
        total: 65.00,
        status: 'processing',
        items: [
          { name: 'Handwoven Silk Scarf', price: 65.00, quantity: 1 }
        ]
      },
      {
        id: 'order_3',
        date: '2025-09-14',
        total: 75.50,
        status: 'shipped',
        items: [
          { name: 'Painted Glass Vase', price: 75.50, quantity: 1 }
        ]
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#28a745';
      case 'shipped': return '#007bff';
      case 'processing': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div>
      <StickyNavbar 
        onNavigate={navigate}
        navItems={[
          { label: 'Home', route: '/', icon: '🏠' },
          { label: 'Shop', route: '/shop', icon: '🛍️' },
          { label: 'Cart', route: '/cart', icon: '🛒' },
          { label: 'Profile', route: '/profile', icon: '👤' }
        ]}
      />
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2>My Orders</h2>
        <p>Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          border: '2px dashed #ddd',
          borderRadius: '8px'
        }}>
          <h3 className="heading-3 mb-3">No orders yet</h3>
          <p className="text-lg text-muted mb-4">Start shopping to see your orders here!</p>
          <button
            onClick={() => window.location.href = '/products'}
            className="btn btn-primary btn-lg"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map(order => (
            <div key={order.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: 'white',
              overflow: 'hidden'
            }}>
              {/* Order Header */}
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>Order #{order.id}</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    backgroundColor: getStatusColor(order.status),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '5px'
                  }}>
                    {getStatusText(order.status)}
                  </div>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ padding: '20px' }}>
                <h5 style={{ margin: '0 0 15px 0', color: '#333' }}>Items Ordered</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {order.items.map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{item.name}</p>
                        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div style={{ fontWeight: 'bold', color: '#2c5aa0' }}>
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div style={{
                padding: '20px',
                borderTop: '1px solid #eee',
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end'
              }}>
                <button style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  View Details
                </button>
                
                {order.status === 'processing' && (
                  <button className="btn btn-danger btn-sm">
                    Cancel Order
                  </button>
                )}
                
                {order.status === 'delivered' && (
                  <button className="btn btn-success btn-sm">
                    Reorder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Summary Stats */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h3>Order Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#2c5aa0' }}>{orders.length}</h4>
            <p style={{ margin: 0, color: '#666' }}>Total Orders</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#28a745' }}>
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </h4>
            <p style={{ margin: 0, color: '#666' }}>Total Spent</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>
              {orders.filter(order => order.status === 'delivered').length}
            </h4>
            <p style={{ margin: 0, color: '#666' }}>Delivered</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#ffc107' }}>
              {orders.filter(order => order.status === 'processing').length}
            </h4>
            <p style={{ margin: 0, color: '#666' }}>Processing</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default OrdersPage;