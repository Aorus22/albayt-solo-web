import KonsultasiBar from '@/Components/KonsultasiBar'
import PaketAlbayt from '@/Components/PaketAlbayt'
// import PreviewArtikel from '@/Components/PreviewArtikel'
// import PreviewGaleri from '@/Components/PreviewGaleri'
import Testimoni from '@/Components/Testimoni'
import WhyUs from '@/Components/WhyUs'
import "./globals.css";
import Banner from '@/Components/Banner'

const Page = () => {
    return (
        <>
            <Banner />
            <PaketAlbayt />
            <WhyUs />
            <Testimoni />
            {/* <PreviewGaleri />
            <PreviewArtikel /> */}
            <KonsultasiBar />
        </>
    )
}

export default Page