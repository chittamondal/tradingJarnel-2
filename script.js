const tableBody = document.querySelector("#tableBody"); 
const addBtn = document.querySelector("#btn");

// ১. টেবিল সারি (Row) তৈরির ফাংশন
function createRowHTML(item, index) {
  return `
    <tr class="tr" data-index="${index}">
      <td>${item.date || '-'}</td>
      <td>${item.day || '-'}</td>
      <td>${item.time || '-'}</td>
      <td>${item.entrytime || '-'}</td>
      <td>${item.band || '-'}</td>
      <td>${item.rsi || '-'}</td>
      <td>${item.sl || '-'}</td>
      <td>${item.targetUnreached || '-'}</td>
      <td>${item.target || '-'}</td>
      <td>
        <button class="delete-btn">Delete</button>
      </td>
    </tr>
  `;
}

// ২. সেভ হওয়া ডাটা লোড করার ফাংশন
function loadSavedData() {
  const savedData = JSON.parse(localStorage.getItem("tradeList")) || [];
  
  if (savedData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center;">No trade data found</td></tr>`;
    return;
  }

  const rowsHTML = savedData.map((item, index) => createRowHTML(item, index)).join("");
  tableBody.innerHTML = rowsHTML;
}

// ৩. নতুন ডাটা যোগ করার লজিক (Add Button Event)
addBtn.addEventListener("click", () => {
  const newTrade = {
    date: document.querySelector("#date").value,
    day: document.querySelector("#day").value,
    time: document.querySelector("#time").value,
    entrytime: document.querySelector("#entrytime").value,
    band: document.querySelector("#band").value,
    rsi: document.querySelector("#rsi").value,
    sl: document.querySelector("#sl").value,
    targetUnreached: document.querySelector("#targetUnreached").value,
    target: document.querySelector("#target").value,
  };

  let savedData = JSON.parse(localStorage.getItem("tradeList")) || [];
  savedData.push(newTrade);
  
  // LocalStorage-এ সেভ করা
  localStorage.setItem("tradeList", JSON.stringify(savedData));

  // ইনপুট ফিল্ডগুলো খালি করা
  document.querySelectorAll(".form-container input").forEach(input => input.value = "");

  // টেবিল পুনরায় আপডেট করা
  loadSavedData();
});

// ৪. ডাটা রিমুভ/ডিলিট করার লজিক
tableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const row = event.target.closest("tr");
    const indexToRemove = parseInt(row.getAttribute("data-index"), 10);

    let savedData = JSON.parse(localStorage.getItem("tradeList")) || [];

    if (!isNaN(indexToRemove)) {
      savedData.splice(indexToRemove, 1);
      localStorage.setItem("tradeList", JSON.stringify(savedData));
      
      // রিফ্রেশ বা টেবিল আপডেট
      loadSavedData();
    }
  }
});

// পেজ লোড হবার সময় প্রথমবার ডাটা দেখাবে
loadSavedData();