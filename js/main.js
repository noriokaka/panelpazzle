"use strict";
document.addEventListener("DOMContentLoaded",()=>{
    const size=4;//盤面の大きさ
    const difficulty=500;//シャッフルの複雑さ
    const shuffleCount=size*difficulty;
    const table=document.getElementById("table");
    const msgBox=document.getElementById("msgBox");
    const startBt=document.getElementById("startBt");
    let panels;//td要素を格納する配列
    let emptyIdx;//現在の空のindexを保持

    const init = ()=>{
        panels=[];
        table.textContent=null;
        msgBox.textContent=null;
        createStage();
    };
    const createStage=()=>{
        for(let i=0;i<size;i++){
            const tr=document.createElement("tr");
            for(let j=0;j<size;j++){
                const td=document.createElement("td");
                td.posId=i*size+j;
                td.textContent=td.posId+1;
                if(td.posId==size*size-1){
                    td.textContent="";
                    td.classList.add("empty");
                    emptyIdx=td.posId;
                }
                td.onclick=click;
                tr.append(td);
                panels.push(td);
            }
            table.append(tr);
        }
    };
    startBt.addEventListener("click",()=>{
        for(let i=0;i<shuffleCount;i++){
            const dir=Math.floor(Math.random()*4);//0上,1右,2下,3左
            switch(dir){
                case 0:
                    if(emptyIdx<size){continue;}
                    swap(emptyIdx-size,emptyIdx);
                    emptyIdx-=size;
                    break;
                case 1:
                    if((emptyIdx+1)%size===0){continue;}
                    swap(emptyIdx+1,emptyIdx);
                    emptyIdx++;
                    break;
                case 2:
                    if(emptyIdx>=size*(size-1)){continue;}
                    swap(emptyIdx+size,emptyIdx);
                    emptyIdx+=size;
                    break;
                case 3:
                    if(emptyIdx%size===0){continue;}
                    swap(emptyIdx-1,emptyIdx);
                    emptyIdx--;
                    break;
            }
        }
        check();
    });
    const swap=(numPos,empPos)=>{
        panels[empPos].textContent=panels[numPos].textContent;
        panels[empPos].classList.remove("empty");
        panels[numPos].textContent="";
        panels[numPos].classList.add("empty");
    };
    const click=(e)=>{
        const pos=e.target.posId;
        if(pos>=size && panels[pos-size].textContent===""){
            swap(pos,pos-size);
        }else if((pos+1)%size !== 0 && panels[pos+1].textContent===""){
            swap(pos,pos+1);
        }else if(pos<size*(size-1) && panels[pos+size].textContent===""){
            swap(pos,pos+size);
        }else if(pos%size!==0 && panels[pos-1].textContent===""){
            swap(pos,pos-1);
        }
        check();
    };
    const check=()=>{
        let okCount=0;
        for(let i=0;i<panels.length;i++){
            if(panels[i].posId===parseInt(panels[i].textContent-1)){
                okCount++;
                panels[i].classList.add("ok");
            }else{
                panels[i].classList.remove("ok");
            }
        }
        if(okCount===size*size-1){
            msgBox.textContent="Compleate!";
        }
    };
    init();
});