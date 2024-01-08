import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovidData } from './store/slices/data.slice';

import './App.css'

function App() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state: any) => state.covidData);

  useEffect(() => {
    dispatch(fetchCovidData())
  }, [dispatch]);

  console.log('adad', data)
  return (
    <main>
      {status === 'succeeded' && data && (
        <div>
          <p>Total positive cases: {data[0]?.positive}</p>
          <p>Total deaths: {data[0]?.death}</p>
          {/* Add more data points as needed */}
        </div>
      )}
    </main>
  )
}

export default App
