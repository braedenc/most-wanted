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
				initMostWanted(people);
			}
		break;
		case "attributes":
			var listOfAttrs = searchByAttrs(prompt("What is their gender? "), prompt("What is their occupation?"), prompt("What is the height?"), prompt("What is the weight?"), prompt("What is the date of birth?"), prompt("What is the eye color?"), people);
			if (listOfAttrs.length>0) {
				mainMenu(listOfAttrs[0],people);
			} else{
				alert("Please enter relevant search criteria.");
				initMostWanted(people);
			}
		
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
	return people.filter(person =>person.gender === gender && person.occupation === occupation && person.height.toString() === height && person.weight.toString() === weight && 
		person.dob === dob && person.eyeColor === eyeColor)
}

function mainMenu(person, people){
	var displayOption = prompt("found" + person.firstName + person.lastName +"\nWould you like to know the persons 'info', 'family', next of 'kin', or 'descendants'? Type the option you want or 'restart' or 'quit'");
	switch(displayOption){
		case "info":
			getPersonInfo(person, people);
			break;
		case "family":
			getFamily(person, people);
			break;
		case "kin":
			getKin(person, people);
			break;
		case "descendants":
			var descendants = getDescendants(person, people);
			for(var i = 0; i < descendants.length; i++){
				alert("Descendants: " + descendants[i].firstName + " " + descendants[i].lastName);
			}
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
	alert("Person: "+person.firstName+" "+person.lastName+"\nOccupation: "+person.occupation+"\nDate of birth: "+person.dob+"\nWeight: "
		+person.weight+"\nHeight: "+person.height+"\nEye color: "+person.eyeColor+".");
	mainMenu(person, people)
}

function getFamily(person, people){
	alert("Family: Parents- "+person.parents+", Spouse- "+person.currentSpouse+"")
}

function getKin(){

}

function getDescendants(parent, people){
	var kids = people.filter(function(person) {
		if(person.parents[0] == parent.id){
			return true;
		} else if(person.parents[1] == parent.id){
			return true;
		} else {
			return false;
		}
	});
	return kids;
}

function quit(){

}

function getParents(person,people){
}
