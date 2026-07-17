// index.html의 바깥 HTML 래퍼(<!DOCTYPE>,<html>,<head>,<body>)를 벗겨
// Artifact 게시용 phone-app.html 로 변환한다. 앱 수정 후 다시 실행하면 갱신됨.
//   node build-phone-app.js
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

// <title> ~ </style> 사이(스타일 포함)를 추출
const titleMatch = src.match(/<title>[\s\S]*?<\/style>/i);
// <body> ~ </body> 사이의 본문 추출
const bodyMatch = src.match(/<body>([\s\S]*?)<\/body>/i);

if (!titleMatch || !bodyMatch) {
  console.error("변환 실패: title/style 또는 body 구간을 찾지 못했습니다.");
  process.exit(1);
}

const head = titleMatch[0];              // <title>...</title> + <style>...</style>
const body = bodyMatch[1].trim();        // header + wrap + footer + script

const out = head + "\n\n" + body + "\n";
fs.writeFileSync(path.join(__dirname, "phone-app.html"), out, "utf8");
console.log("phone-app.html 생성 완료 (" + out.length + " chars)");
