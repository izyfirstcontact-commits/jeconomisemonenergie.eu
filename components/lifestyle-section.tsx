'use client'

import { motion } from 'framer-motion'

const lifestyleImages = [
  {
    id: 1,
    image: '/images/story-family-home.png',
    alt: 'Famille devant maison',
    icon: '🏡',
  },
  {
    id: 2,
    image: '/images/story-family-living-room.png',
    alt: 'Famille heureuse à la maison',
    icon: '😊',
  },
  {
    id: 3,
    image: '/images/story-brussels-couple.png',
    alt: 'Couple dans cuisine moderne',
    icon: '🏢',
  },
]

export function LifestyleSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
            Vivre mieux en Belgique
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
            Économisez sur votre énergie et consacrez plus de temps à ce qui compte vraiment pour votre famille
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {lifestyleImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-card border border-border h-72 md:h-96 shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-3xl md:text-4xl mb-2">{item.icon}</div>
                <p className="text-white font-semibold">{item.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
