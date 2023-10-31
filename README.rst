Resume parser
=============


Features
========

-  Extract name
-  Extract email
-  Extract mobile numbers
-  Extract skills
-  Extract total experience
-  Extract college name
-  Extract degree
-  Extract designation
-  Extract company names

Installation
============

-  You can install this package using

.. code:: bash

    pip install resume-parser

-  For NLP operations we use spacy and nltk. Install them using below
   commands:

.. code:: bash

    # spaCy
    python -m spacy download en_core_web_sm

    # nltk
    python -m nltk.downloader stopwords
    python -m nltk.downloader punkt
    python -m nltk.downloader averaged_perceptron_tagger
    python -m nltk.downloader universal_tagset
    python -m nltk.downloader wordnet
    python -m nltk.downloader brown
    python -m nltk.downloader maxent_ne_chunker

Supported File Formats
======================

-  PDF and DOCx and TXT files are supported on all Operating Systems

Usage
=====

-  Import it in your Python project

.. code:: python

    from resume_parser import resumeparse

    data = resumeparse.read_file('/path/to/resume/file')

Result
======

The module would return a dictionary with result as follows:

::

    {'degree': ['BSc','MSc'],
         'designition': [
             'content writer',
             'data scientist',
             'systems administrator',
         ],
         'email': 'maun@gmail.com',
         'name': 'Brian Njoroge',
         'phone': '+911234567890',
         'skills': [
             'Python',
             ' C++',
             'Power BI',
             'Tensorflow',
             'Keras',
             'Pytorch',
             'Scikit-Learn',
             'Pandas',
             'NLTK',
             'OpenCv',
             'Numpy',
             'Matplotlib',
             'Seaborn',
             'Django',
             'Linux',
             'Docker'],
         'total_exp': 3,
         'university': ['gujarat university', 'wuhan university', 'egerton university']}

[<img alt="alt_text"  src="coffee.png" />]