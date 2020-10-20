window.setInterval(() => {
  if (!dlButtonAlreadyPresent() && moreThanOneDlLink()) {
    if (allLinksLoaded()) {
      retrieveLinksAndAddDlButton();
    }
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
  return false;
}

function allLinksLoaded() {
  const container = document.getElementById("links-container");

  let linkNotGenerated = 0;
  for (let i = 0; i < container.children.length; i++) {
    const el = container.children[i];
    if (el.className === "link-not-generated") {
      linkNotGenerated++;
    }
  }
  if (linkNotGenerated === 0) {
    return true;
  } else {
    return false;
  }
}

function retrieveLinksAndAddDlButton() {
  const toDl = getAllDlLinks();
  makeDlButton(toDl);
}

function getAllDlLinks() {
  let toDl = [];

  const container = document.getElementById("links-container");
  for (let i = 0; i < container.children.length; i++) {
    const el = container.children[i];
    for (let j = 0; j < el.children.length; j++) {
      const childrenEl = el.children[j];
      if (
        childrenEl.tagName === "A" &&
        childrenEl.textContent.startsWith("TELECHARGER")
      ) {
        toDl.push(childrenEl.href);
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
