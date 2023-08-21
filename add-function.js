document.getElementById("createObject").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission (if the button is inside a form)

  const date = document.getElementById("date").value;
  const namaz = document.querySelector('input[name="namaz"]').checked ? 5 : 0;
  const quran = document.querySelector('input[name="quran"]').checked ? 5 : 0;
  const noSmoking = document.querySelector('input[name="noSmoking"]').checked ? 5 : 0;
  const contactFamily = document.querySelector('input[name="contactFamily"]').checked ? 5 : 0;
  const jobApply = document.querySelector('input[name="jobApply"]').checked ? 5 : 0;
  const exercise = document.querySelector('input[name="exercise"]').checked ? 5 : 0;
  const mernJob = document.querySelector('input[name="mernJob"]').checked ? 5 : 0;
  const reactBook = document.querySelector('input[name="reactBook"]').checked ? 5 : 0;
  const certificateStudy = document.querySelector('input[name="certificateStudy"]').checked ? 5 : 0;
  const importantWork = document.getElementById("importantWork").value;
  const giftChoice = document.getElementById("giftChoice").value;

  const totalScore = namaz + quran + noSmoking + contactFamily + jobApply + exercise + mernJob + reactBook + certificateStudy;
  const score = ((totalScore / 45) * 100).toFixed(2);
  const result = score > 99 ? "win" : "lose";

  const newDay = {
    date: date,
    namaz: namaz,
    quran: quran,
    noSmoking: noSmoking,
    contactFamily: contactFamily,
    jobApply: jobApply,
    exercise: exercise,
    mernJob: mernJob,
    reactBook: reactBook,
    certificateStudy: certificateStudy,
    importantWork: importantWork,
    giftChoice: giftChoice,
    score: score + "%",
    result: result
  };

  // Get existing data or create an empty array
  let savedData = JSON.parse(localStorage.getItem("adminData")) || [];
  savedData.push(newDay);

  // Save the updated data to localStorage
  localStorage.setItem("adminData", JSON.stringify(savedData));
  window.location.href = "./index.html";

  console.log(newDay); // You can replace this with your desired action, like adding to an array or sending to a server.
});
