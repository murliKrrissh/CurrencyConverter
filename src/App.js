import React, { useEffect, useState } from 'react';
import './App.css'
import Currency from './Currency';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState({
    country1: "",
    country2: ""
  });


  const options = {
    method: 'GET',
    url: 'https://currency-exchange.p.rapidapi.com/listquotes',
    headers: {
      'X-RapidAPI-Key': 'abde1bfafdmsh5f4222fef2c29a9p1514aajsnb7a4949ddc84',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.request(options);
        setData(response.data);
        console.log(response.data);
        const formattedQuotes = [];
        for (const item of response.data) {
          const countryData = await getCountryData(item);
          formattedQuotes.push({
            id: countryData.id,
            country: item,
            currency: countryData.rup,
          });
        }
        setQuotes(formattedQuotes);
        console.log(formattedQuotes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuotes();
  }, []);

  const getCountryData = async (cou) => {
    const ree = await axios.get("http://localhost:3500/country");
    const countryData = ree.data.find((country) => country.name === cou);
    return countryData.rup;
  };

  return (
    <>
      <h1>Currency Converter</h1>
      <input type='number' className="input" />
  
      <select>
        {
          data.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
    </>
  )
}
export default App;

