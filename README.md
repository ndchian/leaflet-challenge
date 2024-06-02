# leaflet-challenge

## End Result Map:
<img width="1408" alt="Screenshot 2024-06-01 at 11 43 26 PM" src="https://github.com/ndchian/leaflet-challenge/assets/153045237/509b6395-96fa-4c28-80b3-da724f2c76d9">

### Creating Earthquake Visualization

Only part 1 of this challenge was completed with the goal to provide a earthquake map. The following steps were followed: 

* Get the dataset, for this challenge this url was used: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
* Import and visualize the data by using leaflet to create a map that plots all the earthquakes based on longitude and latitude

<b>Styling</b>
* The data markers were adjusted to reflect the magnitude of the earthquake and the depth of the earthquake
* Earthquakes with higher magnitudes will appear larger, and earthquakes with greater depth have colors ranging closer to red whereas less depth will be closer to green
* Popups are included that provide additional information about the earthquake when its associated marker is clicked
* There is also a legend that will provide context for the map data.
