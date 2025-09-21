import React from 'react';
import { useCart } from '../../services/CartContext';
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile, useResponsiveValue } from '../../hooks/useResponsive';
import { ResponsiveContainer, ResponsiveFlex } from '../../components/common/ResponsiveContainer';
import StickyNavbar from '../../components/StickyNavbar';

const CartPage = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Responsive button size
  const buttonSize = useResponsiveValue({
    xs: 'btn-sm',
    md: 'btn-md'
  });

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    clearCart();
    alert('Order placed successfully!');
  };

  if (state.items.length === 0) {
    return (
      <div>
        <StickyNavbar 
          onNavigate={navigate}
          navItems={[
            { label: 'Home', route: '/', icon: '🏠' },
            { label: 'Shop', route: '/shop', icon: '🛍️' },
            { label: 'Profile', route: '/profile', icon: '👤' }
          ]}
        />
        <ResponsiveContainer variant="centered" className="text-center">
          <h2 className="heading-2 mb-4">Your Cart is Empty</h2>
          <p className="text-lg text-muted mb-6">Add some products to your cart to see them here.</p>
          <button 
            onClick={() => navigate('/')}
            className={`btn btn-primary ${buttonSize}`}
          >
            Continue Shopping
          </button>
        </ResponsiveContainer>
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
          { label: 'Profile', route: '/profile', icon: '👤' }
        ]}
      />
      <ResponsiveContainer variant="constrained">
        <h2 className="heading-2 mb-6">Shopping Cart</h2>
      
      <div className="mb-8">
        {state.items.map(item => (
          <div key={item.id} className="responsive-card mb-4">
            <ResponsiveFlex 
              direction="responsive" 
              gap={isMobile ? "1rem" : "1.5rem"}
              align="flex-start"
            >
              <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex overflow */}
                <h4 className="heading-4 mb-2 overflow-hidden">{item.name}</h4>
                <p className="text-base text-muted mb-2 overflow-hidden">{item.description}</p>
                <p className="text-lg font-bold text-success">${item.price}</p>
              </div>
              
              <ResponsiveFlex 
                direction={isMobile ? "column" : "row"} 
                gap="0.5rem"
                align="center"
                className="flex-shrink-0"
              >
                <ResponsiveFlex direction="row" gap="0.25rem" align="center">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className={`btn btn-outline ${buttonSize}`}
                    style={{ width: '36px', height: '36px', padding: '0' }}
                  >
                    -
                  </button>
                  
                  <span className={`text-base font-medium text-center px-2 ${isMobile ? 'min-w-8' : 'min-w-12'}`}>
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={`btn btn-outline ${buttonSize}`}
                    style={{ width: '36px', height: '36px', padding: '0' }}
                  >
                    +
                  </button>
                </ResponsiveFlex>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className={`btn btn-danger ${buttonSize} ${isMobile ? 'w-full mt-2' : 'ml-3'}`}
                >
                  Remove
                </button>
              </ResponsiveFlex>
            </ResponsiveFlex>
          </div>
        ))}
      </div>
      
      <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <ResponsiveFlex 
          direction="responsive" 
          justify="space-between" 
          align={isMobile ? "flex-start" : "center"}
          gap="1.5rem"
        >
          <div className="overflow-hidden">
            <h3 className="heading-3 mb-1">Total: ${state.total.toFixed(2)}</h3>
            <p className="text-base text-muted">{state.items.length} items in cart</p>
          </div>
          
          <ResponsiveFlex 
            direction={isMobile ? "column" : "row"} 
            gap="0.75rem"
            className={isMobile ? "w-full" : "flex-shrink-0"}
          >
            <button
              onClick={clearCart}
              className={`btn btn-outline ${buttonSize} ${isMobile ? 'w-full' : ''}`}
            >
              Clear Cart
            </button>
            
            <button
              onClick={handleCheckout}
              className={`btn btn-success ${buttonSize} ${isMobile ? 'w-full' : ''}`}
            >
              Checkout
            </button>
          </ResponsiveFlex>
        </ResponsiveFlex>
      </div>
      </ResponsiveContainer>
    </div>
  );
};

export default CartPage;