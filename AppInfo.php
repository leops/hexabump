<?php
class AppInfo {
  public static function appID() {
    return getenv('FACEBOOK_APP_ID');
  }
  public static function appSecret() {
    return getenv('FACEBOOK_SECRET');
  }
  public static function getUrl($path = '/') {
    if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1)
      || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'
    ) {
      $protocol = 'https://';
    }
    else {
      $protocol = 'http://';
    }
    return $protocol . $_SERVER['HTTP_HOST'] . $path;
  }
}
