# config.py


from pathlib import Path

path_to_models = Path(__file__).parent.parent.parent.resolve()
# Supported languages
LANGUAGES = {
    "en": {
        "asr_model_path": str( path_to_models / "models/vosk-model-small-en-us-0.15"),
        "ner_model": "en_core_sci_sm",  # Use with SciSpacy
        "ner_type": "spacy"
    },
    "es": {
        "asr_model_path": str(path_to_models / "models/vosk-model-small-es-0.42"),
        "ner_model": "HUMADEX/spanish_medical_ner",  # Use with HuggingFace
        "ner_type": "huggingface"
    }
}

# Audio recording settings
AUDIO = {
    "samplerate": 16000,
    "duration": 7,
    "channels": 1
}
