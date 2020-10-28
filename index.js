window.setInterval(() => {
  if (!dlButtonAlreadyPresent() && moreThanOneDlLink() && allLinksLoaded()) {
    retrieveLinksAndAddDlButton();
  }
}, 1000);

function dlButtonAlreadyPresent() {
  const button = document.getElementsByClassName("addButton");
  if (button.length !== 0) {
    return true;
  }
}

function moreThanOneDlLink() {
  const container = document.getElementById("links-container");
  if (container.children.length > 1) {
    return true;
  }
}

function allLinksLoaded() {
  const container = document.getElementById("links-container");

  for (let individualLinkDiv of container.children) {
    if (individualLinkDiv.className === "link-not-generated") {
      return false;
    }
  }
  return true;
}

function retrieveLinksAndAddDlButton() {
  const toDl = getAllDlLinks();
  makeDlButton(toDl);
}

function getAllDlLinks() {
  const lang = getPageLanguage();
  let toDl = [];

  const container = document.getElementById("links-container");
  for (let individualLinkDiv of container.children) {
    for (let possibleDlTag of individualLinkDiv.children) {
      if (
        possibleDlTag.tagName === "A" &&
        startWithDl(possibleDlTag.textContent, lang)
      ) {
        toDl.push(possibleDlTag.href);
      }
    }
  }
  return toDl;
}

function getPageLanguage() {
  const lang_list = document.getElementsByClassName("lang_list");
  // Return trimed text contain in div.lang_list>a>strong
  const language = lang_list[0].children[0].children[0].textContent.trim();
  return language;
}

function startWithDl(text, lang) {
  switch (lang) {
    case "Français (France)":
      return text.startsWith("TELECHARGER");
    case "English (US)":
    case "Italiano":
    case "Deutsch":
    case "Türkçe":
    case "Dutch":
      return text.startsWith("DOWNLOAD");
    case "Español":
      return text.startsWith("DESCARGAR");
    case "Português":
      return text.startsWith("TRANSFERIR");
    case "Português  (Brasil) ":
      return text.startsWith("Carregar");
    case "Polish":
      return text.startsWith("POBIERZ");
    case "Indonesian":
      return text.startsWith("UNDUH");
    case "Croatian":
      return text.startsWith("PREUZMI");
    case "Russian":
      return text.startsWith("Закачать");
    case "Romanian":
      return text.startsWith("Descarcă");
    case "繁體中文":
    case "简体中文":
      return text.startsWith("下載");
    case "اللغة":
      return text.startsWith("تحميل");
    default:
      return false;
  }
}

function makeDlButton(toDl) {
  const container = document.getElementById("links-container");
  let button = document.createElement("button");
  button.textContent = "Download all";
  button.className = "addButton";
  container.appendChild(button);
  button.addEventListener("click", () => dlAll(toDl));
}

function dlAll(toDl) {
  for (let link of toDl) {
    window.open(link);
  }
}
