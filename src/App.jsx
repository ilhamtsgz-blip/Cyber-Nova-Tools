import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import WelcomeModal from './components/WelcomeModal'
import CoinLimitModal from './components/CoinLimitModal'
import { installCoinInterceptor } from './utils/coinInterceptor'
import CoordinateChecker from './components/CoordinateChecker'
import IpLocation from './components/IpLocation'
import UsernameChecker from './components/UsernameChecker'
import ImageIntelligence from './components/ImageIntelligence'
import PhoneChecker from './components/PhoneChecker'
import SchoolChecker from './components/SchoolChecker'
import NikChecker from './components/NikChecker'
import NikGenerator from './components/NikGenerator'
import CctvViewer from './components/CctvViewer'
import PhoneSpecChecker from './components/PhoneSpecChecker'
import FeatureSearch from './components/FeatureSearch'
import PlateChecker from './components/PlateChecker'
import EmailBreachChecker from './components/EmailBreachChecker'
import CountryChecker from './components/CountryChecker'
import AiOsintChecker from './components/AiOsintChecker'
import PhoneLeakChecker from './components/PhoneLeakChecker'
import TranslateChecker from './components/TranslateChecker'
import NewsOsintChecker from './components/NewsOsintChecker'
import CveLookupChecker from './components/CveLookupChecker'
import CompanyLookupChecker from './components/CompanyLookupChecker'
import EmailDomainIntelChecker from './components/EmailDomainIntelChecker'
import SubdomainFinder from './components/SubdomainFinder'
import SslChecker from './components/SslChecker'
import TyposquatChecker from './components/TyposquatChecker'
import WaybackViewer from './components/WaybackViewer'
import TechStackDetector from './components/TechStackDetector'
import PwnedPasswordChecker from './components/PwnedPasswordChecker'
import UrlSafetyChecker from './components/UrlSafetyChecker'
import DorkBuilder from './components/DorkBuilder'
import QrDecoder from './components/QrDecoder'
import OsintMindMap from './components/OsintMindMap'
import AudioTranscribe from './components/AudioTranscribe'
import ImeiChecker from './components/ImeiChecker'
import Calculator from './components/Calculator'
import MusicPlayer from './components/MusicPlayer'
import SourceCodeViewer from './components/SourceCodeViewer'
import TelegramLookup from './components/TelegramLookup'
import TelegramSpamBot from './components/TelegramSpamBot'
import YourIp from './components/YourIp'
import EncCode from './components/EncCode'
import DecCode from './components/DecCode'
import EnigmaEncode from './components/EnigmaEncode'
import EnigmaDecode from './components/EnigmaDecode'
import EconomyAnalysis from './components/EconomyAnalysis'
import UsernameMix from './components/UsernameMix'
import TextToQr from './components/TextToQr'
import WebsiteStatus from './components/WebsiteStatus'
import BugReport from './components/BugReport'
import WebsiteScraper from './components/WebsiteScraper'
import GameHub from './components/GameHub'
import MuslimFeature from './components/MuslimFeature'
import WeatherFeature from './components/WeatherFeature'
import ProfileCard from './components/ProfileCard'
import SettingsPanel from './components/SettingsPanel'
import FeatureMenu from './components/FeatureMenu'
import { features } from './data/features'
import { getSettings, saveSettings, applySettingsToDOM, debounce, DEFAULT_SETTINGS } from './utils/settingsClient'
import './App.css'

// Dipasang sekali pas module ini pertama kali diimport (sebelum App
// dirender) -> semua fetch('/api/...') di komponen manapun otomatis
// kebaca header coin-nya, ga perlu ubah kode di tiap komponen fitur.
installCoinInterceptor()

function App() {
  const [tab, setTab] = useState('coordinate')
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isMuslimOpen, setIsMuslimOpen] = useState(false)
  const [isWeatherOpen, setIsWeatherOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  useEffect(() => {
    getSettings().then((s) => {
      setSettings(s)
      applySettingsToDOM(s)
    })
  }, [])

  // Nyimpen ke server di-debounce biar gak nembak /api/settings puluhan kali
  // pas user narik color picker. UI-nya sendiri (state + DOM) tetep update
  // LANGSUNG (optimistic), jadi ganti warna/BG/title kerasa instan walau
  // request ke server masih nunggu / lagi jalan di background.
  const persistSettings = useRef(
    debounce((data) => {
      saveSettings(data).catch((err) => {
        // saveSettings udah nge-log sendiri; di sini kita cuma pastiin
        // error-nya ga jadi unhandled rejection yang bikin browser diem2 gagal.
        console.error('[settings] perubahan gagal kesimpen ke server:', err.message)
      })
    }, 300)
  )

  useEffect(() => () => persistSettings.current.cancel(), [])

  const handleUpdateSettings = (partial) => {
    const merged = { ...settings, ...partial }
    setSettings(merged)
    applySettingsToDOM(merged)
    persistSettings.current(merged)
  }

  const currentTitle = features.find((f) => f.id === tab)?.label.toUpperCase() || 'CEK KOORDINAT'

  return (
    <div className="app">
      <WelcomeModal />
      <CoinLimitModal />
      <Header
        title={currentTitle}
        onGameClick={() => setIsGameOpen(true)}
        onMuslimClick={() => setIsMuslimOpen(true)}
        onWeatherClick={() => setIsWeatherOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      {isGameOpen && <GameHub onClose={() => setIsGameOpen(false)} />}
      {isMuslimOpen && <MuslimFeature onClose={() => setIsMuslimOpen(false)} />}
      {isWeatherOpen && <WeatherFeature onClose={() => setIsWeatherOpen(false)} />}
      {isProfileOpen && <ProfileCard settings={settings} onClose={() => setIsProfileOpen(false)} />}
      {isSettingsOpen && (
        <SettingsPanel settings={settings} onUpdate={handleUpdateSettings} onClose={() => setIsSettingsOpen(false)} />
      )}
      <FeatureMenu features={features} currentTab={tab} currentTitle={currentTitle} onSelect={setTab} />
      <FeatureSearch onSelect={setTab} currentTab={tab} />
      <main className="main-content">
        {tab === 'coordinate' && <CoordinateChecker />}
        {tab === 'ip' && <IpLocation />}
        {tab === 'username' && <UsernameChecker />}
        {tab === 'image' && <ImageIntelligence />}
        {tab === 'phone' && <PhoneChecker />}
        {tab === 'school' && <SchoolChecker />}
        {tab === 'nik' && <NikChecker />}
        {tab === 'nikgen' && <NikGenerator />}
        {tab === 'cctv' && <CctvViewer />}
        {tab === 'phonespec' && <PhoneSpecChecker />}
        {tab === 'plate' && <PlateChecker />}
        {tab === 'email' && <EmailBreachChecker />}
        {tab === 'country' && <CountryChecker />}
        {tab === 'aiosint' && <AiOsintChecker />}
        {tab === 'leak' && <PhoneLeakChecker />}
        {tab === 'translate' && <TranslateChecker />}
        {tab === 'newsosint' && <NewsOsintChecker />}
        {tab === 'cve' && <CveLookupChecker />}
        {tab === 'companylookup' && <CompanyLookupChecker />}
        {tab === 'emaildomain' && <EmailDomainIntelChecker />}
        {tab === 'subdomain' && <SubdomainFinder />}
        {tab === 'sslchecker' && <SslChecker />}
        {tab === 'typosquat' && <TyposquatChecker />}
        {tab === 'wayback' && <WaybackViewer />}
        {tab === 'techstack' && <TechStackDetector />}
        {tab === 'pwnedpw' && <PwnedPasswordChecker />}
        {tab === 'urlsafety' && <UrlSafetyChecker />}
        {tab === 'dork' && <DorkBuilder />}
        {tab === 'qrdecoder' && <QrDecoder />}
        {tab === 'osintmap' && <OsintMindMap />}
        {tab === 'audiotranscribe' && <AudioTranscribe />}
        {tab === 'imei' && <ImeiChecker />}
        {tab === 'kalkulator' && <Calculator />}
        {tab === 'music' && <MusicPlayer />}
        {tab === 'sourcecode' && <SourceCodeViewer />}
        {tab === 'tglookup' && <TelegramLookup />}
        {tab === 'tgspam' && <TelegramSpamBot />}
        {tab === 'yourip' && <YourIp />}
        {tab === 'enccode' && <EncCode />}
        {tab === 'deccode' && <DecCode />}
        {tab === 'scraper' && <WebsiteScraper />}
        {tab === 'enigmaenc' && <EnigmaEncode />}
        {tab === 'enigmadec' && <EnigmaDecode />}
        {tab === 'econanalysis' && <EconomyAnalysis />}
        {tab === 'usernamemix' && <UsernameMix />}
        {tab === 'texttoqr' && <TextToQr />}
        {tab === 'sitestatus' && <WebsiteStatus />}
        {tab === 'bugreport' && <BugReport />}
      </main>
    </div>
  )
}

export default App
