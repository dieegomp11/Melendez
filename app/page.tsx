import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Perfil from '@/components/Perfil'
import Stats from '@/components/Stats'
import Timeline from '@/components/Timeline'
import NochesHistoricas from '@/components/NochesHistoricas'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Perfil />
        <Stats />
        <Timeline />
        <NochesHistoricas />
      </main>
      <Footer />
    </>
  )
}
