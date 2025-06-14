import unicodedata
from difflib import get_close_matches


def normalize(text):
    return unicodedata.normalize("NFKD", text).encode("ASCII", "ignore").decode("utf-8").lower()


COMMANDS = {
    "open_settings": ["open settings", "abrir configuraciones", "abrir configuración", "einstellungen öffnen"],
    "play_music": ["play music", "reproducir música", "musik spielen"]
}

# Pre-normalize keywords once for efficiency
NORMALIZED_COMMANDS = {
    action: [normalize(k) for k in keywords]
    for action, keywords in COMMANDS.items()
}


def handle_command(text):
    norm_text = normalize(text)

    for action, norm_keywords in NORMALIZED_COMMANDS.items():
        # Try fuzzy matching first
        matches = get_close_matches(norm_text, norm_keywords, n=1, cutoff=0.6)
        if matches:
            return {"action": action}

        # Fallback: check if any keyword is a substring
        if any(k in norm_text for k in norm_keywords):
            return {"action": action}

    return {"action": "unknown", "text": text}
