window.setInterval(() => {
  if (!dlButtonAlreadyPresent() && moreThanOneDlLink() && allLinksLoaded()) {
    retrieveLinksAndAddDlButton();
  }
}, 2000);

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

  let linkNotGenerated = 0;
  for (let individualLinkDiv of container.children) {
    if (individualLinkDiv.className === "link-not-generated") {
      linkNotGenerated++;
    }
  }
  if (linkNotGenerated === 0) {
    return true;
  }
}

function retrieveLinksAndAddDlButton() {
  const toDl = getAllDlLinks();
  makeDlButton(toDl);
}

function getAllDlLinks() {
  let toDl = [];

  const container = document.getElementById("links-container");
  for (let individualLinkDiv of container.children) {
    for (let possibleDlTag of individualLinkDiv.children) {
      if (
        possibleDlTag.tagName === "A" &&
        possibleDlTag.textContent.startsWith("TELECHARGER")
      ) {
        toDl.push(possibleDlTag.href);
      }
    }
  }
  return toDl;
}

function makeDlButton(toDl) {
  const container = document.getElementById("links-container");
  let button = document.createElement("button");
  button.textContent = "Download all";
  button.className = "addButton";
  container.appendChild(button);
  button.addEventListener("click", () => {
    dlAll(toDl);
  });
}

function dlAll(toDl) {
  for (let link of toDl) {
    window.open(link);
  }
}
