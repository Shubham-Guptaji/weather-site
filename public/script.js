function locationfn() { 
  loadfn();
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
        .then(() => successfn("Fetched successfully."))
        .catch(error => {
          errorfn(error.message);
        });
    },
    (error) => {
      // console.log(error);
      errorfn(error);
    });
  } else {
    console.error('Geolocation is not supported in this browser');
  }
}
function successfn(message){
  document.getElementById('siteInfo').style.display = 'flex';
  document.getElementById('siteLoader').style.display = 'none';
  document.getElementById('siteSuccess').style.display = 'block';
  document.getElementById('siteMessage').innerHTML = message;
  new Promise(resolve => setTimeout(()=>{
    document.getElementById('siteInfo').style.display = 'none';
    document.getElementById('siteSuccess').style.display = 'none';
}, 1500));
}
function errorfn(message){
  document.getElementById('siteLoader').style.display = 'none';
  document.getElementById('siteError').style.display = 'block';
  document.getElementById('siteMessage').innerHTML = message;
  new Promise(resolve => setTimeout(()=>{
      document.getElementById('siteInfo').style.display = 'none';
      document.getElementById('siteError').style.display = 'none';
  }, 1500));
}
function loadfn(){
  document.getElementById('siteInfo').style.display = 'flex';
  document.getElementById('siteLoader').style.display = 'block';
  document.getElementById('siteMessage').innerHTML = 'Fetching local weather.'
}

 