import { useState, useEffect } from "react";

function Display() {
  const [value, setValue] = useState("");
  const [pps, setpps] = useState([]);
  const [sympol, setsympol] = useState(false);
  const [number, setnumber] = useState(false);
  const [upper, setupper] = useState(false);
  const [lower, setlower] = useState(false);

  const [num1, setnum1] = useState(0);
  const [num2, setnum2] = useState(0);
  const [num3, setnum3] = useState(0);
  const [num4, setnum4] = useState(0);

  // NEW: Save selected platform
  const [site, setSite] = useState("instagram");

  // Load saved passwords
  useEffect(() => {
    const saved = localStorage.getItem("passwords");
    if (saved) {
      setpps(JSON.parse(saved));
    }
  }, []);

  // Save to local host
  useEffect(() => {
    if (pps.length > 0) {
      localStorage.setItem("passwords", JSON.stringify(pps));
    }
  }, [pps]);

  function generate(length, upper, lower, number, sympol) {
    const lc = "abcdefghijklmnopqrstuvwxyz";
    const uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const N = "1234567890";
    const s = "-_/";
    let chars = "";
    let pasword = "";

    if (upper) chars += uc;
    if (lower) chars += lc;
    if (number) chars += N;
    if (sympol) chars += s;

    for (let i = 0; i < length; i++) {
      pasword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setValue(pasword);
  }

  function change1() {
    setsympol(!sympol);
    setnum1(num1 === 0 ? 1 : 0);
  }

  function change2() {
    setnumber(!number);
    setnum2(num2 === 0 ? 1 : 0);
  }

  function change3() {
    setupper(!upper);
    setnum3(num3 === 0 ? 1 : 0);
  }

  function change4() {
    setlower(!lower);
    setnum4(num4 === 0 ? 1 : 0);
  }

  const length = 12;

  function clear() {
    setValue("");
    setpps([]);
    localStorage.removeItem("passwords");
  }

  // UPDATED: save both site + password
  function addList() {
    if (value.trim() !== "") {
      setpps((prev) => [...prev, { site, password: value }]);
    }
  }

  function deletes(index) {
    const updateInfo = pps.filter((_, i) => i !== index);
    setpps(updateInfo);
  }

  return (
    <>
      <h1 className="hello">
        WELCOME
        <br /> TO GENERATOR <br />
        PASSWORD PAGE
      </h1>

      <div className="containor">
        <h1>GENERATE WITH</h1>

        <div className="checkbox">
          <div className="checkCon">
            sympol
            <input type="checkbox" checked={sympol} onChange={change1} />
          </div>
          <div className="checkCon">
            number
            <input type="checkbox" checked={number} onChange={change2} />
          </div>
        </div>

        <div className="checkbox">
          <div className="checkCon">
            uppercase
            <input type="checkbox" checked={upper} onChange={change3} />
          </div>
          <div className="checkCon">
            lowercase
            <input type="checkbox" checked={lower} onChange={change4} />
          </div>
        </div>

        {/* UPDATED SELECT */}
        <select
          name="social"
          className="midea"
          id="social"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        >
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
          <option value="github">GitHub</option>
        </select>

        <div className="input-btn">
          <input id="in" value={value} readOnly placeholder="press generate..." />
          <button className="btn-save" onClick={addList}>save</button>
        </div>

        <ul>
          {pps.map((item, index) => (
            <li key={index}>
              <b>{item.site}:</b> {item.password}
              <button onClick={() => deletes(index)}>delete</button>
            </li>
          ))}
        </ul>

        <h1>CLICK TO GENERATE</h1>
        <div className="btns">
          <button onClick={() => generate(length, upper, lower, number, sympol)}>
            generate
          </button>
          <button onClick={clear}>clear</button>
        </div>
      </div>
    </>
  );
}

export default Display;
