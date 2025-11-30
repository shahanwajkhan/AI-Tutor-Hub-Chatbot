import os
import requests
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS

app = Flask(__name__, template_folder='templates', static_folder='.', static_url_path='')
CORS(app)

PORT = int(os.getenv('PORT', 3000))


def get_gemini_url():
    key = os.getenv('GEMINI_API_KEY')
    if not key:
        return None
    return f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={key}"


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/courses')
def courses():
    return render_template('courses.html')


@app.route('/assignments')
def assignments():
    return render_template('assignments.html')


@app.route('/quizzes')
def quizzes():
    return render_template('quizzes.html')


@app.route('/find-tutor')
def find_tutor():
    return render_template('find-tutor.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/api/chat', methods=['POST'])
def chat_proxy():
    GEMINI_API_URL = get_gemini_url()
    if not GEMINI_API_URL:
        return jsonify({
            'error': 'GEMINI_API_KEY not set in environment. Set GEMINI_API_KEY and restart the server.'
        }), 500

    try:
        body = request.get_json(force=True)
        # Basic validation similar to original server.js
        if not body or 'contents' not in body or not body['contents']:
            raise ValueError('Invalid request format')

        # Build request payload for Gemini
        gemini_request = {
            'contents': [
                {
                    'parts': [
                        {
                            'text': body['contents'][0].get('parts', [])[0].get('text')
                        }
                    ]
                }
            ],
            'generationConfig': {
                'temperature': 0.7,
                'maxOutputTokens': 150
            },
            'safetySettings': [
                {'category': 'HARM_CATEGORY_HARASSMENT', 'threshold': 'BLOCK_MEDIUM_AND_ABOVE'},
                {'category': 'HARM_CATEGORY_HATE_SPEECH', 'threshold': 'BLOCK_MEDIUM_AND_ABOVE'},
                {'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold': 'BLOCK_MEDIUM_AND_ABOVE'},
                {'category': 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold': 'BLOCK_MEDIUM_AND_ABOVE'}
            ]
        }

        # Forward request to Gemini API
        resp = requests.post(GEMINI_API_URL, json=gemini_request, timeout=30)

        # Raise for HTTP errors
        resp.raise_for_status()

        data = resp.json()
        # Basic response validation
        if not data.get('candidates') or not data['candidates'][0].get('content'):
            return jsonify({'error': 'Invalid response format from Gemini API'}), 502

        return jsonify(data)

    except requests.exceptions.RequestException as re:
        return jsonify({'error': 'Failed to contact Gemini API', 'details': str(re)}), 502
    except Exception as e:
        return jsonify({'error': 'Failed to process request', 'details': str(e)}), 500


@app.route('/<path:path>')
def serve_static(path):
    # Try to serve static files (CSS, JS, images, etc.)
    if os.path.exists(path):
        return send_from_directory('.', path)
    # Fallback to 404
    return jsonify({'error': 'Not found'}), 404


# Error handling middleware
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error', 'details': str(error)}), 500


if __name__ == '__main__':
    print(f"Starting Flask server on http://0.0.0.0:{PORT}")
    app.run(host='0.0.0.0', port=PORT, debug=True)
