
// テスト用カップリングデータ
// ※作品数は架空の数値です

const pairings = [
    { name: "アンビー × ニコ", count: 1250 },
    { name: "雅 × 柳", count: 980 },
    { name: "エレン × ライカン", count: 750 },
    { name: "アンビー × ビリー", count: 620 },
    { name: "雅 × 蒼角", count: 510 }
];

// 作品数が多い順に並べる
pairings.sort((a, b) => b.count - a.count);

// HTMLから表示場所を取得
const ranking = document.getElementById("ranking");
const search = document.getElementById("search");

// ランキング表示
function displayRanking(keyword = "") {
    ranking.innerHTML = "";

    const filtered = pairings.filter(pair =>
        pair.name.includes(keyword)
    );

    filtered.forEach((pair, index) => {
        const item = document.createElement("div");
        item.className = "ranking-item";

        const name = document.createElement("span");
        name.className = "pair";
        name.textContent = `${index + 1}位 ${pair.name}`;

        const count = document.createElement("span");
        count.className = "count";
        count.textContent = `${pair.count}作品`;

        item.append(name, count);
        ranking.appendChild(item);
    });
}

// 検索欄に入力したら再表示
search.addEventListener("input", () => {
    displayRanking(search.value.trim());
});

// 初期表示
displayRanking();
