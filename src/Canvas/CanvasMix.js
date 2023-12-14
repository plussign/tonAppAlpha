import { useRef, useState, useEffect } from 'react';

const QRCode = require('qrcode');
const drawMultilineText = require('./canvas-multiline-text-mod')

export const Canvas = (props) => {

    //const imageARef = useRef(null);
    const canvasRef = useRef(null);

    const [canvasDraw, setCanvasDraw] = useState(false);
    const [canvasBlobUri, setCanvasBlobUri] = useState();

    useEffect(()=>{
        if (canvasBlobUri) {
            var link = document.createElement("a");
            link.download = "turnupShare.jpg";
            link.href = canvasBlobUri;
            link.click();

            URL.revokeObjectURL(canvasBlobUri);
        }
    }, [canvasBlobUri]);

    const genQRImage = (qrContent) => {
        return new Promise((resolve, reject) => {
            //console.log(qrContent)
            QRCode.toDataURL(qrContent, {
                errorCorrectionLevel : 'M',
                margin: 1,
                color:{light:'#ffffff00', dark:'#FFFFFFD0'},
            }, (err, url)=>{
                //console.log(url)
                if (err) {
                    reject(new Error(`QRCode.toDataURL ${qrContent} fail`));
                } else {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`load ${url} fail`));
                    img.src = url;
                }
            });
        });
    };

    // It's better to use async image loading.
    const loadImage = url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`load ${url} fail`));
            img.src = url;
            console.log(url);
        });
    };
/*
    const loadImageRequire = url =>{
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`load ${url} fail`));
            img.src = require("assets/images/resultImg/missionEnd1_1.png");
        });
    };*/

    const drawCanvas = async(options, ctx, width, height) => {
        // And this is the key to this solution
        // Always remember to make a copy of original object, then it just works :)
        const opt = Object.assign({}, options);

        if (opt.uri)  {
            const fn = !opt.qr ? loadImage : genQRImage;
            return fn(opt.uri).then(img => {
                ctx.drawImage(
                    img,
                    width * opt.x,
                    height * opt.y,
                    opt.cw ? opt.cw * width : (opt.sw || 1.0) * img.width,
                    opt.ch ? opt.ch * height : (opt.sh || 1.0) * img.height);
    
            }).catch(e=>console.log(e));
        } else if (opt.text) {
            //ctx.font = opt.font;
            //ctx.textAlign = opt.align || 'start';
            ctx.fillStyle = opt.color || 'white';
            //ctx.fillText(opt.text, width * opt.x, height * opt.y);

            const fontSizeUsed = drawMultilineText(
                ctx,
                opt.text,
                {
                    rect: {
                        x: width * opt.x,
                        y: height * opt.y,
                        width: opt.cw ? opt.cw * width : width,
                        height: opt.ch ? opt.ch * height : height,
                    },
                    font: opt.font || 'Arial',
                    verbose: false,
                    lineHeight: 1.4,
                    minFontSize: 30,
                    maxFontSize: 40,
                }
            )
        }
    };

    return (
        <p>
            <canvas ref={canvasRef} width={props.width} height={props.height} style={{width:"90%", borderRadius:"22px"}}/><br/>
            <button className='NormalButton' onClick={async() => {
                    
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.imageSmoothingEnabled = true;
              
                const { width, height } = canvas;
                context.clearRect(0, 0, width, height);

                const imgElements = [
                    { uri: require('../assets/images/resultImg/missionEnd1_1.png'), x: 0.705, y: 0, cw: 0.295, ch: 1 },
                    { uri: require('../assets/images/twittercard/card_bg.png'), x: 0, y: 0, cw: 1, ch: 1},
                    //{ uri: 'img/logo.png', x: 0.02, y: 0.01, sw: 0.2, sh: 0.2 },
                    { text: 'Oops! Cryptos are poisoned! <br> Run away Now! <br> You CAN JOIN TURNUP to EARN more cryptos!', color: "#FFFFFFE0", font: "sans-serif", x:0.05, y: 0.45, cw:0.6, ch: 0.5 },
                    //{ text: "Score: " + Math.floor(Math.random() * 100000), color: "rgba(0,255,255,1)", font: "36px Roboto", x:0.9, y: 0.68, align:'end' },
                    { qr : true, uri:'https://turnup.so/@tibbers', x: 0.51, y: 0.05, cw: 0.3 * height / width, ch: 0.3},
                ];
                
                for (let i = 0; i < imgElements.length; i++ ){
                    await drawCanvas(imgElements[i], context, width, height);
                }
                
                const imageQuality = 0.85
                const imageDataURL = canvas.toDataURL("image/jpeg", imageQuality);
                //console.log(imageDataURL)

                setCanvasDraw(true);
            }}>
            Draw Canvas
            </button>
            {canvasDraw && <>&nbsp;&nbsp;&nbsp;<button className='NormalButton' onClick={()=>{
                const canvas = canvasRef.current;

                canvas.toBlob((blob)=>{
                    const url = URL.createObjectURL(blob);
                    setCanvasBlobUri(url);
                },"image/jpeg", 0.98);
            }}>Download</button></>}
        </p>
    );
}
  