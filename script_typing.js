let para_array,para_div,random_index,P;

//a json file is really useful for example for a huge amount of data in this case it is fetched exactly as we fetch APIs

async function fetch_array(){ //for fetching json file

let promise=await fetch("para.json");

para_array = await promise.json(); //array that contains all the big paragraphs

para_div=document.querySelector("#typingPara"); //div that contains all the small p tags

random_index=Math.floor((Math.random())*para_array.length); //random index used to choose a random paragraph from paragraph array

const styles_of_para={
    fontFamily: "Courier New",
    fontSize: "xxx-large",
    fontWeight: "bold",
    color: "grey",
};

for(let chr of para_array[random_index]){  //this creates a p tag for each character so that i can change background color of a
                                           //single character at a time

    let new_obj=document.createElement("p");
    new_obj.style.display="inline";
    Object.assign(new_obj.style,styles_of_para);
    new_obj.innerText=chr;
    para_div.append(new_obj);

}

P=para_div.firstElementChild; //starting iterator and this iterates to the end child node just like iterating through a linked list

}

// I kept all these inside the function because they should only be executed when the array of paragraphs is fully loaded 

fetch_array();

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
            //it will be correct else it will be considered wrong

           P.style.backgroundColor="lightgreen";

           P.scrollIntoView( //scroll into view used to auto scroll to the current correct typed letter when it gets out of view
            {
                block:"start",
                behavior:"smooth"
            }
           );

           right++; //number of correctly typed letters
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

        if(P===null){ //this if statement will be used in case some extraordinary typer types the whole paragraph before the time limit
            
            location.href="index3.html";
            return;

        };

    });

//keypress event doesnot support backspace.
document.addEventListener("keydown",(eventDown)=>{ //keydown event listener specifically for backspace

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