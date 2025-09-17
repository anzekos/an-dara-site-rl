"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  const [currentTripIndex, setCurrentTripIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // swipe left
      setCurrentTripIndex(prev => Math.min(prev + 1, dayTrips.length - 1))
    } else if (touchEnd - touchStart > 50) {
      // swipe right
      setCurrentTripIndex(prev => Math.max(prev - 1, 0))
    }
  }

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
      image: "/Roznik_Grosuplje.JPG",
      mapLink: "https://goo.gl/maps/example"
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
      image: "/iska.jpg",
      mapLink: "https://goo.gl/maps/example"
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
      image: "/velika planina.jpg",
      mapLink: "https://goo.gl/maps/example"
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
      image: "/vipava.jpg",
      mapLink: "https://goo.gl/maps/example"
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
      image: "/katarina.jpg",
      mapLink: "https://goo.gl/maps/example"
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

      {/* Day Trips Slider */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Day Trip Experiences</h2>
          
          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Arrows - Desktop */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 justify-between pointer-events-none">
              <button
                onClick={() => setCurrentTripIndex(prev => Math.max(prev - 1, 0))}
                disabled={currentTripIndex === 0}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg pointer-events-auto hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed -translate-x-4"
                aria-label="Previous trip"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setCurrentTripIndex(prev => Math.min(prev + 1, dayTrips.length - 1))}
                disabled={currentTripIndex === dayTrips.length - 1}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg pointer-events-auto hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed translate-x-4"
                aria-label="Next trip"
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
                style={{ transform: `translateX(-${currentTripIndex * 100}%)` }}
              >
                {dayTrips.map((trip, index) => (
                  <div key={trip.id} className="w-full flex-shrink-0 px-2">
                    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] border-0 shadow-lg overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 overflow-hidden m-4 rounded-xl">
                          <div
                            className="h-64 md:h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 rounded-xl"
                            style={{
                              backgroundImage: `url('${trip.image}')`
                            }}
                          />
                        </div>
                        <div className="md:w-2/3 p-8">
                          <div className="flex items-center gap-4 mb-4">
                            <Badge className="bg-primary text-white group-hover:bg-accent transition-colors duration-300">
                              Trip {trip.id}
                            </Badge>
                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                              {trip.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{trip.location}</span>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                            {trip.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div className="group-hover:translate-x-1 transition-transform duration-300">
                              <p className="text-sm font-medium text-primary">Duration</p>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{trip.duration}</p>
                              </div>
                            </div>
                            <div className="group-hover:translate-x-1 transition-transform duration-300 delay-100">
                              <p className="text-sm font-medium text-primary">Difficulty</p>
                              <Badge
                                variant="outline"
                                className={`text-xs transition-all duration-300 group-hover:scale-105 ${
                                  trip.difficulty === "Moderate" || trip.difficulty === "Easy to Moderate"
                                    ? "border-yellow-500 text-yellow-600"
                                    : "border-green-500 text-green-600"
                                }`}
                              >
                                {trip.difficulty}
                              </Badge>
                            </div>
                            <div className="group-hover:translate-x-1 transition-transform duration-300 delay-200">
                              <p className="text-sm font-medium text-primary">Group Size</p>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{trip.groupSize}</p>
                              </div>
                            </div>
                          </div>
                          <a
                            href={trip.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-muted/30"
                          >
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">View on Map</span>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
      
            {/* Trip Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {dayTrips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTripIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentTripIndex === index 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 w-3 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to trip ${index + 1}`}
                />
              ))}
            </div>
      
            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center mt-6 space-x-4">
              <button
                onClick={() => setCurrentTripIndex(prev => Math.max(prev - 1, 0))}
                disabled={currentTripIndex === 0}
                className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous trip"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentTripIndex(prev => Math.min(prev + 1, dayTrips.length - 1))}
                disabled={currentTripIndex === dayTrips.length - 1}
                className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next trip"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
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
