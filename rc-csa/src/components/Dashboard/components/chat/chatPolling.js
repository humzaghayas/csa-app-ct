import React, { useEffect, useState } from 'react';
import { useFetchChatNotifyList } from '../../../../hooks/use-register-user-connector/use-service-connector';

const PollingComponent = () => {
  const [data, setData] = useState(null);
  const { execute: fetchFeedback } = useFetchChatNotifyList();

  const fetchData = () => {
    // Replace this with your actual API call or data fetching logic
    // For demonstration purposes, we are using a dummy API call here.
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    // Function to fetch data initially when the component mounts
    fetchFeedback(projectKey, {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      // sort: { lastModifiedAt: -1 },
    });

    // Function to fetch data every 5 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* Render your component content here */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Displaying fetched data as a JSON string for demonstration purposes
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PollingComponent;
