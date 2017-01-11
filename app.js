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
			var dob = prompt("Do you know the persons date of birth? If not then leave blank.");
			var height = prompt("What is their height?(in inches) If not then leave blank.");
			var weight = prompt("What is their weight?(in pounds) If not then leave blank.");
			var gender = prompt("What is their gender? If not then leave blank.");
			var eyeColor = prompt("What is their eye color? If not then leave blank.");
			var occupation = prompt("What is their occupation? If not then leave blank.");
			var filteredList = searchByAttributes(dob, height, weight, gender, eyeColor, occupation, people);
			var selectedPerson = pickPerson(filteredList);
			mainMenu(selectedPerson, people);
		
		break;
		default:
		alert("There was an error processing your request.");
		initMostWanted(people);
	}
}


function searchByName(lastName, firstName, people){
    return people.filter(person => person.lastName === lastName && person.firstName === firstName);
}

function pickPerson(filteredList){
	if(filteredList.length>1){
		var message = " ";
		for (var i=0; i<filteredList.length; i++){
				message += (i +": "+filteredList[i].firstName+ " " +filteredList[i].lastName+"  ");
		}
	}
	alert(message);
	var chosenPerson = prompt("Type the number of the person you would like to know more about?");
	 return filteredList[chosenPerson];
}

function searchByAttributes(dob, height, weight, gender, eyeColor, occupation, people){
	return people.filter(function(person){
		if (height && (height != person.height)){
			return false;
		} if (weight && (weight != person.weight)){
			return false;
		} if (dob && (dob != person.dob)){
			return false;
		} if (gender && (gender != person.gender)){
			return false;
		} if (eyeColor && (eyeColor != person.eyeColor)){
			return false;
		} if (occupation && (occupation != person.occupation)){
			return false;
		}
		return true;
	});
}

function mainMenu(person, people){
	var displayOption = prompt("Found: "+person.firstName+" "+person.lastName+"\nWould you like to know the persons 'info', 'family', next of 'kin', or 'descendants'? Type the option you want or 'restart' or 'quit'");
	switch(displayOption){
		case "info":
			getPersonInfo(person, people, getDescendants);
			break;
		case "family":
			getFamily(person, people);
			break;
		case "kin":
			getKin(person, people);
			break;
		case "descendants":
			var descendants = getDescendants(person, people);
			var message = "Descendants: "
			for(var i = 0; i < descendants.length; i++){
				message +="\n" + descendants[i].firstName + " " +descendants[i].lastName+ " ";
				}
			alert(message);
			mainMenu(people, person);

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

function getFamily(person, people, callback){
	var kids = getDescendants(person, people);
	var siblings = getSiblings(person, people);
	var message = "Family:\nParents- "+person.parents+"\nSpouse- "+person.currentSpouse+"";
	for(var i = 0; i<kids.length; i++){
		message += "\nChildren- "+kids[i].firstName+" "+kids[i].lastName+"";
	}
	for(var i = 0; i<siblings.length; i++){
		message += "\nSiblings- "+siblings[i].firstName+" "+siblings[i].lastName+"";
	}
	alert(message);
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

function getSiblings(parent, people){
	var parents = people.filter(function(person) {
		if(person[0].parents && person[0].parents == parent.id){
			return true;
		} else {
			return false;
		}
	});
	var siblings = people.filter(function(person) {

	})
}

function getParents(person,people){
}
