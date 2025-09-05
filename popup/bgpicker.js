/* initialise variables */

let bgBtns = document.querySelectorAll('.preset-container button');

let reset = document.querySelector('.color-reset button');

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

      colours = {
        bgColour: bgColour,
        pgColour: pageColour,
        txtColour: textColour
      }

      browser.tabs.sendMessage(tabs[0].id, colours);

      //set the cookie
      browser.cookies.set({
        url: tabs[0].url,
        name: "DarkerDocs", 
        value: JSON.stringify(colours)
      })
      
      //sendCookie(colours);

    });
  }
}


/* Manually entered fields */

document.addEventListener("DOMContentLoaded", () => {
  // Attach click event to the submit button
  document.getElementById("submit_manual").addEventListener("click", () => {
    // Grab the input values
    const bgColour = document.getElementById("bgColour").value.trim();
    const textColour = document.getElementById("textColour").value.trim();
    const pageColour = document.getElementById("pageColour").value.trim();

    // Store them in variables
    let colours = {
      bgColour: bgColour || null,
      pgColour: pageColour || null,
      txtColour: textColour || null
    };

    tab = getActiveTab()

    browser.tabs.sendMessage(tab.id, colours);
    //set the cookie
    browser.cookies.set({
      url: tab.url,
      name: "DarkerDocs", 
      value: JSON.stringify(colours)
    })

  });
});

/* reset background */

reset.onclick = function() {
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {reset: true});

    browser.cookies.remove({
      url: tabs[0].url,
      name: "DarkerDocs" 
    })
  });
}


function sendCookie(package){

  //send message to change appearance immediately
  browser.tabs.sendMessage(tabs[0].id, package);

  //set the cookie
  browser.cookies.set({
    url: tabs[0].url,
    name: "DarkerDocs", 
    value: JSON.stringify(package)
  })
}