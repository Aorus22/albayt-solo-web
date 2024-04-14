import Hero from '@/Components/Hero'
import KonsultasiBar from '@/Components/KonsultasiBar'
import PaketAlbayt from '@/Components/PaketAlbayt'
import PreviewArtikel from '@/Components/PreviewArtikel'
import PreviewGaleri from '@/Components/PreviewGaleri'
import Testimoni from '@/Components/Testimoni'
import WhyUs from '@/Components/WhyUs'

const page = () => {
  return (
    <>
      <Hero /> 
      <PaketAlbayt />
      <WhyUs />
      <Testimoni />
      <PreviewGaleri />
      <PreviewArtikel />
      <KonsultasiBar />
    </>
  )
}

export default page