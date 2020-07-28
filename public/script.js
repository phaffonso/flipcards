
$('.flip-card').click(function(){
	$('.flip-card').toggleClass('flipped');
	$('.txt-resposta').show();
	console.log('flip');
	$('.bt-prox').toggle();
})

$('.bt-prox').hide();
$('.flip-card').hide();
$('.acertos').hide();

$('.bt-inicio').click(function(){
	$('.bt-inicio').hide();
	$('.flip-card').show();
	$('.acertos').show();
	passaPergunta(0);
})

$('.bt-reinicio').click(function(){
	location.reload();
})

var indice = 0;
var acertos = 0;
perguntas = [];

function passaPergunta(i){
	indice = (i === undefined) ? (indice + 1) : i;
	$('.txt-numperguntas').text(indice);
	if(indice < perguntas.length){
		$('.txt-pergunta').text(perguntas[indice].pergunta);
		$('.txt-resposta').text(perguntas[indice].resposta);
		$('.flip-card').removeClass('flipped');
		$('.txt-resposta').hide();
	}else{
		$('.final').show();
		$('.flip-card').hide();
	}
}

$('.bt-acerto').click(function(){
	$('.bt-prox').toggle();
	passaPergunta();
	acertos ++;
	$('.txt-acertos').text(acertos+"");
});
$('.bt-erro').click(function(){
	$('.bt-prox').toggle();
	passaPergunta();
});

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQh1bvwnq-ks2ElwoAMcC6O139vjswnDVplUKSwd9reiRy9_7E6T_NQOPiX9T7c3--q2HIaJi-zT1Vc/pub?output=csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var parsed = Papa.parse(allText);
	perguntas = [];
	for(var i = 1; i < parsed.data.length; i++){
		var each = parsed.data[i];
		perguntas.push({
			pergunta: each[0],
			resposta: each[1]
		});
	}
	console.log(perguntas);
	$('.bt-inicio').show();
}
