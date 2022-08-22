import {useState, useEffect} from 'react'
import Boxes from './Boxes'

function Gamebox(){

    useEffect(()=>{
        fetchData();
    },[]);

    //wordlist state
    const [wordlist,setWords]=useState([]);
    const [life,setLife]=useState(5);
    
    async function fetchData(){
        const URL='http://localhost:3000/wordlist.json';
        const response=await fetch(URL);
        const data=await response.json();
        setWords(data);
    }

    const getRandomWord=()=>wordlist[parseInt(Math.random()*2314)];

    const word=getRandomWord();
    
    //main logic
    const lifeOne=document.querySelectorAll('.box0');
    const lifeTwo=document.querySelectorAll('.box1');
    const lifeThree=document.querySelectorAll('.box2');
    const lifeFour=document.querySelectorAll('.box3');
    const lifeFive=document.querySelectorAll('.box4');
    
    const lifeMatrix=[lifeOne,lifeTwo,lifeThree,lifeFour,lifeFive];
    const lifeData={one:[],two:[],three:[],four:[],five:[]}

    //for the event listeners
    lifeMatrix.forEach((data,mid)=>{
        let handler;
        if(mid===0){handler=lifeData.one}
        else if(mid===1){handler=lifeData.two}
        else if(mid===2){handler=lifeData.three}
        else if(mid===3){handler=lifeData.four}
        else if(mid===4){handler=lifeData.five}

        data.forEach((box,id,array)=>{
            if(id===(array.length-1)){
                box.addEventListener('input',(e)=>{
                    handler.push(e.data);
                    console.log(lifeData);
                })
            }
            else{
                box.addEventListener('input',(e)=>{
                    handler.push(e.data);
                })      
            }
        })
    });


    

    //game gives 5 lives
    return (
        <div className='game-box'>
            <h2 className=''>The word is {word}</h2>
            <h2 className='mb-5'>You only have 5 lives</h2>
            <Boxes lives='5'/>

        </div>
    );
}

export default Gamebox;