const header = document.querySelector('header');
const toggle = document.querySelector('.mode-switch');
const body = document.querySelector('body');

const overlays = document.querySelectorAll('.overlays');
const closeOverlay = document.querySelectorAll('.close-overlay');
const ticketBtns = document.querySelectorAll('.ticket-btn');
const overlaysContainer = document.querySelector('.overlays-container')


/*=======Logic for the header to stick on scroll*==========*/

window.addEventListener('scroll', ()=>{
    header.classList.toggle('fixed-item', window.scrollY >45);
      
    
  
  });

  
/*=============Logic for the dark and light mode==============*/


let getMode = localStorage.getItem('mode');

if(getMode && getMode === 'dark'){
    body.classList.add('dark');
    toggle.classList.toggle('fa-moon');
    toggle.classList.toggle('fa-sun');

}

toggle.addEventListener('click', ()=>{
    body.classList.toggle('light');
    toggle.classList.toggle('fa-moon');
    toggle.classList.toggle('fa-sun');

    if(!body.classList.contains('dark')){
        return localStorage.setItem('mode', 'light');
    }
    return localStorage.setItem('mode', 'dark');
});
/*===============Logic for the overlays==============*/

ticketBtns.forEach((ticketBtn, index)=>{
    ticketBtn.addEventListener('click',()=>{
     logic(index);
   

    });
});

const logic = (btnIndex)=>{
    overlays.forEach((overlay)=>{
        overlay.classList.remove('show-overlay');
        overlaysContainer.classList.remove('show-overlay');
    });
    overlaysContainer.classList.add('show-overlay');
    overlays[btnIndex].classList.add('show-overlay');

    
closeOverlay.forEach((close)=>{
    close.addEventListener('click', ()=>{
     overlaysContainer.classList.remove('show-overlay');
     overlays[btnIndex].classList.remove('show-overlay');
    })
});
}



/*=============Logic for the filter in the fourth section==============*/

const selectors = document.querySelector('.tabs-header').children;
let tabsContents = document.querySelector('.tabs-content-container').children;

  
    

for(let i = 0; i < selectors.length; i++){
    selectors[i].addEventListener('click', function(){
        for(let j = 0; j< selectors.length; j++){
            selectors[j].classList.remove('active-selector');
        }

        this.classList.add('active-selector');
        

        let targetData = this.getAttribute('data-target');
        

        for(let k = 0; k < tabsContents.length; k++){
            tabsContents[k].classList.remove('active');
            tabsContents[k].classList.add('delete');

            if(tabsContents[k].getAttribute('data-item') == targetData || targetData == "all"){
                tabsContents[k].classList.remove('delete');
                tabsContents[k].classList.add('active');
            }
        }
    });
}


/*=====================Logic for the carousel*==============*/

const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll('.arrow');
const arrowLeft = document.querySelector("#left");
const arrowRight = document.querySelector("#right");
// Get the width of the first slider item
const firstCardWidth = carousel.querySelector('.slider-item').offsetWidth;
let isDragging = false, startX, startScrollLeft;


console.log(isDragging);


 

arrowBtns.forEach(btn=>{
     btn.addEventListener('click', ()=>{
     carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    console.log(carousel.scrollLeft);
    arrowLeft.classList.remove("disabled");
    arrowRight.classList.remove("disabled")
    });
});




console.log(isDragging)
const dragStart = (e)=>{
    isDragging = true;
    carousel.classList.add('dragging');
    //Records the initial cursor and scroll positon of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) =>{
    if(!isDragging)return;
    //Updates the scroll position of the carouse based on the cursor movement
   carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  
}

const dragStop = (e)=>{
    isDragging = false;
    carousel.classList.remove('dragging');
}
  




carousel.addEventListener('mousedown', dragStart);

carousel.addEventListener('mousemove', dragging);

document.addEventListener('mouseup', dragStop);



    

/*================Logic to show active section=============*/

const sections = document.querySelectorAll('section')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset;

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('nav ul a[href*=' + sectionId + ']')
		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-nav-btn');
		}else{
			sectionsClass.classList.remove('active-nav-btn');
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

