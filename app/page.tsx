"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Mountain,
  Camera,
  Play,
  Clock,
  TrendingUp,
  Users,
  ChevronDown,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react"

export default function TriglavTourPage() {
  const [activeTab, setActiveTab] = useState("highlights")
  const [isVisible, setIsVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const highlights = [
    {
      icon: Mountain,
      title: "Circle Slovenia's highest mountain",
      description: "100 km trekking route around Mount Triglav (2,864 m)",
    },
    {
      icon: Camera,
      title: "Crystal-clear alpine lakes",
      description: "Triglav Lakes, emerald Soča River, and Lake Jasna",
    },
    {
      icon: MapPin,
      title: "Best alternative to Tour du Mont Blanc",
      description: "Hidden gem in the heart of Slovenian Alps",
    },
  ]

  const included = [
    "Detailed maps & route description",
    "Handpicked alpine huts & guesthouses",
    "Daily luggage transfers",
    "Breakfast & dinner included",
    "Local Slovenian cuisine",
    "24/7 support",
    "Emergency assistance",
    "Digital guidebook",
  ]

  const itinerary = [
    {
      day: 1,
      title: "Bohinj → Prehodavci",
      description:
        "Starting from Planina Blato, the trail winds across alpine pastures and through the valley of the Triglav Lakes. Step by step, the horizon opens until Prehodavci greets you with your first true touch of the high mountains.",
      stats: "6-8 hours | ~14 km | +1,150 m | –220 m",
      difficulty: "Demanding",
      mapLink:
        "https://www.google.com/maps/dir/Ob%C4%8Dina+Bohinj/Zasavska+ko%C4%8Da+na+Prehodavcih,+5232+So%C4%8Da/@46.3150527,13.7919491,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a8d690162778d:0x400f81c823fec60!2m2!1d13.9563992!2d46.2715959!1m5!1m1!1s0x477a8a0b2e8da561:0x2c49e12588417d5b!2m2!1d13.7922622!2d46.3585131!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      day: 2,
      title: "Prehodavci → Bovec",
      description:
        "A long descent through the enchanting Trenta Valley brings you closer to the emerald Soča. Towering cliffs and alpine meadows guide the way, until the friendly town of Bovec welcomes you at day's end.",
      stats: "5-7 hours | ~10 km | +150 m | –1,400 m",
      difficulty: "Moderate",
      mapLink:
        "https://www.google.com/maps/dir/Zasavska+ko%C4%8Da+na+Prehodavcih,+5232+So%C4%8Da/Bovec/@46.3346884,13.591115,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a8a0b2e8da561:0x2c49e12588417d5b!2m2!1d13.7922622!2d46.3585131!1m5!1m1!1s0x477a683c5d0fdefb:0x5d345816713d53fd!2m2!1d13.5516829!2d46.3376387!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      day: 3,
      title: "Bovec → Vršič",
      description:
        "Following the Soča upstream, the path climbs steadily toward the legendary Vršič Pass. Serpentine trails and a short detour across Špička reveal panoramas that reward every step.",
      stats: "6-8 hours | ~12 km | +1,200 m | –250 m",
      difficulty: "Demanding",
      mapLink:
        "https://www.google.com/maps/dir/Bovec/Vr%C5%A1i%C4%8D,+5232+So%C4%8Da/@46.383106,13.5649735,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a683c5d0fdefb:0x5d345816713d53fd!2m2!1d13.5516829!2d46.3376387!1m5!1m1!1s0x477a639e901fe117:0x62434b431f29ec06!2m2!1d13.7430709!2d46.432897!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      day: 4,
      title: "Vršič → Kranjska Gora",
      description:
        "A gentle descent opens into the crystal-clear Jasna Valley, leading you into Kranjska Gora. This alpine village is perfect for slowing down, exploring, and soaking in the mountain spirit.",
      stats: "~12 km | +100 m | –850 m",
      difficulty: "Easy–moderate",
      mapLink:
        "https://www.google.com/maps/dir/Vr%C5%A1i%C4%8D,+5232+So%C4%8Da/Kranjska+Gora,+4280/@46.4593832,13.7252755,13z/data=!3m1!4b1!4m6!3m5!1s0x477a7ce5980f8af5:0xdc10e282bbdf9dde!8m2!3d46.485884!4d13.7898423!16zL20vMHE5X2w?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      day: 5,
      title: "Rest Day in Kranjska Gora",
      description:
        "A day to recover or explore at your own pace. Take a relaxed walk, cycle to nearby lakes, or climb surrounding peaks for wide-open views. Optional activities include Vitranc peak or cycling to Italian lakes.",
      stats: "Optional activities available",
      difficulty: "Flexible",
      mapLink:
        "https://www.google.com/maps/place/4280+Kranjska+Gora/@46.4603615,13.6883718,12z/data=!3m1!4b1!4m6!3m5!1s0x477a7ce5980f8af5:0xdc10e282bbdf9dde!8m2!3d46.485884!4d13.7898423!16zL20vMHE5X2w?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      day: 6,
      title: "Kranjska Gora → Mojstrana",
      description:
        "Begin with a hike to the hidden Martuljek waterfalls, sparkling gems in the forest. Later, a short bus transfer takes you to Mojstrana, the welcoming gateway to the Vrata Valley.",
      stats: "3-4 hours | ~8 km | +200m | –200m",
      difficulty: "Easy",
      mapLink:
        "https://www.google.com/maps/dir/Kranjska+Gora,+4280/Mojstrana,+4281/@46.4774508,13.817046,12.74z/data=!4m14!4m13!1m5!1m1!1s0x477a7ce5980f8af5:0xdc10e282bbdf9dde!2m2!1d13.7898423!2d46.485884!1m5!1m1!1s0x477a86744015ed1d:0xa00f81eceaab6f0!2m2!1d13.9395387!2d46.461301!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      day: 7,
      title: "Mojstrana → Bled",
      description:
        "The journey culminates in the Vrata Valley beneath the mighty north face of Triglav. A final transfer brings you to Bled, where lake and castle complete this alpine fairy tale.",
      stats: "3-4 hours | ~8 km | +200m | –200m",
      difficulty: "Easy",
      mapLink:
        "https://www.google.com/maps/dir/Mojstrana,+4281/Bled,+4260/@46.4139546,13.9561348,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x477a86744015ed1d:0xa00f81eceaab6f0!2m2!1d13.9395387!2d46.461301!1m5!1m1!1s0x477a8e1dd7139961:0x400f81c823fec50!2m2!1d14.1145798!2d46.3683266!3e2?entry=ttu&g_ep=EgoyMDI1MDkwMi4wIKXMDSoASAFQAw%3D%3D",
    },
  ]

  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [showImageCredits, setShowImageCredits] = useState(false)

  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // swipe left
      setCurrentDayIndex(prev => Math.min(prev + 1, itinerary.length - 1))
    } else if (touchEnd - touchStart > 50) {
      // swipe right
      setCurrentDayIndex(prev => Math.max(prev - 1, 0))
    }
  }

  const faqData = [
    {
      question: "What type of accommodation is provided?",
      answer:
        "Our carefully selected alpine huts and guesthouses offer a warm atmosphere, welcoming hosts, and beautiful locations. Private rooms are planned for your stay, with two exceptions where only shared accommodation is available. These huts are popular not only with hikers but also with travelers seeking an authentic Alpine experience.",
    },
    {
      question: "How is accommodation on arrival and departure?",
      answer: 
        "Accommodation on your arrival and departure days is not included and should be arranged individually. For your arrival, we recommend staying in Bohinj (e.g., Vila Majerca or Hotel Bohinj). For your final night, we suggest booking accommodation in Bled (e.g., Adora Luxury Hotel, Hotel Triglav, Vila Bled, Penzion Berc).",
    },
    {
      question: "How does luggage transport work?",
      answer:
        "We will transfer your luggage from cabin to cabin, so you only need to carry a daypack. The only exception is Day 1, when you'll need to bring extra clothes, as the cabin is located in the heart of the mountains with no road access.",
    },
    {
      question: "What meals are included?",
      answer:
        "During your stay, breakfast and dinner are included, each prepared with fresh local ingredients that showcase the rich traditions of Slovenian cuisine. From hearty mountain dishes to authentic regional flavors, every meal is part of the journey. Along the trail, you’ll also find plenty of huts offering tasty lunch options.",
    },
    {
      question: "What is the route information and maps?",
      answer:
        "Our selected daily hikes are well-marked, and you’ll encounter fellow hikers along the way. The trails within the national park are narrow and often rocky, so sturdy footwear is essential. For your orientation and convenience, you will receive a detailed map and tour description.",
    },
    {
      question: "How difficult is the Triglav Tour?",
      answer:
        "The Triglav Tour features demanding terrain with long ascents and descents, typically 6–8 hours of hiking per day. Routes may include stream crossings and require good orientation skills. Therefore, participants should have prior hiking experience and be in good physical condition.",
    },
    {
      question: "What equipment do I need?",
      answer:
        "To fully enjoy your hiking adventure in the mountains, it’s essential to be prepared for changing weather and local conditions. We recommend wearing warm, waterproof layers, hiking boots, and protecting yourself with sunscreen and sunglasses. Hiking poles are also highly recommended for added comfort. Full list available upon request.",
    },
    {
      question: "When to visit Triglav with Andara?",
      answer:
        "The best time to hike Triglav and enjoy multi-day trekking routes in Triglav National Park is from May to September—late spring, summer, or early fall. This is the most popular Slovenia hiking season, with temperatures typically ranging between 15°C and 25°C, creating excellent conditions for both day hikes and multi-day adventures. Since Triglav is Slovenia’s most iconic peak and attracts hikers from around the world, we recommend booking your Triglav hiking tour with Andara at least 6 months in advance. This ensures the best availability in mountain huts and allows us to carefully plan your route for a safe and memorable experience."
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url('/triglav-mountain-landscape.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div
          className={`relative z-10 text-center text-white max-w-4xl mx-auto px-6 transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <img
              src="/andara-logo-final.png"
              alt="Andara - Queen of the Alps"
              className="mx-auto max-w-2xl w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Highlights */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl group-hover:text-accent transition-colors duration-300">
                  Tour Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <highlight.icon className="h-5 w-5 text-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="font-medium text-sm">{highlight.title}</p>
                      <p className="text-muted-foreground text-xs">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Including */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl group-hover:text-accent transition-colors duration-300">
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {included.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform duration-300"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Season & Price */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-xl group-hover:text-accent transition-colors duration-300">
                  Tour Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                  <Clock className="h-4 w-4 text-accent group-hover:rotate-12 transition-transform duration-300" />
                  <div>
                    <p className="font-medium text-sm">Duration</p>
                    <p className="text-muted-foreground text-sm">7 days, 100 km route</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 delay-100">
                  <TrendingUp className="h-4 w-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium text-sm">Difficulty</p>
                    <p className="text-muted-foreground text-sm">Demanding terrain</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 delay-200">
                  <Users className="h-4 w-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium text-sm">Group Size</p>
                    <p className="text-muted-foreground text-sm">Self-guided</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 transition-all duration-700 group-hover:from-primary/30 group-hover:to-accent/30"
              style={{
                backgroundImage: `url('/aerial-view-of-norwegian-mountain-lake-with-hiking.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-6 group-hover:scale-125 group-hover:bg-white transition-all duration-500 shadow-xl group-hover:shadow-2xl">
                <Play className="h-12 w-12 text-primary ml-1 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-2">Triglav Tour Slovenia</h3>
              <p className="text-white/90">Experience the Queen of the Alps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-balance">
            More Than Mountains — It's About Moments
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p className="text-xl mb-6">
              Embark on a self-guided hiking adventure in Slovenia through the stunning Triglav National Park Hiking
              Tour. This trail offers more than just breathtaking Alpine scenery — it's about unforgettable moments
              along the way.
            </p>
            <p className="mb-6">
              Towering peaks, crystal-clear lakes, hidden mountain villages, warm encounters with locals, and timeless
              Alpine traditions make this journey a true hidden gem. If you've completed the Tour du Mont Blanc, the
              Triglav Slovenia Hike is the best alternative to TMB.
            </p>
            <p className="mb-6">
              Nestled in the heart of the Slovenian Alps, this 100 km trekking route circles Slovenia's highest
              mountain, Mount Triglav (2,864 m). Recognized as one of Europe's classic multi-day treks, it belongs on
              every serious hiker's bucket list.
            </p>
            <p>
              On this self-guided Alps hiking Slovenia experience, everything is arranged from day one: detailed maps of
              the entire route, handpicked accommodation in charming alpine huts and guesthouses, hearty local cuisine,
              and seamless daily luggage transfers. That means you can enjoy the trail with just a light daypack —
              leaving you free to savor every step, every view, and every moment of your Slovenia hiking adventure.
            </p>
          </div>
        </div>
      </section>

      
      {/* Day by Day Itinerary */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Day by Day Itinerary</h2>
          
          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Arrows - Desktop */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 justify-between pointer-events-none">
              <button
                onClick={() => setCurrentDayIndex(prev => Math.max(prev - 1, 0))}
                disabled={currentDayIndex === 0}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg pointer-events-auto hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed -translate-x-4"
                aria-label="Previous day"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setCurrentDayIndex(prev => Math.min(prev + 1, itinerary.length - 1))}
                disabled={currentDayIndex === itinerary.length - 1}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg pointer-events-auto hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed translate-x-4"
                aria-label="Next day"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
      
            {/* Slider */}
            <div 
              className="overflow-hidden rounded-xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentDayIndex * 100}%)` }}
              >
                {itinerary.map((day, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] border-0 shadow-lg overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 overflow-hidden m-4 rounded-xl">
                          <div
                            className="h-64 md:h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 rounded-xl"
                            style={{
                              backgroundImage:
                                day.day === 1
                                  ? `url('/lake-bohinj.png')`
                                  : day.day === 2
                                    ? `url('/zasavska-koca.png')`
                                    : day.day === 3
                                      ? `url('/soca-valley-bovec.png')`
                                      : day.day === 4
                                        ? `url('/vrsic-pass.jpeg')`
                                        : day.day === 5
                                          ? `url('/Kranjska_Gora,_Slovenia_(49547008976).jpg')`
                                          : day.day === 6
                                            ? `url('/Mojstrana_sunset.jpg')`
                                            : day.day === 7
                                              ? `url('/Lake_bled_2021.jpg')`
                                              : undefined,
                            }}
                          />
                        </div>
                        <div className="md:w-2/3 p-8">
                          <div className="flex items-center gap-4 mb-4">
                            <Badge className="bg-primary text-white group-hover:bg-accent transition-colors duration-300">
                              Day {day.day}
                            </Badge>
                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                              {day.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                            {day.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="group-hover:translate-x-1 transition-transform duration-300">
                              <p className="text-sm font-medium text-primary">Stats</p>
                              <p className="text-sm text-muted-foreground">{day.stats}</p>
                            </div>
                            <div className="group-hover:translate-x-1 transition-transform duration-300 delay-100">
                              <p className="text-sm font-medium text-primary">Difficulty</p>
                              <Badge
                                variant="outline"
                                className={`text-xs transition-all duration-300 group-hover:scale-105 ${
                                  day.difficulty === "Demanding"
                                    ? "border-red-500 text-red-600"
                                    : day.difficulty === "Moderate"
                                      ? "border-yellow-500 text-yellow-600"
                                      : "border-green-500 text-green-600"
                                }`}
                              >
                                {day.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <a
                            href={day.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-muted/30"
                          >
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">Map:</span>
                            <span className="hover:underline">{day.title} route</span>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
      
            {/* Day Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {itinerary.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDayIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentDayIndex === index 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 w-3 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to day ${index + 1}`}
                />
              ))}
            </div>
      
            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center mt-6 space-x-4">
              <button
                onClick={() => setCurrentDayIndex(prev => Math.max(prev - 1, 0))}
                disabled={currentDayIndex === 0}
                className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous day"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentDayIndex(prev => Math.min(prev + 1, itinerary.length - 1))}
                disabled={currentDayIndex === itinerary.length - 1}
                className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next day"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-1">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-border/50 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-md"
              >
                <button className="w-full text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/30 transition-all duration-300">
                    <h3 className="text-primary text-base font-medium hover:text-accent transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-all duration-700 ease-out flex-shrink-0 ${
                        openFaq === index ? "rotate-180 text-accent" : "hover:text-primary"
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`transition-all duration-700 ease-out overflow-hidden ${
                    openFaq === index ? "max-h-96 opacity-100 border-t border-border/30" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 py-3 bg-muted/20">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day Trips Promotion */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-500">
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-accent/30"
              style={{
                backgroundImage: `url('/ljubljana.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
            
            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="max-w-lg">
                <Badge className="mb-4 bg-white text-primary hover:bg-accent hover:text-white transition-colors">
                  Also Available
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ANDARA Nature Journeys
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  1-Day Trips from Ljubljana
                </h3>
                <p className="mb-6 text-white/90 leading-relaxed">
                  For guests arriving in Ljubljana seeking authentic nature experiences. Instead of crowded tourist attractions, 
                  we guide you to serene trails, forest breathing practices, and warm hospitality with homemade food.
                </p>
                <a
                  href="https://andara-site.vercel.app/Nature%20Journeys"
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-300 group/btn"
                >
                  <span>Explore Day Trips</span>
                  <svg 
                    className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-accent text-white relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">
            Ready for Your Alpine Adventure?
          </h2>
          <p className="text-xl mb-8 text-pretty leading-relaxed text-white">
            Contact us to book your unforgettable self-guided journey through Slovenia's most spectacular mountain
            landscapes
          </p>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 mb-8 hover:bg-black/30 transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <Mail className="h-6 w-6 text-white" />
                <a
                  href="mailto:info@andara-tours.com"
                  className="text-xl hover:text-yellow-200 transition-colors duration-200 text-white"
                >
                  info@andara-tours.com
                </a>
              </div>
              <p className="text-white/90">Send us an email for booking and inquiries</p>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="bg-black/20 hover:bg-black/30 p-4 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-6 w-6 text-white" />
            </a>
            <a
              href="#"
              className="bg-black/20 hover:bg-black/30 p-4 rounded-full transition-all duration-300 hover:scale-110 hover:-rotate-6"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-6 w-6 text-white" />
            </a>
            {/* LinkedIn icon */}
            <a
              href="#"
              className="bg-black/20 hover:bg-black/30 p-4 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-white" />
            </a>
            {/* TikTok icon as custom SVG */}
            <a
              href="#"
              className="bg-black/20 hover:bg-black/30 p-4 rounded-full transition-all duration-300 hover:scale-110 hover:-rotate-6"
              aria-label="Follow us on TikTok"
            >
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Image Credits Section */}
      <section className="py-8 px-6 bg-muted/20 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowImageCredits(!showImageCredits)}
            className="flex items-center justify-center w-full gap-2 text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-300 mb-4"
            aria-expanded={showImageCredits}
            aria-label="Toggle image credits"
          >
            <span>Image Credits</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-500 ease-out ${
                showImageCredits ? "rotate-180 text-accent" : ""
              }`}
            />
          </button>
          
          <div
            className={`transition-all duration-700 ease-out overflow-hidden ${
              showImageCredits ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>
                Image1:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Triglav_y_Valle_de_Vrata_%2814202569306%29_%282%29.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Triglav y Valle de Vrata - Wikimedia Commons
                </a>
              </p>
              <p>
                Image2:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Slovenia%27s_Lake_Bohinj,_facing_south.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Slovenia's Lake Bohinj, facing south - Wikimedia Commons
                </a>
              </p>
              <p>
                Image3:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Zasavska_ko%C4%8Da_na_Prehodavcih.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Zasavska koča na Prehodavcih - Wikimedia Commons
                </a>
              </p>
              <p>
                Image4:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:So%C4%8Da_in_Bovec.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Soča in Bovec - Wikimedia Commons
                </a>
              </p>
              <p>
                Image5:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Vr%C5%A1i%C4%8D_%289782808046%29.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Vršič Pass - Wikimedia Commons
                </a>
              </p>
              <p>
                Image6:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Kranjska_Gora,_Slovenia_%2849547008976%29.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Kranjska Gora, Slovenia - Wikimedia Commons
                </a>
              </p>
              <p>
                Image7:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Mojstrana_sunset.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Mojstrana sunset - Wikimedia Commons
                </a>
              </p>
              <p>
                Image8:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Lake_bled_2021.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline"
                >
                  Lake Bled - Wikimedia Commons
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
