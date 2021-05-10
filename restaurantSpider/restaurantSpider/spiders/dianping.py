# -*- coding:utf-8 -*-
import scrapy
from scrapy.selector import Selector
import re
from scrapy import Request
from restaurantSpider.items import Restaurant
from restaurantSpider.items import Review
from copy import deepcopy

class DianpingSpider(scrapy.Spider):
    name = 'dianping'
    allowed_domains = ['yelp.com']
    start_urls = [
        'https://www.yelp.com/biz/ippudo-ny-new-york-7'  ]

    #headers ={
    #    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'
    #}

    #def start_requests(self):
        #url = 'https://www.yelp.com/search?find_desc=&find_loc=New%20York%2C%20NY&ns=1&l=p%3ANY%3ANew_York%3AStaten_Island%3A%5BAnnadale%2CArden_Heights%2CArlington%2CArrochar%2CBay_Terrace%2CBloomfield%2CBullshead%2CCastleton_Corners%2CCharleston%2CChelsea%2CClifton%2CConcord%2CDongan_Hills%2CElm_Park%2CEltingville%2CEmerson_Hill%2CGraniteville%2CGrant_City%2CGrasmere%2CGreat_Kills%2CGrymes_Hill%2CHeartland_Village%2CHowland_Hook%2CHuguenot%2CLighthouse_Hill%2CMariner%2CMidland_Beach%2CNew_Brighton%2CNew_Dorp%2CNew_Dorp_Beach%2CNew_Springville%2COakwood%2COld_Town%2CPark_Hill%2CPleasant_Plains%2CPort_Richmond%2CPrinces_Bay%2CRandall_Manor%2CRichmond_Town%2CRichmond_Valley%2CRosebank%2CRossville%2CShore_Acres%2CSilver_Lake%2CSt._George%2CStapleton%2CSunnyside%2CTodt_Hill%2CTompkinsville%2CTottenville%2CWest_Brighton%2CWesterleigh%2CWoodrow%5D&sortby=review_count&start=0'
        #yield Request(url, headers=self.headers)


    def parse(self, response):

        sites = response.xpath('//li[@class=" border-color--default__09f24__1eOdn"][position()>7 and position()<19]/div/div/div')
        restaurant = Restaurant()
       # images =response.xpath('//li[@class=" border-color--default__09f24__1eOdn"]/div/div/div/div[1]/div/div/div/div/div/div[1]')


        for site in sites:
            shopname = site.xpath('div[2]/div[1]/div/div[1]/div/div[1]/div/div/h4/span/a/text()').extract()
            restaurant["shopname"] = shopname

            num_comments = site.xpath('div[2]/div[1]/div/div[1]/div/div[2]/div/div/div[2]/span/text()').extract()
            restaurant["num_comments"] = num_comments

            point_comments = site.xpath('div[2]/div[1]/div/div[1]/div/div[2]/div/div/div[1]/span/div/@aria-label').extract()
            restaurant["point_comments"] = point_comments

            phone_num = site.xpath('div[2]/div[1]/div/div[2]/div/div[1]/div/div/p/text()').extract()
            if len(phone_num):
                restaurant["phone_num"] = phone_num
            else:
                restaurant["phone_num"] = 'Unknown'

            cost = site.xpath('div[2]/div[1]/div/div[1]/div/div[3]/div/div/div/span/span[1]/span/text()').extract()

            if len(cost):
                if(cost[0] == '$$'):
                    restaurant["cost"] = 'Medium'
                if(cost[0] == '$$$'):
                    restaurant["cost"] = 'High'
                if (cost[0] == '$'):
                    restaurant["cost"] = 'Low'
                if (cost[0] == '$$$$'):
                    restaurant["cost"] = 'Very High'
            else:
                restaurant["cost"] = 'Unknown'
            food_type = site.xpath('div[2]/div[1]/div/div[1]/div/div[3]/div/div/div//span[2]/span/span/a/text()').extract()
            restaurant["food_type"] = "、 ".join(food_type)

            district_name = site.xpath('div[2]/div[1]/div/div[2]/div/div[2]/div/div/div/p/text()').extract()
            if len(district_name):
                restaurant["district_name"] = district_name
            else:
                restaurant["district_name"] = 'Unknown'

            location = site.xpath('div[2]/div[1]/div/div[2]/div/address/div/div/div/p/span/text()').extract()
            restaurant["location"] = location

            restaurant["area"] = 'Staten Island'

            image = site.xpath('div[1]/div/div/div/div/div/div[1]/div/a/img/@src').extract()
            restaurant["image"] = image

            href = site.xpath('div[2]/div[1]/div/div[1]/div/div[1]/div/div/h4/span/a/@href').extract_first()


            if('/biz' not in href):
                continue;
            else:
                restaurant["href"] = "https://www.yelp.com" + href



                yield scrapy.Request(
                    restaurant["href"],
                    callback=self.parse_restaurant_detail,
                    meta = {"restaurant": deepcopy(restaurant)},
                    dont_filter = True
            )
            
    def parse_restaurant_detail(self,response):

        restaurant = response.meta["restaurant"]
        time = response.xpath('//*[@id="wrap"]/div[3]/yelp-react-root/div/div[2]/div[1]/div[1]/div/div/div[3]/div[1]/div/div/span[2]/span/text()').extract()
        restaurant['time'] = time
        service = response.xpath('//*[@id="wrap"]/div[3]/yelp-react-root/div/div[3]/div/div/div[2]/div/div[1]/section[1]/div[2]/div[1]/div/div/span/text()').extract()
        restaurant["service"] = "、".join(service)
        if( "Delivery" in service):
            restaurant["delivery"] = 'true'
        else:
            restaurant["delivery"] = 'false'

        if( "Takeout" in service):
            restaurant["takeout"] = 'true'
        else:
            restaurant["takeout"] = 'false'

        yield restaurant

        '''

        sites = response.xpath('//*[@id="wrap"]/div[3]/yelp-react-root/div/div[3]/div/div/div[2]/div/div[1]/div[2]//div[2]/div/ul/li[1]/div/div[1]/div/div[1]/div/div/div[2]/div[1]/span/a/text()').extract()
        review = Review()
        print(sites)
        for site in sites:
            name = site.xpath('div[1]/div/div[1]/div/div/div[2]/div[1]/span/a/text()').extract()
            review["name"] = name
            location = site.xpath('div[1]/div/div[1]/div/div/div[2]/div[1]/div/span/text()').extract()
            review["location"] = location
            time = site.xpath('div[2]/div/div[2]/span/text()').extract()
            review["time"] = time
            reviews = site.xpath('div[3]/p/span/text()').extract()
            review["reviews"] = reviews
            review["attitude"] = 'positive'
            review["shopname"] = "The Halal Gu"

            yield review



'''



