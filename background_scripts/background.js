function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    // get any previously set cookie for the current tab 
    let gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: "DarkerDocs"
    });
    gettingCookies.then((cookie) => {
      if (cookie) {
        let cookieVal = JSON.parse(cookie.value);
        
        let package = {
          bgColour: cookieVal.bgColour || null,
          pgColour: cookieVal.pgColour || null,
          txtColour: cookieVal.txtColour || null
        }

        browser.tabs.sendMessage(tabs[0].id, package);
      }
    });
  }); 
}

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);