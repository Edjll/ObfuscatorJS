const 	codeSource 			= document.getElementById('codeSource'),
 		codeObfuscated 		= document.getElementById('codeObfuscated'),
 		obfusctationButton 	= document.getElementById('obfusctationButton');

function obfuscation(code) {
	const 	secret 		= Math.floor(Math.random() * 1000),
 			variables 	= new Map();

	code =  code.replace(/$/, '\n')
				.replace(/((?<=('.*)) (?=(.*')))|((?<=(".*)) (?=(.*")))/g, '#@_@#')
				.replace(/((\/{2}.*?\n)|(\/\*.*\*\/))|(?<!(let|var|const|new|function|return))\s/gs, '')
				.replace(/#@_@#/g, ' ');

	code.match(/(?<=(let|var|const|function)\s)\w+(?=[,;=()])|((?<=\()\S(?!\);)(?=(,?.*\){)))/g).forEach(variable => {
		if (!variables.has(variable)) variables.set(variable, '_$' + (secret + variables.size * 19));
		const reg = new RegExp('(?<=[\\s;,(=<>}])' + variable + '(?=[=;,\\s+-/*()])', 'g');
		code = code.replace(reg, variables.get(variable));
	});;

	return code;
}

codeObfuscated.value = obfuscation(codeSource.value);
obfusctationButton.onclick = () => codeObfuscated.value = obfuscation(codeSource.value);