'use strict';
const userNameInput = document.getElementById('user-name');
const userAgeInput = document.getElementById('user-age');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
  * 指定した要素の子どもを全て削除する
  * @param {HTMLElement} element HTMLの要素
  */
  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  const userAge = userAgeInput.value;
  if (userName.length === 0 || userAge.length === 0){ // 名前が空の時は処理を終了する
    return;
  }

  userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter'){
      assessmentButton.onclick();
    }
  }

  //結果表示
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText ='結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName, userAge);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // TODO ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('最も魅力的な筋肉は？')
    + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #最も魅力的な筋肉は？';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
}

const answers = [
  '{userName}さんの魅力は大胸筋です.もはやおっぱい',
  '{userName}さんの魅力は広背筋です. 空飛べるくらいの背中',
  '{userName}さんの魅力は大腿四頭筋です. 馬も凌駕する脚力',
  '{userName}さんの魅力は腓腹筋です. またの名を脚ゴリラ',
  '{userName}さんの魅力は大殿筋です. 南米でも通用するビッグヒップ',
  '{userName}さんの魅力は脊柱起立筋です. 最強の腰使い',
  '{userName}さんの魅力は僧帽筋です. 肩パット入れてる?',
  '{userName}さんの魅力は長趾伸筋です. 特に利点なし',
  '{userName}さんの魅力は腹直筋です. クリロナと並ぶバキバキ',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

 function assessment(userName, userAge){
   // 全文字のコード番号を取得してそれを足し合わせる
   let sumOfCharCode = 0;
   for (let i = 0; i < userName.length; i++) {
     sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
   }

   let sumOfCharCodeAndAge = 0;
   sumOfCharCodeAndAge = sumOfCharCode + userAge;

   const index = sumOfCharCodeAndAge % answers.length;
   let result = answers[index];

   result = result.replace(/\{userName\}/g, userName);
   return result;
 }

 // テストコード
 console.assert(
   assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
   '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
 );
 console.assert(
   assessment('太郎') === assessment('太郎'),
   '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
 );
