$(function(){

	var blinkCounter=0;
	var levelCounter=0;
	var colorSequence=[1,2,3,4];	

	var gameSequence=[];

	var clickCounter=0;
	var blinkMode=true;

	var soundSequence=['a1','b1','c1','d1'];


	var gameStart =function(){
		blinkCounter=0;
		levelCounter=0;		
		gameSequence=[];	
		blinkMode=true;
		clickCounter=0;
		
		$(".game-boxes ").css('cursor','none');	
		$('#pressme').show();			

	}

	gameStart();
	
	
	$('#pressme').on('click',function(){
		$(".levels").html('');
		$(this).hide();	
		goGame();			
	});

	

	var goGame=function(){

		blinkMode=true;

		$(".game-boxes").css('cursor','none');

		levelCounter++;

		$('.levels').html("Level: "+levelCounter);

		var randomval=0;

		blinkCounter++;

		clickCounter=0;

		randomval = colorSequence[Math.floor(Math.random()*colorSequence.length)];
		gameSequence.push(randomval);
		
		
		blinkBoxes(gameSequence);

	}
	var blinkBoxes =function(sequence){

		var i = 0;
		var timer = setInterval(function() {
			playSound(sequence[i], false);
			blink(sequence[i]);

			i++;
			if (i >= sequence.length) {
				clearInterval(timer);
				$(".game-boxes ").css('cursor','pointer');	
				blinkMode=false;
				
			}
		}, 600);
	}

	var blink=function(dataId) {

		$('.gamebox[data-id=' + dataId + ']').addClass('blink');
		window.setTimeout(function() {
			$('.gamebox[data-id=' + dataId + ']').removeClass('blink');
		}, 300);	

	}

	var playSound=function(dataId, isfail){	
		
		var soundfile="";
		if(isfail){
			soundfile="fail";
			
		}
		else {
			var soundId=dataId-1;	
			soundfile=soundSequence[soundId];
		}

		var sound = $('<audio autoplay></audio>');
		sound.append('<source src="sounds/' + soundfile + '.ogg" type="audio/ogg" />');
		sound.append('<source src="sounds/' + soundfile + '.wav" type="audio/wav" />');
		$('#sound').html(sound);		
		
	}


	var clickEvent=function(dataId){
		clickCounter++;
		
		if(gameSequence[clickCounter-1]==dataId)
		{
			if(clickCounter>=gameSequence.length)
			{
				
				if(levelCounter<20){
					goGame();
				}
				else
				{
					$(".levels").html('You won.');
					setTimeout(function() {
						$(".levels").html('');
						gameStart();
					}, 1300);
				}	
				
			}
		}	
		else {
			$(".levels").html('Game Over');
			playSound(5,true);
			gameStart();
		}
	}

	$(".game-boxes div").on('click',function(e){
		
		if(!blinkMode) 
	      clickEvent($(this).data('id'));		
			
	}).on('mousedown', function(){
		if(!blinkMode)
		{
			$(this).addClass('click-blink');
			playSound($(this).data('id'), false);
		}
	}).on('mouseup', function(){
		if(!blinkMode)
			$(this).removeClass('click-blink');
	});


})



