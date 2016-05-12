# coding:utf-8

import sys, os, urllib2, urllib, cookielib, xml.etree.ElementTree as ET, gzip, StringIO, base64, json


class JiuMa:

    def __init__(self) :
        self.number_path = '/Users/hyy/FastWork/py_bin/last_number'
        self.code_url = 'https://www.hdfax.com/user/captcha'
        self.host_url = 'https://www.hdfax.com/snow/invitation/reward/156******08/8a81810f549988a501549f6118981010'
        self.user_name = 'blazerhe'
        self.pwd = 'hyy4646586'
        self.pid = '16694'
        self.token = ''
        self.number = ''

    def login(self) :
        rst = urllib2.urlopen('http://api.9mli.com/http.aspx?action=loginIn&uid=%s&pwd=%s' % (self.user_name, self.pwd))
        rst = rst.read().split('|')
        self.token = rst[1]

        rst = urllib2.urlopen('http://api.9mli.com/http.aspx?action=getUserInfos&uid=%s&token=%s' % (self.user_name, self.token))
        rst = rst.read().split(';')

        print '用户名:' + self.user_name
        print '密钥:' + self.token
        print '积分:' + rst[1]
        print '余额:' + rst[2]
        print '可同时获取号码数:' + rst[3]

    def get(self) :
        rst = urllib2.urlopen('http://api.9mli.com/http.aspx?action=getMobilenum&pid=%s&uid=%s&token=%s&size=1' % (self.pid, self.user_name, self.token))
        rst = rst.read()

        if rst == 'no_data' :
            return

        self.number = rst.split('|')[0]
        outfile = open(self.number_path, 'w')
        outfile.write(self.number + '\n')
        outfile.close()
        print rst

    def release(self) :
        rst = urllib2.urlopen('http://api.9mli.com/http.aspx?action=ReleaseMobile&uid=%s&token=%s&mobile=%s' % (self.user_name, self.token, self.number))
        print rst.read()

if __name__ == '__main__' :
    jiuma = JiuMa()
    jiuma.login()

    if len(sys.argv) == 1 :
        exit(0)

    param1 = sys.argv[1]
    print param1
    if param1 == 'find' :
        exit(0)
    elif param1 == 'get' :
        jiuma.get()
    elif param1 == 'release' :
        jiuma.release()

    jiuma.login()







