var playing = false;
var score = 0;
var trialsLeft;
var fruits = ['apple', 'banana', 'watermelon', 'pineapple', 'grapes', 'pear'];
var step;
var action;

$(function(){
    $("#startReset").click(function(){
        if(playing == true){
            location.reload();
        }
        else{
            playing = true;
            score = 0;
            trialsLeft = 3;
            $("#startReset").html("RESET");
            $("#scoreValue").html(score);
            $("#trialsLeft").show();
            addHearts();
            $("#gameover").hide();
            startAction();
        }
    });

    $("#fruit1").mouseover(function(){
        score++;
        $("#scoreValue").html(score);
        // document.getElementById("#sliceSound").play();
        $("#sliceSound")[0].play();
        clearInterval(action);
        $("#fruit1").hide("explode", 500);
        setTimeout(startAction, 500);       
    });

    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i < trialsLeft; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    }
    
    function startAction(){
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({
            top : "-50px",
            left : Math.floor(Math.random() * 550)
        });
    
        step = 1 + Math.floor(Math.random() * 5);
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            if($("#fruit1").position().top > $("#fruitContainer").height()){
                if(trialsLeft > 1){
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({top : "-50px", left : Math.floor(Math.random() * 550)});
                    step = 1 + Math.floor(Math.random() * 5);
                    trialsLeft--;
                    addHearts();
                }
                else{
                    playing = false;
                    $("#startReset").html("START GAME");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over!</p><p>Your score is " + score + "</p>");
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);
    }
    
    function chooseFruit(){
        $("#fruit1").attr('src', 'images/' + fruits[Math.floor(Math.random() * 6)] + '.png');
    }
    
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});
