
function get_next(probabilities, leader, try_to_end) {

    if(try_to_end && probabilities[leader]['$']) { return '$'; }

    let next = probabilities[leader];
    var rand = Math.random();
    var p;

    for(var i = 0; i < Object.keys(next).length; i++) {
        p = Object.keys(next)[i];

        if(rand < next[p]) {
            return p;
        } else {
            rand -= next[p];
        }
    };
    return p;
}

function generate(probabilities, suggested_length) {
    const lead_len = probabilities.lead_len;
    var leader = '^'.repeat(lead_len);
    var result = '';
    while(true) {
        var next_char = get_next(probabilities, leader, result.length > suggested_length);
        if(next_char == '$') return result;
        result += next_char;
        leader = leader.substring(1,lead_len) + next_char;
        
    } 
}


function generateProbabilities(fileContents, lead_len) {
  
  var probabilities = {}

  fileContents.forEach( word => {
      let pad_word = '^'.repeat(lead_len) + word + '$';
      for(let i = lead_len; i < pad_word.length; i++) {
          let key = pad_word.substring(i-lead_len,i);
          if(!probabilities[key]) {
              probabilities[key] = {}
          }
          if(probabilities[key][pad_word[i]]) {
              probabilities[key][pad_word[i]] += 1;
          } else {
              probabilities[key][pad_word[i]] = 1;
          }

      }

  });

  Object.keys(probabilities).forEach( leader => {
      Object.keys(probabilities[leader]).forEach( possibility => {
          if(possibility != '$') {
              if(!probabilities[leader.substring(1,lead_len) + possibility]) {
                  probabilities[leader][possibility] = 0;
              }
    
          }
      })
  });

  Object.keys(probabilities).forEach( leader => {
      var total = 0;
      Object.keys(probabilities[leader]).forEach( possibility => {
          total += probabilities[leader][possibility];
      });
      Object.keys(probabilities[leader]).forEach( possibility => {
          probabilities[leader][possibility] /= total;
      })
  });

  probabilities.lead_len = lead_len;

  return probabilities;
}

export default  { get_next, generate, generateProbabilities };
