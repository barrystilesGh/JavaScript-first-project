(function () {
  "use strict";

  const logo = document.getElementById('logo');

  logo.addEventListener('click', (evt) => {
    evt.preventDefault();
    // to home or top of page
    const reset = Math.ceil(-window.pageYOffset);
    window.scrollBy({ top: reset, left: 0, behavior: "smooth" })
  })

  const links = document.querySelectorAll('header nav ul li a');

  for (let eachLinks of links) {
    eachLinks.addEventListener('click', (evt) => {
      evt.preventDefault();
      const attrOfLink = evt.target.getAttribute('href');
      const linkContent = document.querySelector(attrOfLink);
      // get the origin or location from top of each content of the link
      const origin = Math.floor(linkContent.getBoundingClientRect().top - 200);
      // use window.scrollBy method to get the origin of the element/content of the link
      window.scrollBy({ top: origin, left: 0, behavior: "smooth" })
    })
  }


  // selecting each section element and highlighting the each link according to it content.

  window.addEventListener('load', () => {
    const sectionDiv = document.querySelectorAll('#page>section');

    let sectionArray = [];
    let pageTop;
    let counter = 0;
    for (let eachSectionDiv of sectionDiv) {
      sectionArray.push(Math.floor(eachSectionDiv.getBoundingClientRect().top + window.pageYOffset))
    }


    window.addEventListener('scroll', (evt) => {
      // getting the pixels of the viewport from top to where the user has scrolled to on the window
      pageTop = window.pageYOffset + 400;

      // targetting the exact location of each section element.
      if (pageTop > sectionArray[counter]) {
        counter++;
      }
      else if (counter > 0 && pageTop < sectionArray[counter - 1]) {
        counter--;

      }

      let prevCounter = 0;
      if (counter != prevCounter) {
        // removing all the active class on all the link items
        for (let i = 0; i <= links.length - 1; i++) {
          const element = links[i];
          element.removeAttribute('class');
        }
        // selecting the highlighted link
        const currentLinkItem = document.querySelector(`header nav ul li:nth-child(${counter}) a`);
        currentLinkItem.setAttribute('class', 'active');
      }


    })

  })

  // slider styles

  const wrapper = document.querySelector(".slider");
  const slideWrapper = document.querySelector('.slide-wrapper');
  const slideItem = document.querySelectorAll('.slideItem');
  const slideItemLen = slideItem.length;
  const wrapperWidth = `${window.innerWidth
    }`;


  const widthofSlideWrapper = `${slideItemLen * wrapperWidth
    }vw`;
  slideWrapper.style.width = widthofSlideWrapper;

  // get the link items
  const buttons = document.querySelectorAll('.buttons a');




  buttons.forEach((btn, index) => {
    btn.addEventListener('click', (evt) => {
      evt.preventDefault();

      slideWrapper.style.transform = `translateX(${-100 * index}vw)`;

      // // get content of cta
      /* const callToAction = document.querySelectorAll('.cta');
      callToAction.forEach((cta) => {

        cta.style.animationPlayState = `running`;

      }) */

      for (let btn of buttons) {
        btn.removeAttribute('class')
      }
      evt.target.setAttribute('class', 'activeBtn')
    })
  })


  // slide timer
  let counter = 0;
  let startTimer;

  const startRotator = () => {
    counter++;
    if (counter === slideItemLen - 1) {
      counter = 0;
    }
    slideWrapper.style.transform = `translateX(${-100 * counter}vw)`;
    // // get content of cta
    // const callToAction = document.querySelectorAll('.cta');



  }


  slideItem.forEach((item) => {

    item.addEventListener('mouseover', (evt) => {
      const cta = item.parentNode.querySelector('.cta');

      startTimer = setInterval(startRotator, 4000);
    })
  })

  slideItem.forEach((item) => {

    item.addEventListener('mouseout', () => {
      clearInterval(startTimer);
    });
  })

  // making the tabs work
  const allTabs = document.querySelectorAll('#tabs >ul >li a');

  allTabs.forEach((tab) => {
    tab.addEventListener('click', (evt) => {
      evt.preventDefault();
      // get target id
      const targetId = evt.target.getAttribute('href');

      // use id to get it corressponding content
      const targetContent = document.querySelector(targetId);

      for (let tabs of allTabs) {
        tabs.removeAttribute('class')
      }
      evt.target.setAttribute('class', 'visibleBtn');
      // get the old displayed content
      const oldContent = document.querySelector('.visible');
      oldContent.className = `hidden`

      targetContent.setAttribute('class', 'visible')
      // console.log(targetContent);
    })
  })

  // listen section js





























}())