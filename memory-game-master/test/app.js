//配列の中身をランダムに並べる
//カードをクリックすると、画像が切り替わる
//選んだ2つが合っているか、異なるかチェック
//全て揃ったら終了



//【カードデータの配列】
//cardArray は、カードの情報を保存する配列です。各カードはオブジェクトで構成されており、name と img（画像のパス）というプロパティを持っています。
// 同じカードが2つずつ存在しており、それぞれ6種類のカードがあるので、合計で12枚のカードがあります。
const cardArray = [
  {
    name: "card1",
    img: "images/card1.png",
  },
  {
    name: "card2",
    img: "images/card2.png",
  },
  {
    name: "card3",
    img: "images/card3.png",
  },
  {
    name: "card4",
    img: "images/card4.png",
  },
  {
    name: "card5",
    img: "images/card5.png",
  },
  {
    name: "card6",
    img: "images/card6.png",
  },
  {
    name: "card1",
    img: "images/card1.png",
  },
  {
    name: "card2",
    img: "images/card2.png",
  },
  {
    name: "card3",
    img: "images/card3.png",
  },
  {
    name: "card4",
    img: "images/card4.png",
  },
  {
    name: "card5",
    img: "images/card5.png",
  },
  {
    name: "card6",
    img: "images/card6.png",
  },
];

//【配列の中をランダムで並び替え】
// sort()　配列を並び替え
// Math.random()　0～1のランダムな数が出る（1は含まない）
cardArray.sort(() => 0.5 - Math.random());
console.log(cardArray);
//grid は、カードを表示するHTML要素を指します。クラス名が grid のHTML要素を取得しています。
const grid = document.querySelector(".grid");
//resultDisplay は、ゲームの結果を表示する要素です。ここでは、id が result の要素を取得しています。
const resultDisplay = document.querySelector("#result");

//【 カードの選択と勝利状態を管理する変数】
// cardsChosen は、プレイヤーが選んだカードの名前を一時的に保存する配列です。
// cardsChosenId は、選んだカードのIDを保存します。
// cardsWon は、プレイヤーが見つけたペアを保存します。
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

//【ゲーム盤の作成】
// createBoard 関数は、カードを表示するボードを作成します。この関数の役割は、ランダムに並び替えられたカードを表示し、クリックイベントを設定することです。
// for ループは、cardArray の長さ（12枚）に基づいて、0から11までのインデックスでカードを処理します。i には0から11までの値が順番に入り、それぞれのカードに対して処理が行われます。
// 各カードは img 要素として作成され、src 属性に初期状態（裏向き）の画像を設定しています。
// data-id 属性にはカードのインデックス（i）を設定し、どのカードがクリックされたか識別します。
// クリックイベントが発生すると、flipCard 関数が実行されるように設定しています。
// 最後に、grid にカード要素を追加して、ゲーム盤にカードを表示します。
function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);   //data-idはランダムに並び替えられた配列の上から0,1,2...11が割り当てられる
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  }
}

//【カードの一致を確認する関数】

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];   //let cardsChosenId = [];に入っている、1枚目[0]に選んだカードのid
  const optionTwoId = cardsChosenId[1];   //let cardsChosenId = [];に入っている、2枚目[1]に選んだカードのid

  //同じカードをクリックした場合の処理
  //optionOneId と optionTwoId が同じ場合、プレイヤーは同じカードを2回クリックしたことになります。
  //この場合、クリックされたカードを再び裏向き（"blank.png"）に戻し、アラートを表示してプレイヤーに通知します。
  if (optionOneId == optionTwoId) {   //data-idが等しい
    cards[optionOneId].setAttribute("src", "images/blank.png");   //1枚目[0]に選んだカードは裏向きに
    cards[optionTwoId].setAttribute("src", "images/blank.png");   //2枚目[0]に選んだカードは裏向きに
    alert("You have clicked the same image!");

  //カードが一致した場合の処理
  //cardsChosen[0] === cardsChosen[1] の条件では、プレイヤーが選択した2枚のカードが同じ名前かどうかをチェックしています。カード名が一致していれば、ペアが揃ったことになります。
  //ペアが揃った場合、次の処理が行われます：
  // アラート表示: alert("You found a match") によって、プレイヤーにペアが揃ったことを知らせます。
  // カードを消す: setAttribute("src", "images/white.png") によって、2枚のカードの画像を白（"white.png"）に変更し、揃ったことを視覚的に示します。
  // クリック無効化: removeEventListener("click", flipCard) によって、これ以上そのカードをクリックできないようにします。これにより、すでに揃ったカードはゲームの進行に影響を与えなくなります。
  // 揃ったカードを保存: cardsWon.push(cardsChosen) によって、揃ったカードを cardsWon 配列に追加します。これにより、プレイヤーが見つけたペアの数が記録されます。
  } else if (cardsChosen[0] === cardsChosen[1]) {   //let cardsChosen = [];に入っている値（カードの名前）が等しい
    alert("You found a match");
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);

    // カードが一致しなかった場合の処理
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    alert("Sorry, try again");
  }

    // リセット処理
    //cardsChosen と cardsChosenId 配列を空にしてリセットします。これにより、次の2枚のカードを選択する準備が整います。
  cardsChosen = [];
  cardsChosenId = [];

  // 結果の表示
  //resultDisplay.textContent = cardsWon.length で、プレイヤーが揃えたペアの数を画面に表示します。
  // 全てのペアが揃った（cardsWon.length === cardArray.length / 2）場合、resultDisplay.textContent = "Congratulations! You found them all!" で、プレイヤーにゲームクリアを知らせます。
  resultDisplay.textContent = cardsWon.length;
  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations! You found them all!";
  }
}

//【カードをめくる関数】
// flipCard 関数は、クリックされたカードをめくる（画像を表示する）処理を行います。
// data-id 属性を使って、クリックされたカードのIDを取得します。
// そのIDを使って、カードの名前を cardsChosen に、IDを cardsChosenId に追加します。
// setAttribute("src", cardArray[cardId].img) によって、カードの画像をカードの表側に変更します。
// プレイヤーが2枚のカードを選んだら、0.5秒後に checkForMatch 関数を呼び出してカードが一致するか確認します。
function flipCard() {
  let cardId = this.getAttribute("data-id");
  console.log(cardId);
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

// 【ゲームの初期化】
// 最後に、createBoard 関数が呼び出されて、ゲームのボードが作成され、プレイヤーがゲームを始められる状態になります。
createBoard();
