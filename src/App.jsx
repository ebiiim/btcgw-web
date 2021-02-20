import { useEffect, useState } from "react";
import { fetchAnchors, fetchCreateAPIKey } from "./api";


function Loading() {
  return (
    <div>
      <progress className="progress is-primary" max="100">loading</progress>
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <p>Not Found</p>
    </div>
  )
}

function AnchorRecord(props) {
  const { ar } = props;
  if (ar == null) {
    return <Loading />;
  }
  if (ar.anchor == null) {
    return <NotFound />;
  }
  return (
    <div>
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BBc-1 Domain ID</td>
              <td>{ar.anchor.domain}</td>
            </tr>
            <tr>
              <td>BBc-1 Digest</td>
              <td>{ar.anchor.digest}</td>
            </tr>
            <tr>
              <td>Timestamp</td>
              <td>{ar.anchor.time} ({ar.anchor.date})</td>
            </tr>
            <tr>
              <td>Bitcoin Chain</td>
              <td>{ar.anchor.chain}</td>
            </tr>
            <tr>
              <td>Bitcoin Transaction</td>
              <td><a href={ar.url} target="_blank" >{ar.btctx}</a></td>
            </tr>
            <tr>
              <td>BBc-1 Domain Name</td>
              <td>{ar.bbc1name}</td>
            </tr>
            <tr>
              <td>Note</td>
              <td>{ar.note}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GetAnchorRecord(props) {
  const [ar, setAR] = useState(null);
  useEffect(() => {
    fetchAnchors(props.dom, props.dig).then((ar) => {
      setAR(ar);
    });
  }, []);
  return (
    <section className="section">
      <div className="container">
        <AnchorRecord ar={ar} />
      </div>
    </section>
  );
}

export function SectionAnchorRecord(props) {
  const dom = props.match.params.dom;
  const dig = props.match.params.dig;
  return (
    <div>
      <GetAnchorRecord dom={dom} dig={dig} />
    </div>
  )
}

function GetDomAndDig() {
  const [dom, setDom] = useState("");
  const [dig, setDig] = useState("");
  function handleClick() {
    if (dom !== "" && dig !== "") window.location.href = `/ledgers/domains/${dom}/digests/${dig}`
  }
  return (
    <section className="section">
      <div className="container">
        <div className="field">
          <div className="control" >
            <input onChange={(e) => { setDom(e.target.value) }} className="input is-primary" type="text" placeholder="BBc-1 Domain ID"></input>
          </div>
        </div >
        <div className="field">
          <div className="control" >
            <input onChange={(e) => setDig(e.target.value)} className="input is-primary" type="text" placeholder="BBc-1 Digest"></input>
          </div>
        </div>
        <div className="buttons">
          <button className="button is-primary" onClick={handleClick}>Find Ledger</button>
        </div>
      </div>
    </section>
  );
}

export function SectionGetDomAndDig() {
  return (
    <GetDomAndDig />
  )
}

function GetAPIKey() {
  const [dom, setDom] = useState("");
  const [apikey, setAPIKey] = useState(null);
  useEffect(() => {
    if (apikey && apikey.key) {
      document.querySelector("#c").innerHTML = apikey.key;
      document.querySelector("#m").classList.add("is-active");
    }
  });
  function handleClick() {
    if (dom == "") return;
    fetchCreateAPIKey(dom).then((apikey) => {
      setAPIKey(apikey);
    });
  }
  return (
    <section className="section">
      <div className="container">
        <div className="field">
          <div className="control" >
            <input onChange={(e) => { setDom(e.target.value) }} className="input is-info" type="text" placeholder="BBc-1 Domain ID"></input>
          </div>
        </div >
        <div className="buttons">
          <button className="button is-info" onClick={handleClick}>Get API Key</button>
        </div>
      </div>
      <div id="m" className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">API Key Generated</p>
          </header>
          <section className="modal-card-body">
            <code id="c"></code>
          </section>
          <footer className="modal-card-foot">
            <button onClick={() => { document.querySelector("#m").classList.remove("is-active"); setAPIKey(null); }} className="button is-success">Confirmed</button>
          </footer>
        </div>
      </div>
    </section >
  );
}

export function SectionGetAPIKey() {
  return (
    <GetAPIKey />
  )
}

export function SectionTopPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="buttons is-centered">
          <button className="button is-link" onClick={() => window.location.href = `/ledgers`}>Find Ledger</button>
          <button className="button is-link is-outlined" onClick={() => window.location.href = `/apikeys`}>Get API Key</button>
        </div>
      </div>
    </section>
  )
}
