// Adding and removing active classes on navlinks
const currentPath = window.location.pathname.split("/").pop();

const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  const linkPath = link.getAttribute("href");

  link.classList.remove("active");

  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

// for typewriter effect

const phrases = ["Dream Into", "With Digital", "Potential"];

const italicTexts = ["Reality", "Solutions", "With Us"];

const typewriterElements = [
  document.getElementById("typewriter1"),
  document.getElementById("typewriter2"),
  document.getElementById("italic3"), //   because of the order is different in last h1, the italic one is first
];

const italicElements = [
  document.getElementById("italic1"),
  document.getElementById("italic2"),
  document.getElementById("typewriter3"),
];

let currentPhraseIndex = 0;
let currentElementIndex = 0;

function typePhrase(element, italicElement, phrase, italicText, callback) {
  let index = 0;

  // Clear existing text
  element.textContent = "";
  italicElement.textContent = "";

  // Typing forward
  const typingInterval = setInterval(() => {
    if (index < phrase.length) {
      element.textContent += phrase.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
      // Start typing the italic text after the main text is done
      let italicIndex = 0;
      const typingItalicInterval = setInterval(() => {
        if (italicIndex < italicText.length) {
          italicElement.textContent += italicText.charAt(italicIndex);
          italicIndex++;
        } else {
          clearInterval(typingItalicInterval);
          setTimeout(() => {
            // Start deleting the italic text
            deleteText(italicElement, italicText.length, () => {
              // After deleting italic, start deleting main text
              deleteText(element, phrase.length, callback);
            });
          }, 2000); // Pause after typing
        }
      }, 150); // Typing speed for italic text
    }
  }, 150); // Typing speed for main text
}

function deleteText(element, length, callback) {
  let index = length;

  const deletingInterval = setInterval(() => {
    if (index > 0) {
      element.textContent = element.textContent.substring(0, index - 1);
      index--;
    } else {
      clearInterval(deletingInterval);
      setTimeout(callback, 300); // Pause before moving to the next phrase
    }
  }, 150); // Deleting speed
}

function cyclePhrases() {
  // Hide all h1 elements
  document.querySelectorAll(".typewriter-container h1").forEach((h1, index) => {
    h1.style.display = index === currentElementIndex ? "block" : "none";
  });

  const currentElement = typewriterElements[currentElementIndex];
  const currentItalicElement = italicElements[currentElementIndex];
  const currentPhrase = phrases[currentPhraseIndex];
  const currentItalicText = italicTexts[currentPhraseIndex];

  typePhrase(
    currentElement,
    currentItalicElement,
    currentPhrase,
    currentItalicText,
    () => {
      currentPhraseIndex++;
      currentElementIndex =
        (currentElementIndex + 1) % typewriterElements.length;
      currentPhraseIndex %= phrases.length;
      setTimeout(cyclePhrases, 100); // Pause before next phrase
    }
  );
}

cyclePhrases();
