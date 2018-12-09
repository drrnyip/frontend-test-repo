// Algorithm searches string s, for characters a and b, and returns the character that has the highest index. If none is found, returns -1.
// The original function needlessly goes through the entire string, even though it is only looking for the match with the greater index. 
// In its best case scenario, it will still traverse O(n), even if the last character of the string is a match

// The refactored algorithm has a best case scenario of O(1), and a worst case of O(n), since it returns the index of the first match. 
// Else, it will return -1 after traversing the whole string.

function func(s, a, b) {

	if (s.match(/^$/)) {
		return -1;
	}
	
	var i = s.length -1;
	var aIndex =     -1;
	var bIndex =     -1;
	
	while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {
	    if (s.substring(i, i +1) == a) {
	    	aIndex = i;
    	}
	    if (s.substring(i, i +1) == b) {
	    	bIndex = i;
    	}
	    i = i - 1;
	}
	
	if (aIndex != -1) {
	    if (bIndex == -1) {
	        return aIndex;
	    }
	    else {
	        return Math.max(aIndex, bIndex);
	    }
	}
	
	if (bIndex != -1) {
	    return bIndex;
	}
	else {
	    return -1;
    }
}

const refactor = (s, a, b) => {
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === a || s[i] === b) {
            return i;
        }
    }
    return -1;
}

const s = '134dfsaf314314bn';
const a = 'n';
const b = '3';

console.log(`Original: ${func(s, a, b)}`);
console.log(`Refactor: ${refactor(s, a, b)}`);

