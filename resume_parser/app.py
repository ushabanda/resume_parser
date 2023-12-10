from flask import Flask, request, jsonify
from resumeparse import resumeparse
from flask_cors import CORS
import time
import logging
app = Flask(__name__)
CORS(app, resources={r"/resumeparse": {"origins": "http://localhost:3000"}})

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
class ResumeParser:
    @staticmethod
    def parse_resume(resume_file_path, docx_parser="tika"):
        parser_obj = resumeparse()
        parsed_resume_data = parser_obj.read_file(resume_file_path, docx_parser)
        return parsed_resume_data

@app.route('/resumeparse', methods=['POST'])
def parse_resume():
    print("Received a request to parse resume")
    try:
        start_time = time.time() 
        # Get the resume file from the request
        resume_file = request.files['resume']
        docx_parser = request.form.get('docx_parser', 'tika')

        # Save the file to a temporary location
        resume_file_path = 'Ashok_resume.pdf'
        resume_file.save(resume_file_path)

        # Parse the resume
        parsed_resume_data = ResumeParser.parse_resume(resume_file_path, docx_parser)
        end_time = time.time()
        print('Time taken:', end_time - start_time, 'seconds')
        return jsonify(parsed_resume_data)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})
@app.route('/greet', methods=['POST'])
def greet_user():
    try:
        data = request.get_json()
        first_name = data.get('first_name', 'User')

        greeting = f"Hello {first_name}, please fill in the details."
        return jsonify({'greeting': greeting})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)


