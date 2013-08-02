(function() {
  var root = this;
  var map = L.mapbox.map('map', 'vizowl.map-wio0abyi');
  var markers = $.getJSON('/data/data.json', function(data) {
    var diverIcon = L.icon({iconUrl: '/images/icons/scuba.png', iconSize: [32, 32] });
    var fishIcon = L.icon({iconUrl: '/images/icons/fish.png', iconSize: [32, 32] });
    var plainIcon = L.icon({iconUrl: '/images/icons/plain.png', iconSize: [32, 32] });
    var whaleIcon = L.icon({iconUrl: '/images/icons/whale.png', whaleSize: [32, 32] });
    var viewIcon = L.icon({iconUrl: '/images/icons/binoculars.png', iconSize: [32, 32] });
    var sealIcon = L.icon({iconUrl: '/images/icons/seal.png', iconSize: [32, 32] });

    var drawmarker = root.drawmarker = function(d) {
      if (d.latlon) {
        var icon = plainIcon;
        if (d.type === "Dive Center") {
          icon = diverIcon;
        } else if (d.type === "Aquarium") {
          icon = sealIcon;
        } else if (d.type === "Conservancy") {
          icon = fishIcon;
        } else if (d.type === "Education") {
          icon = viewIcon;
        } else if (d.type === "Museum") {
          icon = whaleIcon;
        }
        d.marker = L.marker(d.latlon, {title: d.name, icon: icon})
          .addTo(map)
          .bindPopup("<h3>" + d.name +"</h3>")
          .on("click", function(e) {
            $('#infochild').remove();
            $('#infoarea').append('<ul class="inline" id="infochild"><ul>');
            $('#infochild').append('<li><h3><a href="' + d.url + '" target="_blank">' + d.name + '</a></h3></li>');
            if (d.facebook !== '') {
              $('#infochild').append('<li class="icons"><a href="' + d.facebook + '" target="_blank" class="facebook"></a></li>');
            }
            if (d.twitter !== '') {
              $('#infochild').append('<li class="icons"><a href="http://twitter.com/' + d.twitter + '" target="_blank" class="twitter"></a></li>');
            }
          });
      }
    };

    data.forEach(function(d, i) {
      drawmarker(d);
    });

    // Save reference to the data on the map dom element
    $('#map').data('locations', data);
  });

  // Create the menu interactions
  $('#map-ui li a').on('click', function(e) {
    var $this = $(this);
    // Toggle the display state
    if ($this.hasClass('active')) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }
    // Then remove or add nodes
    var showAquariums = $("#aquariums").hasClass('active');
    var showDivecenters = $("#divecenters").hasClass('active');
    var showMuseums = $("#museums").hasClass('active');
    var showEducation = $("#education").hasClass('active');
    var showConservancies = $("#conservancies").hasClass('active');

    $('#map').data('locations').forEach(function(d, i) {
      if (d.type === 'Dive Center') {
        if (d.marker === null && showDivecenters) {
          drawmarker(d);
        } else if (d.marker !== null && !showDivecenters) {
          map.removeLayer(d.marker);
          d.marker = null;
        }
      }
      else if (d.type == 'Aquarium') {
        if (d.marker === null && showAquariums) {
          drawmarker(d);
        } else if (d.marker !== null && !showAquariums) {
          map.removeLayer(d.marker);
          d.marker = null;
        }
      }
      else if (d.type == 'Conservancy') {
        if (d.marker === null && showConservancies) {
          drawmarker(d);
        } else if (d.marker !== null && !showConservancies) {
          map.removeLayer(d.marker);
          d.marker = null;
        }
      }
      else if (d.type == 'Education') {
        if (d.marker === null && showEducation) {
          drawmarker(d);
        } else if (d.marker !== null && !showEducation) {
          map.removeLayer(d.marker);
          d.marker = null;
        }
      }
      else if (d.type == 'Museum') {
        if (d.marker === null && showMuseums) {
          drawmarker(d);
        } else if (d.marker !== null && !showMuseums) {
          map.removeLayer(d.marker);
          d.marker = null;
        }
      }

    });

  });
}).call(this);

