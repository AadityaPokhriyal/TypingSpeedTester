//page 3 results
let wpm=document.querySelector("#wpm");
let spm=document.querySelector("#spm");
let correct_percent=document.querySelector("#correct");
let incorrect_percent=document.querySelector("#incorrect");

if(wpm){
    let time=Number(localStorage.getItem("timer"))*60-Number(localStorage.getItem("time_left"));
    let correct_letters=Number(localStorage.getItem("right"));
    let words_per_min=(correct_letters*60)/(time*5); //divided by 5 as an average word is 5 letters.
    wpm.innerText=`Words Per Minute: ${words_per_min}`;
}
if(spm){
    let time=Number(localStorage.getItem("timer"))*60-Number(localStorage.getItem("time_left"));
    let strokes=Number(localStorage.getItem("presses"));
    let strokes_per_min=(strokes*60)/time;
    spm.innerText=`Strokes Per Minute: ${strokes_per_min}`;
}
if(correct_percent){
    let correct_letters=Number(localStorage.getItem("right"));
    let incorrect_letters=Number(localStorage.getItem("wrong"));
    let correct_percentage=(correct_letters*100)/(incorrect_letters+correct_letters);
    correct_percent.innerText=`Correct Percentage: ${correct_percentage.toFixed(2)}%`;
}
if(incorrect_percent){
    let correct_letters=Number(localStorage.getItem("right"));
    let incorrect_letters=Number(localStorage.getItem("wrong"));
    let incorrect_percentage=(incorrect_letters*100)/(incorrect_letters+correct_letters);
    incorrect_percent.innerText=`Incorrect Percentage: ${incorrect_percentage.toFixed(2)}%`;
}