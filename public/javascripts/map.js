
var markers = [];

function drawMarkers(locations, map){
  locations.forEach(l=>{
    markers.push(new google.maps.Marker({
      map:map,
      position:{lat:l.latitude, lng:l.longitude},
      label:l.title
    }))
  });
}


function startMap() {

  var myLatLng = {
      lat: 19.3975835,
      lng: -99.1713595};
  var map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: myLatLng
    }
  );
  

  fetch('/company/get-locations')
  .then(response=>{
    if(!response.ok) alert('fallo')
    return response.json()
  })
  .then(locations=>{
    drawMarkers(locations, map);
  });





  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position:myLatLng,
    // position: here i would put a an array of all lats and lngs stored in my database
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

}
var input = document.getElementById("ricky");

function autocomplete(input){
  const dropdown = new google.maps.places.Autocomplete (input);
  dropdown.addListener("place_changed", ()=>{
      const place = dropdown.getPlace();
      document.getElementById("search-box-user-lat").value = place.geometry.location.lat()
      document.getElementById("search-box-user-lng").value = place.geometry.location.lng()

      console.log(place);
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      map.setCenter(newCenter);
  })

}
autocomplete(input);

 

  

startMap()