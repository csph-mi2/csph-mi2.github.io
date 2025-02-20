function processHash()
{
    origin = window.location.origin + window.location.pathname;
    baseAddress = window.location.href.split('#')[0].split('/').slice(0, -1).join('/') + "/";
    hashString = window.location.hash;

    if(hashString.length > 0){
      documentName = window.location.hash.substring(1) + '.html';
    }
    else{
      documentName = 'home.html'
    }

    var client = new XMLHttpRequest();
    client.open('GET', documentName);
    client.onreadystatechange = function() 
    {
      if(client.readyState == 4 && client.status == 200) {
        document.getElementById("mainContent").innerHTML = client.responseText;
        
        // Make sure that scripts are evaluated
        var scripts = document.getElementById("mainContent").getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            eval(scripts[i].innerText);
        }
      }
      else if(client.readyState == 4)
      {
        window.location = '#home';
      }
    }
    client.send();
}

window.onhashchange = processHash;

async function onCarouselButtonClick(direction) 
{
  slidesContainer = document.getElementById("slides-container");
  if(slidesContainer != null){
    slide = document.querySelector(".slide");
    
    
    slideWidth = slide.clientWidth;
    nSlides = slidesContainer.childElementCount;
    
    initialScrollPosition = Math.round(slidesContainer.scrollLeft / slideWidth) * slideWidth;
    newScrollPosition = initialScrollPosition + direction * slideWidth;

    if( newScrollPosition/slideWidth >= nSlides){
      newScrollPosition = 0;
    }
    else if(newScrollPosition < 0) {
      newScrollPosition = slideWidth * (nSlides-1);
    }

    slidesContainer.scrollLeft = newScrollPosition;
  }
}

const myObserver = new ResizeObserver(entries => {
  onCarouselButtonClick(0);
});
myObserver.observe(document.querySelector("body"));

// Function to generate random stars
function generateStars() {
  const starContainer = document.querySelector('.banner-backdrop');
  const numStars = 500;

  for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const size = Math.random() * 3.5 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      star.style.opacity = `${Math.random() * 0.3 + 0.5}`;
      star.style.transform = `rotate(${Math.random() * 360}deg)`;

      starContainer.appendChild(star);
  }
}

// Call the function when the page loads
window.onload = function() {
  generateStars();
  processHash();
}
