from flask import Flask, request, jsonify
import requests
import datetime

app = Flask(__name__)

# Register your company with the John Doe Railway Server
def register_company():
    registration_url = "http://20.244.56.144/train/register"
    registration_data = {
        "companyName": "Amrita University",
        "ownerName": "Kinshuk Goyal",
        "rollNo": "BL.EN.U4CSE20075",
        "ownerEmail": "kinshukgoyal2003@gmail.com",
        "accessCode": "hMkCJZ"
    }
    response = requests.post(registration_url, json=registration_data)
    if response.status_code == 200:
        registration_info = response.json()
        print("Registration Info: ",registration_info)
        return registration_info
    return None

registration_info = register_company()  # Register the company and obtain credentials

# Get the authorization token using registration credentials
def get_authorization_token():
    auth_url = "http://20.244.56.144/train/auth"
    auth_data = {
        "companyName": registration_info["companyName"],
        "ownerName": registration_info["ownerName"],
        "clientID": registration_info["clientID"],
        "ownerEmail": registration_info["ownerEmail"],
        "clientSecret": registration_info["clientSecret"],
        "rollNo": registration_info["rollNo"]
    }
    response = requests.post(auth_url, json=auth_data)
    if response.status_code == 200:
        auth_info = response.json()
        print("Auth Info: ",auth_info)
        return auth_info["access_token"]
    return None

# Fetch train data using the obtained authorization token
def fetch_train_data():
    access_token = get_authorization_token()
    if access_token:
        headers = {"Authorization": f"Bearer {access_token}"}
        trains_url = "http://20.244.56.144/train/trains"
        response = requests.get(trains_url, headers=headers)
        if response.status_code == 200:
            train_data = response.json()
            print("Train Data: ",train_data)
            return train_data
    return []

# Endpoint to get the list of trains in the next 12 hours
@app.route('/trains', methods=['GET'])
def get_trains():
    current_time = datetime.datetime.now()
    twelve_hours_later = current_time + datetime.timedelta(hours=12)

    train_data = fetch_train_data()

    filtered_trains = []
    for train in train_data:
        departure_time_data = train["departureTime"]
        departure_time = datetime.datetime(
            year=current_time.year,
            month=current_time.month,
            day=current_time.day,
            hour=departure_time_data["Hours"],
            minute=departure_time_data["Minutes"],
            second=departure_time_data["Seconds"]
        )

        if current_time <= departure_time <= twelve_hours_later and (departure_time - current_time).seconds >= 1800:
            filtered_trains.append(train)

    # Sort the trains based on the criteria mentioned
    sorted_trains = sorted(
        filtered_trains,
        key=lambda x: (
            x["price"]["sleeper"],
            -x["seatsAvailable"]["sleeper"],
            -(departure_time + datetime.timedelta(minutes=x["delayedBy"]) - current_time).total_seconds()
        )
    )

    return jsonify(sorted_trains)
if __name__ == '__main__':
    app.run(debug=True)