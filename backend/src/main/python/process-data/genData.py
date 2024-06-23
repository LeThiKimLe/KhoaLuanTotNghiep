id = 1
list_data = []

for id in range(625, 731):
    insert_query = f"INSERT INTO `quanlynhaxe`.`transportation_order` (`schedule_id`, `status`, `create_time`, `update_time`, `image`) VALUES ('{id}', 'Đã hoàn thành', '2024-06-12 06:11:30', '2024-06-08 20:54:44', '/api/static/images/1717854862479-ASSD_Tuan3.png_20110248.png');"
    # write to file out.txt
    list_data.append(insert_query)  

with open("out.txt", "a", 2, "utf-8") as f:
    for data in list_data:
        f.write(data + "\n")