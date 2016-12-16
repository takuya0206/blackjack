			"use strict";

		function Card (mark, num){ //トランプのクラス
			this.mark = mark;
			this.num = num;
		};

		var cards = [];
		function init(){ //トランプのカードを作成
			var x = 0;
			for (var i = 1; i <= 13; i++){
				cards[x] = new Card("♠", i);
				x++;
				cards[x] = new Card("☘", i);
				x++;
				cards[x] = new Card("❤", i);
				x++;
				cards[x] = new Card("♦", i);
				x++;
			};
		};init();

		var hit = document.getElementById('hit');
		var reset = document.getElementById('reset'); 
		var stand = document.getElementById('stand');
		var your_card = document.getElementById('your_card'); //手札
		var com_card =  document.getElementById('com_card');
		var your_sum = document.getElementById('your_sum'); //手札の合計
		var com_sum = document.getElementById('com_sum');
		var your_sum_process = 0;
		var com_sum_process = 0;
		var result = document.getElementById('result'); //結果を表示
		var record = []; //既出のカードを記録


		hit.addEventListener("click", function(){
			if (your_sum_process > 21) {return;}; //ボタンを押せなくする
			if (com_sum_process > 0) {return;}; //ボタンを押せなくする
			var draw = Math.floor(Math.random()*52); //カードを一枚ランダムに引く
			while (record.indexOf(draw) >= 0){ //重複の場合は引き直し
				draw = Math.floor(Math.random()*52);
			}; 
			var your_box = document.createElement("td"); //手札の表示
			var your_hand = document.createTextNode(cards[draw].mark + cards[draw].num);
			your_card.appendChild(your_box);
			your_box.appendChild(your_hand);
			record.push(draw); //既出カードの記録

			switch(cards[draw].num) { 
				case 11:
				case 12:
				case 13:
				your_sum_process += 10;
				break;
				case 1: //1はカードを引いた時点のみ判断可能 （*改善したい）
				if ((your_sum_process + 11) <= 21){
					your_sum_process += 11;
				} else {
					your_sum_process += 1;
				};
				break;
				default:
				your_sum_process += cards[draw].num;
				break;
			};
			your_sum.innerHTML = your_sum_process; //引いたカードを手札の合計へ
			if (your_sum_process > 21) { //disabledの修飾
				hit.className = "btn inactive";
			};
			if (your_sum_process > 0) { //disabledの修飾
				stand.className = "btn";
			};
		}); 
		
		reset.addEventListener("click", function(){ 
			location.reload();
		});

		stand.addEventListener("click", function(){ //コンピューターを起動
			if (your_sum_process === 0) {return;}; //disabled
			while (com_sum_process <= 16){ //コンピューターのhitする基準
				var draw = Math.floor(Math.random()*52); //カードを一枚ランダムに引く
				while (record.indexOf(draw) >= 0){ //既出の場合は引き直し 
					draw = Math.floor(Math.random()*52); 
				}; 
				var com_box = document.createElement("td"); 
				var com_hand = document.createTextNode(cards[draw].mark + cards[draw].num);
				com_card.appendChild(com_box);
				com_box.appendChild(com_hand);
				record.push(draw);

				switch(cards[draw].num){
					case 11:
					case 12:
					case 13:
					com_sum_process += 10;
					break;
					case 1:
					if ((com_sum_process + 11) <= 21){
						com_sum_process += 11;
					} else {
						com_sum_process += 1;
					};
					break;
					default:
					com_sum_process += cards[draw].num;
					break;
				};
				com_sum.innerHTML = com_sum_process;

				//勝敗を決める
				if (your_sum_process < 22 && your_sum_process > com_sum_process){
					result.innerHTML = "Won!";
				} else if (your_sum_process < 22 && com_sum_process > 21){
					result.innerHTML = "Won!";
				}else if (your_sum_process < 22 && your_sum_process === com_sum_process){
					result.innerHTML = "Draw!";
				} else if (your_sum_process > 21 && com_sum_process > 21){
					result.innerHTML = "Draw!";
				} else {
					result.innerHTML = "Lost!";
				};
			};
			if (com_sum_process > 0) {
				stand.className = "btn inactive";
				hit.className = "btn inactive";
			};
		});

