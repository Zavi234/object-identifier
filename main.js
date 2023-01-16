status=""
object=[]

function preload()
{
    video= createVideo("video.mp4")
    video.hide()
    video.loop()
}

function setup()
{
    canvas= createCanvas(550,380)
    canvas.position(400,245)
}

function draw()
{
    image(video,0,0,550,380)

    if(status!="")
    {
        loadModel.detect(video,gotresult)

        document.getElementById("status").innerHTML="Status: objects detected"
        document.getElementById("count").innerHTML= "Numbe of objects detected are: "+object.length

        for(i=0; i< object.length; i++)
        {
            objectx= object[i].x
            objecty= object[i].y
            objecth= object[i].height
            
            objectw= object[i].width
            objectname= object[i].label
            objectcon= object[i].confidence
            
            confidencepercent=floor(objectcon*100)
            
            fill("#31FF7F")
            text(objectname+" "+confidencepercent+"%",objectx,objecty)
            noFill()
            stroke("red")
            rect(objectx,objecty,objectw,objecth)
        }
    }
}

function start()
{
    loadModel= ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting objects..."

}

function modelLoaded()
{
    console.log("Model has loaded")
    status=true

    video.volume(0)
    video.speed(1)
}

function gotresult(error,result)
{
    if(error)
    {
        console.error(error)
    }
    else
    {
        console.log(result)
        object=result
    }
}