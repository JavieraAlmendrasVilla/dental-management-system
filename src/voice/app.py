import spacy
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
from config import LANGUAGES
from recognizer import recognize_from_mic_vosk, extract_entities


def main():
    lang = "es"  # or "en"
    config = LANGUAGES[lang]

    # Load ASR model path
    asr_model_path = config["asr_model_path"]

    # Load NER model based on ner_type
    ner_type = config["ner_type"]
    ner_model_name = config["ner_model"]

    if ner_type == "spacy":
        ner_model = spacy.load(ner_model_name)
    elif ner_type == "huggingface":
        tokenizer = AutoTokenizer.from_pretrained(ner_model_name)
        model = AutoModelForTokenClassification.from_pretrained(ner_model_name)
        ner_model = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
    else:
        raise ValueError(f"Unsupported ner_type: {ner_type}")

    # Recognize speech
    text = recognize_from_mic_vosk(asr_model_path)
    print(f"🗣️ Transcribed: {text}")

    # Extract entities
    entities = extract_entities(text, ner_model, ner_type)
    print(f"🔍 Medical Entities: {entities}")


if __name__ == "__main__":
    main()
3