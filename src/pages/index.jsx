import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

// Components
import Header from '../components/home/Header'
import About from '../components/home/About'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <Header />
      <About />
    </div>
  )
}
