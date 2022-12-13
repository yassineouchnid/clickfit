//loading
const load = document.getElementById('load')
window.addEventListener('load', ()=>load.style.display = "none")

//get data
const url = 'http://numbersapi.com/1/30/date?json';
async function getData(){
    const response = await fetch(url);
    const data = await response.json();
    const yearA = document.getElementById('yearA');
    const desc = document.getElementById('desc');
    const desc_footer = document.getElementById('desc_footer');
    desc_footer.innerText = data.text;
    desc.innerText = data.text;
    yearA.innerText = data.year;
}
getData()

//Drag and Drop
function start(e){
    e.dataTransfer.effectAllowed="move";
    e.dataTransfer.setData('id', e.target.getAttribute('id'));
}
function over(e){
    return false;
}
function drop(e){
    ob = e.dataTransfer.getData('id');
    e.currentTarget.appendChild(document.getElementById(ob));
}

// animetion scroll
const hiddenDivs = document.querySelectorAll('.hidden')
const observe = new IntersectionObserver((entrs)=>{
    entrs.forEach((ent)=>{
        if(ent.isIntersecting){
            ent.target.classList.add('show')
        }else{
            ent.target.classList.remove('show')
        }
    })
})
hiddenDivs.forEach((el)=>observe.observe(el))

// mobile menu
const menuIcon = document.querySelector(".menu_mobile")
const menu = document.querySelector(".menu_join")

menuIcon.addEventListener('click', function(){
    menu.classList.toggle('active')
})