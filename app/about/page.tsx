"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Mountain,
  Users,
  ChevronDown,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Heart,
  Globe,
  Leaf,
  Snowflake,
  Footprints,
} from "lucide-react"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const values = [
    {
      icon: Globe,
      title: "Local Expertise",
      description: "Deep knowledge of Slovenian Alps trails and hidden gems",
    },
    {
      icon: Heart,
      title: "Personal Connection",
      description: "We craft experiences that resonate with your hiking dreams",
    },
    {
      icon: Leaf,
      title: "Sustainable Tourism",
      description: "Respecting nature and supporting local communities",
    },
    {
      icon: Footprints,
      title: "Adventure with Comfort",
      description: "Challenging hikes with comfortable accommodations",
    },
  ]

  const faqData = [
    {
      question: "Why choose self-guided hiking?",
      answer:
        "Self-guided hiking offers the perfect balance of structure and freedom. We handle all the logistics—accommodations, luggage transfers, and detailed route planning—so you can explore at your own pace, linger at beautiful viewpoints, and have authentic encounters with locals without being tied to a group schedule.",
    },
    {
      question: "How do you create your hiking routes?",
      answer:
        "Each route is personally tested and curated by us. We combine our extensive local knowledge with our experiences hiking across Europe's most iconic trails. We select paths that offer the most breathtaking scenery, cultural immersion, and appropriate challenge levels for different hiking abilities.",
    },
    {
      question: "What makes Slovenian Alps special?",
      answer:
        "The Slovenian Alps offer pristine natural beauty without the crowds of other European alpine destinations. You'll discover crystal-clear lakes, emerald rivers, charming mountain villages, and warm hospitality. It's a hidden gem that perfectly combines adventure with authentic cultural experiences.",
    },
    {
      question: "How experienced do I need to be?",
      answer:
        "We offer routes for various fitness levels. While some tours require good physical condition and previous hiking experience, we also have options for beginners or those who prefer gentler trails. We'll help you choose the perfect route based on your experience and preferences.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url('/mountain-landscape-about.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div
          className={`relative z-10 text-center text-white max-w-4xl mx-auto px-6 transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            About Us ✨
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Discover the Slovenian Alps with Anja & Darja – Your Local Self-Guided Hiking Experts
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p className="text-xl mb-6">
              We began our story as two friends who found freedom and joy in exploring mountains and hidden getaways. Our adventures took us across Europe's most iconic trails – from the legendary Tour du Mont Blanc, to the fjords of Norway, and the classic Dolomites. On these journeys, we discovered the beauty of self-guided hiking – a way to explore new countries, meet locals, and move at our own pace.
            </p>
            <p className="mb-6">
              With backgrounds in science and more than 20 years of experience in the pharmaceutical industry, we are driven by curiosity, transformation, and the desire to follow new paths. Hiking has become not just a passion, but a way of life – one that combines adventure, freedom, and deep connection to nature.
            </p>
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Your Guides</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Anja */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('/anja-profile.jpg')` }} />
              <CardHeader>
                <CardTitle className="text-primary group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  <Snowflake className="h-6 w-6" /> Anja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Grew up with climbing "in the cradle," and even became the first woman to snowboard down Denali, the highest mountain in North America. Today, she balances family life with two kids and a continued love for the outdoors.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> From the mountains of Slovenia
                </div>
              </CardContent>
            </Card>

            {/* Darja */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('/darja-profile.jpg')` }} />
              <CardHeader>
                <CardTitle className="text-primary group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                  <Leaf className="h-6 w-6" /> Darja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Started life on the flatlands of eastern Slovenia, far from the peaks. Yet over the years, the mountains became a place for self-growth and discovery. A true animal lover, especially devoted to her dog, she finds peace and joy in every trail.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> From the plains of Eastern Slovenia
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="flex justify-center">
                    <value.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-primary group-hover:text-accent transition-colors duration-300">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Our Mission</h2>
            <p className="text-xl text-center text-muted-foreground leading-relaxed">
              Together, we created a local self-guided hiking agency in Slovenia to share the magic of the Slovenian Alps. Our mission is simple: to help travelers experience authentic adventures, with the freedom to walk at their own rhythm, while discovering breathtaking landscapes and local culture.
            </p>
            <p className="text-lg text-center mt-6 text-muted-foreground">
              ✨ Whether you dream of hiking in the Julian Alps, exploring Triglav National Park, or finding hidden alpine valleys, we'll craft routes that bring you closer to nature, adventure, and yourself.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-muted/30">
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
            Ready to Explore the Slovenian Alps?
          </h2>
          <p className="text-xl mb-8 text-pretty leading-relaxed text-white">
            Let us create your perfect self-guided hiking adventure through Slovenia's most spectacular landscapes
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
              <p className="text-white/90">Send us an email to start planning your adventure</p>
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
    </div>
  )
}
