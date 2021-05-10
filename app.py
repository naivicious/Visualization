from flask import Flask,jsonify
from flask import render_template,request
import config
import utils
import requests
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("base.html")

@app.route('/city')
def city():
    return render_template("city.html")

@app.route('/district')
def district():
    return render_template("district.html")

@app.route('/location', methods=['get','post'])
def location():
    address = request.form['word']
    option = request.form['option']
    food = request.form['food']

    parameters = {
        "key": "G1eGOGVnkRsmGDQkQL5PayvQJJpFWvxM",
        "location": address
    }

    response = requests.get("http://www.mapquestapi.com/geocoding/v1/address", params=parameters)
    data = json.loads(response.text)['results']

    lat = data[0]['locations'][0]['latLng']['lat']
    lng = data[0]['locations'][0]['latLng']['lng']

    print(lat,lng)
    #return jsonify({"address": address,"lat": lat,"lng": lng})

    return render_template("base.html", address = address,lat =lat, lng =lng,option =option,food = food)

@app.route("/t1")
def get_t1_data():
    data = utils.get_t1_data()
    name, value = [], []
    for a, b in data:
        name.append(a)
        value.append(b)
    return jsonify({"name": name, "value": value})

@app.route("/t2")
def get_t2_data():
    data = utils.get_t2_data()
    name, value, raw = [], [], []
    for a, b in data:
        name.append(a)
        value.append(b)
        raw.append({"value": b, "name": a })
    return jsonify({"value": value, "name": name, "raw" : raw })

@app.route("/t3")
def get_t3_data():
    data = utils.get_t3_data()
    raw = []
    for a, b in data:
        value1, value2 = [],[]
        rate = a.split(" ")[0]
        value1.append(float(rate))
        value2.append(b)
        raw.append(value1 + value2)
    return jsonify({"raw" : raw })

@app.route("/t4_1")
def get_t4_1_data():
    data = utils.get_t4_1_data()
    name, value = [], []
    for a, b in data:
        name.append(a)
        value.append(b)
    return jsonify({"name": name, "value": value})

@app.route("/t4_2")
def get_t4_2_data():
    data = utils.get_t4_2_data()
    name, value = [], []
    for a, b in data:
        name.append(a)
        value.append(b)
    return jsonify({"name": name, "value": value})

@app.route("/t4_3")
def get_t4_3_data():
    data = utils.get_t4_3_data()
    name, value = [], []
    for a, b in data:
        name.append(a)
        value.append(b)
    return jsonify({"name": name, "value": value})

@app.route("/t4_4")
def get_t4_4_data():
    data = utils.get_t4_4_data()
    name, value = [], []
    for a, b in data:
        name.append(a)
        value.append(b)
    return jsonify({"name": name, "value": value})

@app.route("/t4_5")
def get_t4_5_data():
    data = utils.get_t4_5_data()
    name, value = [], []
    for a, b in data:
        name.append(a)
        value.append(b)
    return jsonify({"name": name, "value": value})

@app.route("/t4_6")
def get_t4_6_data():
    data = utils.get_t4_6_data()
    name, value = ['American(New)'], [0]
    for a, b in data:
        name.append(a)
        value.append(b)
    return jsonify({"name": name, "value": value})


@app.route("/t5")
def get_t5_data():
    data = utils.get_t5_data()
    name, value, raw = [], [], []
    for a, b in data:
        name.append(a)
        value.append(b)
        raw.append({"value": b, "name": a })
    return jsonify({"name": name, "raw" : raw })

@app.route("/t6_1")
def get_t6_1_data():
    data = utils.get_t6_1_data()
    value = []
    for a, b in data:
        value.append(b)
    return jsonify({"value": value})

@app.route("/t6_2")
def get_t6_2_data():
    data = utils.get_t6_2_data()
    value = []
    for a, b in data:
        value.append(b)
    return jsonify({"value": value})

@app.route("/t6_3")
def get_t6_3_data():
    data = utils.get_t6_3_data()
    value = []
    for a, b in data:
        value.append(b)
    return jsonify({"value": value})

@app.route("/t6_4")
def get_t6_4_data():
    data = utils.get_t6_4_data()
    value = []
    for a, b in data:
        value.append(b)
    return jsonify({"value": value})

@app.route("/t6_5")
def get_t6_5_data():
    data = utils.get_t6_5_data()
    value = []
    for a, b in data:
        value.append(b)
    return jsonify({"value": value})

@app.route("/m1")
def get_m1_data():
    data = utils.get_m1_data()
    shopname, lat, lng, image,num, point, cost, food,location, service,time = [],[],[],[],[],[],[],[],[],[],[]
    for a, b, c, d, e, f, g, h, i, j, k in data:
        shopname.append(a)
        lat.append(b)
        lng.append(c)
        image.append(d)
        num.append(e)
        point.append(f)
        cost.append(g)
        food.append(h)
        location.append(i)
        service.append(j)
        time.append(k)
    return jsonify({"shopname" : shopname, "lat": lat, "lng":lng,"img":image,"num":num,"star":point,"cost":cost,"food":food,"location":location,"service":service,"time":time})

@app.route("/m2")
def get_m2_data():
    data = utils.get_m2_data()
    shopname, lat, lng, image, num, point, cost, food = [], [], [], [], [], [], [], []
    for a, b, c, d, e, f, g, h in data:
        shopname.append(a)
        lat.append(b)
        lng.append(c)
        image.append(d)
        num.append(e)
        point.append(f)
        cost.append(g)
        food.append(h)
    return jsonify({"shopname" : shopname, "lat": lat, "lng":lng,"img":image,"num":num,"star":point,"cost":cost,"food":food})

@app.route("/m3")
def get_m3_data():
    data = utils.get_m3_data()
    shopname, lat, lng, image, num, point, cost, food = [], [], [], [], [], [], [], []
    for a, b, c, d, e, f, g, h in data:
        shopname.append(a)
        lat.append(b)
        lng.append(c)
        image.append(d)
        num.append(e)
        point.append(f)
        cost.append(g)
        food.append(h)
    return jsonify({"shopname" : shopname, "lat": lat, "lng":lng,"img":image,"num":num,"star":point,"cost":cost,"food":food})



if __name__ == '__main__':
    app.run()
