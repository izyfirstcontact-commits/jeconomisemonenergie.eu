"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Loader2, CheckCircle2 } from "lucide-react"

// Belgian postal codes database (major cities and communes)
const belgianLocalities = [
  { postalCode: "1000", city: "Bruxelles", commune: "Bruxelles" },
  { postalCode: "1020", city: "Laeken", commune: "Bruxelles" },
  { postalCode: "1030", city: "Schaerbeek", commune: "Schaerbeek" },
  { postalCode: "1040", city: "Etterbeek", commune: "Etterbeek" },
  { postalCode: "1050", city: "Ixelles", commune: "Ixelles" },
  { postalCode: "1060", city: "Saint-Gilles", commune: "Saint-Gilles" },
  { postalCode: "1070", city: "Anderlecht", commune: "Anderlecht" },
  { postalCode: "1080", city: "Molenbeek-Saint-Jean", commune: "Molenbeek-Saint-Jean" },
  { postalCode: "1081", city: "Koekelberg", commune: "Koekelberg" },
  { postalCode: "1082", city: "Berchem-Sainte-Agathe", commune: "Berchem-Sainte-Agathe" },
  { postalCode: "1083", city: "Ganshoren", commune: "Ganshoren" },
  { postalCode: "1090", city: "Jette", commune: "Jette" },
  { postalCode: "1140", city: "Evere", commune: "Evere" },
  { postalCode: "1150", city: "Woluwe-Saint-Pierre", commune: "Woluwe-Saint-Pierre" },
  { postalCode: "1160", city: "Auderghem", commune: "Auderghem" },
  { postalCode: "1170", city: "Watermael-Boitsfort", commune: "Watermael-Boitsfort" },
  { postalCode: "1180", city: "Uccle", commune: "Uccle" },
  { postalCode: "1190", city: "Forest", commune: "Forest" },
  { postalCode: "1200", city: "Woluwe-Saint-Lambert", commune: "Woluwe-Saint-Lambert" },
  { postalCode: "1210", city: "Saint-Josse-ten-Noode", commune: "Saint-Josse-ten-Noode" },
  { postalCode: "1300", city: "Wavre", commune: "Wavre" },
  { postalCode: "1310", city: "La Hulpe", commune: "La Hulpe" },
  { postalCode: "1340", city: "Ottignies-Louvain-la-Neuve", commune: "Ottignies-Louvain-la-Neuve" },
  { postalCode: "1348", city: "Louvain-la-Neuve", commune: "Ottignies-Louvain-la-Neuve" },
  { postalCode: "1400", city: "Nivelles", commune: "Nivelles" },
  { postalCode: "1500", city: "Halle", commune: "Halle" },
  { postalCode: "1600", city: "Sint-Pieters-Leeuw", commune: "Sint-Pieters-Leeuw" },
  { postalCode: "1700", city: "Dilbeek", commune: "Dilbeek" },
  { postalCode: "1730", city: "Asse", commune: "Asse" },
  { postalCode: "1780", city: "Wemmel", commune: "Wemmel" },
  { postalCode: "1800", city: "Vilvoorde", commune: "Vilvoorde" },
  { postalCode: "1831", city: "Machelen", commune: "Machelen" },
  { postalCode: "1850", city: "Grimbergen", commune: "Grimbergen" },
  { postalCode: "1930", city: "Zaventem", commune: "Zaventem" },
  { postalCode: "1932", city: "Sint-Stevens-Woluwe", commune: "Zaventem" },
  { postalCode: "2000", city: "Antwerpen", commune: "Antwerpen" },
  { postalCode: "2018", city: "Antwerpen", commune: "Antwerpen" },
  { postalCode: "2020", city: "Antwerpen", commune: "Antwerpen" },
  { postalCode: "2030", city: "Antwerpen", commune: "Antwerpen" },
  { postalCode: "2100", city: "Deurne", commune: "Antwerpen" },
  { postalCode: "2140", city: "Borgerhout", commune: "Antwerpen" },
  { postalCode: "2170", city: "Merksem", commune: "Antwerpen" },
  { postalCode: "2180", city: "Ekeren", commune: "Antwerpen" },
  { postalCode: "2200", city: "Herentals", commune: "Herentals" },
  { postalCode: "2300", city: "Turnhout", commune: "Turnhout" },
  { postalCode: "2400", city: "Mol", commune: "Mol" },
  { postalCode: "2440", city: "Geel", commune: "Geel" },
  { postalCode: "2500", city: "Lier", commune: "Lier" },
  { postalCode: "2600", city: "Berchem", commune: "Antwerpen" },
  { postalCode: "2610", city: "Wilrijk", commune: "Antwerpen" },
  { postalCode: "2640", city: "Mortsel", commune: "Mortsel" },
  { postalCode: "2800", city: "Mechelen", commune: "Mechelen" },
  { postalCode: "2850", city: "Boom", commune: "Boom" },
  { postalCode: "2900", city: "Schoten", commune: "Schoten" },
  { postalCode: "2920", city: "Kalmthout", commune: "Kalmthout" },
  { postalCode: "3000", city: "Leuven", commune: "Leuven" },
  { postalCode: "3010", city: "Kessel-Lo", commune: "Leuven" },
  { postalCode: "3012", city: "Wilsele", commune: "Leuven" },
  { postalCode: "3018", city: "Wijgmaal", commune: "Leuven" },
  { postalCode: "3200", city: "Aarschot", commune: "Aarschot" },
  { postalCode: "3290", city: "Diest", commune: "Diest" },
  { postalCode: "3300", city: "Tienen", commune: "Tienen" },
  { postalCode: "3400", city: "Landen", commune: "Landen" },
  { postalCode: "3500", city: "Hasselt", commune: "Hasselt" },
  { postalCode: "3530", city: "Houthalen-Helchteren", commune: "Houthalen-Helchteren" },
  { postalCode: "3550", city: "Heusden-Zolder", commune: "Heusden-Zolder" },
  { postalCode: "3600", city: "Genk", commune: "Genk" },
  { postalCode: "3620", city: "Lanaken", commune: "Lanaken" },
  { postalCode: "3630", city: "Maasmechelen", commune: "Maasmechelen" },
  { postalCode: "3700", city: "Tongeren", commune: "Tongeren" },
  { postalCode: "3800", city: "Sint-Truiden", commune: "Sint-Truiden" },
  { postalCode: "3900", city: "Pelt", commune: "Pelt" },
  { postalCode: "3920", city: "Lommel", commune: "Lommel" },
  { postalCode: "4000", city: "Liege", commune: "Liege" },
  { postalCode: "4020", city: "Liege", commune: "Liege" },
  { postalCode: "4030", city: "Grivegnee", commune: "Liege" },
  { postalCode: "4100", city: "Seraing", commune: "Seraing" },
  { postalCode: "4120", city: "Neupre", commune: "Neupre" },
  { postalCode: "4130", city: "Esneux", commune: "Esneux" },
  { postalCode: "4140", city: "Sprimont", commune: "Sprimont" },
  { postalCode: "4200", city: "Ougree", commune: "Seraing" },
  { postalCode: "4300", city: "Waremme", commune: "Waremme" },
  { postalCode: "4400", city: "Flemalle", commune: "Flemalle" },
  { postalCode: "4420", city: "Saint-Nicolas", commune: "Saint-Nicolas" },
  { postalCode: "4430", city: "Ans", commune: "Ans" },
  { postalCode: "4500", city: "Huy", commune: "Huy" },
  { postalCode: "4600", city: "Vise", commune: "Vise" },
  { postalCode: "4700", city: "Eupen", commune: "Eupen" },
  { postalCode: "4800", city: "Verviers", commune: "Verviers" },
  { postalCode: "4830", city: "Limbourg", commune: "Limbourg" },
  { postalCode: "4900", city: "Spa", commune: "Spa" },
  { postalCode: "4920", city: "Aywaille", commune: "Aywaille" },
  { postalCode: "4950", city: "Waimes", commune: "Waimes" },
  { postalCode: "4960", city: "Malmedy", commune: "Malmedy" },
  { postalCode: "5000", city: "Namur", commune: "Namur" },
  { postalCode: "5002", city: "Saint-Servais", commune: "Namur" },
  { postalCode: "5004", city: "Bouge", commune: "Namur" },
  { postalCode: "5020", city: "Malonne", commune: "Namur" },
  { postalCode: "5030", city: "Gembloux", commune: "Gembloux" },
  { postalCode: "5060", city: "Sambreville", commune: "Sambreville" },
  { postalCode: "5100", city: "Jambes", commune: "Namur" },
  { postalCode: "5140", city: "Sombreffe", commune: "Sombreffe" },
  { postalCode: "5150", city: "Floreffe", commune: "Floreffe" },
  { postalCode: "5190", city: "Jemeppe-sur-Sambre", commune: "Jemeppe-sur-Sambre" },
  { postalCode: "5300", city: "Andenne", commune: "Andenne" },
  { postalCode: "5500", city: "Dinant", commune: "Dinant" },
  { postalCode: "5530", city: "Yvoir", commune: "Yvoir" },
  { postalCode: "5550", city: "Vresse-sur-Semois", commune: "Vresse-sur-Semois" },
  { postalCode: "5570", city: "Beauraing", commune: "Beauraing" },
  { postalCode: "5600", city: "Philippeville", commune: "Philippeville" },
  { postalCode: "5620", city: "Florennes", commune: "Florennes" },
  { postalCode: "5650", city: "Walcourt", commune: "Walcourt" },
  { postalCode: "5660", city: "Couvin", commune: "Couvin" },
  { postalCode: "6000", city: "Charleroi", commune: "Charleroi" },
  { postalCode: "6001", city: "Marcinelle", commune: "Charleroi" },
  { postalCode: "6010", city: "Couillet", commune: "Charleroi" },
  { postalCode: "6020", city: "Dampremy", commune: "Charleroi" },
  { postalCode: "6030", city: "Marchienne-au-Pont", commune: "Charleroi" },
  { postalCode: "6031", city: "Monceau-sur-Sambre", commune: "Charleroi" },
  { postalCode: "6040", city: "Jumet", commune: "Charleroi" },
  { postalCode: "6041", city: "Gosselies", commune: "Charleroi" },
  { postalCode: "6042", city: "Lodelinsart", commune: "Charleroi" },
  { postalCode: "6044", city: "Roux", commune: "Charleroi" },
  { postalCode: "6060", city: "Gilly", commune: "Charleroi" },
  { postalCode: "6061", city: "Montignies-sur-Sambre", commune: "Charleroi" },
  { postalCode: "6110", city: "Montigny-le-Tilleul", commune: "Montigny-le-Tilleul" },
  { postalCode: "6120", city: "Ham-sur-Heure-Nalinnes", commune: "Ham-sur-Heure-Nalinnes" },
  { postalCode: "6140", city: "Fontaine-l'Eveque", commune: "Fontaine-l'Eveque" },
  { postalCode: "6180", city: "Courcelles", commune: "Courcelles" },
  { postalCode: "6200", city: "Chatelet", commune: "Chatelet" },
  { postalCode: "6220", city: "Fleurus", commune: "Fleurus" },
  { postalCode: "6230", city: "Pont-a-Celles", commune: "Pont-a-Celles" },
  { postalCode: "6240", city: "Farciennes", commune: "Farciennes" },
  { postalCode: "6250", city: "Aiseau-Presles", commune: "Aiseau-Presles" },
  { postalCode: "6280", city: "Gerpinnes", commune: "Gerpinnes" },
  { postalCode: "6440", city: "Froidchapelle", commune: "Froidchapelle" },
  { postalCode: "6460", city: "Chimay", commune: "Chimay" },
  { postalCode: "6500", city: "Beaumont", commune: "Beaumont" },
  { postalCode: "6530", city: "Thuin", commune: "Thuin" },
  { postalCode: "6534", city: "Gozee", commune: "Thuin" },
  { postalCode: "6540", city: "Lobbes", commune: "Lobbes" },
  { postalCode: "6560", city: "Erquelinnes", commune: "Erquelinnes" },
  { postalCode: "6567", city: "Merbes-le-Chateau", commune: "Merbes-le-Chateau" },
  { postalCode: "6600", city: "Bastogne", commune: "Bastogne" },
  { postalCode: "6660", city: "Houffalize", commune: "Houffalize" },
  { postalCode: "6680", city: "Sainte-Ode", commune: "Sainte-Ode" },
  { postalCode: "6690", city: "Vielsalm", commune: "Vielsalm" },
  { postalCode: "6700", city: "Arlon", commune: "Arlon" },
  { postalCode: "6720", city: "Habay", commune: "Habay" },
  { postalCode: "6740", city: "Etalle", commune: "Etalle" },
  { postalCode: "6760", city: "Virton", commune: "Virton" },
  { postalCode: "6780", city: "Messancy", commune: "Messancy" },
  { postalCode: "6790", city: "Aubange", commune: "Aubange" },
  { postalCode: "6800", city: "Libramont-Chevigny", commune: "Libramont-Chevigny" },
  { postalCode: "6820", city: "Florenville", commune: "Florenville" },
  { postalCode: "6830", city: "Bouillon", commune: "Bouillon" },
  { postalCode: "6840", city: "Neufchateau", commune: "Neufchateau" },
  { postalCode: "6850", city: "Paliseul", commune: "Paliseul" },
  { postalCode: "6860", city: "Leglise", commune: "Leglise" },
  { postalCode: "6870", city: "Saint-Hubert", commune: "Saint-Hubert" },
  { postalCode: "6880", city: "Bertrix", commune: "Bertrix" },
  { postalCode: "6890", city: "Libin", commune: "Libin" },
  { postalCode: "6900", city: "Marche-en-Famenne", commune: "Marche-en-Famenne" },
  { postalCode: "6920", city: "Wellin", commune: "Wellin" },
  { postalCode: "6940", city: "Durbuy", commune: "Durbuy" },
  { postalCode: "6950", city: "Nassogne", commune: "Nassogne" },
  { postalCode: "6960", city: "Manhay", commune: "Manhay" },
  { postalCode: "6970", city: "Tenneville", commune: "Tenneville" },
  { postalCode: "6980", city: "La Roche-en-Ardenne", commune: "La Roche-en-Ardenne" },
  { postalCode: "6990", city: "Hotton", commune: "Hotton" },
  { postalCode: "7000", city: "Mons", commune: "Mons" },
  { postalCode: "7010", city: "Shape", commune: "Mons" },
  { postalCode: "7012", city: "Jemappes", commune: "Mons" },
  { postalCode: "7020", city: "Nimy", commune: "Mons" },
  { postalCode: "7030", city: "Saint-Symphorien", commune: "Mons" },
  { postalCode: "7032", city: "Spiennes", commune: "Mons" },
  { postalCode: "7033", city: "Cuesmes", commune: "Mons" },
  { postalCode: "7034", city: "Obourg", commune: "Mons" },
  { postalCode: "7050", city: "Jurbise", commune: "Jurbise" },
  { postalCode: "7060", city: "Soignies", commune: "Soignies" },
  { postalCode: "7070", city: "Le Roeulx", commune: "Le Roeulx" },
  { postalCode: "7080", city: "Frameries", commune: "Frameries" },
  { postalCode: "7090", city: "Braine-le-Comte", commune: "Braine-le-Comte" },
  { postalCode: "7100", city: "La Louviere", commune: "La Louviere" },
  { postalCode: "7110", city: "Houdeng-Aimeries", commune: "La Louviere" },
  { postalCode: "7130", city: "Binche", commune: "Binche" },
  { postalCode: "7140", city: "Morlanwelz", commune: "Morlanwelz" },
  { postalCode: "7170", city: "Manage", commune: "Manage" },
  { postalCode: "7180", city: "Seneffe", commune: "Seneffe" },
  { postalCode: "7190", city: "Ecaussinnes", commune: "Ecaussinnes" },
  { postalCode: "7300", city: "Boussu", commune: "Boussu" },
  { postalCode: "7310", city: "Hornu", commune: "Boussu" },
  { postalCode: "7320", city: "Bernissart", commune: "Bernissart" },
  { postalCode: "7330", city: "Saint-Ghislain", commune: "Saint-Ghislain" },
  { postalCode: "7340", city: "Colfontaine", commune: "Colfontaine" },
  { postalCode: "7350", city: "Hensies", commune: "Hensies" },
  { postalCode: "7370", city: "Dour", commune: "Dour" },
  { postalCode: "7380", city: "Quievrain", commune: "Quievrain" },
  { postalCode: "7390", city: "Quaregnon", commune: "Quaregnon" },
  { postalCode: "7500", city: "Tournai", commune: "Tournai" },
  { postalCode: "7520", city: "Ramegnies-Chin", commune: "Tournai" },
  { postalCode: "7530", city: "Gaurain-Ramecroix", commune: "Tournai" },
  { postalCode: "7540", city: "Kain", commune: "Tournai" },
  { postalCode: "7600", city: "Peruwelz", commune: "Peruwelz" },
  { postalCode: "7700", city: "Mouscron", commune: "Mouscron" },
  { postalCode: "7711", city: "Dottignies", commune: "Mouscron" },
  { postalCode: "7712", city: "Herseaux", commune: "Mouscron" },
  { postalCode: "7730", city: "Estaimpuis", commune: "Estaimpuis" },
  { postalCode: "7740", city: "Pecq", commune: "Pecq" },
  { postalCode: "7750", city: "Mont-de-l'Enclus", commune: "Mont-de-l'Enclus" },
  { postalCode: "7760", city: "Celles", commune: "Celles" },
  { postalCode: "7780", city: "Comines-Warneton", commune: "Comines-Warneton" },
  { postalCode: "7800", city: "Ath", commune: "Ath" },
  { postalCode: "7810", city: "Maffle", commune: "Ath" },
  { postalCode: "7830", city: "Silly", commune: "Silly" },
  { postalCode: "7850", city: "Enghien", commune: "Enghien" },
  { postalCode: "7860", city: "Lessines", commune: "Lessines" },
  { postalCode: "7880", city: "Flobecq", commune: "Flobecq" },
  { postalCode: "7890", city: "Ellezelles", commune: "Ellezelles" },
  { postalCode: "7900", city: "Leuze-en-Hainaut", commune: "Leuze-en-Hainaut" },
  { postalCode: "7910", city: "Frasnes-lez-Anvaing", commune: "Frasnes-lez-Anvaing" },
  { postalCode: "7940", city: "Brugelette", commune: "Brugelette" },
  { postalCode: "7950", city: "Chievres", commune: "Chievres" },
  { postalCode: "7970", city: "Beloeil", commune: "Beloeil" },
  { postalCode: "7972", city: "Quevaucamps", commune: "Beloeil" },
  { postalCode: "8000", city: "Brugge", commune: "Brugge" },
  { postalCode: "8020", city: "Oostkamp", commune: "Oostkamp" },
  { postalCode: "8200", city: "Sint-Michiels", commune: "Brugge" },
  { postalCode: "8210", city: "Zedelgem", commune: "Zedelgem" },
  { postalCode: "8300", city: "Knokke-Heist", commune: "Knokke-Heist" },
  { postalCode: "8310", city: "Assebroek", commune: "Brugge" },
  { postalCode: "8340", city: "Damme", commune: "Damme" },
  { postalCode: "8370", city: "Blankenberge", commune: "Blankenberge" },
  { postalCode: "8380", city: "Zeebrugge", commune: "Brugge" },
  { postalCode: "8400", city: "Oostende", commune: "Oostende" },
  { postalCode: "8420", city: "De Haan", commune: "De Haan" },
  { postalCode: "8430", city: "Middelkerke", commune: "Middelkerke" },
  { postalCode: "8450", city: "Bredene", commune: "Bredene" },
  { postalCode: "8470", city: "Gistel", commune: "Gistel" },
  { postalCode: "8480", city: "Ichtegem", commune: "Ichtegem" },
  { postalCode: "8500", city: "Kortrijk", commune: "Kortrijk" },
  { postalCode: "8510", city: "Marke", commune: "Kortrijk" },
  { postalCode: "8520", city: "Kuurne", commune: "Kuurne" },
  { postalCode: "8530", city: "Harelbeke", commune: "Harelbeke" },
  { postalCode: "8540", city: "Deerlijk", commune: "Deerlijk" },
  { postalCode: "8550", city: "Zwevegem", commune: "Zwevegem" },
  { postalCode: "8560", city: "Wevelgem", commune: "Wevelgem" },
  { postalCode: "8570", city: "Anzegem", commune: "Anzegem" },
  { postalCode: "8580", city: "Avelgem", commune: "Avelgem" },
  { postalCode: "8600", city: "Diksmuide", commune: "Diksmuide" },
  { postalCode: "8620", city: "Nieuwpoort", commune: "Nieuwpoort" },
  { postalCode: "8630", city: "Veurne", commune: "Veurne" },
  { postalCode: "8640", city: "Oostvleteren", commune: "Vleteren" },
  { postalCode: "8650", city: "Houthulst", commune: "Houthulst" },
  { postalCode: "8660", city: "De Panne", commune: "De Panne" },
  { postalCode: "8670", city: "Koksijde", commune: "Koksijde" },
  { postalCode: "8680", city: "Koekelare", commune: "Koekelare" },
  { postalCode: "8690", city: "Alveringem", commune: "Alveringem" },
  { postalCode: "8700", city: "Tielt", commune: "Tielt" },
  { postalCode: "8710", city: "Wielsbeke", commune: "Wielsbeke" },
  { postalCode: "8720", city: "Dentergem", commune: "Dentergem" },
  { postalCode: "8730", city: "Beernem", commune: "Beernem" },
  { postalCode: "8740", city: "Pittem", commune: "Pittem" },
  { postalCode: "8750", city: "Wingene", commune: "Wingene" },
  { postalCode: "8760", city: "Meulebeke", commune: "Meulebeke" },
  { postalCode: "8770", city: "Ingelmunster", commune: "Ingelmunster" },
  { postalCode: "8780", city: "Oostrozebeke", commune: "Oostrozebeke" },
  { postalCode: "8790", city: "Waregem", commune: "Waregem" },
  { postalCode: "8800", city: "Roeselare", commune: "Roeselare" },
  { postalCode: "8820", city: "Torhout", commune: "Torhout" },
  { postalCode: "8830", city: "Hooglede", commune: "Hooglede" },
  { postalCode: "8840", city: "Staden", commune: "Staden" },
  { postalCode: "8850", city: "Ardooie", commune: "Ardooie" },
  { postalCode: "8860", city: "Lendelede", commune: "Lendelede" },
  { postalCode: "8870", city: "Izegem", commune: "Izegem" },
  { postalCode: "8880", city: "Ledegem", commune: "Ledegem" },
  { postalCode: "8890", city: "Moorslede", commune: "Moorslede" },
  { postalCode: "8900", city: "Ieper", commune: "Ieper" },
  { postalCode: "8920", city: "Langemark-Poelkapelle", commune: "Langemark-Poelkapelle" },
  { postalCode: "8930", city: "Menen", commune: "Menen" },
  { postalCode: "8940", city: "Wervik", commune: "Wervik" },
  { postalCode: "8950", city: "Heuvelland", commune: "Heuvelland" },
  { postalCode: "8970", city: "Poperinge", commune: "Poperinge" },
  { postalCode: "8980", city: "Zonnebeke", commune: "Zonnebeke" },
  { postalCode: "9000", city: "Gent", commune: "Gent" },
  { postalCode: "9030", city: "Mariakerke", commune: "Gent" },
  { postalCode: "9031", city: "Drongen", commune: "Gent" },
  { postalCode: "9032", city: "Wondelgem", commune: "Gent" },
  { postalCode: "9040", city: "Sint-Amandsberg", commune: "Gent" },
  { postalCode: "9041", city: "Oostakker", commune: "Gent" },
  { postalCode: "9050", city: "Gentbrugge", commune: "Gent" },
  { postalCode: "9051", city: "Sint-Denijs-Westrem", commune: "Gent" },
  { postalCode: "9052", city: "Zwijnaarde", commune: "Gent" },
  { postalCode: "9060", city: "Zelzate", commune: "Zelzate" },
  { postalCode: "9100", city: "Sint-Niklaas", commune: "Sint-Niklaas" },
  { postalCode: "9120", city: "Beveren", commune: "Beveren" },
  { postalCode: "9130", city: "Kallo", commune: "Beveren" },
  { postalCode: "9140", city: "Temse", commune: "Temse" },
  { postalCode: "9150", city: "Kruibeke", commune: "Kruibeke" },
  { postalCode: "9160", city: "Lokeren", commune: "Lokeren" },
  { postalCode: "9170", city: "Sint-Gillis-Waas", commune: "Sint-Gillis-Waas" },
  { postalCode: "9180", city: "Moerbeke", commune: "Moerbeke" },
  { postalCode: "9190", city: "Stekene", commune: "Stekene" },
  { postalCode: "9200", city: "Dendermonde", commune: "Dendermonde" },
  { postalCode: "9220", city: "Hamme", commune: "Hamme" },
  { postalCode: "9230", city: "Wetteren", commune: "Wetteren" },
  { postalCode: "9240", city: "Zele", commune: "Zele" },
  { postalCode: "9250", city: "Waasmunster", commune: "Waasmunster" },
  { postalCode: "9260", city: "Wichelen", commune: "Wichelen" },
  { postalCode: "9270", city: "Laarne", commune: "Laarne" },
  { postalCode: "9280", city: "Lebbeke", commune: "Lebbeke" },
  { postalCode: "9290", city: "Berlare", commune: "Berlare" },
  { postalCode: "9300", city: "Aalst", commune: "Aalst" },
  { postalCode: "9308", city: "Hofstade", commune: "Aalst" },
  { postalCode: "9310", city: "Moorsel", commune: "Aalst" },
  { postalCode: "9320", city: "Erembodegem", commune: "Aalst" },
  { postalCode: "9340", city: "Lede", commune: "Lede" },
  { postalCode: "9400", city: "Ninove", commune: "Ninove" },
  { postalCode: "9420", city: "Erpe-Mere", commune: "Erpe-Mere" },
  { postalCode: "9450", city: "Haaltert", commune: "Haaltert" },
  { postalCode: "9470", city: "Denderleeuw", commune: "Denderleeuw" },
  { postalCode: "9500", city: "Geraardsbergen", commune: "Geraardsbergen" },
  { postalCode: "9520", city: "Sint-Lievens-Houtem", commune: "Sint-Lievens-Houtem" },
  { postalCode: "9550", city: "Herzele", commune: "Herzele" },
  { postalCode: "9570", city: "Lierde", commune: "Lierde" },
  { postalCode: "9600", city: "Ronse", commune: "Ronse" },
  { postalCode: "9620", city: "Zottegem", commune: "Zottegem" },
  { postalCode: "9630", city: "Zwalm", commune: "Zwalm" },
  { postalCode: "9660", city: "Brakel", commune: "Brakel" },
  { postalCode: "9680", city: "Maarkedal", commune: "Maarkedal" },
  { postalCode: "9690", city: "Kluisbergen", commune: "Kluisbergen" },
  { postalCode: "9700", city: "Oudenaarde", commune: "Oudenaarde" },
  { postalCode: "9750", city: "Kruisem", commune: "Kruisem" },
  { postalCode: "9770", city: "Kruishoutem", commune: "Kruisem" },
  { postalCode: "9790", city: "Wortegem-Petegem", commune: "Wortegem-Petegem" },
  { postalCode: "9800", city: "Deinze", commune: "Deinze" },
  { postalCode: "9810", city: "Nazareth", commune: "Nazareth" },
  { postalCode: "9820", city: "Merelbeke", commune: "Merelbeke" },
  { postalCode: "9830", city: "Sint-Martens-Latem", commune: "Sint-Martens-Latem" },
  { postalCode: "9840", city: "De Pinte", commune: "De Pinte" },
  { postalCode: "9850", city: "Nevele", commune: "Deinze" },
  { postalCode: "9860", city: "Oosterzele", commune: "Oosterzele" },
  { postalCode: "9870", city: "Zulte", commune: "Zulte" },
  { postalCode: "9880", city: "Aalter", commune: "Aalter" },
  { postalCode: "9890", city: "Gavere", commune: "Gavere" },
  { postalCode: "9900", city: "Eeklo", commune: "Eeklo" },
  { postalCode: "9910", city: "Knesselare", commune: "Aalter" },
  { postalCode: "9920", city: "Lievegem", commune: "Lievegem" },
  { postalCode: "9930", city: "Zomergem", commune: "Lievegem" },
  { postalCode: "9940", city: "Evergem", commune: "Evergem" },
  { postalCode: "9950", city: "Waarschoot", commune: "Lievegem" },
  { postalCode: "9960", city: "Assenede", commune: "Assenede" },
  { postalCode: "9970", city: "Kaprijke", commune: "Kaprijke" },
  { postalCode: "9980", city: "Sint-Laureins", commune: "Sint-Laureins" },
  { postalCode: "9990", city: "Maldegem", commune: "Maldegem" },
]

interface AddressValue {
  street: string
  number: string
  postalCode: string
  city: string
}

interface AddressAutocompleteProps {
  value: AddressValue
  onChange: (value: AddressValue) => void
}

export function AddressAutocomplete({ value, onChange }: AddressAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<typeof belgianLocalities>([])
  const [isSearching, setIsSearching] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [hasSelectedFromList, setHasSelectedFromList] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isInitialized = useRef(false)

  // Search function
  const searchLocalities = useCallback((query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    setIsSearching(true)
    
    // Simulate async search (instant for local data)
    const normalizedQuery = query.toLowerCase().trim()
    
    const results = belgianLocalities.filter((loc) => {
      return (
        loc.city.toLowerCase().includes(normalizedQuery) ||
        loc.postalCode.startsWith(normalizedQuery) ||
        loc.commune.toLowerCase().includes(normalizedQuery)
      )
    }).slice(0, 8)
    
    setSuggestions(results)
    setIsOpen(results.length > 0)
    setIsSearching(false)
    setHighlightedIndex(-1)
  }, [])

  // Handle search input change - always editable
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchQuery(newValue)
    setHasSelectedFromList(false)
    
    // Always search when user types
    if (newValue.length >= 2) {
      searchLocalities(newValue)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }

  // Handle selection from dropdown
  const handleSelect = (result: typeof belgianLocalities[0]) => {
    setSearchQuery(`${result.postalCode} ${result.city}`)
    onChange({
      ...value,
      postalCode: result.postalCode,
      city: result.city,
    })
    setIsOpen(false)
    setSuggestions([])
    setHasSelectedFromList(true)
  }

  // Clear search and reset
  const handleClear = () => {
    setSearchQuery("")
    setHasSelectedFromList(false)
    onChange({
      ...value,
      postalCode: "",
      city: "",
    })
    inputRef.current?.focus()
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelect(suggestions[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  // Initialize search query from existing value ONLY once on mount
  useEffect(() => {
    if (!isInitialized.current && value.postalCode && value.city) {
      setSearchQuery(`${value.postalCode} ${value.city}`)
      setHasSelectedFromList(true)
      isInitialized.current = true
    }
  }, [value.postalCode, value.city])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="pt-4 border-t border-border">
      <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <MapPin className="size-4" />
        Adresse de facturation
      </p>
      
      <div className="space-y-4">
        {/* Location search with autocomplete */}
        <div ref={wrapperRef} className="relative">
          <Label htmlFor="location-search" className="text-base font-medium mb-2 block">
            Rechercher votre localite
          </Label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              id="location-search"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchQuery.length >= 2) {
                  searchLocalities(searchQuery)
                }
              }}
              placeholder="Tapez un code postal ou une ville..."
              className="h-14 pl-12 pr-12 text-base"
              autoComplete="off"
            />
            {isSearching && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground animate-spin" />
            )}
            {hasSelectedFromList && !isSearching && searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Effacer la recherche"
              >
                <CheckCircle2 className="size-4 text-primary" />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {isOpen && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <ul className="max-h-64 overflow-y-auto py-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion.postalCode}-${suggestion.city}`}
                    className={`px-4 py-3 cursor-pointer transition-colors flex items-start gap-3 ${
                      index === highlightedIndex
                        ? "bg-primary/10"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => handleSelect(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <MapPin className="size-5 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-base truncate">
                        {suggestion.postalCode} {suggestion.city}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {suggestion.commune}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Street address fields */}
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 space-y-2">
            <Label htmlFor="numeroRue" className="text-base">Numero</Label>
            <Input
              id="numeroRue"
              placeholder="12"
              value={value.number}
              onChange={(e) => onChange({ ...value, number: e.target.value })}
              className="h-14 text-base text-center"
            />
          </div>
          <div className="col-span-3 space-y-2">
            <Label htmlFor="adresse" className="text-base">Rue</Label>
            <Input
              id="adresse"
              placeholder="Rue de la Loi"
              value={value.street}
              onChange={(e) => onChange({ ...value, street: e.target.value })}
              className="h-14 text-base"
            />
          </div>
        </div>

        {/* City and postal code - fully editable */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="codePostal" className="text-base">Code postal</Label>
            <Input
              id="codePostal"
              placeholder="1000"
              value={value.postalCode}
              onChange={(e) => {
                onChange({ ...value, postalCode: e.target.value })
                // Update search query to reflect manual changes
                if (e.target.value && value.city) {
                  setSearchQuery(`${e.target.value} ${value.city}`)
                }
              }}
              className="h-14 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ville" className="text-base">Ville</Label>
            <Input
              id="ville"
              placeholder="Bruxelles"
              value={value.city}
              onChange={(e) => {
                onChange({ ...value, city: e.target.value })
                // Update search query to reflect manual changes
                if (value.postalCode && e.target.value) {
                  setSearchQuery(`${value.postalCode} ${e.target.value}`)
                }
              }}
              className="h-14 text-base"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2">
          <CheckCircle2 className="size-3.5 text-primary" />
          Tapez un code postal ou une ville pour des suggestions automatiques
        </p>
      </div>
    </div>
  )
}
