const mySwiper = new Swiper ('.swiper', {
    // 以下にオプションを設定
    loop: true, //最後に達したら先頭に戻る
    slidesPerView: '2', //何枚表示するか
    speed: 2000, // スライドアニメーションのスピード（ミリ秒）
    centeredSlides : true,
     autoplay: { //自動再生する
         delay: 5000, //次のスライドに切り替わるまでの時間
       disableOnInteraction: false, //ユーザーが操作したら止めるか
       waitForTransition: false, // アニメーションの間にスライドを止めるか
     },
    //ページネーション表示の設定
    pagination: {
      el: '.swiper-pagination', //ページネーション要素のクラス名
      clickable: true, //クリック可能にするか
      type: 'bullets', //ページネーションの種類
    },

    //ナビゲーションボタン（矢印）表示の設定
    navigation: {
      nextEl: '.swiper-button-next', //「次へボタン」要素のクラス名
      prevEl: '.swiper-button-prev', //「前へボタン」要素のクラス名
    },
  });



// // add-title タイトル
// // status 気になる
// // status-after 見た
// // file-upload 画像アップロード
// // viewing-date 視聴日
// // add-item-button 追加する


// const onClickAdd = () => {
//     // inputTextという変数はテキストボックスの値を取得したもの
//     const inputText = document.getElementById("add-text").value;
//     // add-textの中のテキストを""にする（初期化する）
//     document.getElementById("").value = "";
//     document.getElementById("").value = "";
//     document.getElementById("").value = "";
//     document.getElementById("").value = "";

//     createViewingHistoryItem();
//   };

// const createViewingHistoryItem = (入力された値) => {
//     const div = document.createElement("div");
//     divPanelItem.className = "panel-item";
//     const filmImg = document.createElement("img");
//     //imgのsrcは inputFile
//     const ptitle = document.createElement("p");
//     ptitle.innerText = inputTextTitle;
//     const pDate = document.createElement("p");
//     pDate.innerText = inputDate;

//     divPanelItem.appendChild(filmImg);
//     divPanelItem.appendChild(ptitle);
//     divPanelItem.appendChild(pDate);

//     document.getElementById("panel-list").appendChild(divPanelItem);
// };

// // const 入力された値 = {
// //     [img]: "inputFile",
// //     title: 'inputTextTitle'
// //     date: 'inputDate'

// // };
// const inputTextTitle = document.getElementById("add-title").Value;
// const inputDate = document.getElementById("viewing-date").Value;
// const inputFile = document.getElementById("file-upload").Value; //imgのsrcを取得


// document.getElementById("add-item-button").addEventListener("click", onClickAdd);







const onClickAdd = () => {
    // タイトル、日付、画像の入力値を取得
    const inputTextTitle = document.getElementById("add-title").value;
    const inputDate = document.getElementById("viewing-date").value;
    const inputFile = document.getElementById("file-upload").files[0]; // 画像ファイルを取得

    // タイトル、日付、または画像が未入力の場合、処理を中断
    if (!inputTextTitle || !inputDate || !inputFile) {
        alert("タイトル、視聴日、画像をすべて入力してください。");
        return;
    }

    // 入力フォームのクリア（初期化）
    document.getElementById("add-title").value = "";
    document.getElementById("viewing-date").value = "";
    document.getElementById("file-upload").value = "";

    // FileReaderを使って画像を読み込む
    const reader = new FileReader();
    reader.onload = () => {
        // 新しいパネル項目を作成
        createViewingHistoryItem(inputTextTitle, inputDate, reader.result); // 画像のURLを渡す
    };
    reader.readAsDataURL(inputFile); // 画像ファイルをURLとして読み込む
};

const createViewingHistoryItem = (title, date, imageUrl) => {
    // div 要素（パネル項目）を作成
    const divPanelItem = document.createElement("div");
    divPanelItem.className = "panel-item";

    // 画像の img 要素を作成
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl; // 画像URLを設定
    imgElement.alt = "Uploaded Image"; // 画像の代替テキスト
    imgElement.style.height = "200px";
    imgElement.style.width = "150px"; // 画像サイズを指定（必要なら）


    // タイトル情報の p 要素を作成
    const pTitle = document.createElement("p");
    pTitle.innerText = title;

    // 日付情報の p 要素を作成
    const pDate = document.createElement("p");
    pDate.innerText = date;

    // パネルアイテムに画像、タイトル、日付を追加
    divPanelItem.appendChild(imgElement);
    divPanelItem.appendChild(pTitle);
    divPanelItem.appendChild(pDate);

    // パネルリストの先頭に新しいパネル項目を追加
    const panelList = document.getElementById("panel-list");
    panelList.insertBefore(divPanelItem, panelList.firstChild);
};

// ボタンにクリックイベントを設定
document.getElementById("add-item-button").addEventListener("click", onClickAdd);
