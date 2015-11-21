export default function(url, callback, outputFormat){
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        let canvas = document.createElement('CANVAS');
        const ctx = canvas.getContext('2d');
        let dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
