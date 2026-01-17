let two_min_button=document.querySelector("#two");
let five_min_button=document.querySelector("#five");
let ten_min_button=document.querySelector("#ten");


if(two_min_button){

two_min_button.addEventListener("click",()=>{

localStorage.setItem("timer",2); //local storage lets us access a storage that does not reset when we switch pages

location.href="index2.html";

});
}

if(five_min_button){

five_min_button.addEventListener("click",()=>{

localStorage.setItem("timer",5);

location.href="index2.html";

});
}

if(ten_min_button){

ten_min_button.addEventListener("click",()=>{

localStorage.setItem("timer",10);

location.href="index2.html";

});
}

let timer=Number(localStorage.getItem("timer"));

let time_div=document.querySelector('#time');

let time_string;

if(time_div){
if(timer===10) {
    time_div.innerText="Time: 10:00";
    time_string="Time: 10:00";
}
else {
    time_div.innerText=`Time: 0${timer}:00`;
    time_string=`Time: 0${timer}:00`;
}
localStorage.setItem("time_string",time_string);
}

function replaceCharAtIndex(str,index,chr){ //for replacing characters at given index
    if(index>=str.length) return "";
    let sbs1=str.substring(0,index);
    let sbs2=str.substring(index+1);
    return sbs1+chr+sbs2;
}

//decrement function changes the time_string's time to time_string's time - 1.
async function decrement(s){ //changing the timer string each second
    return new Promise((resolve)=>
    {
    let i=s.length-1;
    while(s[i]==='0' || s[i]===':'){
        if(s[i]===':'){
            i--;
            continue;
        }
        else if(i===9){ //i took i=9 here because the 9th index of the timestring's range is from 0 to 5
            s=replaceCharAtIndex(s,i,'5');
            i--;
            continue;
        }
        s=replaceCharAtIndex(s,i,'9');
        i--;
    }
    let new_num=String(Number(s[i])-1);
    s=replaceCharAtIndex(s,i,new_num);
    time_div.innerText=s;
    resolve(s);
    }
);
}

async function elapseSecond(time,s){ //timer made using recursion

    if(time===0) { //terminating condition when timer hits 0
        location.href="index3.html";
        return;
    }

    setTimeout(async ()=>{ //setTimeout waits 1 second then decrements the time_string then same function is called again with time-1

        await decrement(s).then((new_string)=>{ //change of string happens here
            s=new_string;
        });

        localStorage.setItem("time_left",time-1); //calculating time left each second in case the paragraph ends early(used in result page).

        elapseSecond(time-1,s); //recurse to time-1 with a new time_string.

    },1000);
    
}



