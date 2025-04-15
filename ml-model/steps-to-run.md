# Steps to Run the ML Model

Follow these steps to set up and run the ML model:

1. **Create a Python virtual environment**  
    Ensure Python is installed on your system, then run:
    ```bash
    python -m venv .venv
    ```

2. **Activate the virtual environment**  
    For Windows, execute:
    ```bash
    .\.venv\Scripts\activate
    ```

3. **Install dependencies**  
    Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4. **Start the ML model server**  
    Run the application:
    ```bash
    python app.py
    ```

5. **Test the API**  
    Use the endpoint `http://127.0.0.1:5000/api/emotion/` to upload an audio file via a form input. Supported audio formats include `.mp3`, `.wav`, and `.opus`.
