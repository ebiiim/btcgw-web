import { cfg } from "./config";


export async function fetchAnchors(dom, tx) {
  const response = await fetch(
    `${cfg.api.ledgers.server}${cfg.api.ledgers.baseUrl}/domains/${dom}/transactions/${tx}`
  );
  const status = response.status;
  const data = await response.json();
  if (status !== 200) return data;

  let btcchain = "btc" // Mainnet
  if (data.anchor.chain == "Testnet3") btcchain = "btc-testnet"
  data.url = `https://www.blockchain.com/${btcchain}/tx/${data.btctx}`
  data.anchor.date = unix2date(data.anchor.time)
  return data;
}

function unix2date(t) {
  var a = new Date(t * 1000);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + " " + date + " " + hour + ":" + min + ":" + sec + " " + year;
  return time;
}
