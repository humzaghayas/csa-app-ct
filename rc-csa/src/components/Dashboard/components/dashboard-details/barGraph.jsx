import React from 'react';

const BarGraph = ({ data }) => {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
      }}
    >
      {data.map((item) => (
        <div
          key={item.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '20px',
          }}
        >
          <div
            style={{
              height: `${(item.value / max) * 200}px`,
              width: '20px',
              backgroundColor: 'teal',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              color: 'grey',
              fontWeight: 'bold',
              fontSize: '12px',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', bottom: '-20px' }}>
              {item.value}
            </div>
          </div>
          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarGraph;
