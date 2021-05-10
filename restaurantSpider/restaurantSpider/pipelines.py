# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


from restaurantSpider.settings import MYSQL_URI, MYSQL_DATABASE
import pymysql.cursors


class MysqlPipeline(object):
    def __init__(self):
        self.mysql_url = MYSQL_URI
        self.mysql_db = MYSQL_DATABASE

    def open_spider(self, spider):
        self.mysql_conn = pymysql.connect(
            host=self.mysql_url,
            user="root",
            db=self.mysql_db,
            password="12345678",
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )

    def process_item(self, item, spider):

        try:
            with self.mysql_conn.cursor() as cursor:
                #sql_search = "SELECT * FROM `restaurant_island2` WHERE `shopname`=%s"
                sql_search = "SELECT * FROM `review` WHERE `name`=%s"

                cursor.execute(sql_search, item.get("shopname", ""))

                #cursor.execute(sql_search, item.get("name", ""))

                textIsExist = cursor.fetchone()

                if textIsExist is None:
                    #sql_write = "INSERT INTO `restaurant_island2` (`shopname`,`num_comments`,`point_comments`,`cost`,`food_type`,`phone_num`, `district_name`, `location`, `area`, `time`, `service`, `delivery`, `takeout`,`image`) VALUES (%s, %s, %s, %s,%s, %s, %s, %s, %s,%s, %s, %s, %s, %s)"
                    sql_write = "INSERT INTO `review` (`name`,`location`,`time`,`reviews`,`attitude`,`shopname`) VALUES (%s, %s, %s, %s,%s,%s)"
                    cursor.execute(sql_write, (item.get("name", ""), item.get("location", ""), item.get("time", ""), item.get("reviews", ""), item.get("attitude", ""), item.get("shopname", "")))


                    #cursor.execute(sql_write, (item.get("shopname", ""), item.get("num_comments", ""), item.get("point_comments", ""), item.get("cost", ""), item.get("food_type", ""), item.get("phone_num", ""), item.get("district_name", ""), item.get("location", ""), item.get("area", ""), item.get("time", ""), item.get("service", ""), item.get("delivery", ""), item.get("takeout", ""),item.get("image", "")))

                    #review_id = cursor.lastrowid
                    #print(review_id)
                    restaurant_id = cursor.lastrowid
                    print(restaurant_id)

            self.mysql_conn.commit()
        except Exception as e:
            pass

        return item

    def close_spider(self, spider):
        self.mysql_conn.close()
