function startMap() {
    navigator.geolocation.getCurrentPosition(function(position) {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(center);
        
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: center
    }
  );
  
    var myMarker = new google.maps.Marker({
      position: center,
      map: map,
      label: "You are here",
      draggable: true,
      animation: google.maps.Animation.DROP
    });
  
    });
  
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
    var directionRequest = {
      origin: ironhackMEX,
      destination: 'Alberta, Canadá',
      travelMode: 'DRIVING'
    };
    
    directionsService.route(
      directionRequest,
      function(response, status) {
        if (status === 'OK') {
          // everything is ok
          directionsDisplay.setDirections(response);
    
        } else {
          // something went wrong
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
    
    directionsDisplay.setMap(map);
  
    var input = document.getElementById("iparty");
  
    function autocomplete(input){
        const dropdown = new google.maps.places.Autocomplete(input);
        dropdown.addListener("place_changed", ()=>{
            const place = dropdown.getPlace();
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
            console.log(place);
        })
  
    }
    autocomplete(input);
  }
  
  startMap();
  