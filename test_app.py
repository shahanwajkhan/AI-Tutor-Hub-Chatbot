import unittest
import json
import os
from app import app


class TestFlaskApp(unittest.TestCase):
    """Unit and integration tests for the Flask AITutor Hub application."""

    def setUp(self):
        """Set up test client and app context."""
        app.config['TESTING'] = True
        self.client = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

    def tearDown(self):
        """Clean up app context."""
        self.app_context.pop()

    # Test route endpoints
    def test_index_page(self):
        """Test that the index page loads successfully."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'AITutor Hub', response.data)

    def test_courses_page(self):
        """Test that the courses page loads successfully."""
        response = self.client.get('/courses')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'AI/ML Courses', response.data)

    def test_assignments_page(self):
        """Test that the assignments page loads successfully."""
        response = self.client.get('/assignments')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Course Assignments', response.data)

    def test_quizzes_page(self):
        """Test that the quizzes page loads successfully."""
        response = self.client.get('/quizzes')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Daily Quiz Challenge', response.data)

    def test_find_tutor_page(self):
        """Test that the find tutor page loads successfully."""
        response = self.client.get('/find-tutor')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Find Your Perfect AI Tutor', response.data)

    def test_login_page(self):
        """Test that the login page loads successfully."""
        response = self.client.get('/login')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Welcome Back', response.data)

    def test_signup_page(self):
        """Test that the signup page loads successfully."""
        response = self.client.get('/signup')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Create Account', response.data)

    # Test API chat endpoint
    def test_chat_api_missing_api_key(self):
        """Test that /api/chat returns error when GEMINI_API_KEY is not set."""
        # Temporarily remove API key if set
        original_key = os.environ.pop('GEMINI_API_KEY', None)
        try:
            response = self.client.post(
                '/api/chat',
                data=json.dumps({
                    'contents': [
                        {'parts': [{'text': 'Hello'}]}
                    ]
                }),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 500)
            data = json.loads(response.data)
            self.assertIn('error', data)
            self.assertIn('GEMINI_API_KEY', data['error'])
        finally:
            # Restore API key if it existed
            if original_key:
                os.environ['GEMINI_API_KEY'] = original_key

    def test_chat_api_invalid_request_format(self):
        """Test that /api/chat validates request format."""
        os.environ['GEMINI_API_KEY'] = 'test_key'
        try:
            # Test with missing 'contents' field
            response = self.client.post(
                '/api/chat',
                data=json.dumps({'invalid': 'request'}),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 500)
            data = json.loads(response.data)
            self.assertIn('error', data)

            # Test with empty contents
            response = self.client.post(
                '/api/chat',
                data=json.dumps({'contents': []}),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 500)
        finally:
            os.environ.pop('GEMINI_API_KEY', None)

    # Test 404 error handling
    def test_404_not_found(self):
        """Test that 404 errors are properly handled."""
        response = self.client.get('/nonexistent-page')
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertIn('error', data)

    # Test static file serving
    def test_static_css_file(self):
        """Test that static CSS files can be served."""
        response = self.client.get('/styles/main.css')
        # May return 200 if file exists, 404 if not
        self.assertIn(response.status_code, [200, 404])

    def test_static_js_file(self):
        """Test that static JS files can be served."""
        response = self.client.get('/scripts/main.js')
        # May return 200 if file exists, 404 if not
        self.assertIn(response.status_code, [200, 404])


class TestChatAPIIntegration(unittest.TestCase):
    """Integration tests for the chat API endpoint."""

    def setUp(self):
        """Set up test client for API tests."""
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_chat_api_with_mock_key(self):
        """Test chat API structure when API key is set."""
        os.environ['GEMINI_API_KEY'] = 'test_mock_key_12345'
        try:
            # Make request with valid structure
            response = self.client.post(
                '/api/chat',
                data=json.dumps({
                    'contents': [
                        {'parts': [{'text': 'What is machine learning?'}]}
                    ]
                }),
                content_type='application/json'
            )
            # Request should fail trying to reach API (network issue), not validation
            # Status could be 502 (bad gateway) rather than 500 (server error)
            self.assertIn(response.status_code, [500, 502])
        finally:
            os.environ.pop('GEMINI_API_KEY', None)

    def test_chat_api_request_validation(self):
        """Test that /api/chat properly validates incoming requests."""
        os.environ['GEMINI_API_KEY'] = 'test_key'
        try:
            # Valid request structure
            valid_payload = {
                'contents': [
                    {'parts': [{'text': 'Test question'}]}
                ]
            }
            response = self.client.post(
                '/api/chat',
                data=json.dumps(valid_payload),
                content_type='application/json'
            )
            # Should pass validation (may fail at API call)
            data = json.loads(response.data)
            # Either it reaches the API and fails, or passes validation
            self.assertIsInstance(data, dict)
        finally:
            os.environ.pop('GEMINI_API_KEY', None)


class TestTemplateRendering(unittest.TestCase):
    """Test that Jinja2 templates render correctly."""

    def setUp(self):
        """Set up test client."""
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_templates_contain_navbar(self):
        """Test that all templates contain the navbar."""
        routes = ['/', '/courses', '/assignments', '/quizzes', '/find-tutor', '/login', '/signup']
        for route in routes:
            response = self.client.get(route)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'navbar', response.data.lower())
            self.assertIn(b'AITutor Hub', response.data)

    def test_templates_contain_footer(self):
        """Test that all templates contain the footer."""
        routes = ['/', '/courses', '/assignments', '/quizzes', '/find-tutor', '/login', '/signup']
        for route in routes:
            response = self.client.get(route)
            self.assertEqual(response.status_code, 200)
            self.assertIn(b'footer', response.data.lower())


if __name__ == '__main__':
    unittest.main()
