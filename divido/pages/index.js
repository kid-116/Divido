import Head from 'next/head'
import Image from 'next/image'




export default function Home() {
  let cars = [{"color":"Red","id":1,"latitude":13.0126,"longitude":74.7912,"model":"Alto"},{"color":"red","id":2,"latitude":13.0126,"longitude":74.7912,"model":"Tesla"}];
  // get cars data from https://divido.mehultodi.repl.co/car
  function updateData() {
    console.log(cars);
    for (let i = 0; i < cars.length; i++) {
      let car = cars[i];
      document.getElementById("car-model-"+i).innerHTML = car.model;
      document.getElementById("car-sub-"+i).innerHTML = car.latitude + ", " + car.longitude;
    }
  }

  function getCars() {
    fetch('http://divido.mehultodi.repl.co/car')
      .then((response) => response.json())
      .then((data) => {
        // [{"color":"Red","id":1,"latitude":13.0126,"longitude":4.7912,"model":"Alto"},{"color":"red","id":2,"latitude":13.0126,"longitude":4.7912,"model":"Tesla"}]
        
        // create a new array of objects with the data we need
        cars = data;
        updateData();
      })
    return cars
  }
  function handleClick(num) {
      
      var i;
      var x = document.getElementsByClassName("option");
      for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
      }
      x[num].className += " active";
      getCars();
      // update info on the page
      document.getElementsByClassName("car-sub-0").innerHTML = cars[num].model;

  }
  function goToGMaps(num) {
    window.open("https://www.google.com/maps/search/?api=1&query="+cars[num].latitude+","+cars[num].longitude);
  }
  return (
    // function handleClick(num) {
    //   // add active to the clicked button
    //   // remove active from the other buttons

    //   var i;
    //   var x = document.getElementsByClassName("option");
    //   for (i = 0; i < x.length; i++) {
    //     x[i].className = x[i].className.replace(" active", "");
    //   }
    //   x[num].className += " active";
    // },
  
    <div className="container">
      <Head>
        <title>Divido</title>
        <meta name="description" content="Divido Car Tracking Platform" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
        <link rel="stylesheet" href="https://static.fontawesome.com/css/fontawesome-app.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://kit.fontawesome.com/b19048fdd6.js" crossorigin="anonymous"></script>
      </Head>
      <div class="options">
      {/* on click on element with class .option add/remove class active */}
        <div class="option active" style={{'--optionBackground': 'url(https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Alto-K10/8020/1660815407716/front-left-side-47.jpg?tr=w-375)'}} onClick={() => handleClick(0)}>
            <div class="shadow"></div>
            <div class="label">
              <div class="icon"  onClick={() => goToGMaps(0)}>
                <i class="fa-solid fa-car"></i>
              </div>
              <div class="info">
                  <div class="main car-model-0" id="car-model-0">{cars[0]['model']}</div>
                  <div class="sub car-sub-0" id="car-sub-0">{cars[0]['latitude'] + ", " + cars[0]['longitude']}</div>
              </div>
            </div>
        </div>
        <div class="option" style={{'--optionBackground': 'url(https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg)'}}  onClick={() => handleClick(1)}>
            <div class="shadow"></div>
            <div class="label">
              <div class="icon" onClick={() => goToGMaps(0)}>
              <i class="fa-solid fa-car"></i>
              </div>
              <div class="info">
              <div class="main car-model-1" id="car-model-1">{cars[1]['model']}</div>
                  <div class="sub car-sub-1"  id="car-sub-1">{cars[0]['latitude'] + ", " + cars[0]['longitude']}</div>
              </div>
            </div>
        </div>


      </div>

    </div>
  )
  handleClick(0);
}



