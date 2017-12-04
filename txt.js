<!-- hide from impaired browsers
BroW = parseInt(navigator.appVersion) ; NaV = navigator.appName
//
function getTxt(txt,lnk) {
  if (lnk == "") {lnk = txt}
  if (NaV == "Netscape") {
    lin = '<A HREF="' + lnk + '">' + txt + '</A>'
  } else {
    lin = '<A HREF="javascript:getIEtxt(' ; lin += "'" + lnk + "')"
    lin += '">' + txt + '</A>'
  }
  document.write(lin) ; document.close()
}
function getIEtxt(txt) {
  loc = self.location.href
  loc = loc.substr(0,loc.lastIndexOf("/") + 1)
  window.location="view-source:" + loc + txt
}
//-->
