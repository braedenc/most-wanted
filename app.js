function initMostWanted(people){
	alert("Welcome to our Super Secret government search engine!");
	do{
		var searchType = prompt("Do you want to search by name or attributes? Enter word 'name' or 'attributes' here.");
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
    return people.filter(function(person) {
				if(person.lastName.toLowerCase() === lastName.toLowerCase() && person.firstName.toLowerCase() === firstName.toLowerCase()){
					return true;
				} else {
					return false;
					}
	});
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
			displayPersonInfo(person, people, getDescendants);
			break;
		case "family":
			displayFamily(person, people);
			break;
		case "kin":
			getKin(person, people);
			break;
		case "descendants":
			var descendants = getDescendants(person, people, getKids);
			var message = "Descendants: ";
			for(var i = 0; i < descendants.length; i++){
				message +="\n" + descendants[i].firstName + " " +descendants[i].lastName+ " ";
				}
			alert(message);
			mainMenu(person, people);
			break;
		case "restart":
			initMostWanted(people);
			break;
		case "quit":
			return;
		default:
		alert("Please enter valid search criteria.");

	}


}

function displayPersonInfo(person, people){
	alert("Person: "+person.firstName+" "+person.lastName+"\nOccupation: "+person.occupation+"\nDate of birth: "+person.dob+"\nWeight: "
		+person.weight+"\nHeight: "+person.height+"\nEye color: "+person.eyeColor+".");
	mainMenu(person, people);
}

function displayFamily(person, people, callback){
	var spouse = getPersonById(person.currentSpouse, people);
if(!spouse){
spouse = {"firstName" : "None", "lastName" : ""};
		}
	var parents = [];
		for(var i = 0; i < person.parents.length; i++){
			var parent = getPersonById(person.parents[i], people);
			parents.push(parent);
		}
	var parentsString = "";
		for(var I = 0; I < parents.length; i++){
			parentsString += " "+parents[i].firstName+" "+parents[i].lastName+",";
		} if(!parentsString){
			parentsString = "None";
		}
	var kids = getKids(person, people);

	var kidsString = "";
		for(var x = 0; i < kids.length; i++){
			kidsString += " "+kids[x].firstName+" "+kids[x].lastName+",";
		} if(!kidsString){
			kidsString = "None";
		}


	var siblings = getSiblings(person, people);
	var siblingsString = "";


	alert("Family: \nParents- "+parentsString+"\nSpouse- "+spouse.firstName+" "+spouse.lastName+"\nChildren- "+kidsString+"\nSiblings- "+siblings+"");
	mainMenu(person, people);
	/*var message = "Family:\nParents- "+person.parents+"\nSpouse- "+person.currentSpouse+"";
	for(var i = 0; i<kids.length; i++){
		message += "\nChildren- "+kids[i].firstName+" "+kids[i].lastName+"";
	}
	for(var i = 0; i<siblings.length; i++){
		message += "\nSiblings- "+siblings[i].firstName+" "+siblings[i].lastName+"";
	}
	alert(message);
*/
}


function getKin(){

}

function getDescendants(parent, people, callback, allKids = []){
	var kids = callback(parent, people);
	if(kids != null){
		kids.forEach(function(child){
			allKids.push(child);
			getDescendants(child, people, callback, allKids);
		});
	}
	return allKids;


}

function getKids(parent, people){
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

function getSiblings(person, people){
	var parents = people.filter(function(individual) {
		if(person.parents[0] == individual.parents[0] && person.parents[1] == individual.parents[1] || person.parents[1] == individual.parents[0] && person.parents[1] == individual.parents[1]){
			return true;
		} else{
			return false;
		}
		/*if(person.parents == ){

		}*/
	});
}

function getPersonById(id, people){
	var personid = people.filter(function(person){
		return (person.id === id);
	});
	return personid[0];
}
