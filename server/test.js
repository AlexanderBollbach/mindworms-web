function testPromise() {
	
	return new Promise((res, rej) => {
		res("hi")
	})
}

function doWithString(string) {

	return testPromise().then(val => {
		
		console.log(string)
	})
}


closeTestPromise()

.then(doWithString)