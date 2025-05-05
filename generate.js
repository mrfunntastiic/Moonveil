const fs = require("fs");

const start = new Date("2025-05-04");
const end = new Date("2026-05-04");

const dateLines = [];
const contributionLines = [];

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let current = new Date(start);

while (current <= end) {
  const date = formatDate(current);
  const r = Math.random();

  let commitCount = 0;

  // Pola hijau terang:
  // 6% hari kosong
  // 24% hari 1-2 commit
  // 48% hari 3-5 commit
  // 17% hari 6-8 commit
  // 5% hari 9-12 commit
  if (r < 0.06) {
    commitCount = 0;
  } else if (r < 0.30) {
    commitCount = randomInt(1, 2);
  } else if (r < 0.78) {
    commitCount = randomInt(3, 5);
  } else if (r < 0.95) {
    commitCount = randomInt(6, 8);
  } else {
    commitCount = randomInt(9, 12);
  }

  if (commitCount > 0) {
    dateLines.push(date);

    const hours = [
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21
    ];

    const usedHours = [];

    for (let i = 0; i < commitCount; i++) {
      let hour;

      do {
        hour = randomItem(hours);
      } while (usedHours.includes(hour));

      usedHours.push(hour);
    }

    usedHours.sort((a, b) => a - b);

    for (const hour of usedHours) {
      const minute = randomItem([
        "00", "05", "10", "15", "20", "25",
        "30", "35", "40", "45", "50", "55"
      ]);

      contributionLines.push(
        `Commit on ${date}T${String(hour).padStart(2, "0")}:${minute}:00`
      );
    }
  }

  current.setDate(current.getDate() + 1);
}

fs.writeFileSync("date.txt", dateLines.join("\n"));
fs.writeFileSync("contribution.txt", contributionLines.join("\n"));

console.log("Selesai generate file!");
console.log(`date.txt: ${dateLines.length} tanggal aktif`);
console.log(`contribution.txt: ${contributionLines.length} commit`);