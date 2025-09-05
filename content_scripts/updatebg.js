browser.runtime.onMessage.addListener(updateBg);


function updateBg(request, sender, sendResponse) {

  console.log("colour update!")
  console.log(sender)


  if (request.bgColour) {

    //reset previous style sheet
    let newStyle = document.getElementsByClassName("rayStyleSheet")[0]
    if (newStyle != null){
      newStyle.remove()
    }

    var styleSheet = document.createElement("style")
    styleSheet.className = "rayStyleSheet"

    textColour = request.txtColour;
    pageColour = request.pgColour;
    bgColour = request.bgColour;

    blueAccent = "#5757ff"
    blueAccent2 = "#8080ff"
    redAccent = "#ee6464"
    

    // Your CSS as text
    var styles = `

        /* actual pages */
        rect {
          fill: ${pageColour};
        }

        /* 
          chapter nav 
           - background
           - text
           - tabs name (when not hovered over)
           - tabs bg
        */
        .navigation-widget-floating-navigation-button.navigation-widget.navigation-widget-chaptered {
          background-color: ${bgColour};
        }

        .outline-refresh.navigation-widget-unified-styling .navigation-widget-empty-content {
          color: ${textColour};
        }

        .chapter-item .goog-control, .chapter-label-content:not(:hover){
          color: ${textColour};
        }

        /* background colour of the tab in focus */
        .chapter-item-label-and-buttons-container-selected,
        .chapter-item-label-and-buttons-container-selected:focus-within {
          background: ${blueAccent};
        }

        /* background colour when you hover over unfocused tab */
        .navigation-widget-content:not(.chapter-item-dragged-within) .chapter-item-label-and-buttons-container:not(.chapter-item-label-and-buttons-container-selected):hover {
          background: ${redAccent};
        }

        /* bg colour of background when you hover over already focused tab*/
        .chapter-item-label-and-buttons-container-selected:has(.chapter-item-buttons:focus-within,
        .chapterItemArrowContainer:focus-within,
        .chapterItemIconAddButton:focus-within,
        .chapterItemIconEditButton:focus-within,
        .chapterItemIconSuggestionButton:focus-within),
        .chapter-item-nested .chapter-item-label-and-buttons-container-selected,
        .navigation-widget-content:not(.chapter-item-dragged-within) .chapter-item-label-and-buttons-container-selected:hover:not(:focus-within) {
          background: ${blueAccent2};
        }

        /* adding tabs */
        .outlines-widget-chaptered .kix-outlines-widget-header-contents {
          background-color: ${pageColour};
        }

        /* adding tabs text */
        .outlines-widget-chaptered .navigation-widget-header {
          color: black;
        }

        /* BG behind the page */
        .kix-appview-editor {
          background-color: ${bgColour} !important;
        }

        #docs-bars {
          background-color: ${bgColour};
        }

        /* title textbox highlight */
        .docs-grille-gm3 .docs-title-input:hover {
          border-color: ${textColour};
        }

        .docs-grille-gm3 .docs-title-input:focus {
          color: ${textColour};
        }


        #docs-titlebar-container, #docs-header-container {
          background-color: ${bgColour};
        }

        /* title highlight */
        .docs-grille-gm3 .docs-title-input {
            color: ${bgColour};
            z-index: 0;
        }

        #docs-title-input-label-inner {
          color: ${textColour};
        }

        .docs-grille-gm3 .docs-menubar .goog-control {
          color: ${textColour};
        }

        /* between toolbar and horizontal ruler */
        #docs-chrome:not(.docs-hub-chrome) {
          background-color: ${bgColour};
        }

        /* for the stubborn top right */
        #docs-header:not(.docs-hub-appbar) .docs-titlebar-buttons {
          background-color: ${bgColour};
        }

        /* main vertical ruler */
        .docs-vertical-ruler .docs-ruler-face {
          background-color: ${bgColour};
        }

        /* vertical ruler (not main ruler) */
        .docs-vertical-ruler {
          background-color: ${bgColour} !important;
        }

        /* vertical border */
        #kix-vertical-ruler {
          border-color: ${bgColour};
        }

        /* horizontal ruler (outside outside) */
        #kix-horizontal-ruler-container {
          background-color: ${bgColour};
        }

        /* horizontal ruler (outside) */
        .docs-horizontal-ruler {
          background-color: ${bgColour} !important;
        }

        /* horizontal ruler (inside) */
        .docs-horizontal-ruler .docs-ruler-face {
          background-color: ${bgColour} !important;
        }
        
        .docs-horizontal-ruler {
          border-bottom-color: ${bgColour};
        }
        
        /* ruler number markings */
        .docs-ruler-face-number {
          color: ${textColour};
        }

        /* ruler edge margins */
        .docs-ruler-background {
          background-color: ${bgColour};
        }

        /* right side menu */
        .docs-grille-gm3 .companion-app-switcher-container,
        .docs-grille-gm3 .docs-companion-app-switcher-container {
          background: ${bgColour};
        }

        /* space behind the docs logo */
        #docs-branding-container {
          background-color: ${bgColour};
          z-index: 50;
        }

        /* file, edit, etc will be sent behind the title */
        .docs-grille-gm3 .docs-material #docs-menubar,
        .docs-grille-gm3 .docs-material #docs-titlebar-container {
          z-index: 10;
        }

        /* rest of the tool bar */
        #docs-title-outer {
          z-index: 5;
        }

        /* 3 buttons beside title */
        .docs-titlebar-badges {
          z-index: 1
        }

        /* adding comments */
        .docs-grille-gm3.docs-gm .docos-anchoreddocoview.docos-docoview-active,
        .docs-grille-gm3.docs-gm .docos-anchoreddocoview.docos-docoview-active:hover,
        .docs-grille-gm3.docs-gm .docos-comments-pe .docos-docoview-active .docos-anchoreddocoview-internal,
        .docs-grille-gm3.docs-gm .docos-comments-pe .docos-docoview-active.docos-anchoreddocoview:hover .docos-anchoreddocoview-internal,
        .docs-grille-gm3.docs-gm .docos-docoview-active .docos-anchoreddocoview-input-pane,
        .docs-grille-gm3.docs-gm .docos-docoview-active .docos-anchoredreplyview,
        .docs-grille-gm3.docs-gm .docos-docoview-active:hover .docos-anchoreddocoview-input-pane,
        .docs-grille-gm3.docs-gm .docos-docoview-active:hover .docos-anchoredreplyview{
          background-color: ${pageColour};
        }

        /* comment box */
        .docs-grille-gm3 .docos-anchoreddocoview .docos-docoview-rootreply :only-child.docos-anchoredreplyview{
          background-color: ${pageColour};
          color: ${textColour};
        }
    `;

    styleSheet.textContent = styles
    document.head.appendChild(styleSheet)

    //remove the new stylesheet
  } else if (request.reset){

    let newStyle = document.getElementsByClassName("rayStyleSheet")[0]
    if (newStyle != null){
      newStyle.remove()
    }
    else {
      console.log("nothing to change :)")
    }
    
  }


}