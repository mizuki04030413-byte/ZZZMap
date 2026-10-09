
// カップリングのテストデータ
const pairings = [
  {a:"anby",b:"nicole",count:1250},
  {a:"miyabi",b:"yanagi",count:980},
  {a:"ellen",b:"lycaon",count:750},
  {a:"anby",b:"billy",count:620},
  {a:"miyabi",b:"soukaku",count:510}
];

const search = document.getElementById("search");
const factionSelect = document.getElementById("faction");
const characterArea = document.getElementById("characters");
const resultCount = document.getElementById("result-count");
const rankingArea = document.getElementById("ranking");

const byId = Object.fromEntries(
  characters.map(c => [c.id, c])
);

// 陣営の選択肢を自動生成
const factions = [...new Set(
  characters.map(c => c.faction)
)];

factions.forEach(faction => {
  const option = document.createElement("option");
  option.value = faction;
  option.textContent = faction;
  factionSelect.appendChild(option);
});

// キャラクター検索
function showCharacters() {
  const keyword = search.value.trim().toLowerCase();
  const faction = factionSelect.value;

  const filtered = characters.filter(c => {
    const matchesName =
      c.name.toLowerCase().includes(keyword);
    const matchesFaction =
      !faction || c.faction === faction;

    return matchesName && matchesFaction;
  });

  characterArea.innerHTML = "";
  resultCount.textContent =
    `${filtered.length}人のキャラクター`;

  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = "character-card";

    const name = document.createElement("strong");
    name.textContent = c.name;

    const factionName = document.createElement("span");
    factionName.textContent = c.faction;

    card.append(name, factionName);
    characterArea.appendChild(card);
  });

  showRanking(keyword);
}

// ランキング表示
function showRanking(keyword = "") {
  rankingArea.innerHTML = "";

  const filtered = pairings
    .filter(p => {
      const a = byId[p.a]?.name || "";
      const b = byId[p.b]?.name || "";
      return (a + b).toLowerCase().includes(keyword);
    })
    .sort((a,b) => b.count - a.count);

  filtered.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "ranking-item";

    const pairName = document.createElement("span");
    pairName.textContent =
      `${i+1}位 ${byId[p.a].name} × ${byId[p.b].name}`;

    const count = document.createElement("span");
    count.className = "count";
    count.textContent = `${p.count}作品`;

    item.append(pairName, count);
    rankingArea.appendChild(item);
  });
}

search.addEventListener("input", showCharacters);
factionSelect.addEventListener("change", showCharacters);

showCharacters();
