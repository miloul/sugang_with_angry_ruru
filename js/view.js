module.exports = {
    printScreen : function(title, body){
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="/firstpage.css">
                <title>${title}</title>
            </head>
            <body>
                ${body}
            </body>
        </html>
        `;
    }
}