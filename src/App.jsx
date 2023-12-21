// import hooks from react
import {useState, useCallback, useEffect, useRef} from 'react'

//create a function with export
export default function App() {

  // create variable with useState
  const[length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  // useCallback hook
  const passwordGenerator = useCallback(()=>{

    // create two variable
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    // create conditions
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!;#$%&'()*+,-./:;<=>?@[]^_`{|}~"
    // looping
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length, numberAllowed, charAllowed, setPassword])

  // useCallback hook
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])

  // useEffect hook
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (

    // Main div
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      
      {/* inner div */}
      <div className='flex shadow rounded-lg overflow-hidden'>
        {/* use for showing password */}
        <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         {/* copy button */}
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      </div>

      {/* collections of all following input such as range, length, Numbers, Character */}
      <div className='flex text-sm gap-x-2'>

        
        {/* range input div */}
      <div className='flex items-center gap-x-1'>
        <input
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
         />
         <label>length:{length}</label>
      </div>


      {/* Numbers input div */}
      <div className='flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked = {numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed ((prev)=> ! prev)
        }}
         />
         <label htmlFor="numberInput">Numbers</label>
      </div>

      
      {/* Character input div */}
      <div className='flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked = {charAllowed}
        id='charInput'
        onChange={()=>{
          setCharAllowed ((prev)=> ! prev)
        }}
         />
         <label htmlFor="charInput">Character</label>
      </div>
      </div>
      
    </div>
  )
}
