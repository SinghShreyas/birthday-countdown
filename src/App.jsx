import { useEffect, useState } from 'react'
import './App.css'
import couple1 from './assets/couple1.jpg'
import couple2 from './assets/couple.JPG'

const loaderImages = [couple1, couple2]

// Set the birthday to July 6, 2024 at 23:59:59.999 local time
const BIRTHDAY = new Date(2024, 6, 6, 23, 59, 59, 999) // Note: month is 0-indexed, so 6 = July

function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  const thisYearBirthday = new Date(year, 6, 6, 23, 59, 59, 999); // July 6th, 23:59:59.999
  if (now > thisYearBirthday) {
    year += 1;
  }
  return new Date(year, 6, 6, 23, 59, 59, 999);
}

function getTimeLeft() {
  const now = new Date();
  const birthday = getNextBirthday();
  const diff = birthday - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [loading, setLoading] = useState(true)
  const [loaderImg, setLoaderImg] = useState(loaderImages[0])

  useEffect(() => {
    setLoaderImg(loaderImages[Math.floor(Math.random() * loaderImages.length)])
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timeout)
  }, [])

  if (loading) {
    return (
      <div
        className="loader-bg"
        style={{
          background:
            `url(${loaderImg}) center center/contain no-repeat, linear-gradient(135deg, #fbc2eb 0%, #a18cd1 100%)`,
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundPosition: 'center center, center center',
          backgroundSize: 'contain, cover',
        }}
      >
        <div className="loader-text">BAUAA, I LOVE YOU.</div>
        <div className="loader-heart">❤️</div>
      </div>
    )
  }

  return (
    <>
      <nav className="romantic-navbar">
        <span className="navbar-title">💖 Priya, My Love 💖</span>
        <span className="navbar-message">To the Queen of My Heart &mdash; You are my today and all of my tomorrows.</span>
      </nav>
      <div className="romantic-bg">
        <div className="left-half">
          <div className="countdown-container">
            <span className="pumping-heart" role="img" aria-label="pumping heart">❤️</span>
            <h1 className="romantic-title"><span className="heartbeat-name">Priya</span>, My Love</h1>
            <p className="love-note">Every second brings us closer to celebrating you. I love you more with every heartbeat. 💖</p>
            <div className="countdown-timer">
              <div className="time-segment">
                <span className="number">{timeLeft.days}</span>
                <span className="label">Days</span>
              </div>
              <div className="time-segment">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">Hours</span>
              </div>
              <div className="time-segment">
                <span className="number">{timeLeft.minutes}</span>
                <span className="label">Minutes</span>
              </div>
              <div className="time-segment">
                <span className="number">{timeLeft.seconds}</span>
                <span className="label">Seconds</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-half"></div>
      </div>
    </>
  )
}

export default App
