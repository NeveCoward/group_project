mapboxgl.accessToken =
  "pk.eyJ1IjoibmV2ZWNvd2FyZCIsImEiOiJjazM3ZzQxOW8wYmJ0M2JxZTV2bnc3NDV2In0.bmUJZcMX2nH63eBBZCIT4A";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/nevecoward/ck36bj2xm1ou41cpfgrtzakot",
  center: [-1.461, 53.387],
  zoom: 11.75
});

map.on("load", function() {
  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          // Feature 1
          {
            type: "Feature",
            properties: {
              description: "<strong>Walkley/South Road</strong><p>Large numbers of idling cars have had a signifcant effect on the air quality in this residential area.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.502994, 53.395342]
            }
          },
          // Feature 2
          {
            type: "Feature",
            properties: {
              description: "<strong>Winster Road</strong><p>This area was badly hit by Sheffield's tree-felling program in 2017. Pollution levels have since increased.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.498995, 53.410159]
            }
          },
          {
            type: "Feature",
            properties: {
              description: "<strong>Handsworth Road/Sheffield Parkway</strong><p>Located close to one of Sheffield's dual carriageways, this is the worst-polluted spot in Darnall ward.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.397058, 53.378414]
            }
          },
          {
            type: "Feature",
            properties: {
              description: "<strong>Archer Road/Fraser Road</strong><p>Proximity to two large car parks has caused this spot to have particularly high level of polluting gases</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.489764, 53.346259]
            }
          },
          {
            type: "Feature",
            properties: {
              description: "<strong>Carter Knowle Road/A621</strong><p>The residential area has high levels of pollution.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.486119, 53.354341]
            }
          },
          {
            type: "Feature",
            properties: {
              description: "<strong>Abbeydale Road/Springfield Road</strong><p>Although this spot is next to a park, its proximity to two main roads gives rise to poor air quality.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.496835, 53.345905]
            }
          },
          {
            type: "Feature",
            properties: {
              description: "<strong>Crookes Road/Whitham Road</strong><p>Three busy junctions within this 100m stretch of road have made it one of the most polluted spots in the city.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.500321, 53.377686]
            }
          },
          {
            type: "Feature",
            properties: {
              description: "<strong>Sheldon Road</strong><p>Pupils at the nearby primary school are exposed to harmful levels of smog on a daily basis.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.487111, 53.360054]
            }
          },
          {
            type: "Feature",
            properties: {
              description:
                "<strong>Train Station</strong><p>The station has the worst pollution level in the city, and has been named as one of the most polluted places in Britain.</p>",
              icon: "park"
            },
            geometry: {
              type: "Point",
              coordinates: [-1.462962, 53.378441]
            }
          }
        ]
      }
    },
    layout: {
      "icon-image": "{icon}-15",
      "icon-allow-overlap": true
    }
  });

  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on("mouseenter", "places", function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  map.on("mouseleave", "places", function() {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
