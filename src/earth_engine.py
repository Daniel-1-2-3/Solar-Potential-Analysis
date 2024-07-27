import ee
import os
import folium
import geehydro

ee.Authenticate()
ee.Initialize(project='ee-daniel-solar-app')
print('API Login Successful')

#create map centered around this point
map = folium.Map(location=[45.55, -79.68], zoom_start=10)
#define a region of interest (ROI) for the map
roi = ee.Geometry.Point([-79.68, 43.45]) 

#save the map
public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../public'))
html_path = os.path.join(public_dir, 'earth_engine_map.html')
map.save(html_path)
