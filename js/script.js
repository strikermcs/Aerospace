
"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = "max"; //Для MobileFirst поменять на min

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}

//Вызываем функцию
move();

*/
;



function ibg() {
   let ibg = document.querySelectorAll(".ibg");
   for (var i = 0; i < ibg.length; i++) {
     if (ibg[i].querySelector("img")) {
       ibg[i].style.backgroundImage =
         "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
         console.log("ok");
     }
   }
 }
 
 ibg();


 
 
let  icon_menu = document.querySelector('.icon-menu');

icon_menu.addEventListener("click",function(e){
   icon_menu.classList.toggle('active');
    let menu_body = document.querySelector('.menu__body');
    menu_body.classList.toggle('active');
    let body = document.querySelector('body');
    body.classList.toggle('lock');

 });


 
  function initProgress(){
   let progress = document.querySelectorAll('.progress__count');
  
   let prog = document.querySelectorAll('.prog');
     for(let i = 0; i < progress.length; i++ ){
       
        prog[i].style.width = progress[i].innerHTML;
     }
  };
  initProgress();
  


let elem = document.querySelector('.coints-testimonials');
let customers = document.getElementById('customers');
let project = document.getElementById('project');
let year = document.getElementById('year');
let wins = document.getElementById('wins');
let customNum = customers.innerHTML;
let projectNum = project.innerHTML;
let yearNum = year.innerHTML;
let winsNum = wins.innerHTML;

document.addEventListener('scroll', function onScroll() {
  let posTop = elem.getBoundingClientRect().top;
  


  if(posTop < window.innerHeight){
   this.removeEventListener('scroll', onScroll);


  runningNumber(customNum,customers,1);
  runningNumber(projectNum,project,1);
  runningNumber(yearNum,year,50);
  runningNumber(winsNum,wins,1);
  }
  // Блок достиг верхней границы экрана (или выше)
  // elem.classList.toggle('visible', posTop <= 0);
  
  // Блок только появляется снизу (или выше)
  // elem.classList.toggle('visible', posTop < window.innerHeight);
  
  // Блок целиком находится в видимой зоне
 
});

function runningNumber(num,elem, speed){
   
   let start = 0;
   
   let interval = setInterval(() =>{
     
     elem.innerHTML = ++start;
      if(start == num){
         clearInterval(interval);
      }
     
   },
       speed);
}

let email = document.querySelector(".form-contact__mail");
let submit = document.querySelector(".form-contact__submit");
submit.disabled = true;
email.addEventListener("input", function (event) {
  
  if (validateEmail(email.value)) {
   email.classList.remove('error');
   email.classList.add('valid');
   submit.disabled = false;
  } else {
   email.classList.remove('valid');
   email.classList.add('error');
   submit.disabled = true;
  }
});


function validateEmail(email) {
   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}




let hmain = document.querySelector('.about');
let head = document.querySelector('.header');
document.addEventListener('scroll', function() {
   let posmain = hmain.getBoundingClientRect().top;
   
    if(posmain <= 0){
       head.style.position = 'fixed';
       head.classList.add('fix');
    }else{
       head.style.position = 'absolute';
       head.classList.remove('fix');
    }


});

//Scrolling
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};


/*

document.documentElement.addEventListener("click", function(e){
   if(!e.target.closest('.user-header')){
      let user_menu = document.querySelector('.user-header__menu');
      user_menu.classList.remove('_active');
   }
});

*/


