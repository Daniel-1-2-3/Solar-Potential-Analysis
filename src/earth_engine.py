import ee
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from io import BytesIO
from PIL import Image
import numpy as np
import cv2
import base64
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
from io import BytesIO
import json
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import requests

app = FastAPI()

#allows requests from any domain, with any method, and lift restrictions on credentials needed to make requests
#CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

class CoordinatesReq(BaseModel):
    latitude: str
    longitude: str
    radius: str

def average_red_channel(pixel_values):
    red_values = [pixel_values[i] for i in range(0, len(pixel_values), 3)]
    if red_values:
        return sum(red_values) / len(red_values)
    return 0

def download_image(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    return img

def extract_pixel_values(img):
    img = np.array(img)
    pixel_values = img.flatten().tolist()
    return pixel_values

def find_solar_irrandiance(longitude, latitude, radius):
    #define the area of interest, based on radius of circle and center (latitude, longitude)
    center = ee.Geometry.Point([longitude, latitude])
    aoi = center.buffer(radius) #area of interest
    
    #load the ERA5 dataset wit# Filter the dataset for a specific time range
    dataset = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY_AGGR").select('surface_solar_radiation_downwards_sum')
    
    solar_irradiance = dataset.mean().clip(aoi)  # Compute the mean solar irradiance over the AOI
    
    #get the solar irradiance data as a heat map (url form), white-red = little-more solar irradiance 
    url = solar_irradiance.getThumbURL({
        'min': 0,
        'max': 400,  #adjust based on expected range of solar irradiance
        'palette': ['blue', 'green', 'red']
    })

    return url
    
@app.post("/process_coordinates")
async def process_image(req: CoordinatesReq):
    latitude, longitude, radius = req.latitude, req.longitude, req.radius
    print(latitude, longitude, radius)
    
    map_url = find_solar_irrandiance(float(longitude), float(latitude), float(radius))
    map_img = download_image(map_url)
    #pixel values represent each pixel in the extract heat map of the area. Red=high solar irradiance, blue=lowest solar irradiance
    pixel_values = extract_pixel_values(map_img) 
    #average the red channels: if average comes to be 255, it is max solar irradiance, 0, min solar irradiance 
    average_red = average_red_channel(pixel_values)
    
    #using the average, on a scale of 0-255, determine the solar potential with essentialy this formula:
    # (average solar irradiance in this area) / (maximum solar irradiance possible)
    solar_potential = f'{(round(average_red/255, 2)*100)*2}'
    
    json_compatible_item_data = jsonable_encoder(solar_potential)
    return JSONResponse(content=json_compatible_item_data)

if __name__ == "__main__":
    ee.Authenticate()
    ee.Initialize(project='ee-daniel-solar-app')
    print('API Login Successful')
    
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3500)

