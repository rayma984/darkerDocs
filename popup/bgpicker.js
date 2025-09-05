/* initialise variables */

let bgBtns = document.querySelectorAll('.preset-container button');
let reset = document.querySelector('.color-reset button');
const form_bgColour = document.getElementById("bgColour")
const form_textColour = document.getElementById("textColour")
const form_pageColour = document.getElementById("pageColour")

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
    
    sendCookie(colours);
  }
}


/* Manually entered fields */

document.getElementById("submit_manual").addEventListener("click", () => {

  // Grab the input values
  // Store them in variables
  let colours = {
    bgColour: form_bgColour.value.trim() || null,
    pgColour: form_pageColour.value.trim() || null,
    txtColour: form_textColour.value.trim() || null
  };

  sendCookie(colours);

});


/* reset background and form */
reset.onclick = function() {
  getActiveTab().then((tabs) => {
    let activeTab = tabs[0];

    browser.tabs.sendMessage(activeTab.id, {reset: true});
    browser.cookies.remove({
      url: activeTab.url,
      name: "DarkerDocs" 
    })
  }); 

  //reset form fields
  form_bgColour.value = "";
  form_textColour.value = "";
  form_pageColour.value = "";

}


function sendCookie(package){

  getActiveTab().then((tabs) => {
    let activeTab = tabs[0];

    //send message to change appearance immediately
    browser.tabs.sendMessage(activeTab.id, package);

    //set the cookie
    browser.cookies.set({
      url: activeTab.url,
      name: "DarkerDocs", 
      value: JSON.stringify(package)
    })
    
  })
}