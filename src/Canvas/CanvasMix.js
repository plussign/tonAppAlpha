import { useRef } from 'react';

const QRCode = require('qrcode');

export const Canvas = (props) => {

    //const imageARef = useRef(null);
    const canvasRef = useRef(null);

    const genQRImage = (qrContent) => {
        return new Promise((resolve, reject) => {
            //console.log(qrContent)
            QRCode.toDataURL(qrContent, {
                errorCorrectionLevel : 'M',
                margin: 1,
                color:{light:'#ffffff00', dark:'#E3E3E3FF'},
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
        });
    };

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
            ctx.font = opt.font;
            ctx.textAlign = opt.align || 'start';
            ctx.fillStyle = opt.color || 'white';
            ctx.fillText(opt.text, width * opt.x, height * opt.y);
        }
    };

    return (
        <p>
            <canvas ref={canvasRef} width={props.width} height={props.height} /><br/>
            <button className='NormalButton' onClick={async() => {
                    
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.imageSmoothingEnabled = true;
              
                const { width, height } = canvas;
                context.clearRect(0, 0, width, height);

                const imgElements = [
                    { uri: 'img/Screenshot.png', x: 0, y: 0, cw: 1, ch: 1},
                    { uri: 'img/logo.png', x: 0.02, y: 0.01, sw: 0.2, sh: 0.2 },
                    { uri: 'img/VS.png', x: 0.35, y: 0.4 },
                    { text: "Rank 4", color: "rgba(255,255,255,1)", font: "48px Roboto", x:0.1, y: 0.3 },
                    { text: "Score: 22998", color: "rgba(0,255,255,1)", font: "36px Roboto", x:0.9, y: 0.68, align:'end' },
                    { qr : true, uri:'https://turnup.so/@tibbers', x: 0.05, y: 0.75, cw: 0.2 * height / width, ch: 0.2},
                ];
                
                for (let i = 0; i < imgElements.length; i++ ){
                    await drawCanvas(imgElements[i], context, width, height);
                }
                
                const imageQuality = 0.85
                const imageDataURL = canvas.toDataURL("image/jpeg", imageQuality);
                console.log(imageDataURL)
                /*
                const imageBlob = canvas.toBlob((blob)=>{
                    console.log(blob)
                },"image/jpeg", imageQuality);
                */
            }}>
            Draw Canvas
            </button>
        </p>
    );
}
  