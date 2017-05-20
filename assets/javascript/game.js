//initialize fighter stats

var harry = {
	name:"Harry",
	id: "#harry",
	hp:79,
	atk:12,
	base:12,
	counter:16,
	spell:"Reducto",
	status: "alive",
	hp_id:"#harry_hp",
	atk_id:"#harry_atk"
}

var hagrid = {
	name:"Hagrid",
	id: "#hagrid",
	hp:98,
	atk:8,
	base:8,
	counter:10,
	spell:"Incendio",
	status: "alive",
	hp_id:"#hagrid_hp",
	atk_id:"#hagrid_atk"
}

var dumbledore = {
	name:"Dumbledore",
	id: "#dumbledore",
	hp:86,
	atk:13,
	base:13,
	counter:25,
	spell:"Legilimens",
	status: "alive",
	hp_id:"#dumbledore_hp",
	atk_id:"#dumbledore_atk"
}

var voldemort = {
	name:"Voldemort",
	id: "#voldemort",
	hp:94,
	atk:12,
	base:12,
	counter:20,
	spell:"Crucio",
	status: "alive",
	hp_id:"#voldemort_hp",
	atk_id:"#voldemort_atk"
}

var wins = 0;

//append character stats to html
$( document ).ready(function() {
	$("#harry_hp").append(harry.hp)
	$("#harry_atk").append(harry.atk)
	$("#harry_cntr").append(harry.counter)

	$("#hagrid_hp").append(hagrid.hp)
	$("#hagrid_atk").append(hagrid.atk)
	$("#hagrid_cntr").append(hagrid.counter)

	$("#dumbledore_hp").append(dumbledore.hp)
	$("#dumbledore_atk").append(dumbledore.atk)
	$("#dumbledore_cntr").append(dumbledore.counter)

	$("#voldemort_hp").append(voldemort.hp)
	$("#voldemort_atk").append(voldemort.atk)
	$("#voldemort_cntr").append(voldemort.counter)
});


//Fight Button
$("#fight").on("click",function(){
	if ($(".character","#fighter1").length == 1 && $(".character","#fighter2").length == 1){// if both slots are occupied

		//assign the variable char1 to the player and char2 to the opponent
		var char1 = $('#fighter1').children().last().attr('id');
		if (char1 === "harry"){
			char1 = harry
		}
		else if (char1 === "hagrid"){
			char1 = hagrid
		}
		else if (char1 === "dumbledore"){
			char1 = dumbledore
		}
		else if (char1 === "voldemort"){
			char1 = voldemort
		}
		else{
		}
		var char2 = $('#fighter2').children().last().attr('id');
		if (char2 === "harry"){
			char2 = harry
		}
		else if (char2 === "hagrid"){
			char2 = hagrid
		}
		else if (char2 === "dumbledore"){
			char2 = dumbledore
		}
		else if (char2 === "voldemort"){
			char2 = voldemort
		}
		else{
		}

		//initiate combat
		if ((char1.hp > 0) && (char2.hp > 0)){ //initiate combat only if both characters are alive
		combat_sequence(char1,char2)
		}
	}

});

//Combat sequence. Player attacks. Opponent counter attacks. Player increases attack. Update graphics.
function combat_sequence(char1,char2){
	console.log("Initiating combat sequence")
	console.log("Start of combat: ",char1, char2)	
	$("#log").html("")

	char2.hp -= (char1.atk) //Player attacks opponent

	if (char2.hp < 0){
		char2.hp = 0;
	}
	//update graphics
	$(char2.hp_id).html(char2.hp)
	$("#log").append('<span id="blue-text">' + char1.name + '</span> casts <span id="green-text">' + char1.spell + '</span> on <span id="red-text">' + char2.name + '</span> for <span id="yellow-text">' + char1.atk + " damage.</span>")
	//if opponent is defeated
	if (char2.hp <= 0){ 
		char2.status = "defeated"
		wins+=1;
		$(char2.id).css("filter","invert(100%)")
		$(".mainrow").append($(char2.id))
		$("#log").append('<br><span id="red-text">' + char2.name + "</span> is defeated.")
		if (wins === 3){
		$("#log").append("<br>YOU WIN!")			
		}
	}
	else{
	char1.hp -= (char2.counter) //Opponent counter-attacks player
	if (char1.hp < 0){
		char1.hp = 0;
	}
	//update graphics
	$(char1.hp_id).html(char1.hp)
	$("#log").append('<br><span id="red-text">' + char2.name + '</span> counter-attacks <span id="blue-text">' + char1.name + '</span> with <span id="green-text">' + char2.spell + '</span> for <span id="yellow-text">' + char2.counter + " damage.</span>")
	if (char1.hp <= 0){ //player is defeated
		char1.status = "defeated"
		$("#log").append('<br><span id="blue-text">' + char1.name + "</span> is defeated.")
		$(char1.id).css("filter","invert(100%)")
		$("#log").append("<br>GAME OVER!")		
	}
	else{

	}

	}

	//increase attack power
	if ((char1.hp > 0) && ( wins <3)){
	char1.atk+=char1.base
	$(char1.atk_id).html(char1.atk)
	$("#log").append('<br><span id="blue-text">' + char1.name + '</span> gains <span id="orange-text">' + char1.base + " attack points.</span>")
}
	console.log("End of combat: ",char1, char2)	
}


//Reset Button
$("#reset").on("click",function(){
	$("#log").html("Select a character and an opponent for battle");
	$(".mainrow").append($("#harry"),$("#hagrid"),$("#dumbledore"),$("#voldemort"))
	harry.status = "alive";
	hagrid.status = "alive";	
	dumbledore.status = "alive";
	voldemort.status = "alive";	
	$("#harry").css("filter","invert(0%)")
	$("#hagrid").css("filter","invert(0%)")	
	$("#dumbledore").css("filter","invert(0%)")
	$("#voldemort").css("filter","invert(0%)")
	harry.hp=79
	harry.atk=12
	hagrid.hp=98
	hagrid.atk=8
	dumbledore.hp=86
	dumbledore.atk=13
	voldemort.hp=94
	voldemort.atk=12
	$("#harry_hp").html(harry.hp)
	$("#harry_atk").html(harry.atk)
	$("#hagrid_hp").html(hagrid.hp)
	$("#hagrid_atk").html(hagrid.atk)
	$("#dumbledore_hp").html(dumbledore.hp)
	$("#dumbledore_atk").html(dumbledore.atk)
	$("#voldemort_hp").html(voldemort.hp)
	$("#voldemort_atk").html(voldemort.atk)
	wins = 0;
});


$(".character").on("click",function(){
	if ($(".character","#fighter1").length == 0){ //if fighter 1 slot is empty
		$("#fighter1").append($(this));		
	}
	else if  (     ($(".character","#fighter2").length == 0)   &&   ($(this).parents("#fighter1").length == 0)  ){	// if fighter 2 slot is emtpy and you yourself are not in the fighter 1 slot
		//assign char1 to player and char2 to opponent
		var char2 = $(this).attr('id');
		if (char2 === "harry"){
			char2 = harry
		}
		else if (char2 === "hagrid"){
			char2 = hagrid
		}
		else if (char2 === "dumbledore"){
			char2 = dumbledore
		}
		else if (char2 === "voldemort"){
			char2 = voldemort
		}
		else{
		}
		if (char2.status === "alive"){
		$("#fighter2").append($(this));	
		}			
	}
	else{
	}

});