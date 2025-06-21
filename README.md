# 🦷 Multilingual Dental Practice Management System

This is an AI-powered, full-stack dental management system designed for dental clinics. It features a multilingual voice assistant, an intelligent booking backend, and a modern web frontend — all built using open-source tools and language models.

## 🚀 Key Features

- **Multilingual Voice Assistant** (English & Spanish)  
  Voice commands enable patients to book, manage, or inquire about appointments in natural language.

- **LLM-Augmented Backend**  
  Built with FastAPI, ChatGPT, and LangChain to extract intent, handle time normalization, and generate structured appointment data.

- **Modern UI Prototyped with Bolt.new**  
  Designed rapidly with Bolt.new and implemented in React/TypeScript with Tailwind CSS for clean, responsive user interfaces.

- **NER-Powered Medical Understanding**  
  Uses Hugging Face (`HUMADEX/spanish_medical_ner`) and SciSpacy models to extract symptoms, procedures, and medical entities.

- **Offline Voice Recognition**  
  Uses VOSK for fast, privacy-friendly speech-to-text without cloud dependency.

## 🧠 Tech Stack

| Area              | Tools / Libraries                                  |
|-------------------|-----------------------------------------------------|
| Frontend          | React, TypeScript, Tailwind CSS, Bolt.new          |
| Backend           | FastAPI, LangChain, SQLite, SQLAlchemyst                        |
| Voice Assistant   | VOSK, Whisper, SoundDevice, SciPy                  |
| NLP & NER         | Hugging Face Transformers, spaCy, SciSpacy         |
| LLM Integration   | Qwen 2.5                      |
| Tools             | Git, PyCharm, Python, Node.js                       |

## 🗣 Example Voice Commands

- “Reservar una cita con el dentista para el martes próximo a las 10 de la mañana.”
- “Book a cleaning appointment next Friday at 3 p.m.”
- “Abrir configuración” → Triggers UI action



