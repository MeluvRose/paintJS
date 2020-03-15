const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// 배경을 칠하지 않고 이미지를 저장했을 시 초기 배경 색이 설정되어 있어야 함(안하면 흰 색 바탕이 나오지 X)

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//ctx.fillRect(50, 20, 100, 49);


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
        // console.log("creating path in", x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        // console.log("creating line in", x, y);
    }
}

function handleColorClick(event){
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
 
function handleRangeChange(event){
    // console.log(event);
    //console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
        //ctx.fillStyle = cts.strokestyle;
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault(); // 이벤트가 끝나게 두는 대신
} // 마우스 우클릭 방지

function handleSaveClick(){
    const image = canvas.toDataURL();
    //console.log(image);
    const link = document.createElement("a"); // 링크 생성
    link.href = image; 
    link.download = "HelloPaintJS[🖌]";
    //console.log(link);
    link.click();

}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(save){
    save.addEventListener("click",handleSaveClick);
}
