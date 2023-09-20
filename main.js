import "./style.scss";
import { getAllData } from "./functions.js";

async function main() {
  const listItemTemplate = document.querySelector("#listItem").innerHTML;
  const list = document.querySelector(".channel__list");
  const allData = await getAllData();

  let html = "";

  for (let i = 0; i < allData.length; i++) {
    const data = allData[i];
    const totalTemp = data.stats.reduce((acc, data) => acc + data.zon, 0);
    const averageTemp = totalTemp / data.stats.length;

    let listItem = listItemTemplate
      .replaceAll("%CITY%", data.stad)
      .replaceAll("%AVERAGE%", averageTemp.toFixed(2) + "p");

    listItem += "<ul>";

    for (let j = 0; j < data.stats.length; j++) {
      const month = data.stats[j].maand;
      const temperature = data.stats[j].zon;

      listItem += `<li>${month}: ${temperature}u</li>`;
    }

    listItem += "</ul>";

    html += listItem;
  }

  list.innerHTML = html;
}
main();
