import { useCallback, useEffect, useRef, useState } from "react"


function App() {

  let [length, setLength] = useState(8);
  let [num, setNum] = useState(false);
  let [pass, setPass] = useState("abhi");

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pas = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (num) str += "0123456789"
    while (1) {
      let ninclude = false;
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        if (char >= 52) { ninclude = true; }
        pas += str.charAt(char)
      }
      if (num == false || ninclude == true) {
        break;
      }
      else { pas = ""; }
    }
    setPass(pas)
  }, [length, num])


  useEffect(() => {
    passwordGenerator()
  }, [length, num])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(pass)
  }, [pass])



  return (
    <>
      <div className="text-center text-4xl font-bold mt-5 mb-2">Password Generator</div>
      <div className="text-center">
        <input
          type="text"
          placeholder="Password"
          readOnly
          value={pass}
          ref={passwordRef}
          className="border border-5 border-blue-500 rounded-lg p-2 w-1/5"
        />
        <button className="border border-5 border-green-500 rounded-lg p-2 bg-blue-700 text-white ml-2" onClick={copyPasswordToClipboard}>copy</button>
      </div>
      <div className="text-center">


        <input
          type="range"
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e) => { setLength(e.target.value) }}
        />
        <label>Length: {length}</label>

        <input
          type="checkbox"
          defaultChecked={num}
          id="numberInput"
          className='ml-5'
          onChange={() => {
            setNum((prev) => !prev);
          }}
        />
        <label>Numbers</label>


      </div>
    </>
  )
}

export default App
