const textsToType = [
    "Pore korbo - ei ekta kotha tomar jiboner mulloban 9 ti bossor kere niyece.",
    "Win or Lost: Try to win every single day!",
    "You will never make any money"
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  const typingSpeed = 120; // Adjust typing speed in milliseconds
  
  function typeText() {
    const typedTextElement = document.querySelector("#typedText");
  
    if (charIndex < textsToType[textIndex].length) {
      typedTextElement.textContent += textsToType[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else {
      // Move to the next text in the array
      textIndex = (textIndex + 1) % textsToType.length;
      charIndex = 0;
      typedTextElement.textContent = "";
      setTimeout(typeText, typingSpeed);
    }
  }
typeText();