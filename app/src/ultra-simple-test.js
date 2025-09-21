// Ultra simple test - no imports, just basic React
const React = window.React;
const ReactDOM = window.ReactDOM;

const UltraSimpleTest = () => {
  return React.createElement('div', {
    style: {
      padding: '50px',
      backgroundColor: '#ffeb3b',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }
  }, 'ULTRA SIMPLE TEST - IF YOU SEE THIS, REACT IS WORKING!');
};

// Try to render directly
const root = document.getElementById('root');
if (root) {
  root.innerHTML = '<div style="padding:50px;background:#ff5722;color:white;text-align:center;font-size:24px;">DIRECT HTML TEST - Browser working!</div>';
}

// Also try with React if available
if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
  const container = ReactDOM.createRoot(root);
  container.render(React.createElement(UltraSimpleTest));
}