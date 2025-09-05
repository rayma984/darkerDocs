
// reset button
const reset = document.querySelector('.color-reset button');

// manually entered fields
const form_bgColour = document.getElementById("bgColour")
const form_textColour = document.getElementById("textColour")
const form_pageColour = document.getElementById("pageColour")

//presets
const grey_preset = document.getElementById("grey")
const slate_preset = document.getElementById("slate")
const jet_preset = document.getElementById("jet")

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}


// listeners for preset buttons
grey_preset.onclick = () => {
  colours = {
    txtColour: '#f2f2f2',
    bgColour: '#666666',
    pgColour: '#b0b0b0'
  }

  sendCookie(colours);
}

slate_preset.onclick = () => {
  colours = {
    txtColour: '#f2f2f2',
    bgColour: '#262626',
    pgColour: '#b1b1b1'
  }

  sendCookie(colours);
  resetInputs();
}

jet_preset.onclick = () => {
  colours = {
    txtColour: '#f2f2f2',
    bgColour: '#000000',
    pgColour: '#8c8c8c'
  }

  sendCookie(colours);
  resetInputs();
}


/* Manually entered fields */
document.getElementById("submit_manual").addEventListener("click", () => {

  // Grab the input values
  let colours = {
    bgColour: form_bgColour.value.trim() || null,
    pgColour: form_pageColour.value.trim() || null,
    txtColour: form_textColour.value.trim() || null
  };

  sendCookie(colours);
  resetInputs();
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

  resetInputs();
}

//reset form fields
function resetInputs(){
  form_bgColour.value = "";
  form_textColour.value = "";
  form_pageColour.value = "";
}

// send cookie
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