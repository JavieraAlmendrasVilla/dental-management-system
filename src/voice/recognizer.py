import vosk
import sounddevice as sd
import queue
import json
import spacy

from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

q = queue.Queue()


def _callback(indata, frames, time, status):
    q.put(bytes(indata))


def recognize_from_mic_vosk(model_path, samplerate=16000):
    model = vosk.Model(model_path)
    rec = vosk.KaldiRecognizer(model, samplerate)

    with sd.RawInputStream(samplerate=samplerate, blocksize=8000, dtype='int16',
                           channels=1, callback=_callback):
        print("🎤 Listening...")
        while True:
            data = q.get()
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                text = result.get("text", "")
                return text


def load_ner_model(ner_model_name, ner_type):
    if ner_type == "huggingface":
        model = AutoModelForTokenClassification.from_pretrained(ner_model_name)
        tokenizer = AutoTokenizer.from_pretrained(ner_model_name)
        return pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
    elif ner_type == "spacy":
        return spacy.load(ner_model_name)
    else:
        raise ValueError(f"Unsupported ner_type: {ner_type}")


def extract_entities(text, ner_model, ner_type):
    if ner_type in ["huggingface", "hf"]:
        entities = ner_model(text)
        return [(e["word"], e["entity_group"]) for e in entities]
    elif ner_type == "spacy":
        doc = ner_model(text)
        return [(ent.text, ent.label_) for ent in doc.ents]
    else:
        raise ValueError(f"Unsupported ner_type: {ner_type}")
