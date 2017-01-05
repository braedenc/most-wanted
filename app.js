function initMostWanted(people){
	alert("Welcome to our Super Secret government search engine!");
	do{
		var searchType = prompt("Do you want to search by name or attributes? Enter word 'name' or 'attributes' here.")
	}while(!(searchType == "name" || searchType == "attributes" || searchType == "family"));
	switch(searchType){
		case "name":
			var listOfPeople = searchByName(prompt("What is the persons last name?"), prompt("And now the first name please?"), people);
			if(listOfPeople.length>0){
				mainMenu(listOfPeople[0],people);
			} else{
				alert("Please enter relevant search criteria.");
			}
		break;
		case "attributes":
			var gender = prompt("What is their gender? ");

			var occupation = prompt("What is their occupation?");
			
			var height = prompt("What is the height?");

			var weight = prompt("What is the weight?");

			var dob = prompt("What is the date of birth?");

			var eyeColor = prompt("What is the eye color?");

			searchByAttrs(gender, occupation, height, weight, dob, eyeColor, people);
			mainMenu()
		break;
		default:
		alert("There was an error processing your request.");
		initMostWanted(people);
	}
}


function searchByName(lastName, firstName, people){
    return people.filter(person => person.lastName === lastName && person.firstName === firstName);
}

function searchByAttrs(gender, occupation, height, weight, dob, eyeColor, people){
	return attrs.filter(person.gender === gender && person.occupation === occupation && person.height === height && person.weight === weight && 
		person.dob === dob && person.eyeColor === eyeColor)
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

function getPersonInfo(person, people){
	alert("Person: "+person.firstName+""+person.lastName+". Occupation: "+person.occupation+". Date of birth: "+person.dob+". Weight: "
		+person.weight+". Height: "+person.height+". Eye color: "+person.eyeColor+".");
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
