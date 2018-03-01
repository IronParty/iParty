
$(document).ready(function(){
    // Create and Initialize Map
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: { lat :41.3977381, lng:2.090471916}
    });
  
    // Add restaurant markers to map
    let markers = [];
    companies.forEach(function(singleCompany){
      console.log(singleCompany)
      let title = singleCompany.name
      let position = {
        lat: singleCompany.latitude,
        lng: singleCompany.longitude
      };
      var pin = new google.maps.Marker({ position, map, title  });
      markers.push(pin)
    });
  });