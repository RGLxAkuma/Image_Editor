const inp = document.querySelectorAll('.rng');
const val = document.querySelectorAll('.value');
const img_user = document.querySelector('#img-user');
const img_input = document.querySelector('#img-def');
const rotateLeft = document.querySelector('.two');
const rotateRight = document.querySelector('.one');
const save = document.querySelector('.save');
const img1 = document.querySelector('img');
const reset = document.querySelector('.reset');
let up_img = "";
let brightness=100 , contrast=100 , saturation=100 , grayscale=0;
let global = 0;

img_input.addEventListener("change" , function(){
    const reader = new FileReader();
    if(!reader) return;
    reader.addEventListener("load" , function(){
        up_img = reader.result;
        img1.src = `${up_img}`;
    })
    reader.readAsDataURL(this.files[0]);
})



for(let i=0;i<inp.length;i++)
{
    val[i].textContent = inp[i].value;
    
    inp[i].addEventListener("input" , function(){
        val[i].textContent = inp[i].value;
        if(inp[i].id === "bright")
        {
            // console.log(inp[i].val);
            brightness = inp[i].value;
            // img_user.style.filter = `brightness(${inp[i].value}%)`;
            
        }
        if(inp[i].id === 'contra')
        {
            contrast = inp[i].value;
            // img_user.style.filter = `contrast(${inp[i].value}%)`;
        }
        if(inp[i].id === 'satu')
        {
            saturation = inp[i].value;
            // img_user.style.filter = `saturation(${inp[i].value}%)`;
        }
        if(inp[i].id === 'grayscale')
        {
            grayscale = inp[i].value;
            // img_user.style.filter = `grayscale(${inp[i].value}%)`;
        }
        img1.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%)`;
    })
}


let rtr1 = 0;
rotateLeft.addEventListener("click" , function(){
    rtr1 = rtr1 - 90;
    img1.style.transform = `rotate(${rtr1}deg)`;
})

rotateRight.addEventListener("click" , function(){
    rtr1 = rtr1 + 90;
    img1.style.transform = `rotate(${rtr1}deg)`;
})




reset.addEventListener("click", function(){
    global=1;
    img1.style.filter = `brightness(${100}%) contrast(${100}%) saturate(${100}%) grayscale(${0}%)`;
    let res=100;
    for(let i=0;i<inp.length;i++)
    {
        if(i==inp.length-1)
        {
            res=0;
        }
        val[i].textContent = res;
        inp[i].value=res;
    }
})



save.addEventListener("click" , function(){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img1.naturalWidth;
    canvas.height = img1.naturalHeight;
    if(global===1)
    {
        ctx.filter = `brightness(${100}%) contrast(${100}%) saturate(${100}%) grayscale(${0}%)`;
    }
    else
    {
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%)`;
    }
    
    if(rtr1 !==0)
    {
        ctx.rotate(rtr1 * Math.PI/180);
       
    }
    ctx.translate(canvas.width/2 , canvas.height/2);
    ctx.drawImage(img1 , -canvas.width/2 , -canvas.height/2 , canvas.width , canvas.height);

    const link = document.createElement("a");
    link.download = "image_edited.jpg";
    link.href = canvas.toDataURL();
    link.click();
})




