
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Trees,
  Mountain,
  Waves,
  Wine,
  Eye,
  Clock,
  Users,
  ChevronDown,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react"

export default function DayTripsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const dayTrips = [
    {
      id: 1,
      icon: Trees,
      title: "Forest Bathing on Rožnik & Homemade Feast",
      location: "Ljubljana",
      description: "Escape the city into Tivoli Park and Rožnik hill – quiet forest paths, breathing practices, and slow walking inspired by *shinrin-yoku*. We conclude with a homemade feast made of fresh local produce from the farmers' market.",
      duration: "5–6 hours",
      difficulty: "Easy",
      groupSize: "2–4",
      image: "/roznik-forest.jpg"
    },
    {
      id: 2,
      icon: Waves,
      title: "Canyon of Iška or Zala – Wild Nature Close to Ljubljana",
      location: "Near Ljubljana",
      description: "A scenic walk along the wild rivers Iška or Zala, where untouched nature reveals its raw beauty. In summer, enjoy a refreshing swim in hidden pools. We finish with a picnic by the river, filled with homemade delicacies.",
      duration: "6 hours",
      difficulty: "Moderate",
      groupSize: "2–4",
      image: "/iska-canyon.jpg"
    },
    {
      id: 3,
      icon: Mountain,
      title: "Velika Planina – The Shepherds' Fairytale",
      location: "Kamnik-Savinja Alps",
      description: "A gentle hike up to one of the most magical alpine pastures in Slovenia. Traditional wooden huts, grazing cows, and stunning panoramic views await. Taste fresh sour milk and cottage cheese prepared by local shepherds.",
      duration: "7 hours",
      difficulty: "Moderate",
      groupSize: "2–4",
      image: "/velika-planina.jpg"
    },
    {
      id: 4,
      icon: Wine,
      title: "Hidden Pools of Vipava Valley & Wine Picnic",
      location: "Vipava Valley",
      description: "Discover hidden pools and streams of the Vipava Valley. A short walk leads us to crystal-clear waters where you can dip your feet or swim. We end the day at a local winery with a picnic of regional wines and homemade dishes.",
      duration: "7 hours",
      difficulty: "Easy to Moderate",
      groupSize: "2–4",
      image: "/vipava-valley.jpg"
    },
    {
      id: 5,
      icon: Eye,
      title: "Katarina nad Ljubljano Hike & Local Tastes",
      location: "Near Ljubljana",
      description: "Just a short drive from the capital, the Katarina nad Ljubljano trail rewards hikers with panoramic views over Ljubljana, the Julian Alps, and beyond. The hike takes us through peaceful forests and meadows, perfect for a relaxed day in nature. After the walk, we enjoy a stop at a traditional inn for local Slovenian dishes.",
      duration: "5–6 hours",
      difficulty: "Easy",
      groupSize: "2–4",
      image: "/katarina-hike.jpg"
    },
  ]

  const faqData = [
    {
      question: "What should I bring on a day trip?",
      answer: "We recommend comfortable walking shoes, weather-appropriate clothing, a water bottle, sunscreen, and a small backpack. For specific trips, we may suggest additional items like swimwear for the canyon trips.",
    },
    {
      question: "Are meals included in the day trips?",
      answer: "Yes, all our day trips include a meal experience—whether it's a homemade feast, river picnic, wine tasting, or traditional Slovenian dishes at a local inn. We focus on fresh, local ingredients and authentic culinary experiences.",
    },
    {
      question: "How physically fit do I need to be?",
      answer: "Our trips range from easy to moderate difficulty. We design them to be accessible to most people with average fitness levels. If you have specific concerns, we're happy to recommend the most suitable option for you.",
    },
    {
      question: "What happens in case of bad weather?",
      answer: "We monitor weather conditions closely and will suggest alternatives or reschedule if necessary. Many of our experiences can be adapted to different weather conditions while still providing an enjoyable nature experience.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url('/ljubljana-nature.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div
          className={`relative z-10 text-center text-white max-w-4xl mx-auto px-6 transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            ANDARA Nature Journeys
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            1-Day Trips from Ljubljana
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed text-center">
            <p className="text-xl mb-6">
              For guests arriving in Ljubljana seeking authentic nature experiences. Instead of crowded tourist attractions, we guide you to serene trails, forest breathing practices, and warm hospitality with homemade food.
            </p>
            <p>
              Each journey includes moments of silence, mindful walking, and a touch of Japanese <em>shinrin-yoku</em> (forest bathing).
            </p>
          </div>
        </div>
      </section>

      {/* Day Trips Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Day Trip Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dayTrips.map((trip, index) => (
              <Card key={trip.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${trip.image}')` }} />
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <trip.icon className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <CardTitle className="text-primary group-hover:text-accent transition-colors duration-300 text-lg">
                        {trip.title}
                      </CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{trip.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{trip.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-accent" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mountain className="h-3 w-3 text-accent" />
                      <span>{trip.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-accent" />
                      <span>{trip.groupSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Book Your Journey</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed mb-8">
            <p>
              Ready to experience the hidden gems of Slovenia with Anja & Darja? Our 1-day ANDARA Nature Journeys are crafted for intimacy, authenticity, and a true connection with nature. Contact us to design your personal journey.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <Mail className="h-6 w-6 text-primary" />
                <a
                  href="mailto:info@andara-tours.com"
                  className="text-xl hover:text-accent transition-colors duration-200 text-primary font-medium"
                >
                  info@andara-tours.com
                </a>
              </div>
              <p className="text-muted-foreground">Send us an email to book your day trip</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Common Questions</h2>
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-accent text-white relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">
            Experience Slovenia's Hidden Nature
          </h2>
          <p className="text-xl mb-8 text-pretty leading-relaxed text-white">
            Join us for an unforgettable day exploring the natural wonders around Ljubljana
          </p>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 mb-8 hover:bg-black/30 transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-6 text-white">Reserve Your Spot</h3>
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
              <p className="text-white/90">Contact us for availability and booking</p>
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
            <a
              href="#"
              className="bg-black/20 hover:bg-black/30 p-4 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-white" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
