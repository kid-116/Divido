import Head from 'next/head'
import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard'

export default function Home() {
  const [cars, setCars] = useState([]);
  function getCars() {
    fetch('http://divido.mehultodi.repl.co/car')
      .then((response) => response.json())
      .then((cars) => {
        setCars(cars);
        handleClick(1);
      })
  }

  useEffect(() => {
    getCars();
  }, []);

  function handleClick(id) {
    console.log(id);
    for(const option of document.getElementsByClassName('option')) {
      if(option.id == `car-${id}`) {
        option.className = 'option active'
      }
      else {
        option.className = 'option'
      }
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Divido | Car Tracking</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
        <link rel="stylesheet" href="https://static.fontawesome.com/css/fontawesome-app.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://kit.fontawesome.com/b19048fdd6.js" crossorigin="anonymous"></script>
      </Head>
      <h1>Divido</h1>
      <h2>Vehicle Tracking</h2>
      <div class="options">
        {cars.map(car => <CarCard car={car} handleClick={handleClick} key={`car-${car['id']}`} />)}
      </div>
    </div>
  )
}
