// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function test(states){
		
      	var location = states[0];		
      	var state = states[0] == "A" ? states[1] : states[2];
      	var action_result = reflex_agent(location, state);
      	document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result).concat("      ").concat(todo.length.toString());
      	if (action_result == "CLEAN"){
        	if (location == "A") {
				if(states[1] == "DIRTY" && states[2] == "DIRTY"){
					states[1] = "CLEAN";
					if(todo.includes(1)){

					}else{
						todo.push(1);
					}
					
				}else if(states[1] == "CLEAN" && states[2] == "DIRTY"){
					
					if(todo.includes(2)){

					}else{
						todo.push(2);
					}
				}else if(states[1] == "DIRTY" && states[2] == "CLEAN"){
					states[1] = "CLEAN";
					
					if(todo.includes(3)){

					}else{
						todo.push(3);
					}
				}else if(states[1] == "CLEAN" && states[2] == "CLEAN"){
					ensuciar(Math.floor(Math.random()*3)+1);
					if(todo.includes(4)){

					}else{
						todo.push(4);
					}
				}
				
				
			}
         	else if (location == "B") {
				if(states[1] == "DIRTY" && states[2] == "DIRTY"){
					states[2] = "CLEAN";
					if(todo.includes(5)){

					}else{
						todo.push(5);
					}
				}else if(states[1] == "CLEAN" && states[2] == "DIRTY"){
					states[2] = "CLEAN";
					
					if(todo.includes(6)){

					}else{
						todo.push(6);
					}
				}else if(states[1] == "DIRTY" && states[2] == "CLEAN"){
					
					if(todo.includes(7)){

					}else{
						todo.push(7);
					}
				}else if(states[1] == "CLEAN" && states[2] == "CLEAN"){
					ensuciar(Math.floor(Math.random()*3)+1);
					if(todo.includes(8)){

					}else{
						todo.push(8);
					}
				};
				
			 }
			
      	}
      	else if (action_result == "RIGHT") {
			states[0] = "B";
			
			
		  }
      	else if (action_result == "LEFT") {
			states[0] = "A";
			
			
		  }  
	
	
		  setTimeout(function(){
			if(todo.includes(1) && todo.includes(2) && todo.includes(3) && todo.includes(4) && todo.includes(5) && todo.includes(6) && todo.includes(7) && todo.includes(8)){
				document.getElementById("log").innerHTML+="<br>SE TERMINO ";
				return;				
			}else{
				test(states);
				console.log(todo);
				
			}
			 
		}, 200);	
}


function ensuciar(valor){
	console.log(valor.toString());
	switch(valor){
		case 1:
			if(states[1] == "CLEAN"){
				states[1] = "DIRTY";
			}			
			break;

		case 2:
			if(states[2] == "CLEAN"){
				states[2] = "DIRTY";
			}
			break;

		case 3:
			if(states[1] == "CLEAN" && states[2] == "CLEAN"){
				states[1] = "DIRTY";
				states[2] = "DIRTY";
			}
			
			break;

		default:
			console.log("se entro a default");
	}
	
}



var states = ["A","DIRTY","DIRTY"];
var todo = [];
test(states);
