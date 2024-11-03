from flask import Flask, jsonify, request

import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

seed_list = ''

@app.route("/recommendations")
def get_reccommendations():
    url = "https://spotify23.p.rapidapi.com/recommendations/"

    global seed_list

    querystring = {"limit":"5","seed_tracks":seed_list[:-1]}

    headers = {
        "x-rapidapi-key": "836068d2e0mshefe9f52f2d3388dp1bf9a3jsnfdf6fef6b1ca",
        "x-rapidapi-host": "spotify23.p.rapidapi.com"
    }
    
    response = requests.get(url, headers=headers, params=querystring)
 
    data = response.json()
    
    return jsonify(data)



@app.route("/search", )
def search_song():
    # data = request.get_json()
    # input_string = data['data']
    # print(input_string, "1")
    
    input_string = request.args.get('song')
    print('WE MADE IT', input_string)
    url = "https://spotify23.p.rapidapi.com/search/"

    querystring = {"q": input_string, "type":"tracks","offset":"0","limit":"5","numberOfTopResults":"1"}
    print(input_string, "2")
    headers = {
        "x-rapidapi-key": "836068d2e0mshefe9f52f2d3388dp1bf9a3jsnfdf6fef6b1ca",
        "x-rapidapi-host": "spotify23.p.rapidapi.com"
    }
    print(input_string, "3")
    response = requests.get(url, headers=headers, params=querystring)
    print(input_string, "4")
    data = response.json()


    # track_item = data['tracks']['items'][0]['data']  

    # track_name = track_item['name']
    # artist_name = track_item['artists']['items'][0]['profile']['name'] if track_item['artists']['items'] else "Unknown Artist"
    # track_id = track_item['id']
    # cover_art_url = track_item['albumOfTrack']['coverArt']['sources'][0]['url']

    # combined_name = f"{track_name}, {artist_name}"
    # result = {combined_name, track_id, cover_art_url}


    # print(result)

    return jsonify(data)



@app.route("/search-recs")
def search_song_recs(input_string: str):
    print(input_string, "1")

    url = "https://spotify23.p.rapidapi.com/search/"

    querystring = {"q": input_string, "type":"tracks","offset":"0","limit":"1","numberOfTopResults":"1"}
    print(input_string, "2")
    headers = {
        "x-rapidapi-key": "836068d2e0mshefe9f52f2d3388dp1bf9a3jsnfdf6fef6b1ca",
        "x-rapidapi-host": "spotify23.p.rapidapi.com"
    }
    print(input_string, "3")
    response = requests.get(url, headers=headers, params=querystring)
    print(input_string, "4")
    data = response.json()


    track_item = data['tracks']['items'][0]['data']  

    track_name = track_item['name']
    artist_name = track_item['artists']['items'][0]['profile']['name'] if track_item['artists']['items'] else "Unknown Artist"
    track_id = track_item['id']
    cover_art_url = track_item['albumOfTrack']['coverArt']['sources'][0]['url']

    combined_name = f"{track_name}, {artist_name}"
    result = {combined_name, track_id, cover_art_url}


    print(result)

    return result



@app.route("/seed", methods = ['POST'])
def add_to_seed_list():
    global seed_list
    data = request.get_json()
    id = data["id"]
    # input_string = data['data']

    seed_list += f"{id},"

    # check if the seed list is > 5
    # if it is, do something!
    if len(seed_list[:-1].split(",")) > 5:
        last_five = seed_list[:-1].split(",")[-5:]
        seed_list = ",".join(last_five) + ","

    print(seed_list)
    return "success"




if __name__ == '__main__':
    app.run(debug=True, port=5001)
    
