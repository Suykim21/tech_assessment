
// Unflattened 
const obj = { 
    "books": [ 
        { 
            "name": "Harry Potter and the Philosopher's Stone", 
            "no": 1, 
        }, 
        { 
            "name": "Harry Potter and the Chamber of Secrets", 
            "no": 2, 
        }, 
    ], 
    "status": 200, 
    "matrix": [[1, 2, 3], [4, 5, 6],[7, 8, 9]]
}

// Flattened 
const flattenedObj = { 
    "books.0.name": "Harry Potter and the Philosopher's Stone", 
    "books.0.no": 1, 
    "books.1.name": "Harry Potter and the Chamber of Secrets", 
    "books.1.no": 2, 
    "status": 200, 
    "matrix.0.0": 1, 
    "matrix.0.1": 2, 
    "matrix.0.2": 3, 
    "matrix.1.0": 4, 
    "matrix.1.1": 5, 
    "matrix.1.2": 6
}

const source = {
    a: 1,
    b: {
      c: true,
      d: {
        e: 'foo'
      }
    },
    f: false,
    g: ['red', 'green', 'blue'],
    h: [{
      i: 2,
      j: 3
    }]
  }

/** Flattens js object.
 * @param {object} obj unflattend js object
 * @returns {object} flattend js object
 */
function flattenObj(obj) {
    try {
        let flattenedObj = {};
  
        // Loop through the object
        for (const i in obj) {
            
            if (typeof obj[i] !== 'object') {
                // Store key value pair when it does not contain nested objects
                flattenedObj[i] = obj[i];
            } else {
                // Recursive call to flatten nested object
                const innerObj = flattenObj(obj[i]);
                
                // Loop over nested object keys
                for (const j in innerObj) {
                    // Concat keys delimited by '.'
                    flattenedObj[`${i}.${j}`] = temp[j];
                }
            }
        }

        return flattenedObj;
    } catch (err) {
        console.error(`Error encountered at flattenObj function: ${err}`);
    }
}

/** Unflattens js object.
 * @param {object} obj flattened js object
 * @returns {object} unflattened js object
 */
 function unflattenObj(obj) {
     try {
        let unflattenedObj = {};

        // Loop over flattened keys
        for (key in obj) {
            let keys = key.split('.');
            let tempObj = unflattenedObj;

            for (let i = 0; i < keys.length - 1; i++) {

                // Check if key exists in temp object
                if (!(keys[i] in tempObj)) {
                    
                    // Check if the next key is an array index or object key
                    let isIndex = !isNaN(parseInt(keys[i + 1]));

                    if (isIndex) {
                        tempObj[keys[i]] = []; // Array
                    } else {
                        tempObj[keys[i]] = {}; // Object
                    }
                }
                // Update temp object to insert child object/array on next iteration
                tempObj = tempObj[keys[i]];
            }
            
            // Update object value
            tempObj[keys[keys.length - 1]] = obj[key]
        }

        return unflattenedObj;
     } catch (err) {
        console.error(`Error encountered at flattenObj function: ${err}`);
     }
};