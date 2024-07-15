### Zusammenfassung für GitHub

---

# Mervan Baker Barbershop - ParallaxStepper

Dieses Projekt ist ein interaktiver Stepper mit Parallax-Effekt, der in einem Webbrowser verwendet werden kann. Es ermöglicht Benutzern, durch verschiedene Schritte zu navigieren und dabei ein visuell ansprechendes Parallax-Hintergrundbild zu erleben. Das Projekt ist noch in Arbeit (Work in Progress) und wird kontinuierlich verbessert.



https://github.com/user-attachments/assets/0fd924ae-7427-4bc9-9c5d-38df97f5d211



## Demo

Eine Live-Demo des Projekts finden Sie auf [CodePen](https://codepen.io/your-pen-url).

## Installation und Verwendung

Um dieses Projekt lokal auszuführen, folgen Sie diesen Schritten:

1. **Repository klonen**:
    ```bash
    git clone https://github.com/yourusername/mervan-baker-barbershop-parallaxstepper.git
    cd mervan-baker-barbershop-parallaxstepper
    ```


### Cross-Origin Resource Sharing (CORS)

**Problem:**
CORS ist ein Sicherheitsmechanismus, der von Webbrowsern implementiert wird, um Webanwendungen vor bösartigen Angriffen zu schützen. Er beschränkt, welche Ressourcen von einer Domain von einer anderen Domain angefordert werden dürfen. Wenn Sie beispielsweise versuchen, eine Datei von `file://` zu laden, erhalten Sie einen CORS-Fehler, weil der Browser den Zugriff auf diese Ressource blockiert.

**Fehlermeldung:**
```
index.html:1 Access to script at 'file:///home/tulex/Entwicklung/Projekte/paralax-formular-layer/script.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, isolated-app, brave, https, chrome-untrusted, data, chrome-extension, chrome.
```

**Lösung:**
Um diese Einschränkungen zu umgehen, können Sie einen lokalen Server einrichten, der Ihre Dateien über `http://` oder `https://` bereitstellt. Dies kann einfach mit Python erreicht werden.

### Schritte zum Einrichten eines lokalen Servers mit Python

a. **Navigieren Sie in Ihr Projektverzeichnis:**
    ```bash
    cd /home/tulex/Entwicklung/Projekte/paralax-formular-layer
    ```

b. **Starten Sie einen einfachen HTTP-Server mit Python:**
    - Für Python 3:
        ```bash
        python3 -m http.server 8000
        ```
    - Für Python 2:
        ```bash
        python -m SimpleHTTPServer 8000
        ```

c. **Zugriff auf den Server:**
    Öffnen Sie Ihren Webbrowser und navigieren Sie zu `http://localhost:8000`. Ihre `index.html`-Datei und alle anderen Ressourcen werden nun korrekt geladen, und Sie sollten keine CORS-Probleme mehr haben.

### Zusammenfassung

Durch das Einrichten eines lokalen Servers umgehen Sie CORS-Probleme, da der Zugriff auf Ihre Ressourcen über `http://` oder `https://` erfolgt, anstatt über das unsichere `file://`-Protokoll. Python bietet eine einfache Möglichkeit, einen solchen Server zu starten und Ihre Webanwendung lokal zu testen.





2. **Dateien strukturieren**:
    - Legen Sie die folgenden Dateien in Ihrem Projektverzeichnis ab:
      - `index.html`
      - `styles.css`
      - `script.js`
      - `stepper.js`
      - `form.js`
      - `parallax.js`

3. **HTML** (`index.html`):
    ```html
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Parallax Sternenhimmel</title>
        <link rel="stylesheet" href="styles.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    </head>
    <body>
        <div class="scroll-container" id="scroll-container">
            <div class="parallax-layer" id="layer1">
                <img src="star_bg1.png" alt="Hintergrund 1" class="bg-image">
            </div>
            <div class="parallax-layer" id="layer2">
                <img src="star_bg2.png" alt="Hintergrund 2" class="bg-image">
            </div>
            <div class="parallax-layer" id="layer3">
                <img src="star_bg3.png" alt="Hintergrund 3" class="bg-image">
            </div>
            <div class="interactive-layer" id="interactive-layer">
                <div class="stepper-box" id="stepper-box">
                    <form id="stepper-form">
                        <div class="step active" id="step1">
                            <h2>Step 1: Wählen Sie eine Kategorie</h2>
                            <div class="category-boxes">
                                <div class="category-box" data-category="damen">
                                    <img src="damen-icon.png" alt="Damen">
                                    <span>Damen</span>
                                </div>
                                <div class="category-box" data-category="herren">
                                    <img src="herren-icon.png" alt="Herren">
                                    <span>Herren</span>
                                </div>
                                <div class="category-box" data-category="kinder">
                                    <img src="kinder-icon.png" alt="Kinder">
                                    <span>Kinder</span>
                                </div>
                            </div>
                        </div>
                        <div class="step" id="step2">
                            <h2>Step 2: Wählen Sie Ihre Services</h2>
                            <div id="service-options" class="category-boxes"></div>
                            <div id="time-display">Gesamtzeit: 0 min</div>
                            <button type="button" id="prev2" class="btn btn-secondary">Previous</button>
                            <button type="button" id="next2" class="btn btn-primary">Next</button>
                        </div>
                        <div class="step" id="step3">
                            <h2>Step 3: Wählen Sie einen Termin</h2>
                            <div id="summary">
                                <h3>Ihre Auswahl:</h3>
                                <div id="selected-services"></div>
                                <div id="total-time"></div>
                            </div>
                            <div id="calendar-container">
                                <div id="calendar-header">
                                    <button id="prev-month" class="btn btn-secondary">&lt;</button>
                                    <span id="current-month-year"></span>
                                    <button id="next-month" class="btn btn-secondary">&gt;</button>
                                </div>
                                <div id="calendar"></div>
                            </div>
                            <div id="time-slots" style="display: none;">
                                <h3>Verfügbare Zeiten:</h3>
                                <div id="time-slots-container"></div>
                            </div>
                            <button type="button" id="prev3" class="btn btn-secondary">Previous</button>
                            <button type="button" id="next3" class="btn btn-primary">Next</button>
                        </div>
                        <div class="step" id="step4">
                            <h2>Step 4</h2>
                            <input type="tel" placeholder="Enter your phone number" class="form-control">
                            <button type="button" id="prev4" class="btn btn-secondary">Previous</button>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="form-data-display"></div>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script type="module" src="script.js"></script>
    </body>
    </html>
    ```

4. **CSS** (`styles.css`):
    ```css
    body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100vh;
        width: 100%;
        background-color: black;
    }

    .scroll-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .parallax-layer {
        position: absolute;
        height: 100%;
        width: 300%;
        top: 0;
        left: 0;
        transition: transform 0.5s ease;
    }

    .bg-image {
        width: 33.33%;
        height: 100%;
        object-fit: cover;
        float: left;
    }

    #layer1 { z-index: 1; }
    #layer2 { z-index: 2; }
    #layer3 { z-index: 3; }

    .interactive-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .stepper-box {
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        padding: 40px;
        border-radius: 20px;
        width: 80%;
        max-width: 600px;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }

    .step {
        display: none;
    }

    .step.active {
        display: block;
    }

    h2 {
        color: white;
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
    }

    button {
        padding: 10px 20px;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        cursor: pointer;
        margin-right: 10px;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    #form-data-display {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        color: rgba(255, 255, 255, 0.7);
        padding: 10px;
        font-size: 12px;
        text-align: left;
        z-index: 5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 30px;
        overflow: hidden;
    }

    #form-data-display span {
        margin-right: 20px;
    }

    .category-boxes {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    .category-box {
        width: 30%;
        aspect-ratio: 1;
        background-color: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
```
