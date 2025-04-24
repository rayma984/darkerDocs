/* initialise variables */

let bgBtns = document.querySelectorAll('.bg-container button');
let colorPick = document.querySelector('input');
let reset = document.querySelector('.color-reset button');
let cookieVal = { colour : '' };

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

      let colourChoice;

      switch(imgName){
        case 'grey':
          colourChoice = '#666666';
        break;

        case 'slate':
          colourChoice = '#262626';
        break;

        case 'jet':
          colourChoice = '#000000';
        break;

        default:
          colourChoice = '#000000'; //defaults to jet

      }


      browser.tabs.sendMessage(tabs[0].id, {colour: colourChoice});

      cookieVal.colour = colourChoice;

      browser.cookies.set({
        url: tabs[0].url,
        name: "DarkerDocs", 
        value: JSON.stringify(cookieVal)
      })
    });
  }
}

/* apply chosen color to HTML background */

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

    cookieVal = { colour : '' };
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