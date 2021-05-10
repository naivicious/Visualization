import pandas as pd
import requests
import json


df = pd.read_csv("restaurant.csv")

for i, row in df.iterrows():
    apiAddress = str(df.at[i,'location'] + str(df.at[i,'district_name']) + ',Newyork,America')


    parameters= {
        "key" : "G1eGOGVnkRsmGDQkQL5PayvQJJpFWvxM",
        "location" : apiAddress
    }


    response =requests.get("http://www.mapquestapi.com/geocoding/v1/address", params=parameters)

    data = json.loads(response.text)['results']

    lat = data[0]['locations'][0]['latLng']['lat']
    lng = data[0]['locations'][0]['latLng']['lng']

    df.at[i,'lat'] = lat
    df.at[i,'lng'] = lng

    df.to_csv('restaurant_Geo.csv')
