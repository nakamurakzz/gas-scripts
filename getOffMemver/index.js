import publishToSlack from "../publishToSlack/index"

const spreadSheetUrl = ""

function myFunction() {
  const file = SpreadsheetApp.openByUrl(spreadSheetUrl);
  const sheet = file.getSheetByName("2022") // シート名を指定

  // 日付を取得
  // 対象の列を取得
  const dayRange = sheet.getRange("C4:CP4") // C4:P4 に日付が入っている
  const [days] = dayRange.getValues()

  const today = new Date().setHours(0,0,0,0)

  // 休暇情報を取得したい当日のセル番号を取得
  const dayCellIndex =  days.map(d=>d.getTime()).indexOf(today)
  const todayCell = dayRange.getCell(1,dayCellIndex + 1).getColumn()

  // 休みのメンバーを取得
  const offMembers = []
  let row = 6; // B列の6行目からメンバー一覧が入っている
  while(sheet.getRange(`B${row}`).getValue()!=""){
    const attendance = sheet.getRange(row,todayCell).getValue();
    if(attendance != ""){
      const name = sheet.getRange(`B${row}`).getValue();
      offMembers.push(name)
    }
    row ++;
  }

  if(offMembers.length==0) return
  
  // メッセージ整形
  const message = "メンバー：\n" + offMembers.join("、 ")
  console.log(message)

  // Slack通知
  publishToSlack(message)
}
