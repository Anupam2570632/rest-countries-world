import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [notInterested, setNotInterested] = useState([]);
  const [want, setWant] = useState([]);
  const [countries, setCountry] = useState([]);
  console.log(countries)


  const removeNotInterested = (name) => {
    const newWant = notInterested.filter((country) => {
      return country.name.common != name
    })
    setNotInterested(newWant);
  }

  const handleNotInterested = (country) => {
    const isExist = notInterested.find((countri) => {
      return countri.name.common === country.name.common
    })
    if (isExist) {
      alert("already added")
      return
    }
    setNotInterested([...notInterested, country])
  }

  const wantToVisit = (country) => {
    const isExist = want.find((countri) => {
      return countri.name.common === country.name.common
    })
    if (isExist) {
      alert("already added")
      return
    }
    setWant([...want, country])
  }

  const deleteFromTravel = (name) => {
    const newWant = want.filter((country) => {
      return country.name.common != name
    })
    setWant(newWant);

  }


  useEffect(() => {
    fetch('https://restcountries.com/v3/all')
      .then(res => res.json())
      .then(data => setCountry(data))
  }, [])

  return (
    <>
      <div className='max-w-[1250px] mx-auto'>
        <header className='flex md:py-10 items-center justify-between'>
          <h2 className='text-2xl w-full fixed md:static top-0 md:w-fit md:text-3xl bg-black md:bg-white text-white md:text-black font-black'>Welcome To The World Journey</h2>
          <button className='px-6 py-3 hidden md:flex bg-cyan-700 text-white font-bold rounded-full'>
            Log In To World
          </button>
        </header>

        <main className='flex flex-col mt-20 md:mt-0 lg:flex-row gap-4 p-4 '>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:flex-1'>
            {
              countries.map((country, idx) => <div className='flex border-2 border-blue-200 rounded-lg shadow-md md:p-6 p-2 flex-col items-center gap-4' key={idx}>
                <div className='h-[200px] flex items-center justify-center'>
                  <img className='w-fit h-[150px]' src={country.flags[1]} alt="" />
                </div>
                <div className='flex gap-2 flex-col items-center'>
                  <h1 className='text-2xl font-black'>{country.name.common}</h1>
                  <h2 className='text-xl font-semibold'>{country.altSpellings[2]}</h2>
                  <h2 className='font-bold text-slate-700 text-xl'>Capital : {country.capital}</h2>
                  <p className='text-gray-500 '>Area : {country.area} KM<sup>2</sup></p>

                  <p className='text-green-500 text-[18px]'>
                    {
                      (country.independent) ? "Independent" : "Not independent"
                    }
                  </p>
                </div>
                <div className='lg:space-x-4 space-x-2'>
                  <button onClick={() => wantToVisit(country)} className='px-4 py-3 bg-cyan-600 rounded full mb-4 text-white font-bold'>
                    Add to Travel
                  </button>
                  <button onClick={() => handleNotInterested(country)} className='px-4 py-3 bg-cyan-600 rounded full mb-4 text-white font-bold'>
                    Not interested
                  </button>
                </div>
              </div>)
            }
          </div>

          <div className='px-4 md:min-w-[410px] space-y-4'>
            <p className='border-2 border-blue-700 p-4 text-xl font-bold'>Want to Travel : {want.length} Country</p>
            <div className='space-y-4 p-4 bg-gray-200'>
              {
                want.map((country, idx) => <div className='flex bg-white p-4 rounded-lg gap-4 items-center justify-between' key={idx}>
                  <div className='flex  items-center gap-4'>
                    <img className='w-10 h-fit' src={country.flags[1]} alt="" />
                    <p key={idx}>{country.name.common.slice(0, 25)}</p>
                  </div>
                  <button onClick={() => deleteFromTravel(country.name.common)} className='px-2 py-1 bg-cyan-700 font-semibold text-white rounded-sm'>Remove</button>
                </div>)
              }
            </div>
            <div>
              <p className='border-2 border-blue-700 p-4 text-xl mb-4 font-bold'>Not Interested : {notInterested.length}</p>
              <div className='space-y-4 p-4 bg-gray-200'>
                {
                  notInterested.map((country, idx) => <div className='flex bg-white rounded-lg items-center justify-between p-4' key={idx}>
                    <div className='flex gap-4'>
                      <img className='w-10 h-fit' src={country.flags[1]} alt="" />
                      <h2>{country.name.common}</h2>
                    </div>
                    <button onClick={() => removeNotInterested(country.name.common)} className='px-2 py-1 bg-cyan-700 font-semibold text-white rounded-sm'>Remove</button>
                  </div>)
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}


export default App
