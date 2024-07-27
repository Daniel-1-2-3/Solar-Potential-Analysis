// TitlePage.jsx
import React from 'react';
import './HomePage.css'; // Import the CSS file for font

const TitlePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Solar Potential Analysis</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    paddingTop: '2rem',
  },
  title: {
    fontFamily: 'Montserrat, sans-serif', // Use the Montserrat font
    fontSize: '3rem',
    color: '#333',
  },
};

export default TitlePage;