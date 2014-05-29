//Global variables
var map;
var options;
var locations = new Array();
var maxID;
var tag = "rotary";
var boxAway = false;

function initialize() {
    // Define your locations: HTML content for the info window, latitude, longitude
    /*var locations = [
      ['<h4>Liftare 1</h4>', 59.280, 18.0],
      ['<h4>Liftare 2</h4>', 59.299033, 18.0567],
      ['<h4>Liftare 3</h4>', 59.320, 18.077],
      ['<h4>Liftare 4</h4>', 59.30287, 18.0009],
      ['<h4>Liftare 5</h4>', 59.30012, 18.0876]
    ];*/

    //locations.push(['<h4>Liftare 6</h4>', 59.27012, 18.0816]);
    //console.log(locations);

    var mapOptions = {
      zoom: 3,
      minZoom: 3,
      backgroundColor: 'gray',
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
      },
      panControl: true,
      panControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER
      },
      //streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), 
      mapOptions);

    /*map.set('styles', [
         {  
        featureType: 'landscape.natural',  
        elementType: 'all',  
        stylers: [  
            { hue: '#809f80' },   
        ]  
    },  
      {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
          { hue: '#a1b0bc' },
          { gamma: 1.4 },
          { saturation: 82 },
          { lightness: 96 }
        ]
      }

         /*{  
          featureType: 'water',  
          elementType: 'geometry.fill',  
          stylers: [  
              { color: '#174878' }  
          ]  
        }
    ]);*/ 
    /*
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { color: '#DDDDDD' },
          { weight: 1.6 }
        ]
      }, {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { saturation: -100 },
          { invert_lightness: true }
        ]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          { hue: '#ffff00' },
          { gamma: 1.4 },
          { saturation: 82 },
          { lightness: 96 }
        ]
      }, {
        featureType: 'poi.school',
        elementType: 'geometry',
        stylers: [
          { hue: '#fff700' },
          { lightness: -15 },
          { saturation: 99 }
        ]
      }
    ]);*/

    // Geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);
          
        var du = new google.maps.Marker({
        map: map,
        position: pos,
        icon: "images/heartmarker.png",
        zIndex: 999,
      });  

        var duWindow = new google.maps.InfoWindow({
      maxWidth: 330,
    });

        google.maps.event.addListener(du, 'click', (function(du, i) {
        return function() {
          duWindow.setContent('YOU');
          duWindow.open(map, du);
        }
      })(du));
        
        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }


    // Get images from Instagram and .push to locations array?

    //var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=1a1e6c7651e9401384096da8fe3657ce&count=33"
    //$.getJSON(url, addLocations);
    search(tag);

}
  function makeMarker(locations) {

    var locations = locations;
    console.log(locations);
    //paginate(tag,maxID,locations);
    
    // Setup the different icons and shadows
    /*var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
    
    var icons = [
      iconURLPrefix + 'red-dot.png',
      iconURLPrefix + 'green-dot.png',
      iconURLPrefix + 'blue-dot.png',
      iconURLPrefix + 'orange-dot.png',
      iconURLPrefix + 'purple-dot.png',
      iconURLPrefix + 'pink-dot.png',      
      iconURLPrefix + 'yellow-dot.png'
    ]
    var icons_length = icons.length;
    
    
    var shadow = {
      anchor: new google.maps.Point(15,33),
      url: iconURLPrefix + 'msmarker.shadow.png'
    }; */

    


    var marker;
    var markers = new Array();
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 330,
    });
    
    //var iconCounter = 0;
    
    // Add the markers and infowindows to the map
    for (var i = 0; i < locations.length; i++) {  
              console.log('marker');
      marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(locations[i][4], locations[i][5]),
        //icon : "images/marker2.png",
        animation: google.maps.Animation.DROP,
        //shadow: shadow
      });

      //google.maps.event.addListener(marker, 'click', toggleBounce);

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('<div class="infoWindow">' + locations[i][0] + locations[i][1] /*+ locations[i][2]*/ + locations[i][3] + '</div>');
          infowindow.open(map, marker);
        }
      })(marker, i));

      
      /*iconCounter++;
      // We only have a limited number of possible icon colors, so we may have to restart the counter
      if(iconCounter >= icons_length){
      	iconCounter = 0;
      }*/
    }
  }

    function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(59.3, 18),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
    }

    function toggleBounce() {

      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    function search(tag) {
      console.log(tag);
      var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=1a1e6c7651e9401384096da8fe3657ce&count=30";
      $.getJSON(url, addLocations);
    }

    /*function paginate() {
      var nextUrl = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=1a1e6c7651e9401384096da8fe3657ce&max_id=" + maxID + "&count=33";
      var locations = new Array();
      $.getJSON(nextUrl, function(photos){
        console.log(photos, boxAway);
        var last = (photos.data.length-1); //funkar inte om sista fotot inte har location data?
        $.each(photos.data, function(index, photo){
          if(photo.location != null){
          locations.push(['<a href="'+photo.link+'"><img src="'+photo.images.low_resolution.url+'" /></a>', '<h2>'+photo.user.full_name+'</h2>', '<img src="'+photo.user.profile_picture+'" />', '<p>'+photo.caption.text+'</p>', photo.location.latitude, photo.location.longitude]);
          console.log(locations);
          console.log(index, last);
          if (index == last) {
            console.log("IF?");
            maxID = photos.pagination.next_max_id;
            console.log(maxID);
            if (boxAway == true){
              console.log('boxAway');
              //makeMarker(locations);
            } 
          }
          }
        });
      });
    }*/

    function paginate2() {
      var nextUrl = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=1a1e6c7651e9401384096da8fe3657ce&max_id=" + maxID + "&count=33";
      var locations = new Array();
      $.getJSON(nextUrl, function(photos){
        console.log(photos, boxAway);
        var i = 0;
        var j = 0;
        $.each(photos.data, function(index, photo){
          if(photo.location != null && photo.caption != null){
          locations.push(['<a href="'+photo.link+'"><img src="'+photo.images.low_resolution.url+'" /></a>', '<h3>'+photo.user.full_name+'</h3>', '<img src="'+photo.user.profile_picture+'" />', '<p3>'+photo.caption.text+'</p3>', photo.location.latitude, photo.location.longitude]);
          i++;
          console.log(locations);
          console.log(index, i, j, (photos.data.length - 1 - j));
          if (i == photos.data.length - 1 - j) {
            console.log("IF?");
            maxID = photos.pagination.next_max_id;
            console.log(maxID);
            if (boxAway == true){
              console.log('boxAway');
              makeMarker(locations);
            } 
          }
          }
          else{
            j++;
            //flytta if(i == photos.....length - 1-j) hit?
              if (i == photos.data.length - 1 - j) {
              console.log("IF?");
              maxID = photos.pagination.next_max_id;
              console.log(maxID);
              if (boxAway == true){
                console.log('boxAway');
                makeMarker(locations);
              } 
            }
          }
        });
      });
    }

    // GÖR EN till pageniation för knappen??
    function addMoreLocations(){
    }  

    function addLocations(photos) {
      //console.log(photos);
        $.each(photos.data, function(index, photo){
          if(photo.location != null){
          locations.push(['<a href="'+photo.link+'"><img src="'+photo.images.low_resolution.url+'" /></a>', '<h3>'+photo.user.full_name+'</h3>', '<img src="'+photo.user.profile_picture+'" />', '<p3>'+photo.caption.text+'</p3>', photo.location.latitude, photo.location.longitude]);
          //console.log(locations);
          }
        });
        maxID = photos.pagination.next_max_id;
        console.log(maxID);

        paginate2();
    }

    $(document).ready(function(){
      $('#moreButton').hide();
      $('#dropdown').hide();
      $('#aboutBox').hide();
      $("#continueButton").click(function(){
        $("#opacBox").fadeOut("slow");
        $("#moreButton").fadeIn("slow");
        $("#box").slideUp();
        makeMarker(locations);
        boxAway = true;
        //paginate();
      });

      $("#header").mouseover(function(){
        $("#dropdown").stop(true, true).slideDown();
      });

      $("#dropdown").mouseleave(function(){
        $("#dropdown").stop(true, true).slideUp();
      });

      $("#home").click(function(){
        $("#aboutBox").slideUp(); 
        $("#box").slideUp();
        $("#opacBox").fadeOut("slow");
      });

      $("#instructions").click(function(){
        $("#aboutBox").slideUp(); 
        $("#box").slideDown();
      });

      $("#about").click(function(){
        $("#box").slideUp();
        $("#aboutBox").slideDown();
      });

      $("#backButton").click(function(){
        $("#opacBox").fadeOut("slow");
        $("#aboutBox").slideUp();  
      });

      $("#moreButton").click(function(){
        //$(this).fadeOut();
        //alert('hejhej');
        paginate2();
        //makeMarker(locations);
      });

      
    });
    /*function AutoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      $.each(markers, function (index, marker) {
        bounds.extend(marker.position);
      });
      //  Fit these bounds to the map
      map.fitBounds(bounds);
    }*/
    //AutoCenter();
google.maps.event.addDomListener(window, 'load', initialize);