const SuVersion = '/2su';
const ProSun = '/sun';
const QnUpUrl = '//up.qbox.me';

const ua = window.navigator.userAgent.toLowerCase();
const deviceName = (() => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    return 'ios';
  } else if (/(Android)/i.test(ua)) {
    return 'android';
  }
  return 'pc';
})();
const browserName = (() => {
  if (/MicroMessenger/i.test(ua)) {
    return 'wx';
  } else if (/QQ/i.test(ua)) {
    return 'qq';
  } else if (/WeiBo/i.test(ua)) {
    return 'wb';
  } else if (ua.indexOf('dingtalk') >= 0) {
    return 'dd';
  }
  return '*';
})();

export {
  SuVersion,
  ProSun,
  deviceName,
  browserName,
  QnUpUrl,
};
