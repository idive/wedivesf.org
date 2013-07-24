(function() {
  var map = L.mapbox.map('map', 'vizowl.map-wio0abyi');
  var markers = $.getJSON('/data/data.json', function(data) {
    data.forEach(function(d, i) {
      if (d.latlon) {
        L.marker(d.latlon, {title: d.name}).addTo(map).bindPopup("<h3>" + d.name +"</h3>").openPopup();
      }
    });
  });
}).call(this);

