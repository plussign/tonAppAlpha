import { useRef, useEffect } from 'react';

export const Canvas = (props) => {

    const imageARef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
    }, []);

    // It's better to use async image loading.
    const loadImage = url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`load ${url} fail`));
            img.src = url;
        });
    };

    // Here, I created a function to draw image.
    const drawCanvas = options => {
        const canvas = canvasRef.current;
        const { width, height } = canvas;
        const ctx = canvas.getContext('2d');
        // And this is the key to this solution
        // Always remember to make a copy of original object, then it just works :)
        const opt = Object.assign({}, options);

        return loadImage(opt.uri).then(img => {
            ctx.drawImage(
                img, width * opt.x,
                height * opt.y,
                opt.cw ? opt.cw * width : (opt.sw || 1.0) * img.width,
                opt.ch ? opt.ch * height :(opt.sh || 1.0) * img.height);

        }).catch(e=>Console.log(e));
    };

    return (
        <p>
            <canvas ref={canvasRef} width={props.width} height={props.height} /><br/>
            <button style={{ marginTop: "6px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }} onClick={async() => {
                    
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                //context.fillStyle = 'black';
                const { width, height } = canvas;
                context.clearRect(0, 0, width, height);

                //context.drawImage(imageARef.current, 0, 0);
                //const vsimg = require(window?.location.origin+"/img/vs.png")
                //console.log(vsimg)
                const imgs = [
                    { uri: './img/Screenshot.png', x: 0, y: 0, cw: 1, ch: 1},
                    { uri: './img/logo.png', x: 0.02, y: 0.01, sw: 0.2, sh: 0.2 },
                    { uri: './img/VS.png', x: 0.35, y: 0.4 }
                  ];
                  
                imgs.forEach(drawCanvas);
            }}>
            Draw Canvas
            </button>
        </p>
    );
}
  