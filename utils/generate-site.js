const fs = require('fs');
const { resolve } = require('path');

const writeFile = fileContent => {
    return new Promise ((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
              reject(err);
            return;
            } 
            resolve ({
                ok:true,
                message:'File Created!'
            })
    });
    })
};

 const copyFile = scriptCopy => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./style.css', './dist/style.css',err => {
            if (err) {
               reject(err);
               return;
            }
            resolve ({
                ok:true,
                message:'File Created!'
         });
    })
 })
}

module.exports = { writeFile, copyFile };
// const sampleHtml = '<h1> this will be written to the file</h1>'
// writeFile (sampleHtml)
// .then (successfulResponse => {
//     console.log(successfulResponse);
// })
// .catch (errorResponse => {
//     console.log(errorResponse);
// })



 
//     console.log('Portfolio complete! Checkout index.html to see the output!');
