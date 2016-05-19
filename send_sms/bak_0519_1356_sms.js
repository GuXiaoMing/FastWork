var page = require('webpage').create();
var log = function(str) {
  console.log(getDate() + " " + str);
};
var next_picture = 1;
var next = function() {
  return next_picture++;
};
var render = function(step) {
  page.render('picture_send' + step + '.png');
  log('render picture_send' + step + '.png');
};
var getDate = function(){
  date = new Date();
  var yyyy = date.getFullYear();//年
  var MM = date.getMonth()+1;//月 月比实际月份要少1
  var dd = date.getDate();//日
  var HH = date.getHours();//HH
  var mm = date.getMinutes();//MM
  var ss = date.getSeconds();//ss
  ss = ss < 10 ? "0" + ss : ss;
  return yyyy + "-" + MM + "-" + dd + " " + HH + ":" + mm + ":" + ss;
};
var wait_time = 0;
var wait = function(add_time) {
  wait_time_ = wait_time;
  wait_time += add_time;
  return wait_time_;
};

var self = function(){
  return {
    args : function() {
      var system = require('system');
      return system.args;
    }
  }
};

var map = (function() {
  var data = {};
  return function(key, val) {
    if (val === undefined) { return data[key] } // get
    else { return data[key] = val } // set
  }
})();

var system = require('system');
var args = system.args;
map('args', args);
log('args : ' + map('args'));
log('data : ' + map().data);
for (var i in map('args')) {
  log('arg[' + i + '] : ' + map('args')[i]);
}

log('The default user agent is ' + page.settings.userAgent);

// open page
setTimeout(function() {
  page.open('http://ums.zj165.com/index.jsp', function(status) {
    log("Status: " + status);
    if(status === "success") {
      ;
    } else {
      phantom.exit();
    }
  });
}, wait(3000));

setTimeout(function() {
  render(next());
}, wait(1000));

var login_info = { };
login_info.code = '';
login_info.user_name = '';
login_info.password = '';

// fill form
setTimeout(function() {
  page.evaluate(function(login_info) {
    $("#spCode").val(login_info.code);
    $("#userName").val(login_info.user_name);
    $("#password").val(login_info.password);
  }, login_info);
}, wait(1000));

setTimeout(function() {
  render(next());
}, wait(1000));

// click login (a link)
setTimeout(function() {
  log('event 登录 start .');
  page.evaluate(function() {
    var a = document.getElementsByClassName('login_btn')[0];
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  });
  log('event 登录 stop  .');
}, wait(1000));

setTimeout(function() {
  render(next());
}, wait(1000));

// click 短信
setTimeout(function() {
  log('event 短信 start .');
  page.evaluate(function() {
    var a = document.getElementById('bizNav110201');
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  });
  log('event 短信 stop  .');
}, wait(3000));

setTimeout(function() {
  render(next());
}, wait(1000));

var sms_content = 'insert is here!';
// 填充短信内容
setTimeout(function() {
  page.evaluate(function(sms_content) {
    $("#sendTitleTextArea").val('自动化测试之手机名单上传:' + sms_content);
    //$("#recieveMdnInput").val('15618194808');
  }, sms_content);
}, wait(1000));

setTimeout(function() {
  render(next());
}, wait(1000));

// 点击上传文件
setTimeout(function() {
  page.evaluate(function() {
    var a = document.getElementById('importAtagId');
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  });
}, wait(2000));

setTimeout(function() {
  render(next());
}, wait(1000));

// 选择上传文件
setTimeout(function() {
  //page.evaluate(function() {
    page.uploadFile('input[name=importMdnFile]', '/Users/hyy/FastWork/send_sms/person.txt');
  //});
}, wait(1000));

setTimeout(function() {
  render(next());
}, wait(1000));

// 点击导入
setTimeout(function() {
  page.evaluate(function() {
    var a = $('input[value="导入"]')[0];
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  });
}, wait(3000));

setTimeout(function() {
  render(next());
}, wait(1000));

// exit ....
setTimeout(function() {
  log('exit...');
  phantom.exit();
}, wait(0));

// click 发送 (a link)
setTimeout(function() {
  log('event 发送 start .');
  page.evaluate(function() {
    var a_s = document.getElementsByClassName('confimbtn2 w120 mar10');
    var a ;//= a_s[1];
    for (var i in a_s) {
        //log(a_s[i].innerHTML);
        if (a_s[i].innerHTML == "发送") {
            a = a_s[i];
        }
    }
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  });
  log('event 发送 stop  .');
}, wait(3000));

setTimeout(function() {
  render(next());
}, wait(1000));

// click 确定发送 (a link)
setTimeout(function() {
  log('event 确定发送 start .');
  page.evaluate(function() {
    var a = document.getElementById('confirmSendBtn');
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  });
  log('event 确定发送 stop  .');
}, wait(3000));

// save pic7
setTimeout(function() {
  render(7);
}, wait(1000));

// exit ....
setTimeout(function() {
  log('total waster time : ' + wait(0) + ' ms');
  log('exit...');
  phantom.exit();
}, wait(0));

