console.log(`
Score: 100/100

### CrossCheck Criteria (100 points)

1. Checking validation of pages: **+16**
- [x] The layout of both pages is valid: to check the validity of the layout, use the service https://validator.w3.org/ . **+12** (6 points per page) 
 Valid markup of checked page corresponds to the message "Document checking completed. No errors or warnings to show." In this case, we assign the full points for the checked page (+6). If there are "warnings" but no "errors", we assign half of the points (+3) for the checked page
- [x] Favicon is added to each page **+4**
2. The layout matches the design **+42**
- [x] "<header>" block on each page **+6**
- [x] "Enjoy" block on "home" page **+6**
- [x] "Favourites Coffee" block on "home" page **+6**
- [x] "About" block on "home" page **+6**
- [x] "Mobile App" block on "home" page **+6**
- [x] "Menu" block on "menu" page **+6**
- [x] "<footer>" block on each page **+6**
3. CSS Requirements **+10**
- [x] For positioning images in "About" block on "home" page and products in "Menu" block on "menu" page used **Flexbox** or **Grid Layout** **+4**
- [x] When scaling the browser page (<100%) or increasing the page width (>1440px), the layout of both pages is centered rather than shifted to the side and not stretched across the entire width **+4**
- [x] The background color **Body** stretches across the entire width of the page **+2**
4. Interactivity **+32**
- [x] Navigation elements (except "Contacts") lead to corresponding blocks on "home" page (anchor links) **+4**
- [x] "Contacts" in navigation panel links to the "<footer>" block on its own page (anchor link) **+2**
- [x] Smooth scrolling with anchor links **+2**
- [x] When clicking on the **Menu** buttons in "header" and "Enjoy" block on "home" page, it navigates to the "menu" page **+2**
- [x] The **Menu** button in "header" on "menu" page is non-interactive **+2**
- [x] When clicking on the **Logo** in "header", it navigates to the "home" page **+2**
- [x] The active **Coffee** button in "Menu" block of "Menu" page is non-interactive **+2**
- [x] Each Coffee-card in the "Menu" section of the "Menu" page is interactive when hovering over any area of the card **+4**
- [x] In the "<footer>" block, clicking on the link with phone number (all area including icon) should initiate a phone call **+2**
- [x] In the "<footer>" block, clicking on the link with the address (all area including icon) should open a new browser tab with Google Maps displaying any location of your choice **+2**
- [x] Interactivity of links and buttons is implemented according to Figma layout. Interactivity includes not only changing cursor's appearance, for example, using the "cursor: pointer" property, but also the use of other visual effects, such as changing the background color or font color, following the **Styleguide** in Figma layout **+4**
- [x] Mandatory requirement for interactivity: smooth change in the appearance of an element on hover and click, without affecting adjacent elements **+4**
`);