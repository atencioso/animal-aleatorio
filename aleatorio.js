"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CuteAnimalGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateImage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=cute+animal&client_id=SUA-CHAVE-AQUI`
      )
      const data = await response.json()
      setImageUrl(data.urls.regular)
    } catch (error) {
      console.error("Erro ao buscar imagem:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
      >
        Gerador de Animais Fofos
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        {imageUrl ? (
          <motion.img
            key={imageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt="Animal fofo"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Clique no botão para gerar uma imagem</p>
          </div>
        )}
        <Button
          onClick={generateImage}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? "Gerando..." : "Gerar Animal Fofo"}
        </Button>
      </motion.div>
    </div>
  )
}