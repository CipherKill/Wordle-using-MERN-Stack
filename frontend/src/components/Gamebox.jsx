import {useState, useEffect} from 'react'
import Boxes from './Boxes'

function Gamebox(){

    useEffect(()=>{
        fetchData();
    },[]);
    
    //wordlist state
    const [WORD,setWord]=useState('');
    const [life,setLife]=useState(5);
    
    //fetch wordlists
    async function fetchData(){
        const URL='http://localhost:3000/wordlist.json';
        const response=await fetch(URL);
        const data=await response.json();
        setWord(data[parseInt(Math.random()*2314)]);        
    }


    //why is the function running 4 times?????
    //need to disable inputs after user inputs also
    function disableBoxRow(nodes){
        nodes.forEach(node=>{
            node.setAttribute('contentEditable','false');
            node.classList.remove('text-cursor');
            node.classList.add('locked-cursor');
        })
    }

    //check correct letters
    const checkCorrectLetters=(rowData)=>{
        let resultsObject=[];
        let resultsIndex=[1,1,1,1,1];
        rowData.forEach((data,id)=>{
            if(data===WORD[id]){
                resultsObject.push({letter:WORD[id],position:id});
                resultsIndex[id]=0;
            }
        })
        return checkMisplacedLetters(rowData,resultsObject,resultsIndex);
    };
    
    //check wrong letters
    const checkMisplacedLetters=(dataRow,matchedInfo,resultsIndex)=>{
        let cachedWord=WORD;
        matchedInfo.forEach(data=>{
            cachedWord=cachedWord.replace(data.letter,'#');
        });

        dataRow.forEach((data,id)=>{
            if(cachedWord.includes(data)){
                resultsIndex[id]=2;
                cachedWord=cachedWord.replace(data,'#');
            }
        })
        return resultsIndex;
    };

    //function to check correct and wrong values
    function checkInputs(rowData,nodeData){
        let results=checkCorrectLetters(rowData);
        disableBoxRow(nodeData);
        console.log(results);
        nodeData.forEach((node,id)=>{
            if(results[id]===0){
                node.classList.add('background-green');
            }
            else if(results[id]===2){
                node.classList.add('background-yellow');
            }
        })
    }

    
    const WORD_LENGTH=5;
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
                    checkInputs(handler,data);
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
            <h2 className=''>The word is {WORD}</h2>
            <h2 className='mb-5'>You only have {WORD_LENGTH} lives</h2>
            <Boxes lives='5'/>

        </div>
    );
}

export default Gamebox;