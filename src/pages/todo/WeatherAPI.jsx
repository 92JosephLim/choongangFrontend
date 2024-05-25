import logo from '../../logo.svg';
import '../../App.css';
import { RouterProvider } from 'react-router-dom';
import root from '../../router/root';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import Clouds from '../../img/cloudy.svg';



function WeatherAPI() {
  const API_KEY = "2b3c9591a362347d8b902759d45cba04";
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});

  const url = `https://api.openweathermap.org/data/3.0/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if(e.key === 'Enter') {
      try {
        const response = await axios({
        method: 'Get',
        url: url
        });

        const data = response.data;
        console.log(data);
        setResult(data);

      } catch (err) {
        alert(err);
        setResult({});

    }

    }

  }
  return (
    <AppWrap>
      <div className='appContentWrap'>
        <input
        placeholder='도시를 입력하세요'
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        type='text'
        onKeyDown={searchWeather}
        />


<div className='icon'>
    {result && result.data && result.data.weather && result.data.weather.length > 0 && result.data.weather[0].main === 'Clouds' && (
        <img src={Clouds} />
    )}



</div>

 

        {
          Object.keys(result).length !== 0 && (
            <ResultWrap>
          {/* <div className='city'>{result.data.name}</div>   */}
          <div className='sky'>{result.data.weather[0].main}</div>
          <div className='temp'>{Math.round(((result.data.main.temp-273.15)*10)) / 10}°C</div>
          <div className='tempMin'>{Math.round(((result.data.main.temp_min-273.15)*10)) / 10}°C</div>
          <div className='tempMax'>{Math.round(((result.data.main.temp_max-273.15)*10)) / 10}°C</div>

            </ResultWrap>
          )
        }
      </div>      
    </AppWrap>

  );
}



const AppWrap = styled.div`

  width: 100vw;
  height: 100vh;
  border: 1px red solid;

  .appContentWrap{

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    border: 1px blue solid;
    padding : 20px;



  }

`;

const ResultWrap = styled.div`
margin-top: 60px;
padding: 10px;
border: 1px black solid;
`;
export default WeatherAPI;