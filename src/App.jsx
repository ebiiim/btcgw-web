import { useEffect, useState } from "react";
import { fetchAnchors } from "./api";


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
              <td>{ar.anchor.bbc1dom}</td>
            </tr>
            <tr>
              <td>BBc-1 Transaction</td>
              <td>{ar.anchor.bbc1tx}</td>
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
    fetchAnchors(props.dom, props.tx).then((ar) => {
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
  const tx = props.match.params.tx;
  return (
    <div>
      <GetAnchorRecord dom={dom} tx={tx} />
    </div>
  )
}

function GetDomAndTx() {
  const [dom, setDom] = useState("");
  const [tx, setTx] = useState("");
  function handleClick() {
    if (dom !== "" && tx !== "") window.location.href = `/ledgers/domains/${dom}/transactions/${tx}`
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
            <input onChange={(e) => setTx(e.target.value)} className="input is-primary" type="text" placeholder="BBc-1 Transaction ID"></input>
          </div>
        </div>
        <div className="buttons">
          <button className="button is-primary" onClick={handleClick}>Find Ledger</button>
        </div>
      </div>
    </section>
  );
}

export function SectionGetDomAndTx() {
  return (
    <GetDomAndTx />
  )
}

function GetAPIKey() {
  const [dom, setDom] = useState("");
  function handleClick() {
    if (dom !== "" && tx !== "") window.location.href = `/ledgers/domains/${dom}/transactions/${tx}`
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
    </section>
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
          <button disabled className="button is-link is-outlined" onClick={() => window.location.href = `/apikeys`}>Get API Key </button>
        </div>
      </div>
    </section>
  )
}
