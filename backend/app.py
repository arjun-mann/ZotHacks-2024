from flask import Flask, jsonify

import requests



 
app = Flask(__name__)

@app.route("/recommendations")
def get_reccommendations():
    url = "https://spotify23.p.rapidapi.com/recommendations/"


    seed_track_ids = ""

    querystring = {"limit":"5","seed_tracks":"0c6xIDDpzE81m2q797ordA"}

    headers = {
        "x-rapidapi-key": "836068d2e0mshefe9f52f2d3388dp1bf9a3jsnfdf6fef6b1ca",
        "x-rapidapi-host": "spotify23.p.rapidapi.com"
    }
    
    response = requests.get(url, headers=headers, params=querystring)

 
    data = response.json()
    track_names = [track['name'] for track in data['tracks']]
    
    return jsonify(track_names)
  



@app.route("/search", methods = ['POST'])
# @app.route("/search", methods = ['POST'])
def search_song():
    data = requests.get_json()
    input_string = data['data']
    # input_string = 'the'

    url = "https://spotify23.p.rapidapi.com/search/"

    querystring = {"q": input_string, "type":"tracks","offset":"0","limit":"10","numberOfTopResults":"5"}

    headers = {
        "x-rapidapi-key": "836068d2e0mshefe9f52f2d3388dp1bf9a3jsnfdf6fef6b1ca",
        "x-rapidapi-host": "spotify23.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    data = response.json()
 
    track_names_and_artists = []
    for item in data['tracks']['items']:
            track_name = item['data']['name']
            artist_list = item['data']['artists']['items']
            artist_name = artist_list[0]['profile']['name'] if artist_list else "Unknown Artist"
            combined_name = f"{track_name}, {artist_name}"
            track_names_and_artists.append(combined_name)

    print(track_names_and_artists)       

    return jsonify(track_names_and_artists)






if __name__ == '__main__':
    app.run(debug=True)
