function locationfn() { 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const query = { latitude, longitude };


      fetch('/zcsgtouzewrjbrwq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      })
        .then(response => response.text() )
        .then(data => {
          document.getElementById("weatherPage").innerHTML = data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    (error) => {
      console.log(error);
    });
  } else {
    console.error('Geolocation is not supported in this browser');
  }
}

 