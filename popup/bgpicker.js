/* initialise variables */

let bgBtns = document.querySelectorAll('.preset-container button');

let colorPick = document.querySelector('input');

let reset = document.querySelector('.color-reset button');
let cookieVal = { };

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

/* apply backgrounds to buttons */
/* add listener so that when clicked, button applies background to page HTML */

for(let i = 0; i < bgBtns.length; i++) {
  let colourPreset = bgBtns[i].getAttribute('class');
  let bgImg = 'url(\'images/' + colourPreset + '.png\')';
  bgBtns[i].style.backgroundImage = bgImg;

  bgBtns[i].onclick = function(e) {
    getActiveTab().then((tabs) => {
      let imgName = e.target.getAttribute('class');

      let bgColour;
      let pageColour;
      let textColour = '#f2f2f2';

      switch(imgName){
        case 'grey':
          bgColour = '#666666';
          pageColour = '#b0b0b0';
        break;

        case 'slate':
          bgColour = '#262626';
          pageColour = '#b1b1b1';
        break;

        case 'jet':
          bgColour = '#000000';
          pageColour = '#8c8c8c';
        break;

        default:
          //defaults to jet
          bgColour = '#000000'; 
          pageColour = '#8c8c8c';
      }

      package = {
        bgColour: bgColour,
        pgColour: pageColour,
        txtColour: textColour
      }

      browser.tabs.sendMessage(tabs[0].id, package);

      cookieVal.colour = bgColour;

      browser.cookies.set({
        url: tabs[0].url,
        name: "DarkerDocs", 
        value: JSON.stringify(cookieVal)
      })
    });
  }
}


/* Manually entered fields */

colorPick.onchange = function(e) {
  getActiveTab().then((tabs) => {
    let currColor = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, {colour: currColor});

    cookieVal.colour = currColor;
    browser.cookies.set({
      url: tabs[0].url,
      name: "DarkerDocs", 
      value: JSON.stringify(cookieVal)
    })
  });
}

/* reset background */

reset.onclick = function() {
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {reset: true});

    cookieVal = {};
    browser.cookies.remove({
      url: tabs[0].url,
      name: "DarkerDocs" 
    })
  });
}

/* Report cookie changes to the console */

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});