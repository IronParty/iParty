function startMap() {

  var ironhackMEX = {
      lat: 19.3975835,
      lng: -99.1713595};
  var map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: ironhackMEX
    }
  );


var myMarker = new google.maps.Marker({
  position: ironhackMEX,
  map: map,
  label: "You are here",
  draggable:true,
 
});




var input = document.getElementById("ricky");

function autocomplete(input){
  const dropdown = new google.maps.places.Autocomplete (input);
  dropdown.addListener("place_changed", ()=>{
      const place = dropdown.getPlace();
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
      console.log(place);
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      map.setCenter(newCenter);
  })
  
}
  autocomplete(input);
}
  

startMap()