

import * as kaloja from './data/kaloja_data_3.js';
import * as paikannimia from './data/paikannimia_data_3.js';
import * as kotus from './data/kotus_data_3.js';
import * as utils from './utils.js';

const result_el = document.getElementById('results');



function display_results(results) {
    const list_style = "px-4 py-2 bg-white border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out";
    result_el.innerHTML = results.map( r => `<li class="${list_style}">${r}</li>`).join('');
}

document.getElementById('location_names').addEventListener('click', ev => {
    display_results(generateTen(paikannimia.default.prob).map(p => p[0].toLocaleUpperCase() + p.substring(1)));
});


document.getElementById('fish_names').addEventListener('click', ev => {
    display_results(generateTen(kaloja.default.prob));
});


document.getElementById('words').addEventListener('click', ev => {
    display_results(generateTen(kotus.default.prob));
});


function generateTen(prob) {
    var result = [];
    for(var i = 0; i < 10; i++) {

        result.push(utils.default.generate(prob, 7 + 10 * Math.random()));
    }
    return result;
}
        
display_results(generateTen(kotus.default.prob));

