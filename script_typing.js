let para="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim nulla, consectetur quaerat odit inventore. Quo id aut voluptas voluptates dicta nesciunt ipsum libero veritatis culpa! Inventore doloribus neque ipsam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim nulla, consectetur quaerat odit inventore. Quo id aut voluptas voluptates dicta nesciunt ipsum libero veritatis culpa! Inventore doloribus neque ipsam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim nulla, consectetur quaerat odit inventore. Quo id aut voluptas voluptates dicta nesciunt ipsum libero veritatis culpa! Inventore doloribus neque ipsam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim nulla, consectetur quaerat odit inventore. Quo id aut voluptas voluptates dicta nesciunt ipsum libero veritatis culpa! Inventore doloribus neque ipsam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim nulla, consectetur quaerat odit inventore. Quo id aut voluptas voluptates dicta nesciunt ipsum libero veritatis culpa! Inventore doloribus neque ipsam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim nulla, consectetur quaerat odit inventore. Quo id aut voluptas voluptates dicta nesciunt ipsum libero veritatis culpa! Inventore doloribus neque ipsam!";
let para_div=document.querySelector("#typingPara");

const styles_of_para={
    fontFamily: "Courier New",
    fontSize: "xxx-large",
    fontWeight: "bold",
    color: "grey",
};

for(let chr of para){
    let new_obj=document.createElement("p");
    new_obj.style.display="inline";
    Object.assign(new_obj.style,styles_of_para);
    new_obj.innerText=chr;
    para_div.append(new_obj);
    
}
let P=para_div.firstElementChild;

// "rgb(236, 70, 70)" for wrong.
// "lightgreen" for right.

localStorage.setItem("presses",0);
localStorage.setItem("right",0);
localStorage.setItem("wrong",0);

let presses=0,right=0,wrong=0;

let started=false;

document.addEventListener("keypress",(event)=>{

        if(!started){
            started=true;
            let time=localStorage.getItem("timer")*60; //converted to seconds
            let time_string=localStorage.getItem("time_string");
            let promise=elapseSecond(time,time_string);
        }

        if(event.key===P.innerText || (event.key==="Enter" && P.innerText===' ') ){
            //I added this second statement because of the
            //next line issue which doesnt show red or green when going to next line so anything of the two space or enter is pressed
            //it will be correct rest it will be considered wrong
           P.style.backgroundColor="lightgreen";
           P.scrollIntoView(
            {
                block:"start",
                behavior:"smooth"
            }
           );
           right++;
           localStorage.setItem("right",right);
        }
        else{

            P.style.backgroundColor="rgb(236, 70, 70)";
            wrong++;
            localStorage.setItem("wrong",wrong);

        }

        P=P.nextElementSibling;
        presses++;
        localStorage.setItem("presses",presses);

        if(P===null){
            
            location.href="index3.html";
            return;
        };

    });

//keypress event doesnot support backspace.
document.addEventListener("keydown",(eventDown)=>{
        if(eventDown.key==="Backspace" && P!==para_div.firstElementChild){

            P=P.previousElementSibling;

            if(P.style.backgroundColor==="lightgreen") right--;
            else wrong--;

            P.style.backgroundColor="lightyellow";

            presses++;
            localStorage.setItem("presses",presses);

            return;
        }
}); 