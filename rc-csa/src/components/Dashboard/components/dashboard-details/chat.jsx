import React, { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/64199a9831ebfa0fe7f3d0c4/1gs207pfg';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }, []);

  return <div></div>;
};

export default TawkTo;
