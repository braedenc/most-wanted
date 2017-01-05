function initMostWanted(people){
	alert("Welcome to our Super Secret government search engine!");
	do{
		var searchType = prompt("Do you want to search by name, attributes or family? Enter word 'name', 'attributes' or 'family' here.")
	}while(!(searchType == "name" || searchType == "attributes" || searchType == "family"));
	switch(searchType){
		case "name":
			var person = searchByName(prompt("What is the persons last name?"), prompt("And now the first name please?"), people);
			mainMenu(person, people);
		break;
		case "attributes":
			var gender = prompt("What is their gender? ");

			var occupation = prompt("What is their occupation?");
			
			var height = prompt("What is the height?");

			var weight = prompt("What is the weight?");

			var age = prompt("What is the age?");

			var eyeColor = prompt("What is the eye color?");

			searchByAttrs(gender, occupation, height, weight, age, eyeColor, people);
		break;
		case "family":
			var currentSpouse = prompt("Who is their spouse?");

			var parents = prompt("Do they have parents?");

			

			searchByFam(parents, currentSpouse);
		break;
		default:
		alert("There was an error processing your request.");
		initMostWanted(people);
	}
}


function searchByName(firstName, lastName, people){
	var namefilter = people.filter(getPersonName);
	mainMenu(people);
	return namefilter;
}

function mainMenu(person, people){
	var displayOption = prompt("Would you like to know the persons 'info', 'family', next of 'kin', or 'descendants'? Type the option you want or 'restart' or 'quit'");
	switch(displayOption){
		case "info":
			getPersonInfo(person, people);
			break;
		case "family":

			break;
		case "kin":

			break;
		case "descendants":

			break;
		case "restart":
			initMostWanted(people)
			break;
		case "quit":
			return;
			break;
		default:
		alert("Please enter valid search criteria.");
		
	}
	

}
function searchByAttrs(gender, occupation, height, weight, age, eyeColor, people){

}

function searchByFam(currentspouse, parents, people){

}

function getPersonName(person, people){
	person => person.firstName === firstName && person.lastName === lastName
}

function getPersonInfo(person, people){
	alert("Person:"+person.firstName+""+person.lastName+". Their occupation is "+person.occupation+". Their date of birth is "+person.DOB+". Their weight is "
		+person.weight+". Their height is "+person.height+". Their eye color is "+person.eyeColor+".");
}

function getFamily(person, people){
	alert("")
}

function restart(){

}

function quit(){

}

function namefilter(){

}
