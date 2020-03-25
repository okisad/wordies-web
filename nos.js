var fs = require('fs');
var axios = require('axios');

console.log('This example is different!');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});



const fetch = async () => {
    for (var i = 1; i < 3500; i++) {
        let response = await axios.get('https://www.english.com/gse/teacher-toolkit/user/api/v1/vocabulary/search?filters=%7B%22gseRange%22:%7B%22from%22:%2230%22,%22to%22:%2285%22%7D,%22topics%22:%5B%5D,%22audiences%22:%5B%22GL%22%5D,%22grammaticalCategories%22:%5B%5D%7D&page='+i+'&query_string=*&sort=gse');
        let words = response.data.data;
        console.log(i + '/' + 3500);
        for(const w of words){
            if(w && w.expression && w.expression.length > 0){
                await axios.get('http://localhost:8080/words/'+w.expression);
                fs.appendFile('words.txt', w.expression + '\n', function (err) {
                    if (err) throw err;
                    //console.log('Saved!');
                });
            }
        }
    }    
};

fetch();