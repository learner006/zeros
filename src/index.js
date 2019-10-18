 function say(p_text) {
	console.log(p_text);
}

function getDivisorsCount(p_num, p_divisor) {
	let out_Count = 0;

	while(p_num > 1 && p_num % p_divisor == 0)
	{
		p_num /= p_divisor;
		++out_Count;
	}

	return out_Count;
}

//say(getDivisorsCount(10,2));
//process.exit();


function get2and5CountsForFactorial(
	p_facNum, 
	p_isDoubleFac,
	p_count2Arr,
	p_count5Arr

)
{
    if (p_facNum == 0)
    	p_facNum = 1;

	p_count2Arr[0] = 0;
	p_count5Arr[0] = 0;

	// It is a traditional factorial :-)
	if (!p_isDoubleFac) {
		for(let n = 1; n <= p_facNum; ++n)
		{
			p_count2Arr[0] += getDivisorsCount(n,2);
			p_count5Arr[0] += getDivisorsCount(n,5);
		}
	}
	else
	{
		// A 'step over' ;-) factorial
		for(let n = p_facNum; n >= 2; n = n - 2)
		{
			p_count2Arr[0] += getDivisorsCount(n,2);
			p_count5Arr[0] += getDivisorsCount(n,5);
		}
	}
	
}

module.exports = function zeros(p_expression) {

	let pretokenArr = p_expression.match(/\*?\d+!!?/g);

	if (pretokenArr === null)
		return 0;
	
	let counts = {'2': 0, '5': 0};

	for(let preToken of Object.values(pretokenArr))
	{
        // Example
        // [ '55!!', '55', '!!', index: 0, input: '55!!', groups: undefined ]

		let num_fac_pair = preToken.match(/(\d+)(!!?)/);
		let num = num_fac_pair[1];
		// [!] num_fac_pair[2] ;-)
		let isDoubleFac = (num_fac_pair[2].length == 2);

		
		let count2Arr = [0];
		let count5Arr = [0];

		get2and5CountsForFactorial(num,isDoubleFac,count2Arr,count5Arr);

		counts["2"] += count2Arr[0];
		counts["5"] += count5Arr[0];
	}

	return Math.min(counts["2"],counts["5"]);
}