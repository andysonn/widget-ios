// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: quote-right;

const user = "an"
const jike = "4DDA0425-FB41-4188-89E4-952CA15E3C5E"
const telegram = "JunAnChen"
const github = "andysonn"
const sspai = "spencerwoo"

// const data = await fetchData()
const widget = createWidget()
Script.setWidget(widget)
Script.complete()

function createWidget(data = {}) {
  const {telegram, github} = data || {}
  const w = new ListWidget()
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")]
  bgColor.locations = [0.0, 1.0]
  w.backgroundGradient = bgColor
  w.setPadding(12, 15, 15, 12)
  w.spacing = 6

  const time = new Date()
  const dfTime = new DateFormatter()
  dfTime.locale = "en"
  dfTime.useMediumDateStyle()
  dfTime.useNoTimeStyle()

  const firstLine = w.addText(`[📱] ${user} ~$ now`)
  firstLine.textColor = Color.white()
  firstLine.textOpacity = 0.7
  firstLine.font = new Font("Menlo", 11)

  const timeLine = w.addText(`[🗓] ${dfTime.string(time)}`)
  timeLine.textColor = Color.white()
  timeLine.font = new Font("Menlo", 11)

  const batteryLine = w.addText(`[🔋] Battery: ${renderBattery()}`)
  batteryLine.textColor = new Color("#6ef2ae")
  batteryLine.font = new Font("Menlo", 11)

  const telegramLine = w.addText(`[️✈️️] Telegram: ${telegram || 0}`)
  telegramLine.textColor = new Color("#7dbbae")
  telegramLine.font = new Font("Menlo", 11)

  const githubLine = w.addText(`[📟] GitHub: ${github || 0}`)
  githubLine.textColor = new Color("#ff9468")
  githubLine.font = new Font("Menlo", 11)

  console.log(w)
  return w
}

async function fetchData() {
  const url = `https://api.spencerwoo.com/substats/?source=jikeFollower&queryKey=${jike}`
    + `&source=telegram&queryKey=${telegram}`
    + `&source=github&queryKey=${github}`
    + `&source=sspai&queryKey=${sspai}`
  const request = new Request(url)
  const res = await request.loadJSON()
  return res.data.subsInEachSource
}

function renderBattery() {
  const batteryLevel = Device.batteryLevel()
  const batteryAscii = `${Math.round(batteryLevel * 100)}%`
  return batteryAscii
}
