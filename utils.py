import pymysql


def get_conn():
    conn = pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="12345678",
        db="restaurant",
        charset="utf8")

    cursor = conn.cursor()
    return conn, cursor


def close_conn(conn, cursor):
    cursor.close()
    conn.close()


def query(sql, *args):
    conn, cursor = get_conn()
    cursor.execute(sql, args)
    res = cursor.fetchall()
    close_conn(conn, cursor)
    return res

def get_t1_data():
    sql = 'select shopname, num_comments from restaurant ORDER BY num_comments DESC limit 10'
    res = query(sql)

    return res

def get_t2_data():
    sql = 'select cost, COUNT(cost) FROM restaurant group by cost'
    res = query(sql)

    return res

def get_t3_data():
    sql = 'select point_comments,num_comments FROM restaurant order by num_comments DESC '
    res = query(sql)

    return res

def get_t4_1_data():
    sql = "SELECT * from (SELECT SUBSTRING_INDEX(food_type,'、', 1) AS food, COUNT(SUBSTRING_INDEX(food_type,'、', 1)) as " \
          "res FROM restaurant GROUP BY food ORDER BY res DESC LIMIT 10) as tem ORDER BY food; "
    res = query(sql)

    return res

def get_t4_2_data():
    sql = "SELECT SUBSTRING_INDEX(food_type,'、', 1), COUNT(SUBSTRING_INDEX(food_type,'、', 1)) FROM restaurant where area = 'Manhattan' AND SUBSTRING_INDEX(food_type,'、', 1) in (SELECT tem.* from (SELECT SUBSTRING_INDEX(food_type,'、', 1) AS food FROM restaurant GROUP BY food ORDER BY COUNT(food) DESC LIMIT 10) AS tem ) GROUP BY SUBSTRING_INDEX(food_type,'、', 1)  ORDER BY SUBSTRING_INDEX(food_type,'、', 1)"
    res = query(sql)

    return res
def get_t4_3_data():
    sql = "SELECT SUBSTRING_INDEX(food_type,'、', 1), COUNT(SUBSTRING_INDEX(food_type,'、', 1)) FROM restaurant where area = 'Brooklyn' AND SUBSTRING_INDEX(food_type,'、', 1) in (SELECT tem.* from (SELECT SUBSTRING_INDEX(food_type,'、', 1) AS food FROM restaurant GROUP BY food ORDER BY COUNT(food) DESC LIMIT 10) AS tem ) GROUP BY SUBSTRING_INDEX(food_type,'、', 1)  ORDER BY SUBSTRING_INDEX(food_type,'、', 1)"
    res = query(sql)

    return res

def get_t4_4_data():
    sql = "SELECT SUBSTRING_INDEX(food_type,'、', 1), COUNT(SUBSTRING_INDEX(food_type,'、', 1)) FROM restaurant where area = 'Bronx' AND SUBSTRING_INDEX(food_type,'、', 1) in (SELECT tem.* from (SELECT SUBSTRING_INDEX(food_type,'、', 1) AS food FROM restaurant GROUP BY food ORDER BY COUNT(food) DESC LIMIT 10) AS tem ) GROUP BY SUBSTRING_INDEX(food_type,'、', 1)  ORDER BY SUBSTRING_INDEX(food_type,'、', 1)"
    res = query(sql)

    return res

def get_t4_5_data():
    sql = "SELECT SUBSTRING_INDEX(food_type,'、', 1), COUNT(SUBSTRING_INDEX(food_type,'、', 1)) FROM restaurant where area = 'Queen' AND SUBSTRING_INDEX(food_type,'、', 1) in (SELECT tem.* from (SELECT SUBSTRING_INDEX(food_type,'、', 1) AS food FROM restaurant GROUP BY food ORDER BY COUNT(food) DESC LIMIT 10) AS tem ) GROUP BY SUBSTRING_INDEX(food_type,'、', 1)  ORDER BY SUBSTRING_INDEX(food_type,'、', 1)"
    res = query(sql)

    return res

def get_t4_6_data():
    sql = "SELECT SUBSTRING_INDEX(food_type,'、', 1), COUNT(SUBSTRING_INDEX(food_type,'、', 1)) FROM restaurant where area = 'Staten Island' AND SUBSTRING_INDEX(food_type,'、', 1) in (SELECT tem.* from (SELECT SUBSTRING_INDEX(food_type,'、', 1) AS food FROM restaurant GROUP BY food ORDER BY COUNT(food) DESC LIMIT 10) AS tem ) GROUP BY SUBSTRING_INDEX(food_type,'、', 1)  ORDER BY SUBSTRING_INDEX(food_type,'、', 1)"
    res = query(sql)

    return res

def get_t5_data():
    sql = "SELECT area, COUNT(area) FROM (SELECT * FROM restaurant ORDER BY num_comments DESC LIMIT 500)AS tem GROUP BY area "
    res = query(sql)

    return res

def get_t6_1_data():
    sql = "SELECT DISTINCT restaurant.point_comments, IFNULL(t.num,0) from restaurant LEFT JOIN (SELECT point_comments, COUNT(point_comments) num FROM restaurant WHERE area = 'Manhattan' GROUP BY point_comments) t on restaurant.point_comments = t.point_comments ORDER BY point_comments desc LIMIT 6"
    res = query(sql)

    return res

def get_t6_2_data():
    sql = "SELECT DISTINCT restaurant.point_comments, IFNULL(t.num,0) from restaurant LEFT JOIN (SELECT point_comments, COUNT(point_comments) num FROM restaurant WHERE area = 'Brooklyn' GROUP BY point_comments) t on restaurant.point_comments = t.point_comments ORDER BY point_comments desc LIMIT 6"
    res = query(sql)

    return res

def get_t6_3_data():
    sql = "SELECT DISTINCT restaurant.point_comments, IFNULL(t.num,0) from restaurant LEFT JOIN (SELECT point_comments, COUNT(point_comments) num FROM restaurant WHERE area = 'Bronx' GROUP BY point_comments) t on restaurant.point_comments = t.point_comments ORDER BY point_comments desc LIMIT 6 "
    res = query(sql)

    return res

def get_t6_4_data():
    sql = "SELECT DISTINCT restaurant.point_comments, IFNULL(t.num,0) from restaurant LEFT JOIN (SELECT point_comments, COUNT(point_comments) num FROM restaurant WHERE area = 'Queen' GROUP BY point_comments) t on restaurant.point_comments = t.point_comments ORDER BY point_comments desc LIMIT 6"
    res = query(sql)

    return res

def get_t6_5_data():
    sql = "SELECT DISTINCT restaurant.point_comments, IFNULL(t.num,0) from restaurant LEFT JOIN (SELECT point_comments, COUNT(point_comments) num FROM restaurant WHERE area = 'Staten Island' GROUP BY point_comments) t on restaurant.point_comments = t.point_comments ORDER BY point_comments desc LIMIT 6"
    res = query(sql)

    return res



def get_m1_data():
    sql = "SELECT shopname,lat,lng,image,num_comments,point_comments,cost,food_type,location,service,time FROM restaurant_Geo"
    res = query(sql)

    return res

def get_m2_data():
    sql = "SELECT shopname,lat,lng,image,num_comments,point_comments,cost,food_type FROM restaurant_Geo where delivery = 'true'"
    res = query(sql)

    return res

def get_m3_data():
    sql = "SELECT shopname,lat,lng,image,num_comments,point_comments,cost,food_type FROM restaurant_Geo where takeout = 'true'"
    res = query(sql)

    return res


if __name__ == "__main__":
    print(get_t3_data())