import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';

const GoogleReviews = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => setLoaded(true);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
      <Box position="relative" height={300} mt={15} mb={35}>
      {!loaded && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      )}
      <div
        className="elfsight-app-22cea2f5-eaac-44f2-8779-506dac1fd6c7"
        data-elfsight-app-lazy
        style={{ display: loaded ? 'block' : 'none' }}
      ></div>
    </Box>
  );
};

export default GoogleReviews;