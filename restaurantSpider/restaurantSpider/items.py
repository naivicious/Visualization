# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class RestaurantspiderItem(scrapy.Item):
    pass



class Restaurant(scrapy.Item):
    shopname = scrapy.Field()
    num_comments = scrapy.Field()
    point_comments = scrapy.Field()
    phone_num = scrapy.Field()
    cost = scrapy.Field()
    food_type = scrapy.Field()
    district_name = scrapy.Field()
    location = scrapy.Field()
    area = scrapy.Field()
    href = scrapy.Field()
    time = scrapy.Field()
    service = scrapy.Field()
    delivery = scrapy.Field()
    takeout = scrapy.Field()
    image = scrapy.Field()


class Review(scrapy.Item):
    name = scrapy.Field()
    location = scrapy.Field()
    time = scrapy.Field()
    reviews = scrapy.Field()
    attitude = scrapy.Field()
    shopname = scrapy.Field()

