/**
* Write string preparation function, which fill template in with data from specified object
*
* Data object
* 	user: {
* 	id: 20
* 	type_id: 'test'
* }
*
* Template: /api/items/%id%/%type_id%
* Expected result: /api/items/20/test
*/
const user = {
	id: 20,
	name: "John Dow",
	role: "QA",
	salary: 100
};

const apiTemplatesSet1 = [
	"/api/items/%id%/%name%",
	"/api/items/%id%/%role%",
	"/api/items/%id%/%salary%",
	// "/api/items/%id%/%notexists%" // uncomment for testing
];

const apiPathes = apiTemplatesSet1.map(apiPathTemplate => {
	return getApiPath(user, apiPathTemplate);
});

/** Result of the test task is this function: */
function getApiPath(obj, template) {
	return template.replace(/\%([a-z]+)\%/g, (origin, fieldName) => {
		if (user[fieldName] === undefined) {
			throw new Error("User object doesn't contain following field: " + fieldName);
		}
		return user[fieldName];
	});

	/**
	If we don't want to throw any exceptions and handle any errors we can just write the code like this:

	return template.replace(/\%([a-z]+)\%/g, (origin, fieldName) => {
		return user[fieldName];
	});	
	*/

	/**
		Also we can split URI by '/' delimiter. Not sure what is better, regexp or split.
	*/
}

console.log(JSON.stringify(apiPathes));

/**
* expected:
* ["/api/items/20/John%20Dow","/api/items/20/QA","/api/items/20/100"]
*/

