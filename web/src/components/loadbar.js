import React from 'react';

const LoadBar = (props) => {
    const { bgcolor, value } = props;

    const containerStyles = {
        height: 50,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
      
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${value}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'left'
      }
    
      const labelStyles = {
        padding: 20,
        color: 'white',
        fontSize:30
      }



    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles} >{`${value}%`}</span>
        </div>
      </div>
    );
  };

export default LoadBar;