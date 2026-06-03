function createheart(){
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 +"s";

    document.body.appendChild(heart);
}


for(i=0; i<50; i++){
    setTimeout(createheart,i*100);
}

const btn = document.querySelectorAll('button');
const wrongPass = document.querySelector('.wrongPass');


const inputVal = document.querySelector('.js-input');
btn.forEach((button)=>{
    button.addEventListener('click',()=>{
        if (button.innerHTML === "del"){
            inputVal.value = inputVal.value.slice(0, -1);
        }else if(button.innerHTML === "="){
            if(inputVal.value === "1809"){
                window.location.href = "Andrei.html"
            }else{
                alert("wkwkwk passwordnya salah")
                
            }
        }else{
            inputVal.value += button.innerHTML
        }
    
        
    })
})