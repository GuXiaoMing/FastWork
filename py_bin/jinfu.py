# coding:utf-8

import os, urllib2, urllib, cookielib, xml.etree.ElementTree as ET, gzip, StringIO, base64, json

code_path = '/Users/hyy/FastWork/py_bin/code.jpg'
code_url = 'https://www.hdfax.com/user/captcha'
host_url = 'https://www.hdfax.com/snow/invitation/reward/156******08/8a81810f549988a501549f6118981010'

cookiejar = cookielib.CookieJar()
urlopener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookiejar))
urllib2.install_opener(urlopener)

urlopener.addheaders.append(('Accept', 'application/json, text/javascript, */*; q=0.01'))
urlopener.addheaders.append(('Accept-Encoding', 'gzip'))
urlopener.addheaders.append(('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6'))
urlopener.addheaders.append(('Connection', 'keep-alive'))
urlopener.addheaders.append(('Content-Length', '0'))
urlopener.addheaders.append(('Host', 'www.hdfax.com'))
urlopener.addheaders.append(('Origin', 'www.hdfax.com'))
urlopener.addheaders.append(('Referer', host_url))
urlopener.addheaders.append(('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'))
urlopener.addheaders.append(('X-Requested-With', 'XMLHttpRequest'))

urlcontent = urlopener.open(urllib2.Request(code_url, urllib.urlencode({ })))
urlcontent = gzip.GzipFile(fileobj=StringIO.StringIO(urlcontent.read()), mode="r")
ret_dict = json.loads(urlcontent.read())

#print 'base64: ' + ret_dict["applyPicCaptchaResponse"]["captcha"]
print code_path
outfile = open(code_path, 'w')
outfile.write(base64.b64decode(ret_dict["applyPicCaptchaResponse"]["captcha"]))
outfile.close()

#authcode=raw_input('Please enter the authcode:')
#print authcode


