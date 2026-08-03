'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Faamille%20belge%209-775OBSNuUrh1BKD5Q3LsUR8Pc4oFEG.jpg',
    alt: 'Famille belge devant leur maison',
    title: 'Économies en famille',
  },
  {
    id: 2,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/An97XiUe7rKFbkabJiIGZdk49gG5Pv_-R8EAeqxLLwhZS_IdakCGPPZAMOQ_mHEEcTOj6iMSTQFP8y5gxF79PYBHa3-7m8EGc00DEEX0wntNE6xVWSRrSVNDdZGBVyxpfNz2Pn-O-gcpn_vVgb5pEsqO8FA-iemfTDZbTu14QiLsA5d9HcnAZsFWtmX_9PA1_KvjymwPsvsZXJE1We4VXM-RviRwfM0Ih9dQ9fea3SyyMsRAv9eLl.jpeg',
    alt: 'Femme témoignage client',
    title: 'Notre engagement',
  },
  {
    id: 3,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/An8gt8fbZIjCzHVvMuDcerAjuHEZshJcKEfdnfertfmuBj9Znlbz3HVdow3kcUTf8wxiuUEnXqIdnOgiucSLFGp29ExVMRTyFjr_z32XlE53dnHEXrkV3alUXopRtQW7hNn5fy1Mk3_JeqbzHo-OYIVz_Tq-p6YI6DjCXwej_Xh9fa2QVDP5XAx3rxpsULbiz_hEKg93enmvEr-sw5yg_l-F2mYGgMQzOt8g251OqTTnaIzBHylZk.jpeg',
    alt: 'Famille qualité de vie',
    title: 'Qualité de vie améliorée',
  },
  {
    id: 4,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grande%20maison%20Flandre-qUwUDi8hWEqCqLcu1x3JCH1ZEiXR0I.jpg',
    alt: 'Famille dans rue de Flandre',
    title: 'Vivre en Belgique intelligemment',
  },
  {
    id: 5,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Famille%20belge%2010-4Pbt1hJ79vcAB8UuIUq9gT3u0E2hgI.jpg',
    alt: 'Famille heureuse à la maison',
    title: 'Confort et sérénité',
  },
  {
    id: 6,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Appartement%20Bruxelles%2022html-SuQFDEEIETP6HUPa67xVCG06CzFESG.jpg',
    alt: 'Couple dans cuisine moderne',
    title: 'Vivre mieux à Bruxelles',
  },
]

export function TestimonialsGallery() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="mx-auto w-full px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
            Les histoires de nos clients
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
            Découvrez comment les Belges réduisent leur facture d'énergie et améliorent leur qualité de vie
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-colors h-64 md:h-80"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
