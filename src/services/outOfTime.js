export default function outOfTime() {
  var now = new Date();
  var segTerOpen = new Date("01/01/2020 15:00:00");
  var segTerClose = new Date("01/01/2020 22:00:00");

  var quaSexOpen = new Date("01/01/2020 15:00:00");
  var quaSexClose = new Date("01/01/2020 23:00:00");

  var sabOpen = new Date("01/01/2020 11:00:00");
  var sabClose = new Date("01/01/2020 23:00:00");

  var domOpen = new Date("01/01/2020 11:00:00");
  var domClose = new Date("01/01/2020 19:00:00");

  var nowTime = now.getHours();
  var nowDay = now.getDay();

  if (nowDay == 0) {
    if (
      nowTime < domOpen.getHours() ||
      nowTime >= domClose.getHours()
    ) {
      return true;
    }
  } else if (nowDay >= 1 && nowDay <= 2) {
    if (
      nowTime <= segTerOpen.getHours() ||
      nowTime >= segTerClose.getHours()
    ) {
      return true;
    }
  } else if (nowDay >= 3 && nowDay <= 5) {
    if (
      nowTime < quaSexOpen.getHours() ||
      nowTime >= quaSexClose.getHours()
    ) {
      return true;
    }
  } else if (nowDay == 6) {
    if (
      nowTime < sabOpen.getHours() ||
      nowTime >= sabClose.getHours()
    ) {
      return true;
    }
  }

  return false;
}