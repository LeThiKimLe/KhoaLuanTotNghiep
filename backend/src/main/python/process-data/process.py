import json

def convert_json_to_string(json_str):
    data = json.loads(json_str)
    result = ""
    count1 = 1
    for item in data:
        route_id = item["id"]
        start_province = item["departure"]["name"]
        end_province = item["destination"]["name"]
        result += f"+ Tuyến xe {count1}: {start_province} - {end_province}\n"
        result += f"  Các chuyến có trong tuyến:\n"
        count2 = 1
        for trip in item["trips"]:
            start_station = trip["startStation"]["name"]
            end_station = trip["endStation"]["name"]
            result += f"  {count2}. {start_station} - {end_station}\n"
            result += f"    Giá vé: {trip['price']}\n"
            result += f"    Quãng đường di chuyển: {trip['distance']} km\n"
            result += f"    Thời gian di chuyển: {trip['hours']} giờ\n"
            result += f"    Lộ trình di chuyển: {trip['schedule']}\n"
            result += f"    Các trạm đi qua:\n"
            for station in trip["stopStations"]:
                result += f"     + {station['station']['name']} ({station['stationType']})\n"
            count2 += 1
        result += f"\n"
        count1 += 1
    # Write result to end of data.txt file
    with open("data.txt", "a", encoding='utf-8') as file:
        file.write(result)

# Example usage
json_string = '''
[
  {
    "id": 28,
    "departure": {
      "id": 37,
      "name": "TP. Hồ Chí Minh"
    },
    "destination": {
      "id": 38,
      "name": "Khánh Hòa"
    },
    "parents": 0,
    "trips": [
      {
        "id": 61,
        "turn": true,
        "busCompanyId": 11,
        "startStation": {
          "id": 38,
          "name": "Miền Đông",
          "address": "Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8149447,
          "longitude": 106.7106917,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 39,
          "name": "Phía Nam Nha Trang",
          "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
          "location": {
            "id": 38,
            "name": "Khánh Hòa"
          },
          "latitude": 12.25839475,
          "longitude": 109.13485589,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 5,
          "name": "limousine_40",
          "capacity": 40,
          "fee": 10000,
          "description": "limousine 40 chỗ"
        },
        "price": 300000,
        "distance": 450,
        "hours": 6,
        "schedule": "BX Phía Nam Nha Trang - QL1A - QL13 - BX Miền Đông",
        "stopStations": [
          {
            "id": 193,
            "arrivalTime": 2,
            "stationType": "Trạm đón",
            "station": {
              "id": 38,
              "name": "Miền Đông",
              "address": "Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8149447,
              "longitude": 106.7106917,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 194,
            "arrivalTime": 7,
            "stationType": "Trạm trả",
            "station": {
              "id": 39,
              "name": "Phía Nam Nha Trang",
              "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 12.25839475,
              "longitude": 109.13485589,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 197,
            "arrivalTime": 4,
            "stationType": "Trạm đón",
            "station": {
              "id": 40,
              "name": "Ngã tư Thủ Đức",
              "address": "Thu Duc Intersection, Cầu vượt Ngã tư Thủ Đức, Binh Tho Ward, Thủ Đức, Ho Chi Minh City, 00848, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8491275,
              "longitude": 106.7740312,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 200,
            "arrivalTime": 6,
            "stationType": "Trạm trả",
            "station": {
              "id": 41,
              "name": "Bến xe Cam Ranh",
              "address": "Lê Duẩn, Phường Cam Lộc, Cam Ranh, Khánh Hòa Province, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 11.91803368,
              "longitude": 109.14670324,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 279,
            "arrivalTime": 1,
            "stationType": "Bãi đỗ xe đầu",
            "station": {
              "id": 73,
              "name": "Bãi đỗ xe Châu An, Tân Phú",
              "address": "Đường Số 138, Topaz Mansion, Tan Phu Ward, Thủ Đức, Ho Chi Minh City, 71216, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8618342,
              "longitude": 106.80828903,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 282,
            "arrivalTime": 8,
            "stationType": "Bãi đỗ xe cuối",
            "station": {
              "id": 72,
              "name": "Bãi đỗ xe Cam Ranh",
              "address": "Bus to Center Nha Trang, Hùng Vương, Phường Cam Lợi, Cam Ranh, Khánh Hòa Province, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 11.91649264,
              "longitude": 109.14502045,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 283,
            "arrivalTime": 5,
            "stationType": "Trạm dừng chân",
            "station": {
              "id": 74,
              "name": "Trạm dừng chân Hưng Thịnh",
              "address": "PV Oil, Trần Hưng Đạo, Phường Bình Hưng, Phan Thiết, Bình Thuận Province, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 10.92908714,
              "longitude": 108.1051104,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 293,
            "arrivalTime": 3,
            "stationType": "Trạm đón",
            "station": {
              "id": 47,
              "name": "Ngã Tư Ga",
              "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8623238,
              "longitude": 106.67872,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 62,
        "turn": false,
        "busCompanyId": 11,
        "startStation": {
          "id": 39,
          "name": "Phía Nam Nha Trang",
          "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
          "location": {
            "id": 38,
            "name": "Khánh Hòa"
          },
          "latitude": 12.25839475,
          "longitude": 109.13485589,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 38,
          "name": "Miền Đông",
          "address": "Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8149447,
          "longitude": 106.7106917,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 5,
          "name": "limousine_40",
          "capacity": 40,
          "fee": 10000,
          "description": "limousine 40 chỗ"
        },
        "price": 300000,
        "distance": 450,
        "hours": 6,
        "schedule": "BX Miền Đông - QL13 - QL1A - BX Phía Nam Nha Trang",
        "stopStations": [
          {
            "id": 195,
            "arrivalTime": 7,
            "stationType": "Trạm trả",
            "station": {
              "id": 38,
              "name": "Miền Đông",
              "address": "Bến xe Miền Đông, Dinh Bo Linh, Ward 26, Binh Thanh District, Ho Chi Minh City, 72309, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8149447,
              "longitude": 106.7106917,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 196,
            "arrivalTime": 2,
            "stationType": "Trạm đón",
            "station": {
              "id": 39,
              "name": "Phía Nam Nha Trang",
              "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 12.25839475,
              "longitude": 109.13485589,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 198,
            "arrivalTime": 5,
            "stationType": "Trạm trả",
            "station": {
              "id": 40,
              "name": "Ngã tư Thủ Đức",
              "address": "Thu Duc Intersection, Cầu vượt Ngã tư Thủ Đức, Binh Tho Ward, Thủ Đức, Ho Chi Minh City, 00848, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8491275,
              "longitude": 106.7740312,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 199,
            "arrivalTime": 3,
            "stationType": "Trạm đón",
            "station": {
              "id": 41,
              "name": "Bến xe Cam Ranh",
              "address": "Lê Duẩn, Phường Cam Lộc, Cam Ranh, Khánh Hòa Province, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 11.91803368,
              "longitude": 109.14670324,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 280,
            "arrivalTime": 8,
            "stationType": "Bãi đỗ xe cuối",
            "station": {
              "id": 73,
              "name": "Bãi đỗ xe Châu An, Tân Phú",
              "address": "Đường Số 138, Topaz Mansion, Tan Phu Ward, Thủ Đức, Ho Chi Minh City, 71216, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8618342,
              "longitude": 106.80828903,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 281,
            "arrivalTime": 1,
            "stationType": "Bãi đỗ xe đầu",
            "station": {
              "id": 72,
              "name": "Bãi đỗ xe Cam Ranh",
              "address": "Bus to Center Nha Trang, Hùng Vương, Phường Cam Lợi, Cam Ranh, Khánh Hòa Province, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 11.91649264,
              "longitude": 109.14502045,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 284,
            "arrivalTime": 4,
            "stationType": "Trạm dừng chân",
            "station": {
              "id": 74,
              "name": "Trạm dừng chân Hưng Thịnh",
              "address": "PV Oil, Trần Hưng Đạo, Phường Bình Hưng, Phan Thiết, Bình Thuận Province, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 10.92908714,
              "longitude": 108.1051104,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 294,
            "arrivalTime": 6,
            "stationType": "Trạm trả",
            "station": {
              "id": 47,
              "name": "Ngã Tư Ga",
              "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8623238,
              "longitude": 106.67872,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 97,
        "turn": true,
        "busCompanyId": 18,
        "startStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 39,
          "name": "Phía Nam Nha Trang",
          "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
          "location": {
            "id": 38,
            "name": "Khánh Hòa"
          },
          "latitude": 12.25839475,
          "longitude": 109.13485589,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 460,
        "hours": 6.1,
        "schedule": "BX Miền Tây - Đường Kinh Dương Vương - Ngã Ba cây Dầu Đôi - QL1 - Đường 23/10 - BX Phía Nam Nha Trang",
        "stopStations": [
          {
            "id": 271,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 272,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 39,
              "name": "Phía Nam Nha Trang",
              "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 12.25839475,
              "longitude": 109.13485589,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 98,
        "turn": false,
        "busCompanyId": 18,
        "startStation": {
          "id": 39,
          "name": "Phía Nam Nha Trang",
          "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
          "location": {
            "id": 38,
            "name": "Khánh Hòa"
          },
          "latitude": 12.25839475,
          "longitude": 109.13485589,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 460,
        "hours": 6.1,
        "schedule": "BX Phía Nam Nha Trang - Đường 23/10 - QL1 - Ngã Ba cây Dầu Đôi - Đường Kinh Dương Vương - BX Miền Tây",
        "stopStations": [
          {
            "id": 273,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 274,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 39,
              "name": "Phía Nam Nha Trang",
              "address": "Central Bus Station Nha Trang, 23 Tháng 10, Xã Vĩnh Trung, Nha Trang, Khánh Hòa Province, 57124, Vietnam",
              "location": {
                "id": 38,
                "name": "Khánh Hòa"
              },
              "latitude": 12.25839475,
              "longitude": 109.13485589,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 29,
    "departure": {
      "id": 37,
      "name": "TP. Hồ Chí Minh"
    },
    "destination": {
      "id": 39,
      "name": "Trà Vinh"
    },
    "parents": 0,
    "trips": [
      {
        "id": 63,
        "turn": true,
        "busCompanyId": 12,
        "startStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 43,
          "name": "Trà Vinh",
          "address": "Bến xe Trà Vinh, Trà Vinh",
          "location": {
            "id": 39,
            "name": "Trà Vinh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 6,
          "name": "limousine_33",
          "capacity": 33,
          "fee": 0,
          "description": "limousine 33 chỗ"
        },
        "price": 120000,
        "distance": 135,
        "hours": 1.8,
        "schedule": "BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL60 - QL53 - QL54 - BX Trà Vinh",
        "stopStations": [
          {
            "id": 201,
            "arrivalTime": 1,
            "stationType": "Trạm đón",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 202,
            "arrivalTime": 4,
            "stationType": "Trạm trả",
            "station": {
              "id": 43,
              "name": "Trà Vinh",
              "address": "Bến xe Trà Vinh, Trà Vinh",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 206,
            "arrivalTime": 3,
            "stationType": "Trạm trả",
            "station": {
              "id": 44,
              "name": "Trạm xe Thanh Thủy, Bình Phú",
              "address": "National Route 53, Xã Bình Phú, Càng Long District, Trà Vinh Province, Vietnam",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 9.96000815,
              "longitude": 106.24510484,
              "busCompanyId": 12,
              "active": true
            },
            "active": true
          },
          {
            "id": 301,
            "arrivalTime": 2,
            "stationType": "Trạm đón",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 64,
        "turn": false,
        "busCompanyId": 12,
        "startStation": {
          "id": 43,
          "name": "Trà Vinh",
          "address": "Bến xe Trà Vinh, Trà Vinh",
          "location": {
            "id": 39,
            "name": "Trà Vinh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 6,
          "name": "limousine_33",
          "capacity": 33,
          "fee": 0,
          "description": "limousine 33 chỗ"
        },
        "price": 120000,
        "distance": 135,
        "hours": 1.8,
        "schedule": "BX Trà Vinh - QL54 - QL53 - QL60 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây",
        "stopStations": [
          {
            "id": 203,
            "arrivalTime": 4,
            "stationType": "Trạm trả",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 204,
            "arrivalTime": 1,
            "stationType": "Trạm đón",
            "station": {
              "id": 43,
              "name": "Trà Vinh",
              "address": "Bến xe Trà Vinh, Trà Vinh",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 205,
            "arrivalTime": 2,
            "stationType": "Trạm đón",
            "station": {
              "id": 44,
              "name": "Trạm xe Thanh Thủy, Bình Phú",
              "address": "National Route 53, Xã Bình Phú, Càng Long District, Trà Vinh Province, Vietnam",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 9.96000815,
              "longitude": 106.24510484,
              "busCompanyId": 12,
              "active": true
            },
            "active": true
          },
          {
            "id": 302,
            "arrivalTime": 3,
            "stationType": "Trạm trả",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 95,
        "turn": true,
        "busCompanyId": 17,
        "startStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 71,
          "name": "Thị xã Duyên Hải",
          "address": "Bến xe Thị xã Duyên Hải, Trà Vinh",
          "location": {
            "id": 39,
            "name": "Trà Vinh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 253,
        "hours": 3.4,
        "schedule": "BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - Bến Tre - QL60 - QL53 - BX Duyên Hải",
        "stopStations": [
          {
            "id": 267,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 268,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 71,
              "name": "Thị xã Duyên Hải",
              "address": "Bến xe Thị xã Duyên Hải, Trà Vinh",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 96,
        "turn": false,
        "busCompanyId": 17,
        "startStation": {
          "id": 71,
          "name": "Thị xã Duyên Hải",
          "address": "Bến xe Thị xã Duyên Hải, Trà Vinh",
          "location": {
            "id": 39,
            "name": "Trà Vinh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 253,
        "hours": 3.4,
        "schedule": "BX Duyên Hải - QL53 - QL60 - Bến Tre - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây",
        "stopStations": [
          {
            "id": 269,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 270,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 71,
              "name": "Thị xã Duyên Hải",
              "address": "Bến xe Thị xã Duyên Hải, Trà Vinh",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 99,
        "turn": true,
        "busCompanyId": 18,
        "startStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 43,
          "name": "Trà Vinh",
          "address": "Bến xe Trà Vinh, Trà Vinh",
          "location": {
            "id": 39,
            "name": "Trà Vinh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 151,
        "hours": 2,
        "schedule": "BX Miền Tây - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - QL53 - QL54 - BX Trà Vinh",
        "stopStations": [
          {
            "id": 275,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 276,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 43,
              "name": "Trà Vinh",
              "address": "Bến xe Trà Vinh, Trà Vinh",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 100,
        "turn": false,
        "busCompanyId": 18,
        "startStation": {
          "id": 43,
          "name": "Trà Vinh",
          "address": "Bến xe Trà Vinh, Trà Vinh",
          "location": {
            "id": 39,
            "name": "Trà Vinh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 151,
        "hours": 2,
        "schedule": "BX Trà Vinh - QL54 - QL53 - QL1A - Cao tốc TP Hồ Chí Minh Trung Lương - QL1A - BX Miền Tây",
        "stopStations": [
          {
            "id": 277,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 278,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 43,
              "name": "Trà Vinh",
              "address": "Bến xe Trà Vinh, Trà Vinh",
              "location": {
                "id": 39,
                "name": "Trà Vinh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 30,
    "departure": {
      "id": 37,
      "name": "TP. Hồ Chí Minh"
    },
    "destination": {
      "id": 40,
      "name": "Bình Định"
    },
    "parents": 0,
    "trips": [
      {
        "id": 65,
        "turn": true,
        "busCompanyId": 13,
        "startStation": {
          "id": 45,
          "name": "An Sương",
          "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8452543,
          "longitude": 106.6133452,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 46,
          "name": "Quy Nhơn",
          "address": "Quy Nhon Bus Station, Quốc lộ 1D, Ghềnh Ráng, Phường Ghềnh Ráng, Quy Nhơn, Bình Định Province, 59000, Vietnam",
          "location": {
            "id": 40,
            "name": "Bình Định"
          },
          "latitude": 13.7533396,
          "longitude": 109.2089074,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 649,
        "hours": 8.7,
        "schedule": "BX An Sương - QL22 - QL1 - QL1D - BX Quy Nhơn",
        "stopStations": [
          {
            "id": 207,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 208,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 46,
              "name": "Quy Nhơn",
              "address": "Quy Nhon Bus Station, Quốc lộ 1D, Ghềnh Ráng, Phường Ghềnh Ráng, Quy Nhơn, Bình Định Province, 59000, Vietnam",
              "location": {
                "id": 40,
                "name": "Bình Định"
              },
              "latitude": 13.7533396,
              "longitude": 109.2089074,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 66,
        "turn": false,
        "busCompanyId": 13,
        "startStation": {
          "id": 46,
          "name": "Quy Nhơn",
          "address": "Quy Nhon Bus Station, Quốc lộ 1D, Ghềnh Ráng, Phường Ghềnh Ráng, Quy Nhơn, Bình Định Province, 59000, Vietnam",
          "location": {
            "id": 40,
            "name": "Bình Định"
          },
          "latitude": 13.7533396,
          "longitude": 109.2089074,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 45,
          "name": "An Sương",
          "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8452543,
          "longitude": 106.6133452,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 649,
        "hours": 8.7,
        "schedule": "BX Quy Nhơn - QL1D - QL1 - QL22 - BX An Sương",
        "stopStations": [
          {
            "id": 209,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 210,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 46,
              "name": "Quy Nhơn",
              "address": "Quy Nhon Bus Station, Quốc lộ 1D, Ghềnh Ráng, Phường Ghềnh Ráng, Quy Nhơn, Bình Định Province, 59000, Vietnam",
              "location": {
                "id": 40,
                "name": "Bình Định"
              },
              "latitude": 13.7533396,
              "longitude": 109.2089074,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 31,
    "departure": {
      "id": 37,
      "name": "TP. Hồ Chí Minh"
    },
    "destination": {
      "id": 41,
      "name": "Cà Mau"
    },
    "parents": 0,
    "trips": [
      {
        "id": 67,
        "turn": true,
        "busCompanyId": 13,
        "startStation": {
          "id": 47,
          "name": "Ngã Tư Ga",
          "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8623238,
          "longitude": 106.67872,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 48,
          "name": "Cà Mau",
          "address": "Bến xe Cà Mau, Lý Thường Kiệt, Phường 6, Xã Định Bình, Cà Mau, Cà Mau Province, Vietnam",
          "location": {
            "id": 41,
            "name": "Cà Mau"
          },
          "latitude": 9.1757704,
          "longitude": 105.1709436,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 366,
        "hours": 4.9,
        "schedule": "BX Cà Mau - QL1A - BX Ngã Tư Ga",
        "stopStations": [
          {
            "id": 211,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 47,
              "name": "Ngã Tư Ga",
              "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8623238,
              "longitude": 106.67872,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 212,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 48,
              "name": "Cà Mau",
              "address": "Bến xe Cà Mau, Lý Thường Kiệt, Phường 6, Xã Định Bình, Cà Mau, Cà Mau Province, Vietnam",
              "location": {
                "id": 41,
                "name": "Cà Mau"
              },
              "latitude": 9.1757704,
              "longitude": 105.1709436,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 68,
        "turn": false,
        "busCompanyId": 13,
        "startStation": {
          "id": 48,
          "name": "Cà Mau",
          "address": "Bến xe Cà Mau, Lý Thường Kiệt, Phường 6, Xã Định Bình, Cà Mau, Cà Mau Province, Vietnam",
          "location": {
            "id": 41,
            "name": "Cà Mau"
          },
          "latitude": 9.1757704,
          "longitude": 105.1709436,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 47,
          "name": "Ngã Tư Ga",
          "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8623238,
          "longitude": 106.67872,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 366,
        "hours": 4.9,
        "schedule": "BX Ngã Tư Ga - QL1A - BX Cà Mau",
        "stopStations": [
          {
            "id": 213,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 47,
              "name": "Ngã Tư Ga",
              "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8623238,
              "longitude": 106.67872,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 214,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 48,
              "name": "Cà Mau",
              "address": "Bến xe Cà Mau, Lý Thường Kiệt, Phường 6, Xã Định Bình, Cà Mau, Cà Mau Province, Vietnam",
              "location": {
                "id": 41,
                "name": "Cà Mau"
              },
              "latitude": 9.1757704,
              "longitude": 105.1709436,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 32,
    "departure": {
      "id": 42,
      "name": "Hà Nội"
    },
    "destination": {
      "id": 37,
      "name": "TP. Hồ Chí Minh"
    },
    "parents": 0,
    "trips": [
      {
        "id": 69,
        "turn": true,
        "busCompanyId": 13,
        "startStation": {
          "id": 49,
          "name": "Giáp Bát",
          "address": "Bến xe Giáp Bát, Đường Giải Phóng, Phường Giáp Bát, Hoang Mai District, Hà Nội, 11718, Vietnam",
          "location": {
            "id": 42,
            "name": "Hà Nội"
          },
          "latitude": 20.9804255,
          "longitude": 105.8414635,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 50,
          "name": "Miền Đông Mới",
          "address": "Bến xe Miền Đông mới, Đường số 13, Long Binh Ward, Thủ Đức, Ho Chi Minh City, Dĩ An, Bình Dương Province, 71300, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8785678,
          "longitude": 106.8149881,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 1750,
        "hours": 23.3,
        "schedule": "BX Miền Đông Mới - QL1A - BX Giáp Bát",
        "stopStations": [
          {
            "id": 215,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 49,
              "name": "Giáp Bát",
              "address": "Bến xe Giáp Bát, Đường Giải Phóng, Phường Giáp Bát, Hoang Mai District, Hà Nội, 11718, Vietnam",
              "location": {
                "id": 42,
                "name": "Hà Nội"
              },
              "latitude": 20.9804255,
              "longitude": 105.8414635,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 216,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 50,
              "name": "Miền Đông Mới",
              "address": "Bến xe Miền Đông mới, Đường số 13, Long Binh Ward, Thủ Đức, Ho Chi Minh City, Dĩ An, Bình Dương Province, 71300, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8785678,
              "longitude": 106.8149881,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 70,
        "turn": false,
        "busCompanyId": 13,
        "startStation": {
          "id": 50,
          "name": "Miền Đông Mới",
          "address": "Bến xe Miền Đông mới, Đường số 13, Long Binh Ward, Thủ Đức, Ho Chi Minh City, Dĩ An, Bình Dương Province, 71300, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8785678,
          "longitude": 106.8149881,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 49,
          "name": "Giáp Bát",
          "address": "Bến xe Giáp Bát, Đường Giải Phóng, Phường Giáp Bát, Hoang Mai District, Hà Nội, 11718, Vietnam",
          "location": {
            "id": 42,
            "name": "Hà Nội"
          },
          "latitude": 20.9804255,
          "longitude": 105.8414635,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 1750,
        "hours": 23.3,
        "schedule": "BX Giáp Bát - QL1A - BX Miền Đông Mới",
        "stopStations": [
          {
            "id": 217,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 49,
              "name": "Giáp Bát",
              "address": "Bến xe Giáp Bát, Đường Giải Phóng, Phường Giáp Bát, Hoang Mai District, Hà Nội, 11718, Vietnam",
              "location": {
                "id": 42,
                "name": "Hà Nội"
              },
              "latitude": 20.9804255,
              "longitude": 105.8414635,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 218,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 50,
              "name": "Miền Đông Mới",
              "address": "Bến xe Miền Đông mới, Đường số 13, Long Binh Ward, Thủ Đức, Ho Chi Minh City, Dĩ An, Bình Dương Province, 71300, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8785678,
              "longitude": 106.8149881,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 33,
    "departure": {
      "id": 43,
      "name": "Nam Định"
    },
    "destination": {
      "id": 44,
      "name": "Lào Cai"
    },
    "parents": 0,
    "trips": [],
    "active": true
  },
  {
    "id": 34,
    "departure": {
      "id": 45,
      "name": "Cao Bằng"
    },
    "destination": {
      "id": 46,
      "name": "Phú Thọ"
    },
    "parents": 0,
    "trips": [
      {
        "id": 71,
        "turn": true,
        "busCompanyId": 15,
        "startStation": {
          "id": 53,
          "name": "Liên tỉnh TP Cao Bằng",
          "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
          "location": {
            "id": 45,
            "name": "Cao Bằng"
          },
          "latitude": 22.68086165,
          "longitude": 106.20209994,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 54,
          "name": "Việt Trì",
          "address": "Bến xe Việt Trì, Phú Thọ",
          "location": {
            "id": 46,
            "name": "Phú Thọ"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 314,
        "hours": 4.2,
        "schedule": "BX Việt Trì - QL2 - Ngã ba Kim Anh Vĩnh Yên - QL3 - BX Liên tỉnh TP Cao Bằng",
        "stopStations": [
          {
            "id": 219,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 53,
              "name": "Liên tỉnh TP Cao Bằng",
              "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
              "location": {
                "id": 45,
                "name": "Cao Bằng"
              },
              "latitude": 22.68086165,
              "longitude": 106.20209994,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 220,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 54,
              "name": "Việt Trì",
              "address": "Bến xe Việt Trì, Phú Thọ",
              "location": {
                "id": 46,
                "name": "Phú Thọ"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 72,
        "turn": false,
        "busCompanyId": 15,
        "startStation": {
          "id": 54,
          "name": "Việt Trì",
          "address": "Bến xe Việt Trì, Phú Thọ",
          "location": {
            "id": 46,
            "name": "Phú Thọ"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 53,
          "name": "Liên tỉnh TP Cao Bằng",
          "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
          "location": {
            "id": 45,
            "name": "Cao Bằng"
          },
          "latitude": 22.68086165,
          "longitude": 106.20209994,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 314,
        "hours": 4.2,
        "schedule": "BX Liên tỉnh TP Cao Bằng - QL3 - Ngã ba Kim Anh Vĩnh Yên - QL2 - BX Việt Trì",
        "stopStations": [
          {
            "id": 221,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 53,
              "name": "Liên tỉnh TP Cao Bằng",
              "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
              "location": {
                "id": 45,
                "name": "Cao Bằng"
              },
              "latitude": 22.68086165,
              "longitude": 106.20209994,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 222,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 54,
              "name": "Việt Trì",
              "address": "Bến xe Việt Trì, Phú Thọ",
              "location": {
                "id": 46,
                "name": "Phú Thọ"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 35,
    "departure": {
      "id": 48,
      "name": "Điện Biên"
    },
    "destination": {
      "id": 49,
      "name": "Hòa Bình"
    },
    "parents": 0,
    "trips": [],
    "active": true
  },
  {
    "id": 36,
    "departure": {
      "id": 50,
      "name": "Quảng Ninh"
    },
    "destination": {
      "id": 51,
      "name": "Thái Bình"
    },
    "parents": 0,
    "trips": [
      {
        "id": 73,
        "turn": true,
        "busCompanyId": 14,
        "startStation": {
          "id": 55,
          "name": "Cẩm Hải",
          "address": "Bến xe Cẩm Hải, Quảng Ninh",
          "location": {
            "id": 50,
            "name": "Quảng Ninh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 56,
          "name": "Huyện Tiền Hải",
          "address": "Bến xe Huyện Tiền Hải, Thái Bình",
          "location": {
            "id": 51,
            "name": "Thái Bình"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 200,
        "hours": 2.7,
        "schedule": "BX Cẩm Hải - QL18 - Cao tốc Hạ Long Hải Phòng - Cao tốc Hải Phòng Hà Nội - QL10 - ĐT458 - QL37B - BX Tiền Hải",
        "stopStations": [
          {
            "id": 223,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 55,
              "name": "Cẩm Hải",
              "address": "Bến xe Cẩm Hải, Quảng Ninh",
              "location": {
                "id": 50,
                "name": "Quảng Ninh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 224,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 56,
              "name": "Huyện Tiền Hải",
              "address": "Bến xe Huyện Tiền Hải, Thái Bình",
              "location": {
                "id": 51,
                "name": "Thái Bình"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 74,
        "turn": false,
        "busCompanyId": 14,
        "startStation": {
          "id": 56,
          "name": "Huyện Tiền Hải",
          "address": "Bến xe Huyện Tiền Hải, Thái Bình",
          "location": {
            "id": 51,
            "name": "Thái Bình"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 55,
          "name": "Cẩm Hải",
          "address": "Bến xe Cẩm Hải, Quảng Ninh",
          "location": {
            "id": 50,
            "name": "Quảng Ninh"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 200,
        "hours": 2.7,
        "schedule": "BX Tiền Hải - QL37B - ĐT458 - QL10 - Cao tốc Hải Phòng Hà Nội - Cao tốc Hạ Long Hải Phòng - QL18 - BX Cẩm Hải",
        "stopStations": [
          {
            "id": 225,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 55,
              "name": "Cẩm Hải",
              "address": "Bến xe Cẩm Hải, Quảng Ninh",
              "location": {
                "id": 50,
                "name": "Quảng Ninh"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 226,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 56,
              "name": "Huyện Tiền Hải",
              "address": "Bến xe Huyện Tiền Hải, Thái Bình",
              "location": {
                "id": 51,
                "name": "Thái Bình"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 37,
    "departure": {
      "id": 43,
      "name": "Nam Định"
    },
    "destination": {
      "id": 37,
      "name": "TP. Hồ Chí Minh"
    },
    "parents": 0,
    "trips": [
      {
        "id": 75,
        "turn": true,
        "busCompanyId": 14,
        "startStation": {
          "id": 57,
          "name": "Nghĩa Hưng",
          "address": "Bến xe Nghĩa Hưng, Nam Định",
          "location": {
            "id": 43,
            "name": "Nam Định"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 45,
          "name": "An Sương",
          "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8452543,
          "longitude": 106.6133452,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 1700,
        "hours": 22.7,
        "schedule": "BX Nghĩa Hưng - TL490C - Đường Lê Đức Thọ - QL10 - QL1A - QL22 - BX An Sương",
        "stopStations": [
          {
            "id": 227,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 57,
              "name": "Nghĩa Hưng",
              "address": "Bến xe Nghĩa Hưng, Nam Định",
              "location": {
                "id": 43,
                "name": "Nam Định"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 228,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 76,
        "turn": false,
        "busCompanyId": 14,
        "startStation": {
          "id": 45,
          "name": "An Sương",
          "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8452543,
          "longitude": 106.6133452,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 57,
          "name": "Nghĩa Hưng",
          "address": "Bến xe Nghĩa Hưng, Nam Định",
          "location": {
            "id": 43,
            "name": "Nam Định"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 1700,
        "hours": 22.7,
        "schedule": "BX An Sương - QL22 - QL1A - QL10 - Đường Lê Đức Thọ - TL490C - BX Nghĩa Hưng",
        "stopStations": [
          {
            "id": 229,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 57,
              "name": "Nghĩa Hưng",
              "address": "Bến xe Nghĩa Hưng, Nam Định",
              "location": {
                "id": 43,
                "name": "Nam Định"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 230,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 38,
    "departure": {
      "id": 45,
      "name": "Cao Bằng"
    },
    "destination": {
      "id": 52,
      "name": "Lâm Đồng"
    },
    "parents": 0,
    "trips": [
      {
        "id": 77,
        "turn": true,
        "busCompanyId": 15,
        "startStation": {
          "id": 53,
          "name": "Liên tỉnh TP Cao Bằng",
          "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
          "location": {
            "id": 45,
            "name": "Cao Bằng"
          },
          "latitude": 22.68086165,
          "longitude": 106.20209994,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 58,
          "name": "Đức Long Bảo Lộc",
          "address": "Bến xe Đức Long Bảo Lộc, Lâm Đồng",
          "location": {
            "id": 52,
            "name": "Lâm Đồng"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 1805,
        "hours": 24.1,
        "schedule": "BX Đức Long Bảo Lộc - QL20 - QL27 - QL1A - Pháp Vân - Vành đai 3 trên cao (Đoạn Pháp Vân - Cầu Thanh Trì) - Cầu Thanh Trì - QL1 - QL3 - BX Liên tỉnh TP Cao Bằng",
        "stopStations": [
          {
            "id": 231,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 53,
              "name": "Liên tỉnh TP Cao Bằng",
              "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
              "location": {
                "id": 45,
                "name": "Cao Bằng"
              },
              "latitude": 22.68086165,
              "longitude": 106.20209994,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 232,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 58,
              "name": "Đức Long Bảo Lộc",
              "address": "Bến xe Đức Long Bảo Lộc, Lâm Đồng",
              "location": {
                "id": 52,
                "name": "Lâm Đồng"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 78,
        "turn": false,
        "busCompanyId": 15,
        "startStation": {
          "id": 58,
          "name": "Đức Long Bảo Lộc",
          "address": "Bến xe Đức Long Bảo Lộc, Lâm Đồng",
          "location": {
            "id": 52,
            "name": "Lâm Đồng"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 53,
          "name": "Liên tỉnh TP Cao Bằng",
          "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
          "location": {
            "id": 45,
            "name": "Cao Bằng"
          },
          "latitude": 22.68086165,
          "longitude": 106.20209994,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 1805,
        "hours": 24.1,
        "schedule": "BX Liên tỉnh TP Cao Bằng - QL3 - QL1 - Cầu Thanh Trì - Cầu Thanh Trì) - Vành đai 3 trên cao (Đoạn Pháp Vân - Pháp Vân - QL1A - QL27 - QL20 - BX Đức Long Bảo Lộc",
        "stopStations": [
          {
            "id": 233,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 53,
              "name": "Liên tỉnh TP Cao Bằng",
              "address": "City interprovincial bus station, Cao Bang, National Highway 3, Cao Bằng, Hòa An District, Cao Bằng Province, 21110, Vietnam",
              "location": {
                "id": 45,
                "name": "Cao Bằng"
              },
              "latitude": 22.68086165,
              "longitude": 106.20209994,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 234,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 58,
              "name": "Đức Long Bảo Lộc",
              "address": "Bến xe Đức Long Bảo Lộc, Lâm Đồng",
              "location": {
                "id": 52,
                "name": "Lâm Đồng"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 39,
    "departure": {
      "id": 53,
      "name": "Tuyên Quang"
    },
    "destination": {
      "id": 54,
      "name": "Hà Giang"
    },
    "parents": 0,
    "trips": [
      {
        "id": 79,
        "turn": true,
        "busCompanyId": 12,
        "startStation": {
          "id": 59,
          "name": "TP Tuyên Quang",
          "address": "Bến xe TP Tuyên Quang, Tuyên Quang",
          "location": {
            "id": 53,
            "name": "Tuyên Quang"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 60,
          "name": "Đồng Văn",
          "address": "Dong Van Bus Station, 3 February Road, Quyết Tiến, Quán Xín Ngài, Đồng Văn Town, Đồng Văn District, Hà Giang Province, Vietnam",
          "location": {
            "id": 54,
            "name": "Hà Giang"
          },
          "latitude": 23.27813465,
          "longitude": 105.35096316,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 6,
          "name": "limousine_33",
          "capacity": 33,
          "fee": 0,
          "description": "limousine 33 chỗ"
        },
        "price": 200000,
        "distance": 305,
        "hours": 4.1,
        "schedule": "BX Đồng Văn - QL4C - Yên Minh - Quản Bạ - Quyết Tiến - QL4C - QL2 - TP Hà Giang - QL2 - Bắc Quang - Hàm Yên - BX Tuyên Quang",
        "stopStations": [
          {
            "id": 235,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 59,
              "name": "TP Tuyên Quang",
              "address": "Bến xe TP Tuyên Quang, Tuyên Quang",
              "location": {
                "id": 53,
                "name": "Tuyên Quang"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 236,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 60,
              "name": "Đồng Văn",
              "address": "Dong Van Bus Station, 3 February Road, Quyết Tiến, Quán Xín Ngài, Đồng Văn Town, Đồng Văn District, Hà Giang Province, Vietnam",
              "location": {
                "id": 54,
                "name": "Hà Giang"
              },
              "latitude": 23.27813465,
              "longitude": 105.35096316,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 80,
        "turn": false,
        "busCompanyId": 12,
        "startStation": {
          "id": 60,
          "name": "Đồng Văn",
          "address": "Dong Van Bus Station, 3 February Road, Quyết Tiến, Quán Xín Ngài, Đồng Văn Town, Đồng Văn District, Hà Giang Province, Vietnam",
          "location": {
            "id": 54,
            "name": "Hà Giang"
          },
          "latitude": 23.27813465,
          "longitude": 105.35096316,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 59,
          "name": "TP Tuyên Quang",
          "address": "Bến xe TP Tuyên Quang, Tuyên Quang",
          "location": {
            "id": 53,
            "name": "Tuyên Quang"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 6,
          "name": "limousine_33",
          "capacity": 33,
          "fee": 0,
          "description": "limousine 33 chỗ"
        },
        "price": 200000,
        "distance": 305,
        "hours": 4.1,
        "schedule": "BX Tuyên Quang - Hàm Yên - Bắc Quang - QL2 - TP Hà Giang - QL2 - QL4C - Quyết Tiến - Quản Bạ - Yên Minh - QL4C - BX Đồng Văn",
        "stopStations": [
          {
            "id": 237,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 59,
              "name": "TP Tuyên Quang",
              "address": "Bến xe TP Tuyên Quang, Tuyên Quang",
              "location": {
                "id": 53,
                "name": "Tuyên Quang"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 238,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 60,
              "name": "Đồng Văn",
              "address": "Dong Van Bus Station, 3 February Road, Quyết Tiến, Quán Xín Ngài, Đồng Văn Town, Đồng Văn District, Hà Giang Province, Vietnam",
              "location": {
                "id": 54,
                "name": "Hà Giang"
              },
              "latitude": 23.27813465,
              "longitude": 105.35096316,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 40,
    "departure": {
      "id": 51,
      "name": "Thái Bình"
    },
    "destination": {
      "id": 55,
      "name": "Sơn La"
    },
    "parents": 0,
    "trips": [
      {
        "id": 81,
        "turn": true,
        "busCompanyId": 12,
        "startStation": {
          "id": 56,
          "name": "Huyện Tiền Hải",
          "address": "Bến xe Huyện Tiền Hải, Thái Bình",
          "location": {
            "id": 51,
            "name": "Thái Bình"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 61,
          "name": "TP Sơn La",
          "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
          "location": {
            "id": 55,
            "name": "Sơn La"
          },
          "latitude": 21.301407,
          "longitude": 103.9434431,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 6,
          "name": "limousine_33",
          "capacity": 33,
          "fee": 0,
          "description": "limousine 33 chỗ"
        },
        "price": 250000,
        "distance": 383,
        "hours": 5.1,
        "schedule": "BX Sơn La - QL6 - Vành đai 3 - QL5 - QL39 - QL10 - ĐT458 - QL37B - BX Tiền Hải",
        "stopStations": [
          {
            "id": 239,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 56,
              "name": "Huyện Tiền Hải",
              "address": "Bến xe Huyện Tiền Hải, Thái Bình",
              "location": {
                "id": 51,
                "name": "Thái Bình"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 240,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 61,
              "name": "TP Sơn La",
              "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
              "location": {
                "id": 55,
                "name": "Sơn La"
              },
              "latitude": 21.301407,
              "longitude": 103.9434431,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 82,
        "turn": false,
        "busCompanyId": 12,
        "startStation": {
          "id": 61,
          "name": "TP Sơn La",
          "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
          "location": {
            "id": 55,
            "name": "Sơn La"
          },
          "latitude": 21.301407,
          "longitude": 103.9434431,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 56,
          "name": "Huyện Tiền Hải",
          "address": "Bến xe Huyện Tiền Hải, Thái Bình",
          "location": {
            "id": 51,
            "name": "Thái Bình"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 6,
          "name": "limousine_33",
          "capacity": 33,
          "fee": 0,
          "description": "limousine 33 chỗ"
        },
        "price": 250000,
        "distance": 383,
        "hours": 5.1,
        "schedule": "BX Tiền Hải - QL37B - ĐT458 - QL10 - QL39 - QL5 - Vành đai 3 - QL6 - BX Sơn La",
        "stopStations": [
          {
            "id": 241,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 56,
              "name": "Huyện Tiền Hải",
              "address": "Bến xe Huyện Tiền Hải, Thái Bình",
              "location": {
                "id": 51,
                "name": "Thái Bình"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 242,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 61,
              "name": "TP Sơn La",
              "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
              "location": {
                "id": 55,
                "name": "Sơn La"
              },
              "latitude": 21.301407,
              "longitude": 103.9434431,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 41,
    "departure": {
      "id": 51,
      "name": "Thái Bình"
    },
    "destination": {
      "id": 46,
      "name": "Phú Thọ"
    },
    "parents": 0,
    "trips": [
      {
        "id": 83,
        "turn": true,
        "busCompanyId": 12,
        "startStation": {
          "id": 62,
          "name": "Trung tâm TP Thái Bình",
          "address": "Bến xe khách Trung tâm Thái Bình, Lý Bôn, Thái Bình, Thái Bình Province, 06118, Vietnam",
          "location": {
            "id": 51,
            "name": "Thái Bình"
          },
          "latitude": 20.44901175,
          "longitude": 106.33447339,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 54,
          "name": "Việt Trì",
          "address": "Bến xe Việt Trì, Phú Thọ",
          "location": {
            "id": 46,
            "name": "Phú Thọ"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 200,
        "hours": 2.7,
        "schedule": "BX Trung tâm TP Thái Bình - QL10 - QL21 - QL1 - Pháp Vân Cầu Giẽ - Cầu Thanh Trì - QL5 - QL2 - BX Việt Trì",
        "stopStations": [
          {
            "id": 243,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 62,
              "name": "Trung tâm TP Thái Bình",
              "address": "Bến xe khách Trung tâm Thái Bình, Lý Bôn, Thái Bình, Thái Bình Province, 06118, Vietnam",
              "location": {
                "id": 51,
                "name": "Thái Bình"
              },
              "latitude": 20.44901175,
              "longitude": 106.33447339,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 244,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 54,
              "name": "Việt Trì",
              "address": "Bến xe Việt Trì, Phú Thọ",
              "location": {
                "id": 46,
                "name": "Phú Thọ"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 84,
        "turn": false,
        "busCompanyId": 12,
        "startStation": {
          "id": 54,
          "name": "Việt Trì",
          "address": "Bến xe Việt Trì, Phú Thọ",
          "location": {
            "id": 46,
            "name": "Phú Thọ"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 62,
          "name": "Trung tâm TP Thái Bình",
          "address": "Bến xe khách Trung tâm Thái Bình, Lý Bôn, Thái Bình, Thái Bình Province, 06118, Vietnam",
          "location": {
            "id": 51,
            "name": "Thái Bình"
          },
          "latitude": 20.44901175,
          "longitude": 106.33447339,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 200,
        "hours": 2.7,
        "schedule": "BX Việt Trì - QL2 - QL5 - Cầu Thanh Trì - Pháp Vân Cầu Giẽ - QL1 - QL21 - QL10 - BX Trung tâm TP Thái Bình",
        "stopStations": [
          {
            "id": 245,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 62,
              "name": "Trung tâm TP Thái Bình",
              "address": "Bến xe khách Trung tâm Thái Bình, Lý Bôn, Thái Bình, Thái Bình Province, 06118, Vietnam",
              "location": {
                "id": 51,
                "name": "Thái Bình"
              },
              "latitude": 20.44901175,
              "longitude": 106.33447339,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 246,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 54,
              "name": "Việt Trì",
              "address": "Bến xe Việt Trì, Phú Thọ",
              "location": {
                "id": 46,
                "name": "Phú Thọ"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 42,
    "departure": {
      "id": 56,
      "name": "Lai Châu"
    },
    "destination": {
      "id": 55,
      "name": "Sơn La"
    },
    "parents": 0,
    "trips": [
      {
        "id": 85,
        "turn": true,
        "busCompanyId": 12,
        "startStation": {
          "id": 63,
          "name": "Lai Châu",
          "address": "Lai Chau Bus Station, 30 April Road, Đông Phong Ward, Tân Phong Ward, Lai Châu, Lai Châu Province, Vietnam",
          "location": {
            "id": 56,
            "name": "Lai Châu"
          },
          "latitude": 22.38275665,
          "longitude": 103.48753264,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 61,
          "name": "TP Sơn La",
          "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
          "location": {
            "id": 55,
            "name": "Sơn La"
          },
          "latitude": 21.301407,
          "longitude": 103.9434431,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 250,
        "hours": 3.3,
        "schedule": "BX Lai Châu - QL4D - QL32 - QL279 - QL6 - BX Sơn La",
        "stopStations": [
          {
            "id": 247,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 63,
              "name": "Lai Châu",
              "address": "Lai Chau Bus Station, 30 April Road, Đông Phong Ward, Tân Phong Ward, Lai Châu, Lai Châu Province, Vietnam",
              "location": {
                "id": 56,
                "name": "Lai Châu"
              },
              "latitude": 22.38275665,
              "longitude": 103.48753264,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 248,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 61,
              "name": "TP Sơn La",
              "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
              "location": {
                "id": 55,
                "name": "Sơn La"
              },
              "latitude": 21.301407,
              "longitude": 103.9434431,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 86,
        "turn": false,
        "busCompanyId": 12,
        "startStation": {
          "id": 61,
          "name": "TP Sơn La",
          "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
          "location": {
            "id": 55,
            "name": "Sơn La"
          },
          "latitude": 21.301407,
          "longitude": 103.9434431,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 63,
          "name": "Lai Châu",
          "address": "Lai Chau Bus Station, 30 April Road, Đông Phong Ward, Tân Phong Ward, Lai Châu, Lai Châu Province, Vietnam",
          "location": {
            "id": 56,
            "name": "Lai Châu"
          },
          "latitude": 22.38275665,
          "longitude": 103.48753264,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 250,
        "hours": 3.3,
        "schedule": "BX Sơn La - QL6 - QL279 - QL32 - QL4D - BX Lai Châu",
        "stopStations": [
          {
            "id": 249,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 63,
              "name": "Lai Châu",
              "address": "Lai Chau Bus Station, 30 April Road, Đông Phong Ward, Tân Phong Ward, Lai Châu, Lai Châu Province, Vietnam",
              "location": {
                "id": 56,
                "name": "Lai Châu"
              },
              "latitude": 22.38275665,
              "longitude": 103.48753264,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 250,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 61,
              "name": "TP Sơn La",
              "address": "Son La Bus Station, Đường Lê Duẩn, Sơn La, Sơn La Province, Vietnam",
              "location": {
                "id": 55,
                "name": "Sơn La"
              },
              "latitude": 21.301407,
              "longitude": 103.9434431,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 43,
    "departure": {
      "id": 37,
      "name": "TP. Hồ Chí Minh"
    },
    "destination": {
      "id": 57,
      "name": "Bà Rịa - Vũng Tàu"
    },
    "parents": 0,
    "trips": [
      {
        "id": 87,
        "turn": true,
        "busCompanyId": 11,
        "startStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 64,
          "name": "Vǜng Tàu",
          "address": "Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
          "location": {
            "id": 57,
            "name": "Bà Rịa - Vũng Tàu"
          },
          "latitude": 10.3503363,
          "longitude": 107.0871552,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 7,
          "name": "bus_20",
          "capacity": 20,
          "fee": 50000,
          "description": "Xe khách 20 chỗ"
        },
        "price": 100000,
        "distance": 123,
        "hours": 1.6,
        "schedule": "BX Vǜng Tàu - Nam KǶ Khởi Nghĩa - Lê Hồng Phong - QL51 - QL1A - Kinh Dương Võ Văn Kiệt - BX Miền Tây",
        "stopStations": [
          {
            "id": 251,
            "arrivalTime": 1,
            "stationType": "Trạm đón",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 252,
            "arrivalTime": 2,
            "stationType": "Trạm trả",
            "station": {
              "id": 64,
              "name": "Vǜng Tàu",
              "address": "Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.3503363,
              "longitude": 107.0871552,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": false
      },
      {
        "id": 88,
        "turn": false,
        "busCompanyId": 11,
        "startStation": {
          "id": 64,
          "name": "Vǜng Tàu",
          "address": "Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
          "location": {
            "id": 57,
            "name": "Bà Rịa - Vũng Tàu"
          },
          "latitude": 10.3503363,
          "longitude": 107.0871552,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 42,
          "name": "Miền Tây",
          "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.7401271,
          "longitude": 106.61940059,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 7,
          "name": "bus_20",
          "capacity": 20,
          "fee": 50000,
          "description": "Xe khách 20 chỗ"
        },
        "price": 100000,
        "distance": 123,
        "hours": 1.6,
        "schedule": "BX Miền Tây - Kinh Dương Võ Văn Kiệt - QL1A - QL51 - Lê Hồng Phong - Nam KǶ Khởi Nghĩa - BX Vǜng Tàu",
        "stopStations": [
          {
            "id": 253,
            "arrivalTime": 2,
            "stationType": "Trạm trả",
            "station": {
              "id": 42,
              "name": "Miền Tây",
              "address": "Bến xe Miền Tây, Đường Kinh Dương Vương, An Lac A Ward, Binh Tan District, Ho Chi Minh City, 73118, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.7401271,
              "longitude": 106.61940059,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 254,
            "arrivalTime": 1,
            "stationType": "Trạm đón",
            "station": {
              "id": 64,
              "name": "Vǜng Tàu",
              "address": "Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.3503363,
              "longitude": 107.0871552,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": false
      },
      {
        "id": 101,
        "turn": true,
        "busCompanyId": 11,
        "startStation": {
          "id": 45,
          "name": "An Sương",
          "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8452543,
          "longitude": 106.6133452,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 75,
          "name": "Xuyên Mộc",
          "address": "Bến xe khách Xuyên Mộc, Xuyên Phước Cơ, Thạnh Sơn 1A, Xóm Rẫy, Phuoc Thuan Commune, Xuyên Mộc District, Bà Rịa - Vũng Tàu Province, Vietnam",
          "location": {
            "id": 57,
            "name": "Bà Rịa - Vũng Tàu"
          },
          "latitude": 10.5325363,
          "longitude": 107.39265166,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 7,
          "name": "bus_20",
          "capacity": 20,
          "fee": 50000,
          "description": "Xe khách 20 chỗ"
        },
        "price": 150000,
        "distance": 120,
        "hours": 1.6,
        "schedule": "BX Xuyên Mộc - QL55 - QL51 - QL1 - QL22 - BX An Sương",
        "stopStations": [
          {
            "id": 285,
            "arrivalTime": 2,
            "stationType": "Trạm đón",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 286,
            "arrivalTime": 6,
            "stationType": "Trạm trả",
            "station": {
              "id": 75,
              "name": "Xuyên Mộc",
              "address": "Bến xe khách Xuyên Mộc, Xuyên Phước Cơ, Thạnh Sơn 1A, Xóm Rẫy, Phuoc Thuan Commune, Xuyên Mộc District, Bà Rịa - Vũng Tàu Province, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.5325363,
              "longitude": 107.39265166,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 289,
            "arrivalTime": 1,
            "stationType": "Bãi đỗ xe đầu",
            "station": {
              "id": 73,
              "name": "Bãi đỗ xe Châu An, Tân Phú",
              "address": "Đường Số 138, Topaz Mansion, Tan Phu Ward, Thủ Đức, Ho Chi Minh City, 71216, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8618342,
              "longitude": 106.80828903,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 292,
            "arrivalTime": 7,
            "stationType": "Bãi đỗ xe cuối",
            "station": {
              "id": 76,
              "name": "Bãi đỗ xe Toàn Thắng",
              "address": "Toàn Thắng, Trưng Trắc, Front Beach, Ward 1, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.34818194,
              "longitude": 107.07580229,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 295,
            "arrivalTime": 4,
            "stationType": "Trạm dừng chân",
            "station": {
              "id": 77,
              "name": "Trạm dừng chân km237",
              "address": "Trạm dừng chân km237, Hanoi - Lao Cai Expressway, Bao Thang District, Lào Cai Province, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 22.3636242,
              "longitude": 104.08223261,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 297,
            "arrivalTime": 3,
            "stationType": "Trạm đón",
            "station": {
              "id": 47,
              "name": "Ngã Tư Ga",
              "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8623238,
              "longitude": 106.67872,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 300,
            "arrivalTime": 5,
            "stationType": "Trạm trả",
            "station": {
              "id": 64,
              "name": "Vǜng Tàu",
              "address": "Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.3503363,
              "longitude": 107.0871552,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 102,
        "turn": false,
        "busCompanyId": 11,
        "startStation": {
          "id": 75,
          "name": "Xuyên Mộc",
          "address": "Bến xe khách Xuyên Mộc, Xuyên Phước Cơ, Thạnh Sơn 1A, Xóm Rẫy, Phuoc Thuan Commune, Xuyên Mộc District, Bà Rịa - Vũng Tàu Province, Vietnam",
          "location": {
            "id": 57,
            "name": "Bà Rịa - Vũng Tàu"
          },
          "latitude": 10.5325363,
          "longitude": 107.39265166,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 45,
          "name": "An Sương",
          "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
          "location": {
            "id": 37,
            "name": "TP. Hồ Chí Minh"
          },
          "latitude": 10.8452543,
          "longitude": 106.6133452,
          "busCompanyId": null,
          "active": true
        },
        "busType": {
          "id": 7,
          "name": "bus_20",
          "capacity": 20,
          "fee": 50000,
          "description": "Xe khách 20 chỗ",
          "image": "https://vexe.workon.spacenull"
        },
        "price": 150000,
        "distance": 120,
        "hours": 1.6,
        "schedule": "BX An Sương - QL22 - QL1 - QL51 - QL55 - BX Xuyên Mộc",
        "stopStations": [
          {
            "id": 287,
            "arrivalTime": 6,
            "stationType": "Trạm trả",
            "station": {
              "id": 45,
              "name": "An Sương",
              "address": "Bến xe An Sương, Quốc lộ 22, Ba Diem Commune, Hoc Mon District, Ho Chi Minh City, 71507, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8452543,
              "longitude": 106.6133452,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 288,
            "arrivalTime": 2,
            "stationType": "Trạm đón",
            "station": {
              "id": 75,
              "name": "Xuyên Mộc",
              "address": "Bến xe khách Xuyên Mộc, Xuyên Phước Cơ, Thạnh Sơn 1A, Xóm Rẫy, Phuoc Thuan Commune, Xuyên Mộc District, Bà Rịa - Vũng Tàu Province, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.5325363,
              "longitude": 107.39265166,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 290,
            "arrivalTime": 7,
            "stationType": "Bãi đỗ xe cuối",
            "station": {
              "id": 73,
              "name": "Bãi đỗ xe Châu An, Tân Phú",
              "address": "Đường Số 138, Topaz Mansion, Tan Phu Ward, Thủ Đức, Ho Chi Minh City, 71216, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8618342,
              "longitude": 106.80828903,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 291,
            "arrivalTime": 1,
            "stationType": "Bãi đỗ xe đầu",
            "station": {
              "id": 76,
              "name": "Bãi đỗ xe Toàn Thắng",
              "address": "Toàn Thắng, Trưng Trắc, Front Beach, Ward 1, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.34818194,
              "longitude": 107.07580229,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 296,
            "arrivalTime": 4,
            "stationType": "Trạm dừng chân",
            "station": {
              "id": 77,
              "name": "Trạm dừng chân km237",
              "address": "Trạm dừng chân km237, Hanoi - Lao Cai Expressway, Bao Thang District, Lào Cai Province, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 22.3636242,
              "longitude": 104.08223261,
              "busCompanyId": 11,
              "active": true
            },
            "active": true
          },
          {
            "id": 298,
            "arrivalTime": 5,
            "stationType": "Trạm trả",
            "station": {
              "id": 47,
              "name": "Ngã Tư Ga",
              "address": "Bến xe Ngã tư Ga, Quốc lộ 1, Phường Thạnh Lộc, District 12, Ho Chi Minh City, 71514, Vietnam",
              "location": {
                "id": 37,
                "name": "TP. Hồ Chí Minh"
              },
              "latitude": 10.8623238,
              "longitude": 106.67872,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 299,
            "arrivalTime": 3,
            "stationType": "Trạm đón",
            "station": {
              "id": 64,
              "name": "Vǜng Tàu",
              "address": "Bến xe Vũng Tàu, 192, Nam Kỳ Khởi Nghĩa, Khu phố 2, Ward 3, Vũng Tàu, Bà Rịa - Vũng Tàu Province, 78207, Vietnam",
              "location": {
                "id": 57,
                "name": "Bà Rịa - Vũng Tàu"
              },
              "latitude": 10.3503363,
              "longitude": 107.0871552,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 44,
    "departure": {
      "id": 50,
      "name": "Quảng Ninh"
    },
    "destination": {
      "id": 58,
      "name": "Thái Nguyên"
    },
    "parents": 0,
    "trips": [
      {
        "id": 89,
        "turn": true,
        "busCompanyId": 16,
        "startStation": {
          "id": 65,
          "name": "Móng Cái",
          "address": "Mong Cai Coach Terminal, Phạm Ngũ Lão, Quarter 2, Ka Long Ward, Móng Cái, Quảng Ninh Province, 02033, Vietnam",
          "location": {
            "id": 50,
            "name": "Quảng Ninh"
          },
          "latitude": 21.5303716,
          "longitude": 107.95833081,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 66,
          "name": "Phú Bình",
          "address": "Bến xe Phú Bình, Thái Nguyên",
          "location": {
            "id": 58,
            "name": "Thái Nguyên"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 370,
        "hours": 4.9,
        "schedule": "BX Móng Cái - QL18 - Sao Đỏ - Bắc Ninh - QL1 - QL37 - BX Phú Bình",
        "stopStations": [
          {
            "id": 255,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 65,
              "name": "Móng Cái",
              "address": "Mong Cai Coach Terminal, Phạm Ngũ Lão, Quarter 2, Ka Long Ward, Móng Cái, Quảng Ninh Province, 02033, Vietnam",
              "location": {
                "id": 50,
                "name": "Quảng Ninh"
              },
              "latitude": 21.5303716,
              "longitude": 107.95833081,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 256,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 66,
              "name": "Phú Bình",
              "address": "Bến xe Phú Bình, Thái Nguyên",
              "location": {
                "id": 58,
                "name": "Thái Nguyên"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 90,
        "turn": false,
        "busCompanyId": 16,
        "startStation": {
          "id": 66,
          "name": "Phú Bình",
          "address": "Bến xe Phú Bình, Thái Nguyên",
          "location": {
            "id": 58,
            "name": "Thái Nguyên"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 65,
          "name": "Móng Cái",
          "address": "Mong Cai Coach Terminal, Phạm Ngũ Lão, Quarter 2, Ka Long Ward, Móng Cái, Quảng Ninh Province, 02033, Vietnam",
          "location": {
            "id": 50,
            "name": "Quảng Ninh"
          },
          "latitude": 21.5303716,
          "longitude": 107.95833081,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 370,
        "hours": 4.9,
        "schedule": "BX Phú Bình - QL37 - QL1 - Bắc Ninh - Sao Đỏ - QL18 - BX Móng Cái",
        "stopStations": [
          {
            "id": 257,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 65,
              "name": "Móng Cái",
              "address": "Mong Cai Coach Terminal, Phạm Ngũ Lão, Quarter 2, Ka Long Ward, Móng Cái, Quảng Ninh Province, 02033, Vietnam",
              "location": {
                "id": 50,
                "name": "Quảng Ninh"
              },
              "latitude": 21.5303716,
              "longitude": 107.95833081,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 258,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 66,
              "name": "Phú Bình",
              "address": "Bến xe Phú Bình, Thái Nguyên",
              "location": {
                "id": 58,
                "name": "Thái Nguyên"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 45,
    "departure": {
      "id": 59,
      "name": "Thanh Hoá"
    },
    "destination": {
      "id": 60,
      "name": "Bắc Giang"
    },
    "parents": 0,
    "trips": [
      {
        "id": 91,
        "turn": true,
        "busCompanyId": 12,
        "startStation": {
          "id": 67,
          "name": "Huyên Hồng",
          "address": "Bến xe Huyên Hồng, Thanh Hoá",
          "location": {
            "id": 59,
            "name": "Thanh Hoá"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 68,
          "name": "Bắc Giang",
          "address": "Bến xe Bắc Giang, Bắc Giang",
          "location": {
            "id": 60,
            "name": "Bắc Giang"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 230,
        "hours": 3.1,
        "schedule": "BX Huyên Hồng - QL47 - TP Thanh Hóa (Theo phân luồng của TP) - QL1A - Cao tốc Ninh Bình - Vành đai 3 trên cao - Cầu Thanh Trì - Cao tốc Hà Nội Bắc Giang - QL17 - ĐT295B - Đường Thân Nhân Trung - Đường Xương Giang - BX Bắc Giang",
        "stopStations": [
          {
            "id": 259,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 67,
              "name": "Huyên Hồng",
              "address": "Bến xe Huyên Hồng, Thanh Hoá",
              "location": {
                "id": 59,
                "name": "Thanh Hoá"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 260,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 68,
              "name": "Bắc Giang",
              "address": "Bến xe Bắc Giang, Bắc Giang",
              "location": {
                "id": 60,
                "name": "Bắc Giang"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 92,
        "turn": false,
        "busCompanyId": 12,
        "startStation": {
          "id": 68,
          "name": "Bắc Giang",
          "address": "Bến xe Bắc Giang, Bắc Giang",
          "location": {
            "id": 60,
            "name": "Bắc Giang"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 67,
          "name": "Huyên Hồng",
          "address": "Bến xe Huyên Hồng, Thanh Hoá",
          "location": {
            "id": 59,
            "name": "Thanh Hoá"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 230,
        "hours": 3.1,
        "schedule": "BX Bắc Giang - Đường Xương Giang - Đường Thân Nhân Trung - ĐT295B - QL17 - Cao tốc Hà Nội Bắc Giang - Cầu Thanh Trì - Vành đai 3 trên cao - Cao tốc Ninh Bình - QL1A - TP Thanh Hóa (Theo phân luồng của TP) - QL47 - BX Huyên Hồng",
        "stopStations": [
          {
            "id": 261,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 67,
              "name": "Huyên Hồng",
              "address": "Bến xe Huyên Hồng, Thanh Hoá",
              "location": {
                "id": 59,
                "name": "Thanh Hoá"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 262,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 68,
              "name": "Bắc Giang",
              "address": "Bến xe Bắc Giang, Bắc Giang",
              "location": {
                "id": 60,
                "name": "Bắc Giang"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  },
  {
    "id": 46,
    "departure": {
      "id": 42,
      "name": "Hà Nội"
    },
    "destination": {
      "id": 61,
      "name": "Quảng Trị"
    },
    "parents": 0,
    "trips": [
      {
        "id": 93,
        "turn": true,
        "busCompanyId": 12,
        "startStation": {
          "id": 69,
          "name": "Nước Ngầm",
          "address": "Bến xe Nước Ngầm, Đường Ngọc Hồi, Phường Hoàng Liệt, Hoang Mai District, Hà Nội, 11718, Vietnam",
          "location": {
            "id": 42,
            "name": "Hà Nội"
          },
          "latitude": 20.9647577,
          "longitude": 105.8422383,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 70,
          "name": "Lao Bảo",
          "address": "Bến xe Lao Bảo, Quảng Trị",
          "location": {
            "id": 61,
            "name": "Quảng Trị"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 600,
        "hours": 8,
        "schedule": "BX Lao Bảo - QL9 - Đường Hồ Chí Minh - Ngã Tư Sòng - QL1 - BX Nước Ngầm",
        "stopStations": [
          {
            "id": 263,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 69,
              "name": "Nước Ngầm",
              "address": "Bến xe Nước Ngầm, Đường Ngọc Hồi, Phường Hoàng Liệt, Hoang Mai District, Hà Nội, 11718, Vietnam",
              "location": {
                "id": 42,
                "name": "Hà Nội"
              },
              "latitude": 20.9647577,
              "longitude": 105.8422383,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 264,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 70,
              "name": "Lao Bảo",
              "address": "Bến xe Lao Bảo, Quảng Trị",
              "location": {
                "id": 61,
                "name": "Quảng Trị"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      },
      {
        "id": 94,
        "turn": false,
        "busCompanyId": 12,
        "startStation": {
          "id": 70,
          "name": "Lao Bảo",
          "address": "Bến xe Lao Bảo, Quảng Trị",
          "location": {
            "id": 61,
            "name": "Quảng Trị"
          },
          "latitude": 0,
          "longitude": 0,
          "busCompanyId": null,
          "active": true
        },
        "endStation": {
          "id": 69,
          "name": "Nước Ngầm",
          "address": "Bến xe Nước Ngầm, Đường Ngọc Hồi, Phường Hoàng Liệt, Hoang Mai District, Hà Nội, 11718, Vietnam",
          "location": {
            "id": 42,
            "name": "Hà Nội"
          },
          "latitude": 20.9647577,
          "longitude": 105.8422383,
          "busCompanyId": null,
          "active": true
        },
        "busType": null,
        "price": 0,
        "distance": 600,
        "hours": 8,
        "schedule": "BX Nước Ngầm - QL1 - Ngã Tư Sòng - Đường Hồ Chí Minh - QL9 - BX Lao Bảo",
        "stopStations": [
          {
            "id": 265,
            "arrivalTime": 0,
            "stationType": "Trạm trả",
            "station": {
              "id": 69,
              "name": "Nước Ngầm",
              "address": "Bến xe Nước Ngầm, Đường Ngọc Hồi, Phường Hoàng Liệt, Hoang Mai District, Hà Nội, 11718, Vietnam",
              "location": {
                "id": 42,
                "name": "Hà Nội"
              },
              "latitude": 20.9647577,
              "longitude": 105.8422383,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          },
          {
            "id": 266,
            "arrivalTime": 0,
            "stationType": "Trạm đón",
            "station": {
              "id": 70,
              "name": "Lao Bảo",
              "address": "Bến xe Lao Bảo, Quảng Trị",
              "location": {
                "id": 61,
                "name": "Quảng Trị"
              },
              "latitude": 0,
              "longitude": 0,
              "busCompanyId": null,
              "active": true
            },
            "active": true
          }
        ],
        "active": true
      }
    ],
    "active": true
  }
]
'''

result_string = convert_json_to_string(json_string)
print(result_string)