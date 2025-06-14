# mic_test.py
import sounddevice as sd
from scipy.io.wavfile import write


if __name__ == "__main__":
    fs = 16000
    seconds = 5

    print("🎤 Speak now for 5 seconds...")
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()
    write("test_mic.wav", fs, recording)
    print("✅ Saved as test_mic.wav")
