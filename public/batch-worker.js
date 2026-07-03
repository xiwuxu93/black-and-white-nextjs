/**
 * Web Worker for BATCH image processing.
 * It receives image data and a full preset object to apply effects.
 */

self.onmessage = function(e) {
    const { imageData, preset, fileIdentifier } = e.data;

    const processedData = applyAllEffects(imageData, preset);

    // Send the modified data back to the main thread.
    self.postMessage({
        processedImageData: processedData,
        fileIdentifier: fileIdentifier
    }, [processedData.data.buffer]);
};

function applyAllEffects(imageData, preset) {
    const data = imageData.data;
    const {
        contrast,
        brightness,
        sepia,
        grain,
        shadows,
        highlights,
        invert,
        grayscale = true
    } = preset;

    const contrastFactor = (contrast / 100) + 1;
    const brightnessFactor = brightness / 100;
    const sepiaFactor = sepia / 100;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        if (grayscale) {
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            r = g = b = luminance;
        }

        if (sepiaFactor > 0) {
            r = Math.min(255, r + (25 * sepiaFactor));
            g = Math.min(255, g + (10 * sepiaFactor));
            b = Math.max(0, b - (20 * sepiaFactor));
        }

        r = clamp(r * brightnessFactor);
        g = clamp(g * brightnessFactor);
        b = clamp(b * brightnessFactor);

        const avg = (r + g + b) / 3;
        r = clamp(avg + (r - avg) * contrastFactor);
        g = clamp(avg + (g - avg) * contrastFactor);
        b = clamp(avg + (b - avg) * contrastFactor);

        const currentLuminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const tonalFactor =
            currentLuminance < 128
                ? 1 + shadows / 100
                : 1 + highlights / 100;
        r = clamp(r * tonalFactor);
        g = clamp(g * tonalFactor);
        b = clamp(b * tonalFactor);

        if (invert) {
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
        }

        if (grain > 0) {
            const noise = (Math.random() - 0.5) * grain;
            r = clamp(r + noise);
            g = clamp(g + noise);
            b = clamp(b + noise);
        }

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }

    return imageData;
}

function clamp(value) {
    return Math.max(0, Math.min(255, value));
}
